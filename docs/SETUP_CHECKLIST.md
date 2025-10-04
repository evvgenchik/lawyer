# ✅ Supabase Admin Setup Checklist

Use this checklist to track your setup progress. Check off each item as you complete it.

## 📋 Pre-Setup

- [ ] Project code is downloaded/cloned
- [ ] Node.js is installed (v14 or higher)
- [ ] Terminal/command line is ready
- [ ] Web browser is ready for Supabase

## 🏗️ Phase 1: Install Dependencies (5 min)

- [ ] Navigate to project folder in terminal
- [ ] Run `npm install`
- [ ] Wait for installation to complete
- [ ] No error messages appear

## ☁️ Phase 2: Supabase Account Setup (5 min)

- [ ] Go to https://supabase.com
- [ ] Sign up / Sign in
- [ ] Click "New Project"
- [ ] Enter project details:
  - [ ] Project name: `lawyer-consultations`
  - [ ] Database password: (save this!)
  - [ ] Region: (choose closest)
- [ ] Wait 2-3 minutes for project creation
- [ ] Project is ready and dashboard is visible

## 🗄️ Phase 3: Database Setup (5 min)

- [ ] In Supabase, click "SQL Editor" in left sidebar
- [ ] Click "New Query"
- [ ] Open `SUPABASE_SETUP.md` file
- [ ] Copy the entire SQL query from "Step 2"
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Run" button
- [ ] See "Success. No rows returned" message
- [ ] Verify table exists: Go to "Table Editor" → see "consultations" table

## 🔑 Phase 4: Get API Keys (2 min)

- [ ] In Supabase, go to Settings (⚙️) → API
- [ ] Find "Project URL" - copy it
- [ ] Find "anon public" key - copy it
- [ ] Keep these safe (you'll need them next)

## ⚙️ Phase 5: Configure Environment (3 min)

- [ ] In project folder, create new file named `.env`
- [ ] Open `.env` file in editor
- [ ] Add this content:
  ```
  REACT_APP_SUPABASE_URL=paste-your-project-url-here
  REACT_APP_SUPABASE_ANON_KEY=paste-your-anon-key-here
  ```
- [ ] Replace values with your actual keys from Phase 4
- [ ] Save the file
- [ ] Verify `.env` file is in project root (same level as `package.json`)

## 👤 Phase 6: Create Admin User (3 min)

- [ ] In Supabase, go to Authentication → Users
- [ ] Click "Add user" button
- [ ] Select "Create new user"
- [ ] Enter admin email address
- [ ] Enter strong password
- [ ] ✅ CHECK the "Auto Confirm User" box (IMPORTANT!)
- [ ] Click "Create user"
- [ ] User appears in the list
- [ ] Write down the email and password (you'll need them to login)

## 🧪 Phase 7: Test Setup (10 min)

### Test 1: Start Application
- [ ] In terminal, run `npm start`
- [ ] Wait for compilation
- [ ] Browser opens automatically to http://localhost:3000
- [ ] Public website loads correctly
- [ ] No console errors

### Test 2: Test Public Form
- [ ] Scroll to consultation form section
- [ ] Fill in test data:
  - [ ] Name: "Test User"
  - [ ] Phone: "+7 999 999 99 99"
  - [ ] Email: "test@test.com"
  - [ ] Message: "Test consultation request"
- [ ] Check privacy agreement
- [ ] Click submit button
- [ ] See green success message
- [ ] Form clears after submission

### Test 3: Verify in Database
- [ ] Go to Supabase → Table Editor → consultations
- [ ] See your test submission in the table
- [ ] Data matches what you submitted

### Test 4: Test Admin Login
- [ ] Navigate to http://localhost:3000/admin
- [ ] Login page loads correctly
- [ ] Enter admin email from Phase 6
- [ ] Enter admin password from Phase 6
- [ ] Click "Войти" (Login)
- [ ] Redirected to dashboard

### Test 5: Test Admin Dashboard
- [ ] Dashboard loads successfully
- [ ] See statistics cards at top (Total: 1, New: 1, etc.)
- [ ] See your test consultation in the table
- [ ] Status shows as "Новая" (New)
- [ ] Click eye icon (👁) to view details
- [ ] Modal opens with full details
- [ ] Close modal
- [ ] Change status using dropdown
- [ ] Status updates in real-time
- [ ] Try search functionality
- [ ] Try filter buttons

## 🎉 Phase 8: Final Verification

- [ ] All tests passed
- [ ] No console errors
- [ ] Form submissions work
- [ ] Admin login works
- [ ] Dashboard displays data
- [ ] Status updates work
- [ ] Search and filters work
- [ ] Real-time updates work

## 🚀 Optional: Deployment Preparation

- [ ] Create production build: `npm run build`
- [ ] Build completes successfully
- [ ] Choose hosting platform (Vercel/Netlify/etc.)
- [ ] Prepare to add environment variables on hosting
- [ ] Domain/subdomain ready (optional)

## 📝 Documentation Review

- [ ] Read `SUPABASE_SETUP.md` for detailed instructions
- [ ] Read `README.md` for project overview
- [ ] Understand database schema
- [ ] Know how to create more admin users
- [ ] Bookmark Supabase dashboard URL

## 🐛 Troubleshooting Checklist

If something doesn't work, check:

- [ ] `.env` file exists in project root
- [ ] `.env` has correct Supabase URL and key
- [ ] No extra spaces in `.env` values
- [ ] Admin user has "Auto Confirm User" checked
- [ ] SQL query was run successfully
- [ ] Table "consultations" exists in Supabase
- [ ] RLS policies were created
- [ ] Browser console for error messages
- [ ] Network tab for failed requests

## 🎯 Common Issues & Solutions

**Issue**: Can't login to admin
- ✅ **Solution**: Check user is confirmed in Supabase Authentication

**Issue**: Form doesn't submit
- ✅ **Solution**: Check `.env` file is configured correctly

**Issue**: "Table consultations does not exist"
- ✅ **Solution**: Re-run SQL query in Supabase SQL Editor

**Issue**: Environment variables not loading
- ✅ **Solution**: Restart `npm start` after creating `.env`

**Issue**: Admin dashboard is empty
- ✅ **Solution**: Submit a test consultation via the public form first

## 📊 Success Metrics

You're ready for production when:
- ✅ All checklist items are complete
- ✅ No errors in browser console
- ✅ Can submit consultations from public site
- ✅ Can login as admin
- ✅ Can view and manage consultations
- ✅ Real-time updates are working
- ✅ Search and filters work correctly

## 🎓 Next Steps After Setup

1. **Add More Admins**: Create additional admin users in Supabase
2. **Customize**: Update business info, colors, content
3. **Test Thoroughly**: Try all features multiple times
4. **Deploy**: Push to production (Vercel/Netlify)
5. **Monitor**: Check Supabase logs and usage
6. **Backup**: Supabase has automatic backups enabled

## ⏱️ Estimated Time

- **Total Setup Time**: 30-40 minutes
- **Testing Time**: 10-15 minutes
- **Total**: ~1 hour for complete setup and testing

---

## 🆘 Need Help?

If you get stuck:
1. Check `SUPABASE_SETUP.md` for detailed instructions
2. Check browser console for errors
3. Check Supabase logs in Dashboard
4. Verify all checklist items are complete
5. Try the troubleshooting section above

## ✅ Setup Complete!

Once all items are checked, your lawyer consultation system is ready to use! 🎉

**Admin URL**: http://localhost:3000/admin (or your domain/admin)

Congratulations! 🚀
