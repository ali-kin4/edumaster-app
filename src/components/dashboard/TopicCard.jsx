const TopicCard = ({ topic, onSelect }) => (
    <div 
        onClick={() => onSelect(topic.id)} 
        className="bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
    >
        <div className="p-6">
            <div className="flex items-start justify-between">
                <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {topic.icon}
                </div>
                <div className="text-xs font-bold text-primary bg-primary-hover px-2 py-1 rounded-full">
                    {topic.category}
                </div>
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">{topic.title}</h3>
            <p className="text-sm text-text-secondary line-clamp-2 mb-4">{topic.description}</p>
            <div className="flex items-center justify-between text-xs text-text-tertiary font-medium">
                <span className="flex items-center gap-1">📚 {topic.lessons} Lessons</span>
                <span className="flex items-center gap-1">⏱️ {topic.hours} Hours</span>
                <span className="flex items-center gap-1">⭐ {topic.rating}</span>
            </div>
        </div>
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 w-0 group-hover:w-full transition-all duration-500"></div>
    </div>
);

export default TopicCard;