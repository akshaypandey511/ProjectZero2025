import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vocabularyAPI } from '../services/api';

export default function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [category]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const params = category === 'all' ? { limit: 50 } : { limit: 50, category };
      const response = await vocabularyAPI.getRandom(params);
      const allWords = response.data.data;

      // For articles quiz, filter only words with articles
      let quizWords = allWords;
      if (category === 'articles') {
        quizWords = allWords.filter(word => word.article);
      }

      // Select 10 random questions
      const shuffled = quizWords.sort(() => 0.5 - Math.random());
      const selectedWords = shuffled.slice(0, 10);

      // Generate quiz questions
      const quizQuestions = selectedWords.map(word => {
        if (category === 'articles') {
          return generateArticleQuestion(word, allWords);
        } else {
          return generateTranslationQuestion(word, allWords);
        }
      });

      setQuestions(quizQuestions);
    } catch (error) {
      console.error('Error loading quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTranslationQuestion = (correctWord, allWords) => {
    // Generate wrong answers from other words
    const wrongAnswers = allWords
      .filter(w => w._id !== correctWord._id && w.english !== correctWord.english)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.english);

    const options = [...wrongAnswers, correctWord.english]
      .sort(() => 0.5 - Math.random());

    return {
      question: `What does "${correctWord.german}" mean in English?`,
      options,
      correctAnswer: correctWord.english,
      word: correctWord,
    };
  };

  const generateArticleQuestion = (correctWord, allWords) => {
    const options = ['der', 'die', 'das'].sort(() => 0.5 - Math.random());

    // Extract the noun without article for display
    const nounWithoutArticle = correctWord.german.replace(/^(der|die|das)\s+/i, '');

    return {
      question: `What is the correct article for "${nounWithoutArticle}"?`,
      options,
      correctAnswer: correctWord.article,
      word: correctWord,
      isArticleQuiz: true,
    };
  };

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return; // Prevent changing answer after submission
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer');
      return;
    }

    if (!showFeedback) {
      // Show feedback first
      setShowFeedback(true);
      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
      setAnswers([...answers, {
        question: questions[currentQuestion],
        selectedAnswer,
        isCorrect,
      }]);
    } else {
      // Move to next question
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        // Quiz finished
        navigate('/quiz/results', {
          state: {
            answers: [...answers, {
              question: questions[currentQuestion],
              selectedAnswer,
              isCorrect: selectedAnswer === questions[currentQuestion].correctAnswer,
            }],
            category,
          },
        });
      }
    }
  };

  const handleBack = () => {
    navigate('/quiz');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <p className="text-xl text-gray-600 mb-4">
            Not enough questions available for this category.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Quiz Selection
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQ.correctAnswer;

              let buttonClass = 'w-full p-4 text-left rounded-lg border-2 transition-all ';

              if (!showFeedback) {
                buttonClass += isSelected
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300 bg-white';
              } else {
                if (isCorrectOption) {
                  buttonClass += 'border-green-500 bg-green-50';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'border-red-500 bg-red-50';
                } else {
                  buttonClass += 'border-gray-200 bg-gray-50';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{option}</span>
                    {showFeedback && isCorrectOption && (
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
              <p className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              {currentQ.word.exampleSentence && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Example:</span> {currentQ.word.exampleSentence}
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Exit Quiz
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                selectedAnswer === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {showFeedback
                ? currentQuestion < questions.length - 1
                  ? 'Next Question'
                  : 'See Results'
                : 'Check Answer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
