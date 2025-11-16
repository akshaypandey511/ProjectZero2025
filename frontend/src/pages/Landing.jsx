import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Learn German with Flashcards
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Master German A1 vocabulary with interactive flashcards. Track your progress and learn at your own pace.
          </p>

          <div className="flex gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium text-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium text-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition-colors font-medium text-lg border-2 border-indigo-600"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rich Vocabulary</h3>
              <p className="text-gray-600">
                Learn essential German A1 words with examples and pronunciations
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your learning journey and see your improvement over time
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Engage with flashcards and practice at your own pace
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
