import Flashcard from './Flashcard';

const FlashcardSection = ({ flashcards, onExplain }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {flashcards.map((card, i) => (
            <Flashcard key={i} card={card} onExplain={onExplain} />
        ))}
    </div>
);

export default FlashcardSection;