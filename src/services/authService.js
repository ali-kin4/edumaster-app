import { supabase } from '../lib/supabase';

/**
 * Authentication service for handling user signup, login, and session management
 */
export class AuthService {
  /**
   * Sign up a new user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} fullName - User's full name
   * @returns {Promise<{user: object, error: object}>}
   */
  static async signUp(email, password, fullName) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      // Create user profile in our users table
      if (data.user && !error) {
        await this.createUserProfile(data.user.id, {
          email: data.user.email,
          full_name: fullName,
        });
      }

      return { user: data.user, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error };
    }
  }

  /**
   * Sign in existing user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<{user: object, error: object}>}
   */
  static async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { user: data.user, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error };
    }
  }

  /**
   * Sign out current user
   * @returns {Promise<{error: object}>}
   */
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  }

  /**
   * Get current user session
   * @returns {Promise<{user: object, session: object}>}
   */
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      return { user, error: null };
    } catch (error) {
      console.error('Get current user error:', error);
      return { user: null, error };
    }
  }

  /**
   * Listen to auth state changes
   * @param {Function} callback - Callback function to handle auth state changes
   * @returns {Function} Unsubscribe function
   */
  static onAuthStateChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
  }

  /**
   * Create user profile in database
   * @param {string} userId - User's UUID
   * @param {object} profileData - Profile data
   * @returns {Promise<{data: object, error: object}>}
   */
  static async createUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            id: userId,
            ...profileData,
            created_at: new Date().toISOString(),
            weekly_goal: 8, // Default 8 hours per week
            learning_streak: 0,
          }
        ]);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Create user profile error:', error);
      return { data: null, error };
    }
  }

  /**
   * Update user profile
   * @param {string} userId - User's UUID
   * @param {object} updates - Profile updates
   * @returns {Promise<{data: object, error: object}>}
   */
  static async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Update user profile error:', error);
      return { data: null, error };
    }
  }

  /**
   * Get user profile data
   * @param {string} userId - User's UUID
   * @returns {Promise<{data: object, error: object}>}
   */
  static async getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Get user profile error:', error);
      return { data: null, error };
    }
  }
}