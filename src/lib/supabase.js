import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database table names
export const TABLES = {
  USERS: 'users',
  COURSES: 'courses',
  LESSONS: 'lessons',
  USER_PROGRESS: 'user_progress',
  USER_ACHIEVEMENTS: 'user_achievements',
  FLASHCARDS: 'flashcards',
  QUIZZES: 'quizzes',
  QUIZ_QUESTIONS: 'quiz_questions',
  USER_QUIZ_RESULTS: 'user_quiz_results',
  ASSIGNMENTS: 'assignments',
  USER_ASSIGNMENTS: 'user_assignments'
};