# 🚀 Deployment Guide

Complete guide for deploying your lawyer consultation website to production.

## 🎯 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] Supabase is fully configured
- [ ] `.env` file is properly set up locally
- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] Admin login works
- [ ] Form submissions work
- [ ] Database is accessible
- [ ] Production build works: `npm run build`

## 📦 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Easy GitHub integration
- ✅ Fast global CDN
- ✅ Zero configuration

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /Users/e.onishchenko/Projects/personal/lawyer/lawyer
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? (your account)
   - Link to existing project? **N**
   - Project name? **lawyer-consultations**
   - Directory? **./  (press Enter)**
   - Override settings? **N**

5. **Add Environment Variables**
   ```bash
   vercel env add REACT_APP_SUPABASE_URL
   # Paste your Supabase URL
   
   vercel env add REACT_APP_SUPABASE_ANON_KEY
   # Paste your Supabase anon key
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

7. **Done!** Your site is live at: `https://lawyer-consultations.vercel.app`

---

### Option 2: Netlify

**Why Netlify?**
- ✅ Free tier available
- ✅ Drag-and-drop deployment
- ✅ Easy CI/CD
- ✅ Form handling built-in

**Steps:**

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Sign up at Netlify**
   - Go to https://netlify.com
   - Sign up with GitHub/Email

3. **Deploy via Dashboard**
   - Click "Add new site" → "Deploy manually"
   - Drag `build` folder to upload
   - Wait for deployment

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add `REACT_APP_SUPABASE_URL`
   - Add `REACT_APP_SUPABASE_ANON_KEY`
   - Save

5. **Redeploy**
   - Go to Deploys
   - Click "Trigger deploy" → "Deploy site"

6. **Done!** Your site is live

**Or Deploy via Git:**
```bash
# Connect your GitHub repo
1. New site from Git
2. Connect to GitHub
3. Select repository
4. Build command: npm run build
5. Publish directory: build
6. Add environment variables
7. Deploy
```

---

### Option 3: AWS S3 + CloudFront

**Why AWS?**
- ✅ Highly scalable
- ✅ Custom configurations
- ✅ AWS ecosystem integration

**Steps:**

1. **Build**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Go to AWS S3
   - Create bucket: `lawyer-consultations`
   - Enable static website hosting
   - Set index.html as entry

3. **Upload Build**
   - Upload entire `build` folder
   - Set public read permissions

4. **Setup CloudFront**
   - Create distribution
   - Origin: Your S3 bucket
   - Enable HTTPS
   - Custom error page: /index.html (for React Router)

5. **Add Environment Variables**
   - Use AWS Lambda@Edge or
   - Build with environment variables baked in

---

### Option 4: DigitalOcean App Platform

**Steps:**

1. **Connect GitHub**
   - Go to DigitalOcean Apps
   - Create new app
   - Connect GitHub repository

2. **Configure**
   - Build command: `npm run build`
   - Output directory: `build`
   - Add environment variables

3. **Deploy**
   - Click "Create App"
   - Wait for deployment

---

## 🔧 Environment Variables for Production

All platforms need these variables:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:**
- Never commit `.env` to Git
- Add variables in hosting platform dashboard
- Variables must start with `REACT_APP_` for Create React App

---

## 🌐 Custom Domain Setup

### Vercel

1. Go to your project dashboard
2. Settings → Domains
3. Add domain: `yoursite.com`
4. Follow DNS instructions
5. Add these records to your DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Netlify

1. Domain settings
2. Add custom domain
3. Update DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

---

## 📱 Post-Deployment Testing

After deployment, test these:

### Public Website
- [ ] Homepage loads correctly
- [ ] All sections visible
- [ ] Images load
- [ ] Forms work
- [ ] Links work
- [ ] Mobile responsive
- [ ] No console errors

### Consultation Form
- [ ] Form loads
- [ ] Can enter data
- [ ] Submit works
- [ ] Success message appears
- [ ] Data appears in Supabase

### Admin Panel
- [ ] Can access `/admin`
- [ ] Login page loads
- [ ] Can login successfully
- [ ] Dashboard loads
- [ ] Consultations visible
- [ ] Can update status
- [ ] Search works
- [ ] Filters work
- [ ] Real-time updates work

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images optimized
- [ ] No layout shifts
- [ ] Smooth animations

---

## 🔒 Security Checklist

Before going live:

- [ ] HTTPS enabled (automatic on Vercel/Netlify)
- [ ] Environment variables not exposed
- [ ] Admin route is protected
- [ ] Supabase RLS policies enabled
- [ ] Strong admin passwords
- [ ] `.env` in `.gitignore`
- [ ] No API keys in code
- [ ] CORS properly configured

---

## 📊 Monitoring Setup

### Supabase Dashboard
Monitor:
- Database size
- API requests
- Active connections
- Error rates

### Hosting Platform
Monitor:
- Page views
- Load times
- Error logs
- Build status

### Google Analytics (Optional)
Add to `public/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔄 Continuous Deployment

### Automatic Deployments (Recommended)

**Vercel with GitHub:**
1. Push code to GitHub
2. Connect repository in Vercel
3. Auto-deploys on push to `main`

**Netlify with GitHub:**
1. Push code to GitHub
2. Connect repository in Netlify
3. Auto-deploys on push to `main`

**Workflow:**
```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main
# Automatically deploys to production!
```

---

## 🐛 Troubleshooting Production Issues

### Issue: Blank page after deployment
**Solution:**
1. Check browser console for errors
2. Verify environment variables are set
3. Check build logs
4. Ensure React Router is configured correctly

### Issue: Admin login doesn't work
**Solution:**
1. Verify Supabase URL is correct
2. Check admin user exists in Supabase
3. Test Supabase connection locally first

### Issue: Form submissions not saving
**Solution:**
1. Check Supabase anon key is correct
2. Verify RLS policies allow inserts
3. Check network tab for API errors

### Issue: Images not loading
**Solution:**
1. Check image paths are correct
2. Ensure images are in `public` folder
3. Use relative paths: `/images/logo.png`

### Issue: Routing doesn't work (404 on refresh)
**Solution:**
Add to Netlify `_redirects` file:
```
/*    /index.html   200
```

Or Vercel `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📈 Performance Optimization

### Before Production:

1. **Optimize Images**
   ```bash
   # Use WebP format
   # Compress images
   # Lazy load images
   ```

2. **Code Splitting**
   Already configured in Create React App

3. **Enable Caching**
   Automatic on Vercel/Netlify

4. **Compress Assets**
   ```bash
   # Gzip enabled by default
   ```

5. **Lighthouse Audit**
   ```bash
   npm run build
   npx serve -s build
   # Run Lighthouse in Chrome DevTools
   ```

---

## 🎯 SEO Setup

Add to `public/index.html`:

```html
<!-- SEO Meta Tags -->
<meta name="description" content="Юридическая помощь военнослужащим, мобилизованным и добровольцам в Липецке">
<meta name="keywords" content="юрист, военные, помощь, Липецк, страховые выплаты">

<!-- Open Graph -->
<meta property="og:title" content="Юридическая помощь военнослужащим">
<meta property="og:description" content="Профессиональная юридическая помощь в Липецке">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://yoursite.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Юридическая помощь военнослужащим">
<meta name="twitter:description" content="Профессиональная юридическая помощь">
```

---

## 📞 Support After Deployment

### For Users
- Clear documentation on website
- Contact information visible
- FAQ section available

### For Admins
- `ADMIN_GUIDE.md` reference
- Training materials
- Support contact

### For Developers
- `README.md` documentation
- `SUPABASE_SETUP.md` guide
- Git commit history

---

## 🎉 Launch Checklist

Final checks before announcing:

- [ ] Site is live and accessible
- [ ] HTTPS is enabled
- [ ] Custom domain works (if applicable)
- [ ] All pages load correctly
- [ ] Forms work in production
- [ ] Admin panel accessible
- [ ] Test submissions received
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast loading times
- [ ] SEO meta tags added
- [ ] Analytics configured (optional)
- [ ] Monitoring set up
- [ ] Backup plan ready
- [ ] Team trained on admin panel

---

## 🚀 You're Live!

Congratulations! Your lawyer consultation website is now live. 🎉

**Next Steps:**
1. Share URL with team
2. Test with real users
3. Monitor performance
4. Collect feedback
5. Iterate and improve

**Your URLs:**
- **Public Site**: `https://yoursite.com`
- **Admin Panel**: `https://yoursite.com/admin`
- **Supabase Dashboard**: `https://app.supabase.com`

---

**Need help?** Refer to:
- `SUPABASE_SETUP.md` - Setup instructions
- `ADMIN_GUIDE.md` - Admin usage guide
- `README.md` - Project overview
- Hosting platform documentation
- Supabase documentation

Happy launching! 🚀
