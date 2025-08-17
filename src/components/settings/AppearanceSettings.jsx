const AppearanceSettings = ({ theme, onThemeChange }) => (
    <div className="max-w-md">
        <h3 className="text-lg font-bold text-text-primary mb-4">Theme</h3>
        <p className="text-sm text-text-secondary mb-4">Select the theme for the app.</p>
        <div className="flex space-x-2 rounded-lg bg-input p-1">
            <button 
                onClick={() => onThemeChange('light')} 
                className={`w-full p-2 rounded-md text-sm font-medium ${
                    theme === 'light' ? 'bg-card shadow' : ''
                }`}
            >
                Light
            </button>
            <button 
                onClick={() => onThemeChange('dark')} 
                className={`w-full p-2 rounded-md text-sm font-medium ${
                    theme === 'dark' ? 'bg-card shadow' : ''
                }`}
            >
                Dark
            </button>
            <button 
                onClick={() => onThemeChange('system')} 
                className={`w-full p-2 rounded-md text-sm font-medium ${
                    theme === 'system' ? 'bg-card shadow' : ''
                }`}
            >
                System
            </button>
        </div>
    </div>
);

export default AppearanceSettings;