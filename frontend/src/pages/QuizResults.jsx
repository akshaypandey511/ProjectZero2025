import { useLocation, useNavigate } from 'react-router-dom';

export default function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, category } = location.state || { answers: [], category: 'all' };

  const correctCount = answers.filter(a => a.isCorrect).length;
  const totalQuestions = answers.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage === 100) return 'Perfect! 🎉';
    if (percentage >= 80) return 'Excellent! 🌟';
    if (percentage >= 60) return 'Good job! 👍';
    if (percentage >= 40) return 'Keep practicing! 💪';
    return 'Need more practice! 📚';
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleRetakeQuiz = () => {
    navigate(`/quiz/${category}`);
  };

  const handleNewQuiz = () => {
    navigate('/quiz');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  if (answers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <p className="text-xl text-gray-600 mb-4">No quiz results found.</p>
          <button
            onClick={handleNewQuiz}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Take a Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Score Card */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-3xl shadow-2xl p-12 mb-10 text-center border-2 border-blue-200">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-semibold tracking-wide mb-6 shadow-lg">
            Results
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">Quiz Complete!</h1>

          <div className={`text-8xl font-extrabold mb-6 ${getScoreColor()}`}>
            {percentage}%
          </div>

          <p className="text-3xl font-bold text-gray-800 mb-4">
            {getScoreMessage()}
          </p>

          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            You got <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{correctCount}</span> out of <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{totalQuestions}</span> questions correct
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-5">
            <button
              onClick={handleRetakeQuiz}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Retake Quiz
            </button>
            <button
              onClick={handleNewQuiz}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Choose Different Quiz
            </button>
            <button
              onClick={handleDashboard}
              className="px-8 py-4 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-300 text-blue-700 rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:border-blue-400 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-2xl shadow-2xl p-10 border-2 border-blue-200">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">Review Your Answers</h2>

          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  answer.isCorrect
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    Question {index + 1}: {answer.question.question}
                  </h3>
                  {answer.isCorrect ? (
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <div className="ml-4 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Your answer:</span>{' '}
                    <span className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                      {answer.selectedAnswer}
                    </span>
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-sm">
                      <span className="font-medium">Correct answer:</span>{' '}
                      <span className="text-green-700">{answer.question.correctAnswer}</span>
                    </p>
                  )}
                  {answer.question.word.exampleSentence && (
                    <p className="text-sm text-gray-600 italic mt-2">
                      Example: {answer.question.word.exampleSentence}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
