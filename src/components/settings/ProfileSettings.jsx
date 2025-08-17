import { userProfileData } from '../../data/mockData';

const ProfileSettings = () => (
    <div className="max-w-md">
        <h3 className="text-lg font-bold text-text-primary mb-4">Public Profile</h3>
        <form className="space-y-4">
            <div>
                <label className="text-sm font-medium text-text-secondary">Full Name</label>
                <input 
                    type="text" 
                    defaultValue={userProfileData.name} 
                    className="mt-1 w-full px-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary outline-none transition" 
                />
            </div>
            <div>
                <label className="text-sm font-medium text-text-secondary">Email Address</label>
                <input 
                    type="email" 
                    defaultValue={userProfileData.email} 
                    className="mt-1 w-full px-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary outline-none transition" 
                />
            </div>
            <button 
                type="submit" 
                className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-hover"
            >
                Save Changes
            </button>
        </form>
    </div>
);

export default ProfileSettings;