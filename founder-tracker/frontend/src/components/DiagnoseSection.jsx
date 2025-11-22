import { useState, useEffect } from 'react';
import { reflectionsAPI } from '../services/api';

export default function DiagnoseSection() {
  const [reflections, setReflections] = useState({
    reflection1: '',
    reflection2: '',
    reflection3: '',
    reflection4: '',
  });
  const [saved, setSaved] = useState(false);

  const questions = [
    {
      id: 'reflection1',
      text: 'In the last 2-3 years, what\'s the hardest problem you solved at work? What made it hard — technical complexity, stakeholder politics, or ambiguity?',
    },
    {
      id: 'reflection2',
      text: 'If you had to build an MVP of a simple app tomorrow (say, a habit tracker), what would you be able to do yourself vs. need help with? Be specific.',
    },
    {
      id: 'reflection3',
      text: 'What do you spend most of your time on at work? What % is execution vs. coordination vs. thinking/strategy?',
    },
    {
      id: 'reflection4',
      text: 'What would you need to say NO to in order to create 10 hours/week of deep learning time?',
    },
  ];

  useEffect(() => {
    // Load saved reflections
    const loadReflections = async () => {
      try {
        const responses = await Promise.all(
          questions.map((q) => reflectionsAPI.getByQuestionId(q.id))
        );
        const loadedReflections = {};
        responses.forEach((res, idx) => {
          if (res.data) {
            loadedReflections[questions[idx].id] = res.data.answer || '';
          }
        });
        setReflections((prev) => ({ ...prev, ...loadedReflections }));
      } catch (error) {
        console.error('Error loading reflections:', error);
      }
    };
    loadReflections();
  }, []);

  const handleChange = (id, value) => {
    setReflections((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    try {
      await Promise.all(
        questions.map((q) =>
          reflectionsAPI.save({
            question_id: q.id,
            question_text: q.text,
            answer: reflections[q.id],
          })
        )
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving reflections:', error);
      alert('Error saving reflections. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          🔍 Honest Self-Assessment
        </h3>
        <p className="text-gray-300 mb-6">
          Before building new skills, understand where you truly are. Be brutally honest.
        </p>

        {questions.map((question, index) => (
          <div key={question.id} className="mb-6">
            <div className="bg-neon-cyan/10 border-l-4 border-neon-cyan rounded-r-lg p-4 mb-3">
              <p className="font-medium text-sm">
                <strong>Reflection {index + 1}:</strong> {question.text}
              </p>
            </div>
            <textarea
              value={reflections[question.id]}
              onChange={(e) => handleChange(question.id, e.target.value)}
              placeholder="Write your thoughts here..."
              className="w-full min-h-[100px] bg-black/30 border border-white/10 rounded-lg p-3 text-gray-200 focus:border-neon-cyan focus:outline-none"
            />
          </div>
        ))}

        <button onClick={handleSave} className="btn-primary">
          Save Reflections
          {saved && <span className="ml-2 text-sm">✓ Saved!</span>}
        </button>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          ⚡ The Stagnation Trap
        </h3>
        <div className="bg-gradient-to-r from-neon-gold/10 to-orange-500/10 border border-neon-gold/30 rounded-lg p-5 mb-4">
          <h4 className="text-neon-gold font-semibold mb-2">
            Why This Happens to Senior PMs
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            As you move up, you get rewarded for coordination, not creation. Your calendar fills with meetings. The dopamine comes from "influencing" not "building." This is a trap — especially if your goal is entrepreneurship.
          </p>
          <p className="text-gray-300 text-sm mt-3">
            <strong className="text-neon-green">The fix:</strong> Deliberately carve out "maker time" and protect it like your most important meeting.
          </p>
        </div>
      </div>
    </div>
  );
}
