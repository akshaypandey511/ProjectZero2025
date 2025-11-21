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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">German Learning App</h1>
            <p className="text-base text-gray-600 mt-1">Welcome, <span className="font-semibold text-indigo-600">{user?.name}</span>!</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-14">
          <div className="inline-block px-5 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold tracking-wide mb-6">
            Test Your Knowledge
          </div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-5">Choose Your Quiz</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Each quiz contains 10 questions. Test your German knowledge and track your progress!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {quizCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleQuizSelect(category.id)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left border border-gray-100 group"
            >
              <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
              <p className="text-gray-600 leading-relaxed mb-5">{category.description}</p>
              <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors">
                Start Quiz
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
