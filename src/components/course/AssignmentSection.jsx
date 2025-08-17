import { useState } from 'react';
import { UploadCloud, Sparkles } from 'lucide-react';
import SuccessToast from '../common/SuccessToast';
import Modal from '../common/Modal';
import { callGemini } from '../../utils/geminiApi';

const AssignmentSection = ({ assignment, topicTitle }) => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setSubmitted(false);
        }
    };

    const handleSubmit = () => {
        if (!file) return;
        
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setShowSuccess(true);
            setSubmitted(true);
        }, 2000);
    };

    const handleGetFeedback = async () => {
        setIsModalOpen(true);
        setIsLoadingFeedback(true);
        setModalContent({ title: 'Generating AI Feedback', body: '' });
        
        const prompt = `I have submitted an assignment for the course "${topicTitle}" with the description: "${assignment.description}". Please provide three constructive feedback points a student might receive on such a project.`;
        const feedback = await callGemini(prompt);
        
        setModalContent({ title: 'AI Assignment Feedback', body: feedback });
        setIsLoadingFeedback(false);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary">{assignment.title}</h3>
            <p className="text-text-secondary mt-2 mb-6">{assignment.description}</p>
            
            <label 
                htmlFor="file-upload" 
                className="border-2 border-dashed border-border rounded-lg p-12 text-center bg-background cursor-pointer block hover:border-primary transition"
            >
                <UploadCloud className="mx-auto text-text-tertiary" size={48} />
                {file ? (
                    <p className="mt-4 text-text-primary font-semibold">{file.name}</p>
                ) : (
                    <p className="mt-4 text-text-secondary">
                        Drag & drop your file here, or{' '}
                        <span className="text-primary font-semibold">click to browse</span>
                    </p>
                )}
            </label>
            <input 
                id="file-upload" 
                type="file" 
                className="hidden" 
                onChange={handleFileChange} 
            />
            
            <div className="flex gap-4 mt-6">
                <button 
                    onClick={handleSubmit} 
                    disabled={!file || isUploading || submitted} 
                    className="w-full py-3 bg-primary text-white font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isUploading ? (
                        <>
                            <div className="loader-sm"></div>
                            <span>Submitting...</span>
                        </>
                    ) : submitted ? (
                        'Submitted'
                    ) : (
                        'Submit Assignment'
                    )}
                </button>
                
                {submitted && (
                    <button 
                        onClick={handleGetFeedback} 
                        className="w-full py-3 bg-indigo-100 text-indigo-700 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-200 transition"
                    >
                        <Sparkles size={16} /> Get AI Feedback
                    </button>
                )}
            </div>
            
            {showSuccess && (
                <SuccessToast 
                    message="Assignment submitted successfully!" 
                    onDismiss={() => setShowSuccess(false)} 
                />
            )}
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title={modalContent.title}
            >
                {isLoadingFeedback ? (
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

export default AssignmentSection;