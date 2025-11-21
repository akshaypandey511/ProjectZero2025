import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function QuizSelection() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const quizCategories = [
    { id: 'all', name: 'All Categories', icon: '📚', description: 'Mix of all vocabulary' },
    { id: 'greetings', name: 'Greetings', icon: '👋', description: 'Common greetings and farewells' },
    { id: 'numbers', name: 'Numbers', icon: '🔢', description: 'Numbers and counting' },
    { id: 'colors', name: 'Colors', icon: '🎨', description: 'Color vocabulary' },
    { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Family members' },
    { id: 'food', name: 'Food', icon: '🍽️', description: 'Food and drinks' },
    { id: 'verbs', name: 'Verbs', icon: '⚡', description: 'Common action verbs' },
    { id: 'animals', name: 'Animals', icon: '🐾', description: 'Animal names' },
    { id: 'articles', name: 'Articles (der/die/das)', icon: '📖', description: 'Test your article knowledge' },
  ];

  const handleQuizSelect = (category) => {
    navigate(`/quiz/${category}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">German Learning App</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name}!</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Quiz</h2>
          <p className="text-lg text-gray-600">
            Each quiz contains 10 questions. Test your German knowledge!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleQuizSelect(category.id)}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 text-left"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
              <div className="mt-4 flex items-center text-indigo-600 font-medium">
                Start Quiz
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
