import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { topicsData } from './data/mockData';
import { AuthService } from './services/authService';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import AuthView from './components/auth/AuthView';
import AuthCallback from './components/auth/AuthCallback';
import ContentView from './components/course/ContentView';
import ProfileView from './components/profile/ProfileView';
import ProgressView from './components/profile/ProgressView';
import SettingsView from './components/settings/SettingsView';
import UpgradeView from './components/settings/UpgradeView';
import DashboardHeader from './components/dashboard/DashboardHeader';
import LearningPathGenerator from './components/dashboard/LearningPathGenerator';
import TopicsGrid from './components/dashboard/TopicsGrid';

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState('dashboard');
    const [activeTopic, setActiveTopic] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isAuthCallback, setIsAuthCallback] = useState(false);
    const [error, setError] = useState(null);
    const [errorDetails, setErrorDetails] = useState(null);
    const { theme, setTheme } = useTheme();

    // Global error handler
    useEffect(() => {
        const handleError = (event) => {
            console.error('App: Global error caught:', event.error);
            setError('An unexpected error occurred');
            setErrorDetails(event.error);
        };

        const handleUnhandledRejection = (event) => {
            console.error('App: Unhandled promise rejection:', event.reason);
            setError('An unexpected error occurred');
            setErrorDetails(event.reason);
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    useEffect(() => {
        // Debug OAuth state
        const debugInfo = AuthService.debugOAuthState();
        
        // Check if we're in an auth callback
        const isCallback = window.location.pathname === '/auth/callback' || 
                          AuthService.isOAuthCallback();
        
        console.log('App: Checking auth callback state:', {
            pathname: window.location.pathname,
            hash: window.location.hash,
            search: window.location.search,
            isCallback,
            isOAuthCallback: AuthService.isOAuthCallback(),
            currentUrl: window.location.href,
            debugInfo
        });
        
        if (isCallback) {
            console.log('App: Setting auth callback mode');
            setIsAuthCallback(true);
            setLoading(false);
            return;
        }

        const checkUser = async () => {
            try {
                const { user } = await AuthService.getUserWithProfile();
                setUser(user);
                setLoading(false);
            } catch (error) {
                console.error('App: Error checking user:', error);
                setLoading(false);
            }
        };

        checkUser();

        const { data: authListener } = AuthService.onAuthStateChange((_event, session) => {
            const user = session?.user;
            AuthService.getUserWithProfile().then(({ user }) => {
                setUser(user);
            }).catch(error => {
                console.error('App: Error in auth state change:', error);
            });
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    const handleAuthSuccess = async () => {
        try {
            console.log('App: Handling auth success...');
            const { user, error } = await AuthService.waitForOAuthProcessing();
            if (error) {
                console.error('Error handling auth success:', error);
                return;
            }
            console.log('App: Auth success, setting user:', user.email);
            setUser(user);
            setIsAuthCallback(false);
            // Clear the OAuth callback parameters from URL
            AuthService.clearOAuthCallback();
            console.log('App: Auth callback completed successfully');
        } catch (error) {
            console.error('Error handling auth success:', error);
        }
    };

    const filteredTopics = topicsData
        .filter(topic => activeFilter === 'all' || topic.category === activeFilter)
        .filter(topic => topic.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelectTopic = (topicId) => {
        setActiveTopic(topicId);
        setCurrentView('content');
        window.scrollTo(0, 0);
    };

    const handleBackToDashboard = () => {
        setActiveTopic(null);
        setCurrentView('dashboard');
    };
    
    const handleNavigation = (view) => {
        if (view === 'dashboard') {
            setActiveTopic(null);
        }
        setCurrentView(view);
        window.scrollTo(0, 0);
    };
    
    const handleFilterChange = (filter) => {
        setSearchTerm('');
        setActiveFilter(filter);
        setCurrentView('dashboard');
    };
    
    const handleLogin = async () => {
        const { user } = await AuthService.getUserWithProfile();
        setUser(user);
    };
    
    const handleLogout = async () => {
        await AuthService.signOut();
        setUser(null);
    };

    const renderContent = () => {
        switch (currentView) {
            case 'content':
                return <ContentView topicId={activeTopic} onBack={handleBackToDashboard} />;
            case 'profile':
                return <ProfileView onLogout={handleLogout} />;
            case 'progress':
                return <ProgressView />;
            case 'settings':
                return <SettingsView theme={theme} onThemeChange={setTheme} />;
            case 'upgrade':
                return <UpgradeView />;
            case 'dashboard':
            default:
                return (
                    <>
                        <DashboardHeader name={user?.profile?.full_name.split(' ')[0] || 'Guest'} />
                        <LearningPathGenerator courses={topicsData} />
                        <TopicsGrid topics={filteredTopics} onSelectTopic={handleSelectTopic} />
                    </>
                );
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    // Show error if OAuth callback failed
    if (error) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
                        <p className="font-semibold">Authentication Error</p>
                        <p>{error}</p>
                    </div>
                    
                    {errorDetails && (
                        <details className="mt-4 text-left max-w-md mx-auto">
                            <summary className="cursor-pointer text-text-tertiary">Error Details</summary>
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                                {errorDetails.toString()}
                            </pre>
                        </details>
                    )}
                    
                    <div className="space-y-3 mt-4">
                        <button 
                            onClick={() => {
                                setError(null);
                                setErrorDetails(null);
                                setIsAuthCallback(false);
                            }}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                        >
                            Try Again
                        </button>
                        
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors ml-2"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Handle auth callback
    if (isAuthCallback) {
        return (
            <ErrorBoundary fallbackMessage="Sorry, the authentication callback encountered an error. Please try logging in again.">
                <AuthCallback onAuthSuccess={handleAuthSuccess} onError={(error) => {
                    console.error('App: Auth callback error:', error);
                    setError(error);
                    setIsAuthCallback(false);
                }} />
            </ErrorBoundary>
        );
    }

    return (
        <ErrorBoundary fallbackMessage="Sorry, the EduMaster app encountered an unexpected error. Please refresh the page to try again.">
            {!user ? (
                <AuthView onLogin={handleLogin} />
            ) : (
                <div className="bg-background min-h-screen font-sans">
                    <div className="flex">
                        <Sidebar 
                            activeFilter={activeFilter} 
                            onFilterChange={handleFilterChange} 
                            isOpen={isSidebarOpen} 
                            onClose={() => setIsSidebarOpen(false)}
                            isCollapsed={isSidebarCollapsed}
                            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                            onNavigate={handleNavigation}
                        />
                        <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-72'}`}>
                            <Header 
                                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
                                onNavigate={handleNavigation}
                                showSearch={currentView === 'dashboard'}
                                searchTerm={searchTerm}
                                onSearchChange={(e) => setSearchTerm(e.target.value)}
                                isSidebarCollapsed={isSidebarCollapsed}
                                user={user.profile}
                                onLogout={handleLogout}
                            />
                            <main className="pt-24 pb-12 px-4 md:px-8 flex-grow">
                                <ErrorBoundary fallbackMessage="Something went wrong in this section. Please try refreshing the page.">
                                    {renderContent()}
                                </ErrorBoundary>
                            </main>
                        </div>
                    </div>
                </div>
            )}
        </ErrorBoundary>
    );
}
