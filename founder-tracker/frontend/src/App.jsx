import { useState } from 'react';
import Header from './components/Header';
import DiagnoseSection from './components/DiagnoseSection';
import SkillsSection from './components/SkillsSection';
import WeeklyPracticeSection from './components/WeeklyPracticeSection';
import ProblemDiscoverySection from './components/ProblemDiscoverySection';
import RoadmapSection from './components/RoadmapSection';

function App() {
  const [activeTab, setActiveTab] = useState('diagnose');

  const tabs = [
    { id: 'diagnose', label: '1. Diagnose' },
    { id: 'skills', label: '2. Skill Map' },
    { id: 'weekly', label: '3. Weekly Practice' },
    { id: 'problem', label: '4. Problem Discovery' },
    { id: 'roadmap', label: '5. 3-Year Roadmap' },
  ];

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* Tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-lg text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-br from-neon-cyan/20 to-neon-green/20 border border-neon-cyan'
                  : 'glass-card hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sections */}
        <div className="animate-fade-in">
          {activeTab === 'diagnose' && <DiagnoseSection />}
          {activeTab === 'skills' && <SkillsSection />}
          {activeTab === 'weekly' && <WeeklyPracticeSection />}
          {activeTab === 'problem' && <ProblemDiscoverySection />}
          {activeTab === 'roadmap' && <RoadmapSection />}
        </div>
      </div>
    </div>
  );
}

export default App;
