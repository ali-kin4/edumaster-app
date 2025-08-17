// Topic Data
export const topicsData = [
    { id: 'excel', category: 'microsoft', title: 'Microsoft Excel', description: 'Master spreadsheets, formulas, pivot tables, and data analysis.', lessons: 15, hours: 8, rating: 4.9, icon: '📊' },
    { id: 'word', category: 'microsoft', title: 'Microsoft Word', description: 'Document creation, formatting, templates, and collaboration.', lessons: 12, hours: 6, rating: 4.8, icon: '📝' },
    { id: 'powerpoint', category: 'microsoft', title: 'PowerPoint', description: 'Create stunning presentations with animations and transitions.', lessons: 10, hours: 5, rating: 4.7, icon: '🎯' },
    { id: 'sheets', category: 'google', title: 'Google Sheets', description: 'Cloud-based spreadsheets with real-time collaboration.', lessons: 14, hours: 7, rating: 4.9, icon: '📈' },
    { id: 'docs', category: 'google', title: 'Google Docs', description: 'Collaborative document editing and sharing.', lessons: 10, hours: 5, rating: 4.8, icon: '📄' },
    { id: 'drive', category: 'google', title: 'Google Drive', description: 'File storage, sharing, and team collaboration.', lessons: 8, hours: 4, rating: 4.7, icon: '☁️' },
    { id: 'bookkeeping', category: 'accounting', title: 'Bookkeeping Basics', description: 'Fundamental accounting principles and practices.', lessons: 20, hours: 12, rating: 4.9, icon: '📒' },
    { id: 'quickbooks', category: 'accounting', title: 'QuickBooks', description: 'Master QuickBooks for business accounting.', lessons: 18, hours: 10, rating: 4.8, icon: '💳' },
    { id: 'financial', category: 'accounting', title: 'Financial Analysis', description: 'Financial statements, ratios, and business analysis.', lessons: 15, hours: 9, rating: 4.9, icon: '💹' },
    { id: 'python', category: 'programming', title: 'Python Programming', description: 'Learn Python from basics to advanced concepts.', lessons: 25, hours: 15, rating: 5.0, icon: '🐍' },
    { id: 'webdev', category: 'programming', title: 'Web Development', description: 'HTML, CSS, JavaScript and modern frameworks.', lessons: 30, hours: 20, rating: 4.9, icon: '🌐' },
    { id: 'database', category: 'programming', title: 'Database & SQL', description: 'Database design and SQL query mastery.', lessons: 16, hours: 10, rating: 4.8, icon: '🗄️' },
    { id: 'photoshop', category: 'design', title: 'Adobe Photoshop', description: 'Photo editing and digital art creation.', lessons: 20, hours: 12, rating: 4.9, icon: '🎨' },
    { id: 'illustrator', category: 'design', title: 'Adobe Illustrator', description: 'Vector graphics and logo design.', lessons: 18, hours: 10, rating: 4.8, icon: '✨' },
    { id: 'ui', category: 'design', title: 'UI/UX Design', description: 'User interface and experience design principles.', lessons: 22, hours: 14, rating: 5.0, icon: '📱' },
    { id: 'digital', category: 'marketing', title: 'Digital Marketing', description: 'SEO, SEM, and online marketing strategies.', lessons: 16, hours: 10, rating: 4.9, icon: '📢' },
    { id: 'social', category: 'marketing', title: 'Social Media Marketing', description: 'Master social media platforms for business growth.', lessons: 14, hours: 8, rating: 4.8, icon: '👥' },
    { id: 'content', category: 'marketing', title: 'Content Marketing', description: 'Create compelling content that converts.', lessons: 12, hours: 7, rating: 4.7, icon: '✍️' },
];

// Course Content Data
export const courseContentData = {};
topicsData.forEach(topic => {
    courseContentData[topic.id] = {
        title: topic.title,
        progress: Math.floor(Math.random() * 80) + 10,
        lessons: [
            { title: 'Introduction to ' + topic.title, duration: '15 min' },
            { title: 'Core Concepts', duration: '45 min' },
            { title: 'Advanced Techniques', duration: '1 hr 30 min' },
            { title: 'Practical Applications', duration: '1 hr' },
            { title: 'Project: Build a Thing', duration: '2 hr' },
        ],
        videos: [
            { title: 'Getting Started with ' + topic.title, duration: '12:34', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Deep Dive into Features', duration: '25:10', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { title: 'Expert Tips & Tricks', duration: '18:55', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ],
        flashcards: [
            { term: `${topic.title} Term 1`, definition: 'A foundational concept for this topic.' },
            { term: `${topic.title} Term 2`, definition: 'An important feature or tool.' },
            { term: `${topic.title} Term 3`, definition: 'An advanced principle for experts.' },
            { term: `${topic.title} Term 4`, definition: 'A common use case or application.' },
        ],
        quiz: [
            { question: `What is a key feature of ${topic.title}?`, options: ['Option A', 'Option B', 'Correct Answer', 'Option D'], answer: 'Correct Answer' },
            { question: `How do you perform a basic task in ${topic.title}?`, options: ['Incorrect Method', 'Right Method', 'Another Wrong Way', 'A plausible but wrong option'], answer: 'Right Method' },
        ],
        assignment: {
            title: `Practical Project: ${topic.title}`,
            description: `Apply the skills you've learned in this course to complete a real-world project. The project brief is attached. Please submit your completed work as a single PDF file.`,
        }
    }
});

// User Profile Data
export const userProfileData = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatarUrl: 'https://placehold.co/100x100/6366f1/ffffff?text=AD',
    stats: { 
        coursesCompleted: 4, 
        hoursLearned: 28, 
        certificates: 2 
    },
    achievements: [
        { name: 'First Steps', icon: '👟', description: 'Completed your first lesson' },
        { name: 'Course Novice', icon: '🎓', description: 'Completed your first course' },
        { name: 'Microsoft Master', icon: '💼', description: 'Completed all Microsoft courses' },
        { name: 'Perfect Score', icon: '💯', description: 'Scored 100% on a quiz' },
        { name: 'Learning Streak', icon: '🔥', description: 'Learned for 5 days in a row' },
    ],
    courseProgress: [
        { id: 'excel', title: 'Microsoft Excel', progress: 65, lastActivity: '2 days ago' },
        { id: 'python', title: 'Python Programming', progress: 80, lastActivity: 'Yesterday' },
        { id: 'ui', title: 'UI/UX Design', progress: 45, lastActivity: '5 days ago' },
        { id: 'digital', title: 'Digital Marketing', progress: 20, lastActivity: 'Last week' },
    ],
    weeklyActivity: [
        { day: 'Mon', hours: 1.5 },
        { day: 'Tue', hours: 0 },
        { day: 'Wed', hours: 2 },
        { day: 'Thu', hours: 1 },
        { day: 'Fri', hours: 2.5 },
        { day: 'Sat', hours: 3 },
        { day: 'Sun', hours: 0.5 },
    ],
    weeklyGoal: 8,
    learningStreak: 5
};