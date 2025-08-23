import { useEffect, useState } from 'react';
import { AuthService } from '../../services/authService';

const AuthCallback = ({ onAuthSuccess }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Starting OAuth callback handling... (attempt:', retryCount + 1, ')');
        console.log('Current URL hash:', window.location.hash);
        console.log('Current URL search:', window.location.search);
        console.log('OAuth flow type:', window.location.search.includes('code=') ? 'Authorization Code' : 'Hash Fragment');
        
        console.log('Processing OAuth callback...');
        
        // Use the AuthService to handle the OAuth callback
        const { user, error } = await AuthService.waitForOAuthProcessing();
        
        console.log('OAuth callback result:', { user: !!user, error });
        
        if (error) {
          console.error('Auth callback error:', error);
          
          // Retry up to 2 times
          if (retryCount < 2) {
            console.log('Retrying OAuth callback...');
            setRetryCount(prev => prev + 1);
            return;
          }
          
          setError(error.message);
          setLoading(false);
          return;
        }

        if (user) {
          console.log('User authenticated successfully:', user.email);
          // Successfully authenticated, notify parent component
          onAuthSuccess();
        } else {
          // Retry up to 2 times
          if (retryCount < 2) {
            console.log('No user found, retrying...');
            setRetryCount(prev => prev + 1);
            return;
          }
          
          setError('No user found. Please try logging in again.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        
        // Retry up to 2 times
        if (retryCount < 2) {
          console.log('Error occurred, retrying...');
          setRetryCount(prev => prev + 1);
          return;
        }
        
        setError(err.message);
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [onAuthSuccess, retryCount]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-text-secondary">Completing authentication...</p>
          <p className="text-sm text-text-tertiary mt-2">
            Please wait while we set up your account...
            {retryCount > 0 && <span className="block mt-1">Retrying... (attempt {retryCount + 1}/3)</span>}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            <p className="font-semibold">Authentication Error</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
