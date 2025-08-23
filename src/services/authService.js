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
            role: 'student',
          }
        }
      });

      if (error) throw error;

      // Create user profile in our users table
      if (data.user && !error) {
        await this.createUserProfile(data.user.id, {
          email: data.user.email,
          full_name: fullName,
          role: 'student',
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

  /**
   * Sign in with Google
   * @returns {Promise<{user: object, session: object, error: object}>}
   */
  static async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) throw error;

      return { user: data.user, session: data.session, error: null };
    } catch (error) {
      console.error('Sign in with Google error:', error);
      return { user: null, session: null, error };
    }
  }

  /**
   * Check if OAuth callback has completed and user is authenticated
   * @returns {Promise<{user: object, error: object}>}
   */
  static async checkOAuthCompletion() {
    try {
      // Wait a bit for Supabase to process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if we have a session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        return { user: null, error: sessionError };
      }
      
      if (session?.user) {
        return { user: session.user, error: null };
      }
      
      // Check if we have a user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return { user: null, error: new Error('No authenticated user found') };
      }
      
      return { user, error: null };
      
    } catch (error) {
      return { user: null, error };
    }
  }

  /**
   * Manually process OAuth callback from current URL
   * @returns {Promise<{user: object, session: object, error: object}>}
   */
  static async processOAuthCallback() {
    try {
      console.log('AuthService: Manually processing OAuth callback...');
      
      // Check if we have OAuth parameters
      if (!this.isOAuthCallback()) {
        return { user: null, session: null, error: new Error('No OAuth callback parameters found') };
      }
      
      // Wait a bit for Supabase to process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Try to get the session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('AuthService: Session error:', sessionError);
        throw sessionError;
      }
      
      if (session?.user) {
        console.log('AuthService: User found in session:', session.user.email);
        return { user: session.user, session, error: null };
      }
      
      // Try to get user directly
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('No user found after OAuth callback');
      }
      
      console.log('AuthService: User found directly:', user.email);
      return { user, session: null, error: null };
      
    } catch (error) {
      console.error('AuthService: Error processing OAuth callback:', error);
      return { user: null, session: null, error };
    }
  }

  /**
   * Clear OAuth callback parameters from URL
   */
  static clearOAuthCallback() {
    // Remove hash parameters
    if (window.location.hash.includes('access_token') || window.location.hash.includes('refresh_token')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Remove search parameters
    if (window.location.search.includes('code=')) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }

  /**
   * Check if current URL contains OAuth callback parameters
   * @returns {boolean}
   */
  static isOAuthCallback() {
    return window.location.hash.includes('access_token') || 
           window.location.hash.includes('refresh_token') ||
           window.location.search.includes('code=');
  }

  /**
   * Handle OAuth callback and get user session
   * @returns {Promise<{user: object, session: object, error: object}>}
   */
  static async handleOAuthCallback() {
    try {
      console.log('AuthService: Starting OAuth callback handling...');
      
      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      console.log('AuthService: Session check result:', { 
        hasSession: !!session, 
        hasUser: !!session?.user, 
        error: sessionError?.message 
      });
      
      if (sessionError) throw sessionError;

      if (session?.user) {
        console.log('AuthService: User found in session:', session.user.email);
        
        // Create user profile if it doesn't exist
        try {
          await this.createUserProfile(session.user.id, {
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User',
            role: 'student',
          });
          console.log('AuthService: User profile created/updated successfully');
        } catch (profileError) {
          // Profile might already exist, which is fine
          console.log('AuthService: Profile creation skipped:', profileError.message);
        }

        return { user: session.user, session, error: null };
      }

      console.log('AuthService: No session, trying to get user directly...');
      
      // Try to get user directly
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      console.log('AuthService: Direct user check result:', { 
        hasUser: !!user, 
        error: userError?.message 
      });
      
      if (userError || !user) {
        return { user: null, session: null, error: new Error('No user found') };
      }

      console.log('AuthService: User found directly:', user.email);
      
      // Create user profile if it doesn't exist
      try {
        await this.createUserProfile(user.id, {
          email: user.email,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
          role: 'student',
        });
        console.log('AuthService: User profile created/updated successfully');
      } catch (profileError) {
        // Profile might already exist, which is fine
        console.log('AuthService: Profile creation skipped:', profileError.message);
      }

      return { user, session: null, error: null };
    } catch (error) {
      console.error('AuthService: OAuth callback error:', error);
      return { user: null, session: null, error };
    }
  }

  /**
   * Get current user with profile
   * @returns {Promise<{user: object, error: object}>}
   */
  static async getUserWithProfile() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (!user) return { user: null, error: null };

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      return { user: { ...user, profile }, error: null };
    } catch (error) {
      console.error('Get user with profile error:', error);
      return { user: null, error };
    }
  }
}