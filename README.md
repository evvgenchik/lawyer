# 🏛️ Lawyer Consultation Website - Admin System

Modern lawyer website with integrated admin panel for managing consultation requests.

## ✨ Features

### Public Website
- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-friendly interface
- 💬 Interactive chat widget
- 📝 Consultation request form
- ⚖️ Services showcase
- 👥 Team profiles
- ❓ FAQ section
- 📊 Statistics display

### Admin Panel (NEW!)
- 🔐 Secure authentication with Supabase
- 📊 Statistics dashboard
- 📋 Consultation request management
- 🔍 Search and filter capabilities
- 🏷️ Status tracking (new/in-progress/completed)
- 🔄 Real-time updates
- 📱 Responsive admin interface

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase
Follow the detailed guide in `SUPABASE_SETUP.md` to:
- Create Supabase account
- Create database table
- Get API keys
- Configure environment variables

### 3. Configure Environment
Create a `.env` file in the project root:
```env
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server
```bash
npm start
```

Visit:
- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin`

## 📁 Project Structure

```
lawyer/
├── public/                 # Static files
├── src/
│   ├── admin/             # Admin panel components
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── components/        # Public website components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── ConsultationForm.jsx
│   │   └── ...
│   ├── supabaseClient.js  # Supabase configuration
│   ├── App.js             # Main app with routing
│   └── index.js
├── SUPABASE_SETUP.md      # Detailed setup guide
├── .env.example           # Environment variables template
└── package.json
```

## 🔑 Admin Access

### Default Route Structure:
- `/` - Public website
- `/admin` - Admin login page
- `/admin/dashboard` - Admin dashboard (requires authentication)

### Create Admin User:
1. Go to your Supabase project
2. Navigate to Authentication > Users
3. Click "Add user" > "Create new user"
4. Enter email and password
5. Check "Auto Confirm User"
6. Click "Create user"

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime

## 📊 Database Schema

```sql
consultations
├── id (uuid)
├── name (text)
├── phone (text)
├── email (text)
├── message (text)
├── service_type (text)
├── status (text) - 'new' | 'in_progress' | 'completed'
├── created_at (timestamp)
└── updated_at (timestamp)
```

## 🔒 Security

- ✅ Row Level Security (RLS) enabled
- ✅ Public can only submit forms (INSERT)
- ✅ Only authenticated users can view/edit
- ✅ Environment variables for sensitive data
- ✅ Protected admin routes
- ✅ Secure authentication flow

## 📝 Available Scripts

```bash
# Development
npm start           # Run dev server on port 3000

# Production
npm run build       # Build for production
npm test            # Run tests
```

## 🚀 Deployment

### Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - REACT_APP_SUPABASE_URL
# - REACT_APP_SUPABASE_ANON_KEY
```

### Deploy to Netlify:
```bash
# Build the app
npm run build

# Deploy build folder
# Add environment variables in Netlify dashboard
```

## 📖 Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Complete setup instructions
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

See `SUPABASE_SETUP.md` for common issues and solutions.

## 📞 Contact Information

**Business Details:**
- Phone: +7 (474) 220-07-19
- WhatsApp: +7 927 258-89-21
- Email: lipetskcentrprava@gmail.com
- Address: г. Липецк, Коммунальная площадь, 9, 1 этаж

## 📄 License

Proprietary - All rights reserved

---

**Need Help?** Check `SUPABASE_SETUP.md` for detailed setup instructions!
