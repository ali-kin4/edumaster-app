import TopicCard from './TopicCard';

const TopicsGrid = ({ topics, onSelectTopic }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topics.map((topic, index) => (
            <div 
                key={topic.id} 
                style={{ animationDelay: `${index * 50}ms` }} 
                className="animate-fade-in-up"
            >
                <TopicCard topic={topic} onSelect={onSelectTopic} />
            </div>
        ))}
    </div>
);

export default TopicsGrid;