import { supabase, TABLES } from '../lib/supabase';

/**
 * Course service for handling course data operations
 */
export class CourseService {
  /**
   * Get all published courses
   * @returns {Promise<{data: Array, error: object}>}
   */
  static async getAllCourses() {
    try {
      const { data, error } = await supabase
        .from(TABLES.COURSES)
        .select('*')
        .eq('is_published', true)
        .order('title');

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      console.error('Get all courses error:', error);
      return { data: [], error };
    }
  }

  /**
   * Get courses by category
   * @param {string} category - Course category
   * @returns {Promise<{data: Array, error: object}>}
   */
  static async getCoursesByCategory(category) {
    try {
      const { data, error } = await supabase
        .from(TABLES.COURSES)
        .select('*')
        .eq('category', category)
        .eq('is_published', true)
        .order('title');

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      console.error('Get courses by category error:', error);
      return { data: [], error };
    }
  }

  /**
   * Get course with lessons and content
   * @param {string} courseId - Course UUID
   * @returns {Promise<{data: object, error: object}>}
   */
  static async getCourseContent(courseId) {
    try {
      // Get course details
      const { data: course, error: courseError } = await supabase
        .from(TABLES.COURSES)
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;

      // Get lessons
      const { data: lessons, error: lessonsError } = await supabase
        .from(TABLES.LESSONS)
        .select('*')
        .eq('course_id', courseId)
        .eq('is_published', true)
        .order('order_index');

      if (lessonsError) throw lessonsError;

      // Get flashcards
      const { data: flashcards, error: flashcardsError } = await supabase
        .from(TABLES.FLASHCARDS)
        .select('*')
        .eq('course_id', courseId)
        .order('order_index');

      if (flashcardsError) throw flashcardsError;

      // Get quizzes with questions
      const { data: quizzes, error: quizzesError } = await supabase
        .from(TABLES.QUIZZES)
        .select(`
          *,
          quiz_questions (*)
        `)
        .eq('course_id', courseId);

      if (quizzesError) throw quizzesError;

      // Get assignments
      const { data: assignments, error: assignmentsError } = await supabase
        .from(TABLES.ASSIGNMENTS)
        .select('*')
        .eq('course_id', courseId);

      if (assignmentsError) throw assignmentsError;

      const courseContent = {
        ...course,
        lessons: lessons || [],
        flashcards: flashcards || [],
        quizzes: quizzes || [],
        assignments: assignments || []
      };

      return { data: courseContent, error: null };
    } catch (error) {
      console.error('Get course content error:', error);
      return { data: null, error };
    }
  }

  /**
   * Search courses by title or description
   * @param {string} searchTerm - Search term
   * @returns {Promise<{data: Array, error: object}>}
   */
  static async searchCourses(searchTerm) {
    try {
      const { data, error } = await supabase
        .from(TABLES.COURSES)
        .select('*')
        .eq('is_published', true)
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('title');

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      console.error('Search courses error:', error);
      return { data: [], error };
    }
  }

  /**
   * Get user progress for a course
   * @param {string} userId - User UUID
   * @param {string} courseId - Course UUID
   * @returns {Promise<{data: object, error: object}>}
   */
  static async getUserCourseProgress(userId, courseId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USER_PROGRESS)
        .select(`
          *,
          lessons (title, duration_minutes)
        `)
        .eq('user_id', userId)
        .eq('course_id', courseId);

      if (error) throw error;

      // Calculate overall progress
      const progress = data || [];
      const totalLessons = progress.length;
      const completedLessons = progress.filter(p => p.completed).length;
      const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return { 
        data: {
          lessons: progress,
          overall_progress: overallProgress,
          completed_lessons: completedLessons,
          total_lessons: totalLessons
        }, 
        error: null 
      };
    } catch (error) {
      console.error('Get user course progress error:', error);
      return { data: null, error };
    }
  }

  /**
   * Update lesson progress
   * @param {string} userId - User UUID
   * @param {string} lessonId - Lesson UUID
   * @param {object} progressData - Progress data
   * @returns {Promise<{data: object, error: object}>}
   */
  static async updateLessonProgress(userId, lessonId, progressData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USER_PROGRESS)
        .upsert([
          {
            user_id: userId,
            lesson_id: lessonId,
            ...progressData,
            last_accessed: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Update lesson progress error:', error);
      return { data: null, error };
    }
  }
}