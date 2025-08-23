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
      // Determine the correct redirect URL based on environment
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const redirectUrl = isDevelopment 
        ? window.location.origin 
        : 'https://edumaster-app.vercel.app';

      console.log('AuthService: Google sign-in redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            hd: 'gmail.com', // Optional: restrict to specific domain
          },
          // Custom branding
          branding: {
            name: 'EduMaster Pro',
            logo: 'https://edumaster-app.vercel.app/favicon.svg'
          }
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
   * Wait for Supabase to process OAuth callback and exchange authorization code
   * @returns {Promise<{user: object, error: object}>}
   */
  static async waitForOAuthProcessing() {
    try {
      console.log('AuthService: Waiting for OAuth processing...');
      console.log('AuthService: Current URL:', window.location.href);
      console.log('AuthService: Environment:', window.location.hostname === 'localhost' ? 'Development' : 'Production');
      
      // Check if we have an authorization code
      const hasAuthCode = window.location.search.includes('code=');
      
      if (hasAuthCode) {
        console.log('AuthService: Authorization code detected, waiting for token exchange...');
        
        // Wait for Supabase to exchange the code for tokens
        // This can take a few seconds
        for (let attempt = 1; attempt <= 5; attempt++) {
          console.log(`AuthService: Attempt ${attempt}/5 to get user session...`);
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError) {
              console.error('AuthService: Session error on attempt', attempt, ':', sessionError);
              continue;
            }
            
            if (session?.user) {
              console.log('AuthService: User session found on attempt', attempt);
              return { user: session.user, error: null };
            }
            
            // Try to get user directly
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            
            if (!userError && user) {
              console.log('AuthService: User found directly on attempt', attempt);
              return { user, error: null };
            }
          } catch (attemptError) {
            console.error('AuthService: Error on attempt', attempt, ':', attemptError);
            continue;
          }
        }
        
        throw new Error('OAuth processing timeout - no user session found after 5 attempts');
      }
      
      // For hash-based flow, use shorter wait
      console.log('AuthService: Hash-based flow detected, waiting...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (session?.user) {
          return { user: session.user, error: null };
        }
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          throw new Error('No authenticated user found');
        }
        
        return { user, error: null };
      } catch (flowError) {
        console.error('AuthService: Hash flow error:', flowError);
        throw flowError;
      }
      
    } catch (error) {
      console.error('AuthService: Error waiting for OAuth processing:', error);
      return { user: null, error };
    }
  }

  /**
   * Check if OAuth callback has completed and user is authenticated
   * @returns {Promise<{user: object, error: object}>}
   */
  static async checkOAuthCompletion() {
    try {
      console.log('AuthService: Checking OAuth completion...');
      console.log('AuthService: Current URL search:', window.location.search);
      console.log('AuthService: Current URL hash:', window.location.hash);
      
      // Wait longer for authorization code flow to complete
      const waitTime = window.location.search.includes('code=') ? 3000 : 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      // Check if we have a session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('AuthService: Session error:', sessionError);
        return { user: null, error: sessionError };
      }
      
      if (session?.user) {
        console.log('AuthService: User found in session:', session.user.email);
        return { user: session.user, error: null };
      }
      
      // Check if we have a user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        return { user: null, error: new Error('No authenticated user found') };
      }
      
      console.log('AuthService: User found directly:', user.email);
      return { user, error: null };
      
    } catch (error) {
      console.error('AuthService: Error checking OAuth completion:', error);
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
      console.log('AuthService: Current URL search:', window.location.search);
      console.log('AuthService: Current URL hash:', window.location.hash);
      
      // Check if we have OAuth parameters
      if (!this.isOAuthCallback()) {
        return { user: null, session: null, error: new Error('No OAuth callback parameters found') };
      }
      
      // Wait longer for authorization code flow to complete
      const waitTime = window.location.search.includes('code=') ? 4000 : 2000;
      console.log(`AuthService: Waiting ${waitTime}ms for OAuth processing...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
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
    
    // Remove search parameters (code, state, etc.)
    if (window.location.search.includes('code=') || window.location.search.includes('state=')) {
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
           window.location.search.includes('code=') ||
           window.location.search.includes('state=');
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