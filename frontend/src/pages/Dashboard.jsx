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
              onClick={() => setActiveTab('flashcards')}
              className={`px-10 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'flashcards'
                  ? 'border-b-3 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900 hover:border-b-3 hover:border-gray-300'
              }`}
            >
              📚 Flashcards
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className={`px-10 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'quiz'
                  ? 'border-b-3 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900 hover:border-b-3 hover:border-gray-300'
              }`}
            >
              🎯 Quiz
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-5">Choose a category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-7 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                    : 'bg-gradient-to-br from-white to-blue-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-200 hover:border-blue-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 text-center">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg border-2 border-blue-300">
            <p className="text-white font-semibold">
              Card <span className="font-extrabold">{currentIndex + 1}</span> of <span className="font-extrabold">{words.length}</span>
            </p>
          </div>
        </div>

        {words.length > 0 && (
          <>
            <Flashcard
              word={words[currentIndex]}
              onNext={handleNext}
              onMastery={handleMastery}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-5 mt-10">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                  currentIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-2 border-blue-300 hover:from-blue-200 hover:to-indigo-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
