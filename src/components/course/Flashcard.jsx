import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const Flashcard = ({ card, onExplain }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    return (
        <div className="perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full h-56 rounded-xl shadow-lg cursor-pointer transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-4 text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl">
                    <p className="text-lg font-semibold">{card.term}</p>
                </div>
                <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-pink-500 to-orange-500 text-white rounded-xl rotate-y-180">
                    <p className="flex-grow">{card.definition}</p>
                    <button 
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            onExplain(card.term, card.definition); 
                        }} 
                        className="mt-2 px-3 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-full hover:bg-white/30 transition-all duration-200 flex items-center gap-1"
                    >
                        <Sparkles size={14}/> Explain Further
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;