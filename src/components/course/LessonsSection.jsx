import { CheckCircle } from 'lucide-react';

const LessonsSection = ({ lessons }) => (
    <ul className="space-y-3">
        {lessons.map((lesson, index) => (
            <li 
                key={index} 
                className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-border transition-colors duration-200"
            >
                <div className="flex items-center gap-4">
                    <CheckCircle className="text-green-500" />
                    <span className="font-medium text-text-primary">{lesson.title}</span>
                </div>
                <span className="text-sm text-text-tertiary">{lesson.duration}</span>
            </li>
        ))}
    </ul>
);

export default LessonsSection;