/**
 * Скрипт для поддержания активности Supabase БД
 * Отправляет тестовую заявку каждые 5 дней
 * Запускается через GitHub Actions
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Ошибка: Не установлены переменные окружения SUPABASE_URL или SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function pingDatabase() {
    try {
        console.log('🔄 Начинаем проверку активности базы данных...');
        console.log(`📅 Время: ${new Date().toISOString()}`);

        // 1. Проверяем подключение к БД
        const { data: testQuery, error: testError } = await supabase
            .from('consultations')
            .select('id')
            .limit(1);

        if (testError) {
            throw new Error(`Ошибка подключения к БД: ${testError.message}`);
        }

        console.log('✅ Подключение к базе данных успешно');

        // 2. Отправляем тестовую заявку для активности
        const testData = {
            name: 'GitHub Actions KeepAlive',
            phone: '+7 (000) 000-00-00',
            email: 'keepalive@github-actions.local',
            message: `Автоматическая заявка для поддержания активности БД. Дата: ${new Date().toLocaleDateString('ru-RU')}`,
            status: 'pending'
        };

        const { data, error } = await supabase
            .from('consultations')
            .insert([testData])
            .select();

        if (error) {
            throw new Error(`Ошибка при вставке данных: ${error.message}`);
        }

        console.log('✅ Тестовая заявка успешно создана:', data[0].id);

        // 3. Проверяем chat_sessions (если есть)
        const { data: chatSessions, error: chatError } = await supabase
            .from('chat_sessions')
            .select('id')
            .limit(1);

        if (!chatError) {
            console.log('✅ Таблица chat_sessions доступна');
        }

        // 4. Получаем статистику
        const { count: totalConsultations } = await supabase
            .from('consultations')
            .select('*', { count: 'exact', head: true });

        console.log(`📊 Всего заявок в БД: ${totalConsultations}`);

        // 5. Опционально: Удаляем старые тестовые заявки (старше 30 дней)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: deletedOld, error: deleteError } = await supabase
            .from('consultations')
            .delete()
            .eq('email', 'keepalive@github-actions.local')
            .lt('created_at', thirtyDaysAgo.toISOString())
            .select();

        if (!deleteError && deletedOld && deletedOld.length > 0) {
            console.log(`🗑️  Удалено старых тестовых заявок: ${deletedOld.length}`);
        }

        console.log('✅ Скрипт успешно завершен');
        console.log('=' .repeat(50));
        
        return true;
    } catch (error) {
        console.error('❌ Ошибка при выполнении скрипта:', error.message);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    }
}

// Запускаем скрипт
pingDatabase()
    .then(() => {
        console.log('✨ База данных активна и здорова!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('💥 Критическая ошибка:', error);
        process.exit(1);
    });
