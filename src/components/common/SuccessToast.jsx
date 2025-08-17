import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessToast = ({ message, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className="fixed bottom-5 right-5 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-up z-50">
            <CheckCircle size={20} />
            <span>{message}</span>
        </div>
    );
};

export default SuccessToast;