import { useState, useEffect } from 'react';
import { problemSignalsAPI } from '../services/api';

export default function ProblemDiscoverySection() {
  const [problems, setProblems] = useState({
    problem1: '',
    problem2: '',
    problem3: '',
    problem4: '',
  });
  const [problemList, setProblemList] = useState([]);

  const questions = [
    {
      id: 'problem1',
      text: 'What\'s something broken or frustrating in your industry that everyone just accepts as "how it is"?',
    },
    {
      id: 'problem2',
      text: 'What tools do you wish existed for your job? What manual work could be automated?',
    },
    {
      id: 'problem3',
      text: 'When you return to India, what problems will you see with fresh eyes? What\'s missing in the market there?',
    },
    {
      id: 'problem4',
      text: 'What do people ask you for help with? What comes easy to you but seems hard for others?',
    },
  ];

  useEffect(() => {
    loadProblems();
  }, []);

  const loadProblems = async () => {
    try {
      const response = await problemSignalsAPI.getAll();
      setProblemList(response.data);

      // Load problem signals into textarea
      const loadedProblems = {};
      questions.forEach((q) => {
        const found = response.data.find((p) => p.signal_type === q.id);
        if (found) {
          loadedProblems[q.id] = found.description || '';
        }
      });
      setProblems((prev) => ({ ...prev, ...loadedProblems }));
    } catch (error) {
      console.error('Error loading problems:', error);
    }
  };

  const handleChange = (id, value) => {
    setProblems((prev) => ({ ...prev, [id]: value }));
  };

  const saveProblemSignals = async () => {
    try {
      // Delete existing problem signals for these question types
      const existingProblems = problemList.filter((p) =>
        questions.some((q) => q.id === p.signal_type)
      );
      await Promise.all(existingProblems.map((p) => problemSignalsAPI.delete(p.id)));

      // Save new ones
      await Promise.all(
        questions.map((q) => {
          if (problems[q.id] && problems[q.id].trim()) {
            return problemSignalsAPI.save({
              signal_type: q.id,
              title: q.text.substring(0, 100),
              description: problems[q.id],
              category: 'reflection',
              validated: false,
            });
          }
          return Promise.resolve();
        })
      );

      alert('Problem signals saved!');
      loadProblems();
    } catch (error) {
      console.error('Error saving problems:', error);
      alert('Error saving. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          🔎 Finding Your Problem to Solve
        </h3>
        <p className="text-gray-300 mb-6">
          The best founders solve problems they deeply understand. Start collecting "problem signals" now.
        </p>

        <div className="bg-gradient-to-r from-neon-gold/10 to-orange-500/10 border border-neon-gold/30 rounded-lg p-5 mb-6">
          <h4 className="text-neon-gold font-semibold mb-2">Your Unfair Advantages</h4>
          <p className="text-gray-300 text-sm">
            You have unique insight into: <strong>Energy management, industrial software, B2B SaaS, European enterprise, SAFe/Agile at scale.</strong> Don't ignore these — they're your edge.
          </p>
        </div>

        {questions.map((question, index) => (
          <div key={question.id} className="mb-6">
            <div className="bg-neon-cyan/10 border-l-4 border-neon-cyan rounded-r-lg p-4 mb-3">
              <p className="font-medium text-sm">
                <strong>Problem Signal {index + 1}:</strong> {question.text}
              </p>
            </div>
            <textarea
              value={problems[question.id]}
              onChange={(e) => handleChange(question.id, e.target.value)}
              placeholder="Write your thoughts here..."
              className="w-full min-h-[100px]"
            />
          </div>
        ))}

        <button onClick={saveProblemSignals} className="btn-primary">
          Save Problem Signals
        </button>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          🧪 Validation Experiments
        </h3>
        <p className="text-gray-300 mb-4">
          Before building, test your assumptions cheaply.
        </p>

        <div className="space-y-3">
          <div className="bg-neon-green/10 border-l-4 border-neon-green rounded-r-lg p-4">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Experiment 1:</strong> Pick one problem signal. Talk to 5 people who have this problem. Don't pitch — just listen. Document what you learn.
            </p>
          </div>

          <div className="bg-neon-green/10 border-l-4 border-neon-green rounded-r-lg p-4">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Experiment 2:</strong> Create a "fake door" — a landing page for a solution that doesn't exist yet. See if anyone signs up for the waitlist.
            </p>
          </div>

          <div className="bg-neon-green/10 border-l-4 border-neon-green rounded-r-lg p-4">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Experiment 3:</strong> Solve the problem manually for one person. Charge them something (even €20). Did they pay? Did it work?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
