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
        className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-3xl shadow-2xl p-14 min-h-[450px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 active:scale-98 border-2 border-blue-200"
      >
        <div className="text-center w-full">
          <div className="mb-6">
            <span className="inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-semibold uppercase tracking-wide shadow-lg">
              {word.category}
            </span>
          </div>

          <div className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 leading-tight">
            {flipped ? word.english : word.german}
          </div>

          {flipped && word.pronunciation && (
            <div className="text-2xl text-indigo-700 mb-6 font-medium">
              [{word.pronunciation}]
            </div>
          )}

          {flipped && word.exampleSentence && (
            <div className="text-lg text-gray-700 italic mt-8 border-t-2 border-blue-300 pt-8 max-w-lg mx-auto leading-relaxed">
              "{word.exampleSentence}"
            </div>
          )}

          {!flipped && (
            <div className="flex items-center justify-center gap-2 text-indigo-500 text-base mt-10 animate-pulse">
              <span className="text-xl">🐱</span>
              <span className="font-medium">Click to flip</span>
            </div>
          )}
        </div>
      </div>

      {flipped && (
        <div className="flex gap-5 mt-8">
          <button
            onClick={handleDontKnow}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-5 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Need Practice
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-5 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            I Know This!
          </button>
        </div>
      )}
    </div>
  );
}
