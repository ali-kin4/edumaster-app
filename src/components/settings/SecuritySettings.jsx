const SecuritySettings = () => (
    <div className="max-w-md">
        <h3 className="text-lg font-bold text-text-primary mb-4">Change Password</h3>
        <form className="space-y-4">
            <div>
                <label className="text-sm font-medium text-text-secondary">Current Password</label>
                <input 
                    type="password" 
                    className="mt-1 w-full px-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary outline-none transition" 
                />
            </div>
            <div>
                <label className="text-sm font-medium text-text-secondary">New Password</label>
                <input 
                    type="password" 
                    className="mt-1 w-full px-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary outline-none transition" 
                />
            </div>
            <button 
                type="submit" 
                className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-hover"
            >
                Update Password
            </button>
        </form>
    </div>
);

export default SecuritySettings;