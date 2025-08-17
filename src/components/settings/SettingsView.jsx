import { useState } from 'react';
import { User, Monitor, Bell, Shield } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import AppearanceSettings from './AppearanceSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';

const SettingsView = ({ theme, onThemeChange }) => {
    const [activeTab, setActiveTab] = useState('profile');
    
    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'appearance', name: 'Appearance', icon: Monitor },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'security', name: 'Security', icon: Shield },
    ];
    
    return (
        <div className="animate-fade-in-up space-y-6">
            <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
            
            <div className="bg-card rounded-2xl shadow-lg p-6">
                <div className="border-b border-border mb-6">
                    <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id} 
                                onClick={() => setActiveTab(tab.id)} 
                                className={`${
                                    activeTab === tab.id 
                                        ? 'border-primary text-primary' 
                                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                                } flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm capitalize transition-all duration-200`}
                            >
                                <tab.icon size={16} /> {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div>
                    {activeTab === 'profile' && <ProfileSettings />}
                    {activeTab === 'appearance' && <AppearanceSettings theme={theme} onThemeChange={onThemeChange} />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                    {activeTab === 'security' && <SecuritySettings />}
                </div>
            </div>
        </div>
    );
};

export default SettingsView;