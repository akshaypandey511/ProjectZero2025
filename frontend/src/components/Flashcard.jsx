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
    <div className="w-full max-w-2xl mx-auto">
      <div
        onClick={handleFlip}
        className="bg-white rounded-2xl shadow-2xl p-12 min-h-[400px] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
      >
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              {word.category}
            </span>
          </div>

          <div className="text-5xl font-bold text-gray-900 mb-6">
            {flipped ? word.english : word.german}
          </div>

          {flipped && word.pronunciation && (
            <div className="text-xl text-gray-500 mb-4">
              [{word.pronunciation}]
            </div>
          )}

          {flipped && word.exampleSentence && (
            <div className="text-lg text-gray-600 italic mt-6 border-t pt-6">
              "{word.exampleSentence}"
            </div>
          )}

          {!flipped && (
            <div className="text-gray-400 text-sm mt-8">
              Click to flip
            </div>
          )}
        </div>
      </div>

      {flipped && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleDontKnow}
            className="flex-1 bg-red-500 text-white py-4 rounded-xl hover:bg-red-600 transition-colors font-medium text-lg"
          >
            Need Practice
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 bg-green-500 text-white py-4 rounded-xl hover:bg-green-600 transition-colors font-medium text-lg"
          >
            I Know This!
          </button>
        </div>
      )}
    </div>
  );
}
