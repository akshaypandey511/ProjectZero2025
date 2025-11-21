import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { vocabularyAPI } from '../services/api';

export default function ProgressChart() {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWords: 0,
    learnedWords: 0,
    percentage: 0,
    needPractice: 0,
    mastered: 0,
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);

      // Fetch both progress and total word count
      const [progressResponse, statsResponse] = await Promise.all([
        vocabularyAPI.getProgress(),
        vocabularyAPI.getStats()
      ]);

      const progress = progressResponse.data.data;
      const totalWords = statsResponse.data.data.totalWords;
      setProgressData(progress);

      // Calculate statistics
      // Words with masteryLevel > 0 are considered "learned" (user has practiced them)
      const learnedWords = progress.filter(p => p.masteryLevel > 0).length;
      // Words with masteryLevel >= 3 are "mastered"
      const mastered = progress.filter(p => p.masteryLevel >= 3).length;
      // Words with masteryLevel 1-2 need more practice
      const needPractice = progress.filter(p => p.masteryLevel > 0 && p.masteryLevel < 3).length;
      const percentage = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;

      setStats({
        totalWords,
        learnedWords,
        percentage,
        needPractice,
        mastered,
      });
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">German Learning App</h1>
            <p className="text-base text-gray-600 mt-1">Welcome back, <span className="font-semibold text-indigo-600">{user?.name}</span>!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-10 py-4 font-semibold transition-all duration-200 text-gray-600 hover:text-gray-900 hover:border-b-3 hover:border-gray-300"
            >
              📚 Flashcards
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="px-10 py-4 font-semibold transition-all duration-200 text-gray-600 hover:text-gray-900 hover:border-b-3 hover:border-gray-300"
            >
              🎯 Quiz
            </button>
            <button
              className="px-10 py-4 font-semibold transition-all duration-200 border-b-3 border-indigo-600 text-indigo-600"
            >
              📊 Progress Chart
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-semibold tracking-wide mb-6 shadow-lg">
            YOUR LEARNING JOURNEY
          </div>
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Progress Tracker
          </h2>
          <p className="text-gray-600 text-lg">Track your German vocabulary mastery</p>
        </div>

        {/* Main Progress Card */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-3xl shadow-2xl p-12 mb-10 border-2 border-blue-200">
          <div className="text-center mb-8">
            <div className="text-8xl font-extrabold text-indigo-700 mb-4">
              {stats.percentage}%
            </div>
            <p className="text-2xl text-gray-700 font-semibold">
              Words Learned
            </p>
            <p className="text-lg text-gray-600 mt-2">
              {stats.learnedWords} out of {stats.totalWords} words
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4"
                style={{ width: `${stats.percentage}%` }}
              >
                {stats.percentage > 10 && (
                  <span className="text-white font-bold text-sm">{stats.percentage}%</span>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-blue-100">
              <div className="text-5xl font-extrabold text-indigo-700 mb-2">
                {stats.totalWords}
              </div>
              <p className="text-gray-600 font-semibold">Total Words</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-yellow-100">
              <div className="text-5xl font-extrabold text-yellow-600 mb-2">
                {stats.needPractice}
              </div>
              <p className="text-gray-600 font-semibold">Need Practice</p>
              <p className="text-sm text-gray-500 mt-1">Mastery Level 1-2</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center border-2 border-green-100">
              <div className="text-5xl font-extrabold text-green-600 mb-2">
                {stats.mastered}
              </div>
              <p className="text-gray-600 font-semibold">Mastered</p>
              <p className="text-sm text-gray-500 mt-1">Mastery Level 3+</p>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-indigo-100">
          {stats.percentage === 0 && (
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-3">🚀 Ready to start your journey?</p>
              <p className="text-gray-600 mb-6">Begin practicing with flashcards or take a quiz to track your progress!</p>
            </div>
          )}
          {stats.percentage > 0 && stats.percentage < 25 && (
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-3">🌱 Great start!</p>
              <p className="text-gray-600 mb-6">Keep practicing to build your vocabulary foundation.</p>
            </div>
          )}
          {stats.percentage >= 25 && stats.percentage < 50 && (
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-3">📈 Making progress!</p>
              <p className="text-gray-600 mb-6">You're building momentum. Keep it up!</p>
            </div>
          )}
          {stats.percentage >= 50 && stats.percentage < 75 && (
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-3">⭐ Excellent work!</p>
              <p className="text-gray-600 mb-6">You're more than halfway there. Keep pushing forward!</p>
            </div>
          )}
          {stats.percentage >= 75 && stats.percentage < 100 && (
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-3">🏆 Almost there!</p>
              <p className="text-gray-600 mb-6">You're so close to mastering all {stats.totalWords} words!</p>
            </div>
          )}
          {stats.percentage === 100 && (
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-3">🎉 Congratulations!</p>
              <p className="text-gray-600 mb-6">You've practiced all {stats.totalWords} words! Keep reviewing to maintain mastery.</p>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Practice Flashcards
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Take a Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
