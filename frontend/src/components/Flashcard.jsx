import { useState } from 'react';

export default function Flashcard({ word, onNext, onMastery }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleKnow = () => {
    onMastery(word._id, 5);
    setFlipped(false);
    onNext();
  };

  const handleDontKnow = () => {
    onMastery(word._id, 1);
    setFlipped(false);
    onNext();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        onClick={handleFlip}
        className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-14 min-h-[450px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 active:scale-98 border border-gray-100"
      >
        <div className="text-center w-full">
          <div className="mb-6">
            <span className="inline-block px-5 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold uppercase tracking-wide">
              {word.category}
            </span>
          </div>

          <div className="text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
            {flipped ? word.english : word.german}
          </div>

          {flipped && word.pronunciation && (
            <div className="text-2xl text-gray-500 mb-6 font-medium">
              [{word.pronunciation}]
            </div>
          )}

          {flipped && word.exampleSentence && (
            <div className="text-lg text-gray-600 italic mt-8 border-t border-gray-200 pt-8 max-w-lg mx-auto leading-relaxed">
              "{word.exampleSentence}"
            </div>
          )}

          {!flipped && (
            <div className="flex items-center justify-center gap-2 text-gray-400 text-base mt-10 animate-pulse">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span className="font-medium">Click to flip</span>
            </div>
          )}
        </div>
      </div>

      {flipped && (
        <div className="flex gap-5 mt-8">
          <button
            onClick={handleDontKnow}
            className="flex-1 bg-red-500 text-white py-5 rounded-xl hover:bg-red-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Need Practice
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 bg-green-500 text-white py-5 rounded-xl hover:bg-green-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            I Know This!
          </button>
        </div>
      )}
    </div>
  );
}
