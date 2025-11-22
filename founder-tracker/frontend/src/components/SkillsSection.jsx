import { useState, useEffect } from 'react';
import { skillsAPI } from '../services/api';

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.data);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const updateSkillLevel = async (id, currentLevel, targetLevel) => {
    try {
      await skillsAPI.update(id, {
        current_level: currentLevel,
        target_level: targetLevel,
      });
      loadSkills();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const getGradientColor = (level) => {
    if (level < 30) return 'from-red-500 to-yellow-500';
    if (level < 60) return 'from-yellow-500 to-green-500';
    return 'from-green-500 to-neon-cyan';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technical':
        return '🐍';
      case 'product':
        return '🎨';
      case 'business':
        return '💰';
      default:
        return '📊';
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          🎯 The Technical Founder Stack
        </h3>
        <p className="text-gray-300 mb-6">
          You don't need to be a 10x engineer. You need to be "dangerous enough" to build v0.1 and evaluate talent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all"
            >
              <h5 className="text-neon-gold font-semibold mb-2 flex items-center gap-2">
                <span>{getCategoryIcon(skill.skill_category)}</span>
                {skill.skill_name}
              </h5>
              <p className="text-gray-400 text-sm mb-4">{skill.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Current Level</span>
                  <span>{skill.current_level}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.current_level}
                  onChange={(e) =>
                    updateSkillLevel(
                      skill.id,
                      parseInt(e.target.value),
                      skill.target_level
                    )
                  }
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/10"
                  style={{
                    background: `linear-gradient(to right, #00d9ff ${skill.current_level}%, rgba(255,255,255,0.1) ${skill.current_level}%)`,
                  }}
                />

                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full bg-gradient-to-r ${getGradientColor(skill.current_level)} transition-all duration-500`}
                    style={{ width: `${skill.current_level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          📚 Curated Learning Paths
        </h3>

        <h4 className="text-neon-green font-semibold mb-2 mt-4">
          For Coding (Pick ONE to start)
        </h4>
        <div className="bg-neon-green/10 border-l-4 border-neon-green rounded-r-lg p-4 mb-4">
          <p className="text-sm text-gray-300 mb-2">
            <strong className="text-white">Path A — Python First:</strong> CS50P
            (Harvard, free) → Automate the Boring Stuff → Build 3 personal tools
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-white">Path B — Web First:</strong> The Odin
            Project → Build a simple SaaS landing page → Add backend with Supabase
          </p>
        </div>

        <h4 className="text-neon-green font-semibold mb-2 mt-4">
          For AI/ML Literacy
        </h4>
        <div className="bg-neon-green/10 border-l-4 border-neon-green rounded-r-lg p-4 mb-4">
          <p className="text-sm text-gray-300">
            <strong className="text-white">Fast Track:</strong> fast.ai "Practical
            Deep Learning" (just Part 1) → Build one AI-powered feature using APIs
            → Follow AI Twitter/newsletters (Latent Space, The Batch)
          </p>
        </div>

        <h4 className="text-neon-green font-semibold mb-2 mt-4">
          For Product Depth
        </h4>
        <div className="bg-neon-green/10 border-l-4 border-neon-green rounded-r-lg p-4">
          <p className="text-sm text-gray-300 mb-2">
            <strong className="text-white">Books:</strong> "Inspired" (Cagan),
            "Continuous Discovery Habits" (Torres), "The Mom Test" (Fitzpatrick)
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-white">Practice:</strong> Do 5 user interviews
            for a problem you care about (not work-related)
          </p>
        </div>
      </div>
    </div>
  );
}
