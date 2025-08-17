import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import AnimatedGradientText from '../common/AnimatedGradientText';
import Modal from '../common/Modal';
import { callGemini } from '../../utils/geminiApi';
import { courseContentData } from '../../data/mockData';
import SafeHtml from '../common/SafeHtml';
import LessonsSection from './LessonsSection';
import VideoSection from './VideoSection';
import FlashcardSection from './FlashcardSection';
import QuizSection from './QuizSection';
import AssignmentSection from './AssignmentSection';

const ContentView = ({ topicId, onBack }) => {
    const [content, setContent] = useState(null);
    const [activeTab, setActiveTab] = useState('lessons');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });
    const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
    
    useEffect(() => {
        setContent(courseContentData[topicId]);
    }, [topicId]);

    const handleExplain = async (term, definition) => {
        setIsModalOpen(true);
        setIsLoadingExplanation(true);
        setModalContent({ title: `Explaining "${term}"`, body: '' });
        
        const prompt = `Explain the term "${term}" which has the definition "${definition}" in the context of ${content.title}. Provide a simple, clear explanation with an analogy.`;
        const explanation = await callGemini(prompt);
        
        setModalContent({ title: `Explaining "${term}"`, body: explanation });
        setIsLoadingExplanation(false);
    };

    const handleGenerateQuiz = async (topicTitle) => {
        const prompt = `Generate a 2-question multiple-choice quiz about ${topicTitle}. Provide 4 options for each question.`;
        const result = await callGemini(prompt, true);
        
        try {
            const newQuizData = JSON.parse(result);
            setContent(prev => ({ ...prev, quiz: newQuizData }));
        } catch (error) {
            console.error("Failed to parse new quiz data:", error);
        }
    };

    if (!content) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader"></div>
            </div>
        );
    }

    const tabs = ['lessons', 'videos', 'flashcards', 'quiz', 'assignment'];

    return (
        <div className="animate-slide-in">
            <div className="bg-card rounded-2xl shadow-lg p-6 mb-6">
                <button 
                    onClick={onBack} 
                    className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary mb-4 transition-all duration-200"
                >
                    <ArrowLeft size={16} /> Back to Topics
                </button>
                
                <h2 className="text-3xl font-bold mb-2">
                    <AnimatedGradientText>{content.title}</AnimatedGradientText>
                </h2>
                
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1 text-sm font-medium text-text-secondary">
                        <span>Progress</span>
                        <span>{content.progress}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2.5">
                        <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" 
                            style={{width: `${content.progress}%`}}
                        ></div>
                    </div>
                </div>
            </div>
            
            <div className="bg-card rounded-2xl shadow-lg p-6">
                <div className="border-b border-border mb-6">
                    <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)} 
                                className={`${
                                    activeTab === tab 
                                        ? 'border-primary text-primary' 
                                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm capitalize transition-all duration-200`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div className="animate-fade-in-up">
                    {activeTab === 'lessons' && <LessonsSection lessons={content.lessons} />}
                    {activeTab === 'videos' && <VideoSection videos={content.videos} />}
                    {activeTab === 'flashcards' && <FlashcardSection flashcards={content.flashcards} onExplain={handleExplain} />}
                    {activeTab === 'quiz' && <QuizSection quizData={content.quiz} onGenerateQuiz={handleGenerateQuiz} topicTitle={content.title} />}
                    {activeTab === 'assignment' && <AssignmentSection assignment={content.assignment} topicTitle={content.title} />}
                </div>
            </div>
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={modalContent.title}
            >
                {isLoadingExplanation ? (
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

export default ContentView;