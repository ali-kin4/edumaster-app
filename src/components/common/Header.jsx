import { Menu, Search, User, TrendingUp, Lock, ChevronDown } from 'lucide-react';

const Header = ({ 
    onToggleSidebar, 
    onNavigate, 
    showSearch, 
    searchTerm, 
    onSearchChange, 
    isSidebarCollapsed, 
    user, 
    onLogout 
}) => (
    <header className={`fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-xl shadow-sm z-30 flex items-center px-4 md:px-6 transition-all duration-300 ${isSidebarCollapsed ? 'md:left-20' : 'md:left-72'}`}>
        <div className="flex items-center w-full">
            <button 
                onClick={onToggleSidebar} 
                className="md:hidden mr-4 text-text-secondary hover:text-primary"
            >
                <Menu size={24} />
            </button>
            
            {showSearch && (
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18}/>
                    <input 
                        type="text" 
                        placeholder="Search courses..." 
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="w-full pl-10 pr-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-text-primary"
                    />
                </div>
            )}

            <div className="ml-auto flex items-center gap-4">
                <button 
                    onClick={() => onNavigate('upgrade')} 
                    className="hidden sm:block px-4 py-2 rounded-full text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    Upgrade
                </button>
                <div className="relative group">
                    <button className="flex items-center gap-2 p-2 rounded-lg group-hover:bg-background">
                        <img 
                            src={user.avatarUrl} 
                            alt={user.name} 
                            className="w-8 h-8 rounded-full border-2 border-primary" 
                        />
                        <span className="hidden md:block text-sm font-medium text-text-primary">
                            {user.name}
                        </span>
                        <ChevronDown size={16} className="text-text-tertiary"/>
                    </button>
                    <div className="absolute right-0 mt-1 w-48 bg-card rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto z-10">
                        <button 
                            onClick={() => onNavigate('profile')} 
                            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-background flex items-center gap-2"
                        >
                            <User size={14}/> Profile
                        </button>
                        <button 
                            onClick={() => onNavigate('progress')} 
                            className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-background flex items-center gap-2"
                        >
                            <TrendingUp size={14}/> Progress
                        </button>
                        <button 
                            onClick={onLogout} 
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-background flex items-center gap-2"
                        >
                            <Lock size={14}/> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default Header;