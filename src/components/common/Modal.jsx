import { Sparkles, X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <Sparkles className="text-primary" size={20}/>
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-text-tertiary hover:text-text-primary">
                        <X size={24} />
                    </button>
                </header>
                <div className="p-6 overflow-y-auto prose">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;