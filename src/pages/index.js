import { useState, useEffect } from 'react';

const quizQuestions = [
  {
    question: 'What is 5 + 3?',
    options: ['6', '7', '8', '9'],
    answer: '8',
  },
  {
    question: 'What is 9 - 4?',
    options: ['2', '5', '6', '7'],
    answer: '5',
  },
  {
    question: 'What is 7 x 6?',
    options: ['42', '36', '48', '56'],
    answer: '42',
  },
  {
    question: 'What is 12 ÷ 4?',
    options: ['2', '3', '4', '5'],
    answer: '3',
  },
  {
    question: 'What is the square root of 64?',
    options: ['6', '7', '8', '9'],
    answer: '8',
  },
  {
    question: 'What is 15 + 5?',
    options: ['15', '18', '20', '25'],
    answer: '20',
  },
  {
    question: 'What is 10 - 6?',
    options: ['2', '3', '4', '5'],
    answer: '4',
  },
  {
    question: 'What is 9 x 9?',
    options: ['72', '81', '99', '63'],
    answer: '81',
  },
  {
    question: 'What is 144 ÷ 12?',
    options: ['10', '11', '12', '14'],
    answer: '12',
  },
  {
    question: 'What is 25 + 10?',
    options: ['30', '35', '40', '45'],
    answer: '35',
  },
];

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(quizQuestions));
  }, []);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    const isAnswerCorrect = option === shuffledQuestions[currentQuestion].answer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
    }

    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetakeQuiz = () => {
    setShuffledQuestions(shuffleArray(quizQuestions)); 
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setShowResult(false);
  };

  if (shuffledQuestions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {!showResult ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Math Quiz</h1>
            <div>
              <p className="mb-4">
                Question {currentQuestion + 1}: {shuffledQuestions[currentQuestion].question}
              </p>
              {shuffledQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 ${
                    selectedAnswer === option ? 'bg-blue-700' : ''
                  }`}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showFeedback && (
              <div className="mt-4">
                {isCorrect ? (
                  <p className="text-green-500 font-bold">Correct! 🎉</p>
                ) : (
                  <p className="text-red-500 font-bold">
                    Incorrect. The correct answer is: {shuffledQuestions[currentQuestion].answer}
                  </p>
                )}

                <button
                  onClick={handleNextQuestion}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  {currentQuestion < shuffledQuestions.length - 1
                    ? 'Next Question'
                    : 'See Results'}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Quiz Results</h1>
            <p className="mb-4">
              You scored {score} out of {shuffledQuestions.length}
            </p>
            <button
              onClick={handleRetakeQuiz}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
