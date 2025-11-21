import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { vocabularyAPI } from '../services/api';
import Flashcard from '../components/Flashcard';

export default function Dashboard() {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('flashcards');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const categories = [
    'all', 'greetings', 'numbers', 'colors', 'family', 'food', 'verbs'
  ];

  useEffect(() => {
    loadVocabulary();
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

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      loadVocabulary(); // Load new set when finished
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMastery = async (vocabularyId, masteryLevel) => {
    try {
      await vocabularyAPI.updateProgress({ vocabularyId, masteryLevel });
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">German Learning App</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-8 py-3 font-medium transition-colors ${
                activeTab === 'flashcards'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Flashcards
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className={`px-8 py-3 font-medium transition-colors ${
                activeTab === 'quiz'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quiz
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose a category:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 text-center">
          <p className="text-gray-600">
            Card {currentIndex + 1} of {words.length}
          </p>
        </div>

        {words.length > 0 && (
          <>
            <Flashcard
              word={words[currentIndex]}
              onNext={handleNext}
              onMastery={handleMastery}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  currentIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}

        {words.length === 0 && (
          <div className="text-center text-gray-600 mt-12">
            <p className="text-xl">No words available in this category.</p>
            <button
              onClick={loadVocabulary}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
