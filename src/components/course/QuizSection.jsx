import Quiz from './Quiz';

const QuizSection = ({ quizData, onGenerateQuiz, topicTitle }) => (
    <Quiz quizData={quizData} onGenerateQuiz={onGenerateQuiz} topicTitle={topicTitle} />
);

export default QuizSection;