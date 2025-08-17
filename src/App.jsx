import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { topicsData, userProfileData } from './data/mockData';

// Components
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard');
    const [activeTopic, setActiveTopic] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const { theme, setTheme } = useTheme();

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
    
    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => setIsAuthenticated(false);

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
                        <DashboardHeader name={userProfileData.name.split(' ')[0]} />
                        <LearningPathGenerator courses={topicsData} />
                        <TopicsGrid topics={filteredTopics} onSelectTopic={handleSelectTopic} />
                    </>
                );
        }
    };

    return (
        <>
            {!isAuthenticated ? (
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
                                user={userProfileData}
                                onLogout={handleLogout}
                            />
                            <main className="pt-24 pb-12 px-4 md:px-8 flex-grow">
                                {renderContent()}
                            </main>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}