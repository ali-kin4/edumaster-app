import { Award, Book, User, Mail, Lock } from 'lucide-react';
import { userProfileData } from '../../data/mockData';

const ProfileView = ({ onLogout }) => {
    const { name, email, avatarUrl, stats, achievements, courseProgress } = userProfileData;
    
    return (
        <div className="animate-fade-in-up">
            <div className="bg-card rounded-2xl shadow-lg p-6 mb-6 flex flex-wrap items-center gap-6">
                <img 
                    src={avatarUrl} 
                    alt={name} 
                    className="w-24 h-24 rounded-full border-4 border-primary-hover" 
                />
                <div>
                    <h2 className="text-3xl font-bold text-text-primary">{name}</h2>
                    <p className="text-text-secondary">{email}</p>
                </div>
                <div className="ml-auto flex gap-6 text-center flex-wrap">
                    <div>
                        <p className="text-2xl font-bold text-primary">{stats.coursesCompleted}</p>
                        <p className="text-sm text-text-secondary">Courses Completed</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-primary">{stats.hoursLearned}</p>
                        <p className="text-sm text-text-secondary">Hours Learned</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-primary">{stats.certificates}</p>
                        <p className="text-sm text-text-secondary">Certificates</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                            <Award size={22}/> Achievements
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {achievements.map(ach => (
                                <div 
                                    key={ach.name} 
                                    className="flex flex-col items-center text-center p-3 bg-background rounded-lg" 
                                    title={ach.description}
                                >
                                    <div className="text-4xl mb-2">{ach.icon}</div>
                                    <p className="text-xs font-semibold text-text-secondary">{ach.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-card rounded-2xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                            <Book size={22}/> Course Progress
                        </h3>
                        <div className="space-y-4">
                            {courseProgress.map(course => (
                                <div key={course.id}>
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="font-semibold text-text-primary">{course.title}</p>
                                        <p className="text-sm font-medium text-primary">{course.progress}%</p>
                                    </div>
                                    <div className="w-full bg-background rounded-full h-2.5">
                                        <div 
                                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" 
                                            style={{width: `${course.progress}%`}}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="bg-card rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                        <User size={22}/> Edit Profile
                    </h3>
                    <form className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Full Name</label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18}/>
                                <input 
                                    type="text" 
                                    defaultValue={name} 
                                    className="w-full pl-10 pr-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Email Address</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18}/>
                                <input 
                                    type="email" 
                                    defaultValue={email} 
                                    className="w-full pl-10 pr-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Password</label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18}/>
                                <input 
                                    type="password" 
                                    placeholder="New Password" 
                                    className="w-full pl-10 pr-4 py-2 border border-border bg-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full mt-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-hover transition-all duration-200"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;