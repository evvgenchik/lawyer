# 🤖 Автоматическое поддержание активности Supabase БД

## Проблема
Supabase на бесплатном тарифе приостанавливает (паузит) базу данных после **7 дней неактивности**. После паузы нужно вручную заходить в Supabase Dashboard и нажимать "Resume".

## Решение
Автоматический скрипт через **GitHub Actions**, который каждые **5 дней**:
- ✅ Проверяет подключение к БД
- ✅ Отправляет тестовую заявку
- ✅ Проверяет доступность таблиц
- ✅ Выводит статистику
- ✅ Очищает старые тестовые заявки (старше 30 дней)

## Настройка

### Шаг 1: Добавьте секреты в GitHub

1. Откройте ваш репозиторий на GitHub
2. Перейдите: **Settings** → **Secrets and variables** → **Actions**
3. Нажмите **New repository secret**
4. Добавьте два секрета:

**Секрет 1:**
- Name: `REACT_APP_SUPABASE_URL`
- Value: ваш Supabase URL (например: `https://xxxxx.supabase.co`)

**Секрет 2:**
- Name: `REACT_APP_SUPABASE_ANON_KEY`
- Value: ваш Supabase Anon Key

> 💡 Эти значения можно найти в Supabase Dashboard → Settings → API

### Шаг 2: Запушьте код

```bash
git add .github/
git commit -m "Add database keep-alive script"
git push
```

### Шаг 3: Проверьте работу

1. Перейдите на GitHub: **Actions** tab
2. Найдите workflow **"Keep Supabase DB Alive"**
3. Нажмите **Run workflow** → **Run workflow** (для тестового запуска)
4. Дождитесь выполнения (обычно 30-60 секунд)
5. Проверьте логи - должны быть зеленые галочки ✅

### Шаг 4: Проверьте в Supabase

1. Откройте Supabase Dashboard
2. Table Editor → `consultations`
3. Найдите запись с email: `keepalive@github-actions.local`
4. Это тестовая заявка от скрипта ✅

## Расписание

**Автоматический запуск:**
- 📅 Каждые 5 дней в 10:00 UTC (13:00 по Москве)
- Cron: `0 10 */5 * *`

**Ручной запуск:**
- GitHub → Actions → Keep Supabase DB Alive → Run workflow

## Что делает скрипт

```javascript
// 1. Проверяет подключение
SELECT id FROM consultations LIMIT 1;

// 2. Создает тестовую заявку
INSERT INTO consultations {
  name: 'GitHub Actions KeepAlive',
  phone: '+7 (000) 000-00-00',
  email: 'keepalive@github-actions.local',
  message: 'Автоматическая заявка...',
  status: 'pending'
}

// 3. Проверяет chat_sessions (если есть)
SELECT id FROM chat_sessions LIMIT 1;

// 4. Показывает статистику
SELECT COUNT(*) FROM consultations;

// 5. Удаляет старые тестовые заявки (>30 дней)
DELETE FROM consultations 
WHERE email = 'keepalive@github-actions.local' 
AND created_at < NOW() - INTERVAL '30 days';
```

## Мониторинг

### Проверка статуса
```bash
# Перейдите на GitHub
Repository → Actions → Keep Supabase DB Alive
```

### Логи успешного выполнения
```
✅ Подключение к базе данных успешно
✅ Тестовая заявка успешно создана: uuid-xxx-xxx
✅ Таблица chat_sessions доступна
📊 Всего заявок в БД: 42
🗑️ Удалено старых тестовых заявок: 2
✅ Скрипт успешно завершен
✨ База данных активна и здорова!
```

### Email уведомления

GitHub автоматически отправит email если workflow упадет с ошибкой.

Можно настроить в: **Settings** → **Notifications** → **Actions**

## Изменение расписания

Откройте `.github/workflows/keep-db-alive.yml`:

```yaml
on:
  schedule:
    # Каждый день в 3:00 UTC
    - cron: '0 3 * * *'
    
    # Каждые 3 дня в 12:00 UTC
    - cron: '0 12 */3 * *'
    
    # Каждый понедельник в 9:00 UTC
    - cron: '0 9 * * 1'
    
    # Текущее (каждые 5 дней)
    - cron: '0 10 */5 * *'
```

> 🔗 Справка по cron: https://crontab.guru/

## Отключение скрипта

Если больше не нужен:

1. GitHub → Actions → Keep Supabase DB Alive
2. Справа: **...** (три точки) → **Disable workflow**

Или удалите файл:
```bash
rm .github/workflows/keep-db-alive.yml
git commit -m "Disable keep-alive script"
git push
```

## Очистка тестовых заявок вручную

Если накопилось много тестовых заявок:

```sql
-- В Supabase SQL Editor
DELETE FROM consultations 
WHERE email = 'keepalive@github-actions.local';
```

## Альтернативные решения

### 1. Локальный Cron Job (Mac/Linux)

```bash
# Создайте файл ~/keep-db-alive.sh
#!/bin/bash
cd /path/to/project
node .github/scripts/keep-db-alive.js

# Добавьте в crontab
crontab -e

# Добавьте строку (каждые 5 дней в 10:00)
0 10 */5 * * ~/keep-db-alive.sh
```

**Минус:** Компьютер должен быть включен.

### 2. Netlify Scheduled Functions

```javascript
// netlify/functions/keep-alive.js
exports.handler = async () => {
  // Тот же код из keep-db-alive.js
}
```

**Минус:** Требует Netlify Pro ($19/месяц).

### 3. Supabase Edge Function

```typescript
// supabase/functions/keep-alive/index.ts
Deno.serve(async () => {
  // Код пинга БД
})
```

**Минус:** Нужно настраивать внешний cron для вызова функции.

## Преимущества GitHub Actions

✅ **Бесплатно** (2000 минут/месяц на Free tier)  
✅ **Надежно** (работает 24/7)  
✅ **Не требует** запущенного компьютера  
✅ **Email уведомления** при ошибках  
✅ **Логи** доступны в веб-интерфейсе  
✅ **Легко** включить/выключить  

## Файлы проекта

```
.github/
├── workflows/
│   └── keep-db-alive.yml      # GitHub Actions workflow
└── scripts/
    └── keep-db-alive.js       # Node.js скрипт пинга БД
```

## FAQ

**Q: Сколько это стоит?**  
A: Бесплатно. GitHub Actions дает 2000 минут/месяц. Скрипт работает ~30 секунд, 6 раз в месяц = 3 минуты.

**Q: Что если GitHub Actions упадет?**  
A: Вы получите email. База приостановится через 7 дней без активности.

**Q: Можно ли запустить вручную?**  
A: Да! GitHub → Actions → Keep Supabase DB Alive → Run workflow.

**Q: Как узнать когда запускался последний раз?**  
A: GitHub → Actions → Keep Supabase DB Alive → посмотрите последний запуск.

**Q: Можно ли использовать для других БД?**  
A: Да! Измените скрипт под PostgreSQL, MySQL, MongoDB и т.д.

---

**Создано:** 9 ноября 2025  
**Автор:** GitHub Copilot  
**Лицензия:** MIT
