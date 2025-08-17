# 🗄️ Supabase Database Setup Guide

This guide will help you set up Supabase as the backend database for your EduMaster application.

## 📋 Prerequisites

- A Supabase account (free tier available)
- Basic understanding of SQL
- Your EduMaster project setup locally

## 🚀 Step 1: Create Supabase Project

1. **Sign up/Login to Supabase**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account or login

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     - **Name**: `edumaster-app`
     - **Database Password**: Choose a strong password
     - **Region**: Select closest to your users
   - Click "Create new project"

3. **Wait for Setup**
   - Project creation takes 1-2 minutes
   - Note down your project URL and keys

## 🔑 Step 2: Get Your API Keys

1. **Navigate to Settings**
   - Go to `Settings` → `API` in your Supabase dashboard

2. **Copy Your Credentials**
   ```bash
   Project URL: https://your-project-id.supabase.co
   anon public key: your-anon-key-here
   service_role key: your-service-role-key (keep secret!)
   ```

## ⚙️ Step 3: Configure Environment Variables

1. **Create Local Environment File**
   ```bash
   cp .env.example .env
   ```

2. **Update .env File**
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   
   # Other configurations...
   VITE_ENABLE_SUPABASE=true
   ```

## 🗃️ Step 4: Create Database Schema

1. **Open SQL Editor**
   - Go to `SQL Editor` in your Supabase dashboard
   - Click "New query"

2. **Run Schema Script**
   - Copy the contents of `database/schema.sql`
   - Paste into the SQL editor
   - Click "Run" to execute

3. **Verify Tables Created**
   - Go to `Table Editor`
   - You should see all tables: users, courses, lessons, etc.

## 📊 Step 5: Populate with Sample Data

1. **Run Seed Data Script**
   - In SQL Editor, create another new query
   - Copy contents of `database/seed-data.sql`
   - Click "Run" to populate with sample courses

2. **Verify Data**
   - Check `courses` table - should have 18 sample courses
   - Check `lessons` table - should have sample lessons
   - Check `flashcards` table - should have sample flashcards

## 🔐 Step 6: Configure Authentication

1. **Enable Email Auth**
   - Go to `Authentication` → `Settings`
   - Under "Auth Providers", ensure Email is enabled
   - Configure email templates if desired

2. **Set Up RLS Policies**
   - The schema already includes Row Level Security
   - Users can only access their own data
   - Courses and lessons are publicly readable

## 🧪 Step 7: Test Integration

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Test Authentication**
   - Try signing up with a new account
   - Check `Authentication` → `Users` in Supabase
   - New user should appear

4. **Test Database Operations**
   - View courses (should load from Supabase)
   - Create progress entries
   - Check data in `Table Editor`

## 📋 Database Schema Overview

### Core Tables

- **`users`** - User profiles and stats
- **`courses`** - Course catalog
- **`lessons`** - Individual lessons within courses
- **`user_progress`** - User learning progress
- **`user_achievements`** - User badges and achievements

### Learning Content

- **`flashcards`** - Study flashcards for courses
- **`quizzes`** - Quiz definitions
- **`quiz_questions`** - Individual quiz questions
- **`user_quiz_results`** - User quiz scores
- **`assignments`** - Course assignments
- **`user_assignments`** - User assignment submissions

### Analytics

- **`user_daily_activity`** - Daily learning tracking

## 🔧 Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution**: Make sure your `.env` file has the correct Supabase URL and keys.

### Issue: Authentication not working
**Solution**: 
1. Check if email auth is enabled in Supabase
2. Verify your anon key is correct
3. Check browser console for errors

### Issue: RLS (Row Level Security) blocking queries
**Solution**: 
1. Make sure you're authenticated
2. Check RLS policies in `Authentication` → `Policies`
3. Verify user has proper permissions

### Issue: Tables not found
**Solution**: 
1. Re-run the schema.sql script
2. Check if tables were created in `Table Editor`
3. Verify you're using the correct project

## 🚀 Production Deployment

### Environment Variables for Production

Set these in your hosting platform (Vercel, Netlify, etc.):

```env
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key
VITE_ENABLE_SUPABASE=true
```

### Security Checklist

- ✅ RLS enabled on all user tables
- ✅ Anon key used (never service_role in frontend)
- ✅ Environment variables secured
- ✅ Auth policies tested
- ✅ No sensitive data in public tables

## 📊 Monitoring & Analytics

1. **Database Monitoring**
   - Go to `Settings` → `Database`
   - Monitor connection limits and usage

2. **API Usage**
   - Check `Settings` → `Usage`
   - Monitor API requests and storage

3. **Real-time Features**
   - Tables are set up for real-time subscriptions
   - Progress updates reflect immediately

## 🆘 Support & Resources

- **Supabase Docs**: [docs.supabase.com](https://docs.supabase.com)
- **Community**: [github.com/supabase/supabase](https://github.com/supabase/supabase)
- **Discord**: [discord.supabase.com](https://discord.supabase.com)

## 🎯 Next Steps

After successful setup:

1. ✅ Replace mock data with real Supabase queries
2. ✅ Implement real user authentication
3. ✅ Add progress persistence
4. ✅ Set up real-time features
5. ✅ Add data analytics and reporting

Your EduMaster app is now powered by a production-ready Supabase database! 🎉