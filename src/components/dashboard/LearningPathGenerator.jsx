import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import Modal from '../common/Modal';
import { callGemini } from '../../utils/geminiApi';
import SafeHtml from '../common/SafeHtml';

const LearningPathGenerator = ({ courses }) => {
    const [goal, setGoal] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!goal) return;
        
        setIsModalOpen(true);
        setIsLoading(true);
        setModalContent({ title: 'Generating Your Learning Path', body: '' });
        
        const courseTitles = courses.map(c => c.title).join(', ');
        const prompt = `Based on the goal "${goal}", create a step-by-step learning path from the following available courses: ${courseTitles}. Present the path as a numbered list with a brief explanation for each step.`;
        const path = await callGemini(prompt);
        
        setModalContent({ title: `Learning Path for: ${goal}`, body: path });
        setIsLoading(false);
    };

    return (
        <div className="bg-card rounded-2xl shadow-lg p-6 mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <div className="flex items-center gap-4 mb-4">
                <Wand2 size={28} />
                <h2 className="text-2xl font-bold">AI Learning Path Generator</h2>
            </div>
            <p className="mb-4 opacity-90">
                Tell us your learning goal, and our AI will create a custom course plan for you.
            </p>
            <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-2">
                <input 
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., Become a data analyst"
                    className="flex-grow px-4 py-3 rounded-lg bg-white/20 placeholder-white/60 focus:ring-2 focus:ring-white outline-none transition"
                />
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="loader-sm"></div>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>✨ Generate Plan</>
                    )}
                </button>
            </form>
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
                    <SafeHtml content={modalContent.body.replace(/\n/g, '<br />')} />
                )}
            </Modal>
        </div>
    );
};

export default LearningPathGenerator;