# 🚀 Deployment Guide - Vercel + Supabase

## 📋 Prerequisites Checklist

- ✅ Supabase project created
- ✅ Supabase URL and anon key copied
- ✅ GitHub repository ready (already done!)
- ✅ Vercel account (free tier is fine)

## 🗄️ Step 1: Set Up Local Environment

1. **Create your local environment file:**
   ```bash
   cp .env.local.template .env.local
   ```

2. **Edit `.env.local` with your Supabase credentials:**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Test locally:**
   ```bash
   npm install
   npm run dev
   ```

## 🚀 Step 2: Deploy to Vercel

### Option A: Vercel Website (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up** with GitHub account
3. **Click "New Project"**
4. **Import your repository:**
   - Search for `edumaster-app`
   - Click "Import"
5. **Configure build settings:**
   - Framework: `Vite` (auto-detected)
   - Build command: `npm run build`
   - Output directory: `dist`
6. **Add environment variables:**
   ```
   VITE_SUPABASE_URL = https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   VITE_ENABLE_SUPABASE = true
   ```
7. **Click "Deploy"**

### Option B: Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow prompts:
# Set up and deploy? [Y/n] Y
# Link to existing project? [y/N] N
# Project name: edumaster-app
# Directory: ./
# Want to override? [y/N] N
```

## 🔧 Step 3: Configure Environment Variables in Vercel

1. **Go to your Vercel dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add these variables:**

| Name | Value | Environment |
|------|--------|-------------|
| `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key-here` | Production, Preview, Development |
| `VITE_ENABLE_SUPABASE` | `true` | Production, Preview, Development |
| `VITE_APP_NAME` | `EduMaster` | Production, Preview, Development |

## 🗃️ Step 4: Set Up Supabase Database

1. **Go to your Supabase project dashboard**
2. **Open SQL Editor**
3. **Create new query and paste schema:**
   - Copy content from `database/schema.sql`
   - Click "Run" to create all tables
4. **Create another query for sample data:**
   - Copy content from `database/seed-data.sql`
   - Click "Run" to populate with courses

## ✅ Step 5: Test Your Deployment

1. **Check Vercel deployment:**
   - Your app should be live at `https://your-app-name.vercel.app`
   - Build should complete successfully

2. **Test core features:**
   - ✅ App loads without errors
   - ✅ Courses display from Supabase
   - ✅ Authentication forms work
   - ✅ No console errors

3. **Test authentication:**
   - Try signing up with a test email
   - Check Users table in Supabase dashboard
   - User should appear in database

## 🔄 Automatic Deployments

**Every push to `main` branch automatically deploys to Vercel!**

- **Preview deployments**: Every pull request gets a preview URL
- **Production deployments**: Pushes to main branch
- **Build logs**: Available in Vercel dashboard

## 🌐 Custom Domain (Optional)

1. **Go to Vercel project settings**
2. **Domains tab**
3. **Add your custom domain**
4. **Follow DNS configuration instructions**

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Test `npm run build` locally first

### Database Connection Issues
- Verify Supabase URL and key are correct
- Check if Supabase project is active
- Test connection in browser network tab

### Authentication Not Working
- Ensure Supabase Auth is enabled
- Check Row Level Security policies
- Verify environment variables in production

## 📊 Monitoring

### Vercel Analytics
- Enable in project settings
- Monitor performance and usage
- Track deployment success rate

### Supabase Monitoring
- Dashboard → Settings → Usage
- Monitor database connections
- Track API request limits

## 🚀 Performance Optimization

Your app is already optimized with:
- ✅ Code splitting (vendor/ui chunks)
- ✅ Asset optimization
- ✅ Gzip compression
- ✅ CDN delivery via Vercel Edge Network

## 🎯 Success Metrics

After successful deployment:
- **Build time**: ~30-60 seconds
- **Page load**: <2 seconds
- **Lighthouse score**: 90+ performance
- **Database queries**: <100ms response time

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [docs.supabase.com](https://docs.supabase.com)
- **GitHub Issues**: Report problems in your repo

🎉 **Your EduMaster app will be live and production-ready!**