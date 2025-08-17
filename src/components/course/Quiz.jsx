import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const Quiz = ({ quizData, onGenerateQuiz, topicTitle }) => {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setAnswers({});
        setSubmitted(false);
    }, [quizData]);
    
    const handleSelect = (questionIndex, option) => {
        if (submitted) return;
        setAnswers({ ...answers, [questionIndex]: option });
    };
    
    const getOptionClass = (questionIndex, option) => {
        if (!submitted) {
            return answers[questionIndex] === option 
                ? 'bg-primary text-white' 
                : 'bg-background hover:bg-border';
        }
        const correctAnswer = quizData[questionIndex].answer;
        if (option === correctAnswer) return 'bg-emerald-500 text-white';
        if (answers[questionIndex] === option) return 'bg-red-500 text-white';
        return 'bg-background';
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        await onGenerateQuiz(topicTitle);
        setIsGenerating(false);
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button 
                    onClick={handleGenerate} 
                    disabled={isGenerating} 
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-200 transition disabled:opacity-50"
                >
                    {isGenerating ? (
                        <>
                            <div className="loader-sm"></div> 
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles size={16}/> 
                            Generate New Quiz with AI
                        </>
                    )}
                </button>
            </div>
            {quizData.map((q, i) => (
                <div key={i} className="bg-background p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-text-primary mb-3">
                        {i + 1}. {q.question}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map(opt => (
                            <button 
                                key={opt} 
                                onClick={() => handleSelect(i, opt)} 
                                className={`p-3 rounded-md text-left transition-all duration-200 ${getOptionClass(i, opt)}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <button 
                onClick={() => setSubmitted(true)} 
                className="w-full mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-hover transition-all duration-200"
            >
                Submit Answers
            </button>
        </div>
    );
};

export default Quiz;