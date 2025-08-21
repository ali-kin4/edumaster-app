import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { topicsData } from './data/mockData';
import { AuthService } from './services/authService';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import AuthView from './components/auth/AuthView';
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
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const checkUser = async () => {
            const { user } = await AuthService.getUserWithProfile();
            setUser(user);
            setLoading(false);
        };

        checkUser();

        const { data: authListener } = AuthService.onAuthStateChange((_event, session) => {
            const user = session?.user;
            AuthService.getUserWithProfile().then(({ user }) => {
                setUser(user);
            });
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

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
