import { useState } from 'react';

export default function Flashcard({ word, onNext, onMastery }) {
  const [flipped, setFlipped] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleKnow = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onMastery(word._id, 5);
      setFlipped(false);
      setShowSuccess(false);
      onNext();
    }, 500);
  };

  const handleDontKnow = () => {
    onMastery(word._id, 1);
    setFlipped(false);
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000">
      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-bounce text-xl font-bold">
            ✨ Great job! ✨
          </div>
        </div>
      )}

      {/* Flashcard Container with 3D Flip */}
      <div className="relative h-[450px] preserve-3d">
        <div
          onClick={handleFlip}
          className={`absolute inset-0 transition-all duration-700 transform-style-3d cursor-pointer ${
            flipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of Card */}
          <div
            className="absolute inset-0 backface-hidden bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center border-4 border-amber-400 hover:shadow-amber-200 hover:shadow-2xl transition-all"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-gradient-to-r from-red-500 to-amber-500 text-white rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                  {word.category}
                </span>
              </div>

              <div className="text-6xl font-black text-gray-900 mb-6 drop-shadow-md">
                {word.german}
              </div>

              <div className="flex items-center justify-center gap-2 text-amber-600 font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Click to see translation</span>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div
            className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center border-4 border-amber-400"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-center text-white">
              <div className="mb-4">
                <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold uppercase tracking-wide">
                  {word.category}
                </span>
              </div>

              <div className="text-6xl font-black mb-4 drop-shadow-lg">
                {word.english}
              </div>

              {word.pronunciation && (
                <div className="text-2xl text-amber-200 mb-6 font-medium">
                  [{word.pronunciation}]
                </div>
              )}

              {word.exampleSentence && (
                <div className="text-lg text-white/90 italic mt-6 pt-6 border-t border-white/30 max-w-md">
                  "{word.exampleSentence}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {flipped && (
        <div className="flex gap-4 mt-8 animate-slideUp">
          <button
            onClick={handleDontKnow}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-5 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Need Practice
            </span>
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-5 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              I Know This!
            </span>
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
