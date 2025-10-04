# 🚀 Supabase Admin Panel Setup Guide

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or Email
4. Create a new project:
   - Project name: `lawyer-consultations` (or any name)
   - Database password: (generate strong password and save it!)
   - Region: Choose closest to your location
   - Wait 2-3 minutes for project creation

## Step 2: Create Database Table

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste this SQL code:

```sql
-- Create consultations table
CREATE TABLE consultations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    service_type TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert (for public form submissions)
CREATE POLICY "Allow public inserts" ON consultations
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Allow authenticated users to read all consultations
CREATE POLICY "Allow authenticated read" ON consultations
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Allow authenticated users to update consultations
CREATE POLICY "Allow authenticated update" ON consultations
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_consultations_updated_at
    BEFORE UPDATE ON consultations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

4. Click **Run** or press `Ctrl+Enter` (Cmd+Enter on Mac)
5. You should see "Success. No rows returned"

## Step 3: Get API Keys

1. In Supabase, go to **Settings** > **API** (left sidebar)
2. Copy these values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (very long string)

## Step 4: Configure Your App

1. Create a `.env` file in your project root:

```bash
cd /Users/e.onishchenko/Projects/personal/lawyer/lawyer
touch .env
```

2. Add your Supabase credentials to `.env`:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Replace the values with your actual credentials from Step 3!

## Step 5: Create Admin User

1. In Supabase, go to **Authentication** > **Users**
2. Click "Add user" > "Create new user"
3. Fill in:
   - **Email**: your-admin@email.com (use your real email)
   - **Password**: create a strong password
   - **Auto Confirm User**: ✅ Check this box
4. Click "Create user"

## Step 6: Test the Application

### Test Public Form:
1. Start your app: `npm start`
2. Go to `http://localhost:3000`
3. Fill out the consultation form and submit
4. Check Supabase **Table Editor** > **consultations** to see the new entry

### Test Admin Panel:
1. Go to `http://localhost:3000/admin`
2. Login with the email and password you created in Step 5
3. You should see the admin dashboard with your test consultation

## 🎯 Project Structure

```
src/
├── admin/
│   ├── AdminLogin.jsx          # Login page for employees
│   ├── AdminDashboard.jsx      # Main admin dashboard
│   └── ProtectedRoute.jsx      # Route protection component
├── components/
│   ├── ConsultationForm.jsx    # Updated to save to Supabase
│   └── ...other components
├── supabaseClient.js           # Supabase configuration
└── App.js                      # Updated with routing

Routes:
- / (home page)
- /admin (login page)
- /admin/dashboard (protected admin panel)
```

## 🔐 Security Notes

1. **Never commit `.env` to Git!**
   - Already added to `.gitignore`
   - Share credentials securely with team members

2. **Row Level Security (RLS) is enabled**
   - Public users can only INSERT (submit forms)
   - Only authenticated users can view/edit consultations

3. **Admin authentication required**
   - Dashboard only accessible after login
   - Auto-logout on session expiration

## 📊 Admin Dashboard Features

✅ **Statistics Dashboard**
- Total consultations
- New requests
- In progress
- Completed

✅ **Consultation Management**
- View all consultation requests
- Filter by status (new/in-progress/completed)
- Search by name, email, or phone
- Update consultation status
- View full details in modal
- Real-time updates (auto-refresh when new consultations arrive)

✅ **User Management**
- Secure login/logout
- Session management
- Protected routes

## 🔧 Additional Configuration (Optional)

### Add More Admin Users:
Go to Supabase **Authentication** > **Users** > "Add user"

### Email Notifications (Advanced):
You can set up email notifications when new consultations arrive using Supabase Edge Functions or third-party services like:
- SendGrid
- Mailgun
- AWS SES

### Export Data:
In the admin dashboard, you can:
1. View all consultations
2. Copy data manually, or
3. Extend the dashboard to add CSV export functionality

## 🐛 Troubleshooting

**Problem**: "Invalid API key"
- **Solution**: Double-check your `.env` file has correct values from Supabase

**Problem**: Can't login to admin
- **Solution**: Make sure you created a user in Supabase Authentication and checked "Auto Confirm User"

**Problem**: Form submissions not appearing in dashboard
- **Solution**: 
  1. Check browser console for errors
  2. Verify RLS policies are created
  3. Check Supabase logs in Dashboard

**Problem**: "relation 'consultations' does not exist"
- **Solution**: Run the SQL query from Step 2 again in Supabase SQL Editor

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check Supabase logs in **Logs** section
3. Verify all environment variables are set correctly
4. Ensure the SQL table was created successfully

## 🎉 You're All Set!

Your lawyer consultation system is now fully functional with:
- ✅ Public consultation form
- ✅ Supabase database storage
- ✅ Admin authentication
- ✅ Protected admin dashboard
- ✅ Real-time updates
- ✅ Status management

**Next Steps:**
1. Deploy to production (Vercel, Netlify, etc.)
2. Set up custom domain
3. Add more admin users as needed
4. Consider adding email notifications for new consultations
