import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide">
              Master German A1
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Learn German with
            <span className="block text-indigo-600 mt-2">Flashcards & Quizzes</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Master German A1 vocabulary with interactive flashcards and engaging quizzes. Track your progress and learn at your own pace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-10 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg border-2 border-indigo-200 hover:border-indigo-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="mt-28 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="text-5xl mb-5">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">100+ Words</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn essential German A1 vocabulary with examples, pronunciations, and articles
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="text-5xl mb-5">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quiz Yourself</h3>
              <p className="text-gray-600 leading-relaxed">
                Test your knowledge with interactive quizzes across multiple categories
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="text-5xl mb-5">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your learning journey and see your improvement over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
