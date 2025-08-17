import { BookOpen, Home, LayoutGrid, Book, Users, User, Settings, TrendingUp, ChevronsLeft, ChevronsRight } from 'lucide-react';

const SidebarItem = ({ item, isActive, isCollapsed, onClick }) => (
    <li className="relative group">
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:bg-primary-hover hover:text-primary'
            } ${isCollapsed ? 'justify-center' : ''}`}
        >
            <item.icon size={20} />
            {!isCollapsed && <span className="truncate">{item.name}</span>}
        </button>
        {isCollapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {item.name}
            </div>
        )}
    </li>
);

const Sidebar = ({ 
    activeFilter, 
    onFilterChange, 
    isOpen, 
    onClose, 
    isCollapsed, 
    onToggleCollapse, 
    onNavigate 
}) => {
    const sidebarSections = [
        { 
            title: 'Main', 
            items: [
                { id: 'dashboard', name: 'Dashboard', icon: Home, action: () => onNavigate('dashboard') },
                { id: 'progress', name: 'Progress', icon: TrendingUp, action: () => onNavigate('progress') },
            ]
        },
        { 
            title: 'Topics', 
            items: [
                { id: 'all', name: 'All Topics', icon: LayoutGrid, category: 'all' },
                { id: 'microsoft', name: 'Microsoft Office', icon: Book, category: 'microsoft' },
                { id: 'google', name: 'Google Workspace', icon: Users, category: 'google' },
            ]
        },
        { 
            title: 'Account', 
            items: [
                { id: 'profile', name: 'Profile', icon: User, action: () => onNavigate('profile') },
                { id: 'settings', name: 'Settings', icon: Settings, action: () => onNavigate('settings') },
            ]
        }
    ];

    return (
        <>
            <aside className={`fixed top-0 left-0 h-screen bg-card border-r border-border z-40 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${isCollapsed ? 'md:w-20' : 'md:w-72'}`}>
                <button 
                    onClick={() => onNavigate('dashboard')} 
                    className="h-16 flex items-center justify-center border-b border-border flex-shrink-0"
                >
                    <BookOpen className="text-primary" size={28} />
                    {!isCollapsed && (
                        <h1 className="ml-2 text-xl font-bold text-text-primary">EduMaster</h1>
                    )}
                </button>
                
                <div className="flex-grow overflow-y-auto overflow-x-hidden p-4">
                    {sidebarSections.map(section => (
                        <div key={section.title} className="mb-6">
                            {!isCollapsed && (
                                <h3 className="px-3 text-xs font-bold text-text-tertiary uppercase tracking-wider mb-2">
                                    {section.title}
                                </h3>
                            )}
                            <ul className="space-y-1">
                                {section.items.map(item => (
                                    <SidebarItem
                                        key={item.id}
                                        item={item}
                                        isActive={activeFilter === item.category}
                                        isCollapsed={isCollapsed}
                                        onClick={item.action || (() => onFilterChange(item.category))}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
                <div className="p-4 border-t border-border mt-auto">
                    <button 
                        onClick={onToggleCollapse} 
                        className="w-full hidden md:flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-background transition-colors duration-200"
                    >
                        {isCollapsed ? (
                            <ChevronsRight size={20} className="mx-auto"/>
                        ) : (
                            <>
                                <ChevronsLeft size={20} />
                                <span>Collapse</span>
                            </>
                        )}
                    </button>
                </div>
            </aside>
            {isOpen && (
                <div 
                    onClick={onClose} 
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                ></div>
            )}
        </>
    );
};

export default Sidebar;