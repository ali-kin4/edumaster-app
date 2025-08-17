const NotificationSettings = () => (
    <div className="max-w-md space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Email Notifications</h3>
        
        <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
                <p className="font-medium text-text-primary">Weekly Progress Reports</p>
                <p className="text-sm text-text-secondary">
                    Get a summary of your learning activity every week.
                </p>
            </div>
            <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
            </label>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
                <p className="font-medium text-text-primary">Course Announcements</p>
                <p className="text-sm text-text-secondary">
                    Receive updates about new courses and content.
                </p>
            </div>
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>
    </div>
);

export default NotificationSettings;