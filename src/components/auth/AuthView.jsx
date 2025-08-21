import { useState } from 'react';
import { BookOpen, User, Mail, Lock } from 'lucide-react';
import { AuthService } from '../../services/authService';

const AuthView = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (isLogin) {
            const { error } = await AuthService.signIn(email, password);
            if (error) {
                setError(error.message);
            } else {
                onLogin();
            }
        } else {
            const { error } = await AuthService.signUp(email, password, fullName);
            if (error) {
                setError(error.message);
            } else {
                onLogin();
            }
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        const { error } = await AuthService.signInWithGoogle();
        if (error) {
            setError(error.message);
        } else {
            onLogin();
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <BookOpen className="text-primary mx-auto" size={40} />
                    <h1 className="text-3xl font-bold text-text-primary mt-2">EduMaster Pro</h1>
                    <p className="text-text-secondary">
                        Welcome! Please {isLogin ? 'log in' : 'sign up'} to continue.
                    </p>
                </div>
                
                <div className="bg-card p-8 rounded-2xl shadow-2xl">
                    {error && <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label className="text-sm font-medium text-text-secondary">
                                    Full Name
                                </label>
                                <div className="relative mt-1">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18}/>
                                    <input 
                                        type="text" 
                                        placeholder="Alex Doe" 
                                        required 
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                    />
                                </div>
                            </div>
                        )}
                        
                        <div>
                            <label className="text-sm font-medium text-text-secondary">
                                Email Address
                            </label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18}/>
                                <input 
                                    type="email" 
                                    placeholder="alex.doe@example.com" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-text-secondary">
                                Password
                            </label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18}/>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-hover transition-all duration-200"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : (isLogin ? 'Log In' : 'Create Account')}
                        </button>
                    </form>
                    
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-card px-2 text-text-secondary">Or continue with</span>
                        </div>
                    </div>

                    <div>
                        <button 
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center px-6 py-3 border border-border text-text-secondary font-semibold rounded-lg shadow-sm hover:bg-input transition-all duration-200"
                            disabled={loading}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20c0-1.341-0.138-2.65-0.389-3.917z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.657-3.356-11.303-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.02,35.636,44,30.138,44,24C44,22.659,43.862,21.34,43.611,20.083z" />
                            </svg>
                            Google
                        </button>
                    </div>
                    
                    <p className="text-center text-sm text-text-secondary mt-6">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button 
                            onClick={() => setIsLogin(!isLogin)} 
                            className="font-semibold text-primary hover:underline ml-1"
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthView;
