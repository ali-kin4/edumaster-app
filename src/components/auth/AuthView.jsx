import { useState } from 'react';
import { BookOpen, User, Mail, Lock } from 'lucide-react';

const AuthView = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
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
                                    className="w-full pl-10 pr-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-hover transition-all duration-200"
                        >
                            {isLogin ? 'Log In' : 'Create Account'}
                        </button>
                    </form>
                    
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