import { useState, useEffect } from 'react';
import { milestonesAPI } from '../services/api';

export default function RoadmapSection() {
  const [milestones, setMilestones] = useState([]);
  const [groupedMilestones, setGroupedMilestones] = useState({});

  useEffect(() => {
    loadMilestones();
  }, []);

  const loadMilestones = async () => {
    try {
      const response = await milestonesAPI.getAll();
      setMilestones(response.data);

      // Group by phase
      const grouped = response.data.reduce((acc, milestone) => {
        if (!acc[milestone.phase]) {
          acc[milestone.phase] = [];
        }
        acc[milestone.phase].push(milestone);
        return acc;
      }, {});
      setGroupedMilestones(grouped);
    } catch (error) {
      console.error('Error loading milestones:', error);
    }
  };

  const toggleMilestone = async (id, completed) => {
    try {
      await milestonesAPI.update(id, {
        completed: !completed,
        completion_date: !completed ? new Date().toISOString().split('T')[0] : null,
        notes: '',
        target_date: null,
      });
      loadMilestones();
    } catch (error) {
      console.error('Error updating milestone:', error);
    }
  };

  const getPhaseColor = (phaseNumber) => {
    const colors = {
      1: 'border-red-500',
      2: 'border-yellow-500',
      3: 'border-green-500',
      4: 'border-neon-cyan',
    };
    return colors[phaseNumber] || 'border-neon-cyan';
  };

  const getPhaseDescription = (phase) => {
    const descriptions = {
      'Foundation': {
        focus: 'Build coding fundamentals + problem discovery habit',
        timeframe: 'Now - Month 6',
      },
      'Acceleration': {
        focus: 'Build real projects + validate 1-2 problem areas',
        timeframe: 'Month 7-12',
      },
      'Pre-Launch': {
        focus: 'Serious validation + build founding skills',
        timeframe: 'Year 2',
      },
      'Launch Ready': {
        focus: 'Transition planning + early venture',
        timeframe: 'Year 3 → India Return',
      },
    };
    return descriptions[phase] || { focus: '', timeframe: '' };
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          🗺️ Your 3-Year Founder Preparation Roadmap
        </h3>

        <div className="relative pl-8">
          {/* Timeline line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan to-neon-green" />

          {Object.entries(groupedMilestones).map(([phase, phaseMilestones]) => {
            const phaseInfo = getPhaseDescription(phase);
            const phaseNumber = phaseMilestones[0]?.phase_number || 1;

            return (
              <div key={phase} className="mb-8 relative">
                {/* Phase dot */}
                <div
                  className={`absolute -left-6 top-1 w-3 h-3 rounded-full ${
                    phaseNumber === 1
                      ? 'bg-red-500'
                      : phaseNumber === 2
                      ? 'bg-yellow-500'
                      : phaseNumber === 3
                      ? 'bg-green-500'
                      : 'bg-neon-cyan'
                  }`}
                />

                <h4 className="text-neon-gold font-semibold mb-2">
                  Phase {phaseNumber}: {phase}
                </h4>
                <p className="text-sm text-gray-400 mb-1">
                  <strong>Timeframe:</strong> {phaseInfo.timeframe}
                </p>
                <p className="text-sm text-gray-300 mb-4">
                  <strong>Focus:</strong> {phaseInfo.focus}
                </p>

                <ul className="space-y-2 ml-2">
                  {phaseMilestones.map((milestone) => (
                    <li
                      key={milestone.id}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <input
                        type="checkbox"
                        checked={milestone.completed}
                        onChange={() =>
                          toggleMilestone(milestone.id, milestone.completed)
                        }
                        className="w-5 h-5 mt-0.5 cursor-pointer flex-shrink-0"
                      />
                      <span
                        className={
                          milestone.completed
                            ? 'line-through text-gray-500'
                            : ''
                        }
                      >
                        {milestone.title}
                        {milestone.description && (
                          <span className="block text-xs text-gray-500 mt-1">
                            {milestone.description}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          🎯 Your Immediate Next Steps
        </h3>
        <p className="text-gray-300 mb-4">
          Don't try to do everything. Start with these 3 actions this week:
        </p>

        <div className="space-y-3">
          <div className="bg-neon-green/10 border-l-4 border-neon-green rounded-r-lg p-4">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Action 1:</strong> Block 1 hour every morning (before work) for the next 2 weeks. Put it in your calendar as "non-negotiable."
            </p>
          </div>

          <div className="bg-neon-green/10 border-l-4 border-neon-green rounded-r-lg p-4">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Action 2:</strong> Start CS50P (free on edX) or The Odin Project. Complete the first module by end of next week.
            </p>
          </div>

          <div className="bg-neon-green/10 border-l-4 border-neon-green rounded-r-lg p-4">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Action 3:</strong> Buy a notebook. Every day, write down one problem or frustration you notice (at work, in life, anywhere). Do this for 30 days.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-neon-gold/10 to-orange-500/10 border border-neon-gold/30 rounded-lg p-5 mt-6">
          <h4 className="text-neon-gold font-semibold mb-2">Remember</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            You're not behind. You have 3-5 years to prepare. The goal isn't to become a senior engineer — it's to become a <strong>capable technical founder</strong> who can build v0.1, hire well, and make informed decisions.
          </p>
          <p className="text-gray-300 text-sm">
            FOMO is noise. Consistent, focused learning is signal.
          </p>
        </div>
      </div>
    </div>
  );
}
