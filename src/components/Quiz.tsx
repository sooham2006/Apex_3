import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Trophy, Clock, Star, Zap, Target } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

const quizData: Question[] = [
  {
    id: 1,
    question: "Which CSS property is used to create responsive layouts?",
    options: ["display: grid", "display: flex", "Both A and B", "position: absolute"],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'CSS'
  },
  {
    id: 2,
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Process Integration", "Application Process Interface"],
    correctAnswer: 0,
    difficulty: 'easy',
    category: 'General'
  },
  {
    id: 3,
    question: "Which JavaScript method is used to fetch data from an API?",
    options: ["getData()", "fetch()", "request()", "load()"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'JavaScript'
  },
  {
    id: 4,
    question: "What is the primary purpose of media queries in CSS?",
    options: ["To play media files", "To create responsive designs", "To optimize images", "To compress CSS files"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'CSS'
  },
  {
    id: 5,
    question: "Which React hook is used for managing component state?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'React'
  },
  {
    id: 6,
    question: "What is the difference between '==' and '===' in JavaScript?",
    options: ["No difference", "=== checks type and value, == only checks value", "== is faster than ===", "=== is deprecated"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'JavaScript'
  },
  {
    id: 7,
    question: "Which CSS unit is relative to the viewport width?",
    options: ["px", "em", "vw", "rem"],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'CSS'
  },
  {
    id: 8,
    question: "What is the purpose of the 'key' prop in React lists?",
    options: ["Styling", "Performance optimization", "Event handling", "State management"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'React'
  },
  {
    id: 9,
    question: "Which HTTP status code indicates a successful request?",
    options: ["404", "500", "200", "301"],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'HTTP'
  },
  {
    id: 10,
    question: "What is closure in JavaScript?",
    options: ["A way to close the browser", "A function with access to outer scope", "A CSS property", "A React component"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'JavaScript'
  },
  {
    id: 11,
    question: "Which CSS property controls the stacking order of elements?",
    options: ["z-index", "stack-order", "layer", "position"],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'CSS'
  },
  {
    id: 12,
    question: "What is the virtual DOM in React?",
    options: ["A real DOM element", "A JavaScript representation of the DOM", "A CSS framework", "A database"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'React'
  },
  {
    id: 13,
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    options: ["append()", "push()", "add()", "insert()"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'JavaScript'
  },
  {
    id: 14,
    question: "What does CSS Grid's 'fr' unit represent?",
    options: ["Fraction of available space", "Fixed ratio", "Font ratio", "Frame rate"],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'CSS'
  },
  {
    id: 15,
    question: "Which React hook is used for side effects?",
    options: ["useState", "useEffect", "useContext", "useMemo"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'React'
  },
  {
    id: 16,
    question: "What is the purpose of 'async/await' in JavaScript?",
    options: ["To handle synchronous code", "To handle asynchronous code", "To create loops", "To define variables"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'JavaScript'
  },
  {
    id: 17,
    question: "Which CSS property is used to create animations?",
    options: ["transition", "animation", "Both A and B", "transform"],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'CSS'
  },
  {
    id: 18,
    question: "What is JSX in React?",
    options: ["A CSS framework", "JavaScript XML syntax", "A database", "A testing library"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'React'
  },
  {
    id: 19,
    question: "Which JavaScript method is used to iterate over arrays?",
    options: ["forEach()", "map()", "filter()", "All of the above"],
    correctAnswer: 3,
    difficulty: 'easy',
    category: 'JavaScript'
  },
  {
    id: 20,
    question: "What is the box model in CSS?",
    options: ["A design pattern", "Content, padding, border, margin", "A JavaScript concept", "A React component"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'CSS'
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizData.length).fill(null));
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNext();
    }
  }, [timeLeft, quizCompleted, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setShowResult(true);
    
    const isCorrect = selectedAnswer === quizData[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(45);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
    setTimeLeft(45);
    setAnswers(Array(quizData.length).fill(null));
    setStreak(0);
    setMaxStreak(0);
  };

  const getScoreColor = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 90) return 'text-emerald-500';
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 70) return 'text-yellow-500';
    if (percentage >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreRating = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 95) return { rating: 'Legendary!', icon: '🏆', color: 'text-yellow-400' };
    if (percentage >= 90) return { rating: 'Excellent!', icon: '⭐', color: 'text-emerald-400' };
    if (percentage >= 80) return { rating: 'Great!', icon: '🎉', color: 'text-green-400' };
    if (percentage >= 70) return { rating: 'Good!', icon: '👍', color: 'text-blue-400' };
    if (percentage >= 60) return { rating: 'Not Bad!', icon: '👌', color: 'text-yellow-400' };
    return { rating: 'Keep Trying!', icon: '💪', color: 'text-red-400' };
  };

  if (quizCompleted) {
    const rating = getScoreRating();
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-25 via-blue-25 to-indigo-50 pt-16 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 text-center border border-white/70">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-lg">
              <Trophy className="text-white" size={48} />
            </div>
            <h2 className="text-4xl font-bold text-gray-700 mb-4">Quiz Completed!</h2>
            <div className="text-8xl font-bold mb-4">
              <span className={rating.color}>{rating.icon}</span>
            </div>
            <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
              {score}/{quizData.length}
            </div>
            <div className={`text-2xl font-bold mb-6 ${rating.color}`}>
              {rating.rating}
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/80 rounded-xl p-4 border border-white/60 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Target className="text-blue-600 mr-2" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-700">{Math.round((score / quizData.length) * 100)}%</div>
                <div className="text-gray-600 text-sm">Accuracy</div>
              </div>
              <div className="bg-white/80 rounded-xl p-4 border border-white/60 shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="text-amber-500 mr-2" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-700">{maxStreak}</div>
                <div className="text-gray-600 text-sm">Best Streak</div>
              </div>
            </div>
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <RotateCcw className="inline-block mr-2" size={20} />
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizData[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-25 via-blue-25 to-indigo-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-6">
            <div className="bg-white/85 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/70 shadow-sm">
              <div className="flex items-center space-x-2">
                <Star className="text-amber-500" size={20} />
                <span className="text-gray-700 font-bold">{score}</span>
              </div>
            </div>
            <div className="bg-white/85 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/70 shadow-sm">
              <div className="flex items-center space-x-2">
                <Zap className="text-orange-500" size={20} />
                <span className="text-gray-700 font-bold">{streak}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/85 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/70 shadow-sm">
            <Clock size={20} className={timeLeft <= 15 ? 'text-red-500' : 'text-blue-600'} />
            <span className={`font-bold ${timeLeft <= 15 ? 'text-red-500' : 'text-gray-700'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(currentQ.difficulty)}`}>
                {currentQ.difficulty.toUpperCase()}
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-200">
                {currentQ.category}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 h-4 rounded-full transition-all duration-500 relative shadow-sm"
              style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-8 border border-white/70">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-8 leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-6 rounded-2xl text-left transition-all duration-300 border-2 transform hover:scale-[1.02] ${
                  showResult
                    ? index === currentQ.correctAnswer
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-lg shadow-emerald-200'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50 text-red-800 shadow-lg shadow-red-200'
                      : 'border-gray-300 bg-gray-50 text-gray-500'
                    : selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-lg shadow-blue-200'
                    : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      showResult
                        ? index === currentQ.correctAnswer
                          ? 'bg-emerald-500 text-white shadow-md'
                          : selectedAnswer === index
                          ? 'bg-red-500 text-white shadow-md'
                          : 'bg-gray-400 text-gray-100'
                        : selectedAnswer === index
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium text-lg">{option}</span>
                  </div>
                  {showResult && (
                    <div>
                      {index === currentQ.correctAnswer && (
                        <Check className="text-emerald-600" size={28} />
                      )}
                      {selectedAnswer === index && index !== currentQ.correctAnswer && (
                        <X className="text-red-600" size={28} />
                      )}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {!showResult && (
            <div className="mt-8 text-center">
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                  selectedAnswer !== null
                    ? 'bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}
        </div>

        {/* Current Stats */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 bg-white/85 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/70 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{score}</div>
              <div className="text-gray-600 text-sm">Correct</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{currentQuestion + (showResult ? 1 : 0) - score}</div>
              <div className="text-gray-600 text-sm">Wrong</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500">{streak}</div>
              <div className="text-gray-600 text-sm">Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;