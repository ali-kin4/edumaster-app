
  /**
   * Sign in with Google
   * @returns {Promise<{user: object, session: object, error: object}>}
   */
  static async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;

      return { user: data.user, session: data.session, error: null };
    } catch (error) {
      console.error('Sign in with Google error:', error);
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
