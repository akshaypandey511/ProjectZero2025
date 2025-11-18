import { useEffect, useState } from 'react';

export default function ProgressStats({ progress }) {
  const [stats, setStats] = useState({
    totalWords: 0,
    masteredWords: 0,
    practiceWords: 0,
    masteryPercentage: 0,
  });

  useEffect(() => {
    if (progress && progress.length > 0) {
      const totalWords = progress.length;
      const masteredWords = progress.filter(p => p.masteryLevel >= 4).length;
      const practiceWords = progress.filter(p => p.masteryLevel < 4).length;
      const masteryPercentage = Math.round((masteredWords / totalWords) * 100);

      setStats({
        totalWords,
        masteredWords,
        practiceWords,
        masteryPercentage,
      });
    }
  }, [progress]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Words Practiced */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">Words Practiced</p>
            <p className="text-4xl font-black">{stats.totalWords}</p>
          </div>
          <div className="bg-white/20 rounded-full p-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mastered Words */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium mb-1">Mastered</p>
            <p className="text-4xl font-black">{stats.masteredWords}</p>
          </div>
          <div className="bg-white/20 rounded-full p-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mastery Percentage */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-amber-100 text-sm font-medium mb-1">Mastery Level</p>
            <p className="text-4xl font-black">{stats.masteryPercentage}%</p>
          </div>
          <div className="bg-white/20 rounded-full p-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="bg-white/30 rounded-full h-2 overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-1000 rounded-full"
            style={{ width: `${stats.masteryPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
