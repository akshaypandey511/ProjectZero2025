import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { vocabularyAPI } from '../services/api';
import Flashcard from '../components/Flashcard';
import ProgressStats from '../components/ProgressStats';

export default function Dashboard() {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [progress, setProgress] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const categories = [
    'all', 'greetings', 'numbers', 'colors', 'family', 'food', 'verbs'
  ];

  useEffect(() => {
    loadVocabulary();
    loadProgress();
  }, [selectedCategory]);

  const loadVocabulary = async () => {
    try {
      setLoading(true);
      const params = selectedCategory === 'all' ? { limit: 20 } : { limit: 20, category: selectedCategory };
      const response = await vocabularyAPI.getRandom(params);
      setWords(response.data.data);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error loading vocabulary:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async () => {
    try {
      const response = await vocabularyAPI.getProgress();
      setProgress(response.data.data);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      loadVocabulary(); // Load new set when finished
    }
  };

  const handleMastery = async (vocabularyId, masteryLevel) => {
    try {
      await vocabularyAPI.updateProgress({ vocabularyId, masteryLevel });
      loadProgress(); // Reload progress to update stats
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400 mb-4"></div>
          <div className="text-2xl text-white font-bold">Loading your German lesson...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-gray-900 to-black shadow-2xl border-b-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">DE</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Deutsch Lernen</h1>
                <p className="text-sm text-amber-400 font-medium">Welcome back, {user?.name}! 🇩🇪</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Stats */}
        {progress.length > 0 && (
          <ProgressStats progress={progress} />
        )}

        {/* Category Selection */}
        <div className="mb-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Choose Your Topic
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 shadow-lg shadow-amber-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Card Counter */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-gradient-to-r from-red-600 to-amber-500 px-6 py-2 rounded-full">
            <p className="text-white font-bold">
              Card {currentIndex + 1} of {words.length}
            </p>
          </div>
        </div>

        {/* Flashcard */}
        {words.length > 0 && (
          <Flashcard
            word={words[currentIndex]}
            onNext={handleNext}
            onMastery={handleMastery}
          />
        )}

        {/* No Words Message */}
        {words.length === 0 && (
          <div className="text-center text-white mt-12 bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-2xl font-bold mb-4">No words available in this category</p>
            <button
              onClick={loadVocabulary}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all font-bold shadow-lg"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
