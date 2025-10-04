# 🚀 Admin Quick Reference Guide

Quick reference for daily admin panel usage.

## 🔗 URLs

**Public Website**: `https://yoursite.com` or `http://localhost:3000`  
**Admin Login**: `https://yoursite.com/admin` or `http://localhost:3000/admin`  
**Dashboard**: `https://yoursite.com/admin/dashboard`

## 🔐 Login

1. Go to `/admin`
2. Enter your email and password
3. Click "Войти" (Login)
4. You'll be redirected to the dashboard

## 📊 Dashboard Overview

```
┌─────────────────────────────────────────────────────────┐
│  🏛️ Панель управления         [🔗 Сайт] [🚪 Выйти]    │
├─────────────────────────────────────────────────────────┤
│  📊 Statistics                                          │
│  ┌──────────┬──────────┬──────────┬──────────┐        │
│  │ Total: 24│ New: 8   │ Work: 12 │ Done: 4  │        │
│  └──────────┴──────────┴──────────┴──────────┘        │
│                                                         │
│  🔍 Filters & Search                                   │
│  [Все] [Новые] [В работе] [Завершено]  [🔍 Search...] │
│                                                         │
│  📋 Consultations Table                                │
│  ┌─────────┬──────────┬──────────┬────────┬──────┐   │
│  │ Client  │ Contact  │ Service  │ Date   │ [▼]  │   │
│  └─────────┴──────────┴──────────┴────────┴──────┘   │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Common Tasks

### View Consultation Details
1. Find consultation in table
2. Click eye icon (👁️)
3. Modal opens with full details
4. Click "Закрыть" to close

### Change Status
**Method 1**: Dropdown in table
1. Click dropdown in "Actions" column
2. Select new status
3. Auto-saves immediately

**Method 2**: Detail modal
1. Open consultation details (👁️)
2. Click "Отметить как завершено"
3. Status changes to "Completed"

### Filter Consultations
Click filter buttons:
- **Все** - Show all consultations
- **Новые** - Show only new (not started)
- **В работе** - Show in-progress items
- **Завершено** - Show completed items

### Search
1. Type in search box
2. Searches: name, email, phone
3. Results update as you type
4. Clear box to see all

### Contact Client
From detail modal or table:
- **Phone**: Click phone number to call
- **Email**: Click email to open mail client
- **WhatsApp**: Use phone number with WhatsApp

## 🏷️ Status Guide

| Status | Badge Color | Meaning |
|--------|-------------|---------|
| Новая | 🔵 Blue | New, not started |
| В работе | 🟡 Yellow | Currently working on it |
| Завершена | 🟢 Green | Completed, closed |

## ⚡ Keyboard Shortcuts

- **Esc** - Close modal
- **Enter** - Submit search
- **Tab** - Navigate form fields

## 📱 Mobile Usage

Dashboard is mobile-responsive:
- ✅ Works on phone/tablet
- ✅ Touch-friendly buttons
- ✅ Swipe-able table (horizontal scroll)

## 🔄 Real-Time Updates

Dashboard updates automatically when:
- ✅ New consultation submitted
- ✅ Status changed by another admin
- ✅ Data modified in database

No need to refresh! 🎉

## 🚪 Logout

1. Click "Выйти" (Logout) in top-right
2. You'll be redirected to login page
3. Session ends securely

## 🔒 Security Tips

1. **Never share login credentials**
2. **Logout when done**
3. **Use strong passwords**
4. **Don't leave session unattended**
5. **Check email before granting access**

## 📊 Understanding Statistics

### Total
- All consultations ever submitted
- Includes all statuses

### New (Новые)
- Just submitted by clients
- Waiting for first response
- **Action needed!**

### In Progress (В работе)
- Currently being handled
- Follow up in progress
- Check regularly

### Completed (Завершено)
- Case closed
- Client helped
- No action needed

## 📞 Client Information Fields

| Field | Description |
|-------|-------------|
| **Имя** | Client name |
| **Телефон** | Phone number (clickable to call) |
| **Email** | Email address (clickable to email) |
| **Тип услуги** | Service type requested |
| **Сообщение** | Client's detailed message |
| **Дата создания** | When consultation was submitted |
| **Статус** | Current status |

## 🎯 Workflow Recommendations

### Daily Routine
1. Login to dashboard
2. Check "New" consultations
3. Review and assign
4. Update status to "In Progress"
5. Contact clients
6. Complete and mark "Completed"

### Priority Handling
1. **High Priority**: New consultations (blue badge)
2. **Medium Priority**: In Progress (yellow badge)
3. **Low Priority**: Completed (green badge) - for reference

## 🔍 Search Tips

Search works across:
- ✅ Client names
- ✅ Email addresses
- ✅ Phone numbers
- ✅ Partial matches

**Examples**:
- "Ivan" - finds all Ivans
- "gmail" - finds all Gmail addresses
- "999" - finds all phone numbers with 999

## 📈 Best Practices

### Response Time
- ✅ Respond to new consultations within 1 hour
- ✅ Update status when starting work
- ✅ Mark completed when done

### Communication
- ✅ Use phone for urgent matters
- ✅ Use email for documentation
- ✅ Update notes in system

### Organization
- ✅ Don't let "New" pile up
- ✅ Move to "In Progress" when working
- ✅ Complete promptly
- ✅ Use search to find old cases

## 🐛 Troubleshooting

### Can't Login
- Check email/password spelling
- Try "forgot password" (if available)
- Contact system administrator

### Dashboard Won't Load
- Check internet connection
- Try refreshing browser (F5)
- Clear browser cache
- Try different browser

### Can't See New Consultations
- Check if filter is active
- Clear search box
- Click "Все" (All) filter
- Refresh page

### Status Won't Update
- Check internet connection
- Try again in a moment
- Refresh page
- Check Supabase status

## 📞 Support

If you encounter issues:
1. Try refreshing the page
2. Check your internet connection
3. Logout and login again
4. Contact technical support
5. Check `SUPABASE_SETUP.md` for details

## 🎓 Training Checklist

New admin should be able to:
- [ ] Login successfully
- [ ] View dashboard
- [ ] Find consultation
- [ ] Open details
- [ ] Change status
- [ ] Use search
- [ ] Use filters
- [ ] Contact client
- [ ] Logout

## 💡 Pro Tips

1. **Keep browser tab open** - Get real-time updates
2. **Use filters** - Faster than scrolling
3. **Search is powerful** - Find anything quickly
4. **Update status regularly** - Keep accurate records
5. **Check "New" daily** - Don't miss requests

## ⏱️ Average Times

- **Login**: 10 seconds
- **View consultation**: 5 seconds
- **Update status**: 3 seconds
- **Search**: Instant
- **Filter**: Instant

---

## 🎉 Quick Start

**First time?**
1. Login at `/admin`
2. Click "Все" to see all
3. Click 👁️ to view details
4. Change status with dropdown
5. Use search to find anything

**That's it!** You're ready to manage consultations. 🚀

---

**Questions?** Check `SUPABASE_SETUP.md` for detailed information.
