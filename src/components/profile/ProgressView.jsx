import { useState } from 'react';
import { TrendingUp, BookCopy, Award, Zap, Sparkles } from 'lucide-react';
import Modal from '../common/Modal';
import { callGemini } from '../../utils/geminiApi';
import { userProfileData } from '../../data/mockData';

const ProgressView = () => {
    const { stats, weeklyActivity, weeklyGoal, learningStreak, courseProgress } = userProfileData;
    const totalHoursThisWeek = weeklyActivity.reduce((sum, day) => sum + day.hours, 0);
    const weeklyGoalProgress = Math.min((totalHoursThisWeek / weeklyGoal) * 100, 100);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePlan = async () => {
        setIsModalOpen(true);
        setIsLoading(true);
        setModalContent({ title: 'Generating Your Study Plan', body: '' });
        
        const progressString = courseProgress.map(c => `${c.title} (${c.progress}%)`).join(', ');
        const prompt = `Based on the following course progress for a student: ${progressString}, create a personalized 3-day study plan to help them improve. Suggest specific topics to focus on each day.`;
        const plan = await callGemini(prompt);
        
        setModalContent({ title: 'Your Personalized Study Plan', body: plan });
        setIsLoading(false);
    };

    return (
        <div className="animate-fade-in-up space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-text-primary">Your Progress</h1>
                <button 
                    onClick={handleGeneratePlan} 
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-200 transition"
                >
                    <Sparkles size={16} /> Generate Study Plan
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-hover rounded-lg">
                            <TrendingUp className="text-primary" size={24}/>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Hours Learned</p>
                            <p className="text-2xl font-bold text-text-primary">{stats.hoursLearned}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-card p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-hover rounded-lg">
                            <BookCopy className="text-primary" size={24}/>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Courses Completed</p>
                            <p className="text-2xl font-bold text-text-primary">{stats.coursesCompleted}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-card p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-hover rounded-lg">
                            <Award className="text-primary" size={24}/>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Certificates</p>
                            <p className="text-2xl font-bold text-text-primary">{stats.certificates}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-card p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-hover rounded-lg">
                            <Zap className="text-primary" size={24}/>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Learning Streak</p>
                            <p className="text-2xl font-bold text-text-primary">{learningStreak} days</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-text-primary mb-4">Weekly Activity</h3>
                    <div className="flex justify-between items-end h-48">
                        {weeklyActivity.map(day => (
                            <div key={day.day} className="flex flex-col items-center w-1/7">
                                <div className="w-full flex items-end justify-center h-full">
                                    <div 
                                        className="w-1/2 bg-primary-hover rounded-t-lg hover:bg-primary transition-colors" 
                                        style={{ 
                                            height: `${day.hours > 0 ? (day.hours/Math.max(...weeklyActivity.map(d => d.hours)))*100 : 5}%` 
                                        }}
                                    ></div>
                                </div>
                                <p className="text-xs text-text-tertiary mt-2">{day.day}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-card p-6 rounded-2xl shadow-lg flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-text-primary mb-4">Weekly Goal</h3>
                    <div className="relative w-32 h-32 mx-auto">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path 
                                className="text-border" 
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3"
                            ></path>
                            <path 
                                className="text-primary" 
                                strokeDasharray={`${weeklyGoalProgress}, 100`} 
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                            ></path>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-text-primary">
                                {Math.round(weeklyGoalProgress)}%
                            </span>
                        </div>
                    </div>
                    <p className="text-center text-text-secondary mt-3">
                        {totalHoursThisWeek.toFixed(1)} / {weeklyGoal} hours completed
                    </p>
                </div>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-text-primary mb-4">Active Courses</h3>
                <div className="space-y-4">
                    {courseProgress.map(course => (
                        <div key={course.id}>
                            <div className="flex justify-between items-center mb-1">
                                <div>
                                    <p className="font-semibold text-text-primary">{course.title}</p>
                                    <p className="text-xs text-text-tertiary">Last activity: {course.lastActivity}</p>
                                </div>
                                <p className="text-sm font-medium text-primary">{course.progress}%</p>
                            </div>
                            <div className="w-full bg-background rounded-full h-2.5">
                                <div 
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" 
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={modalContent.title}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: modalContent.body.replace(/\n/g, '<br />') }} />
                )}
            </Modal>
        </div>
    );
};

export default ProgressView;