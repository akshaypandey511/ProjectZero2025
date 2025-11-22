import { useState, useEffect } from 'react';
import { weeklyReflectionsAPI, dailyHabitsAPI } from '../services/api';

export default function WeeklyPracticeSection() {
  const [weeklyJournal, setWeeklyJournal] = useState('');
  const [checklist, setChecklist] = useState({
    created_this_week: '',
    concept_clicked: '',
    got_stuck: '',
    protected_time: false,
    do_differently: '',
  });
  const [weekDays, setWeekDays] = useState([]);
  const [habitData, setHabitData] = useState({});

  useEffect(() => {
    initializeWeek();
    loadWeeklyReflection();
    loadHabits();
  }, []);

  const initializeWeek = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    const weekDates = days.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return {
        label: day,
        date: date.toISOString().split('T')[0],
      };
    });
    setWeekDays(weekDates);
  };

  const loadWeeklyReflection = async () => {
    try {
      const today = new Date();
      const currentDay = today.getDay();
      const monday = new Date(today);
      monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
      const weekStart = monday.toISOString().split('T')[0];

      const response = await weeklyReflectionsAPI.getByDate(weekStart);
      if (response.data) {
        setWeeklyJournal(response.data.journal_entry || '');
        setChecklist({
          created_this_week: response.data.created_this_week || '',
          concept_clicked: response.data.concept_clicked || '',
          got_stuck: response.data.got_stuck || '',
          protected_time: response.data.protected_time || false,
          do_differently: response.data.do_differently || '',
        });
      }
    } catch (error) {
      console.error('Error loading weekly reflection:', error);
    }
  };

  const loadHabits = async () => {
    try {
      const response = await dailyHabitsAPI.getAll();
      const habitsMap = {};
      response.data.forEach((habit) => {
        habitsMap[habit.date] = habit.morning_deep_work || habit.evening_exploration || habit.weekend_build;
      });
      setHabitData(habitsMap);
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  };

  const toggleDay = async (date) => {
    try {
      const isCompleted = habitData[date];
      await dailyHabitsAPI.save({
        date,
        morning_deep_work: !isCompleted,
        evening_exploration: false,
        weekend_build: false,
        notes: '',
      });
      setHabitData((prev) => ({ ...prev, [date]: !isCompleted }));
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
  };

  const saveWeeklyReflection = async () => {
    try {
      const today = new Date();
      const currentDay = today.getDay();
      const monday = new Date(today);
      monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
      const weekStart = monday.toISOString().split('T')[0];

      await weeklyReflectionsAPI.save({
        week_start_date: weekStart,
        journal_entry: weeklyJournal,
        ...checklist,
      });
      alert('Weekly reflection saved!');
    } catch (error) {
      console.error('Error saving weekly reflection:', error);
      alert('Error saving. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          📅 Weekly Learning Ritual
        </h3>
        <p className="text-gray-300 mb-6">
          Consistency beats intensity. Here's a sustainable 10-hour/week structure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h5 className="text-neon-gold font-semibold mb-2">🌅 Morning Deep Work</h5>
            <p className="text-gray-400 text-sm">
              5 hrs/week. 1 hour before work, 5 days. Code tutorials, build projects. No email, no Slack.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h5 className="text-neon-gold font-semibold mb-2">🌙 Evening Exploration</h5>
            <p className="text-gray-400 text-sm">
              3 hrs/week. Read, watch talks, explore ideas. Low pressure, high curiosity.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h5 className="text-neon-gold font-semibold mb-2">📆 Weekend Build</h5>
            <p className="text-gray-400 text-sm">
              2 hrs/week. Apply what you learned. Tiny projects, experiments, writing.
            </p>
          </div>
        </div>

        <h4 className="text-neon-green font-semibold mb-3">This Week's Tracker</h4>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekDays.map((day) => (
            <div
              key={day.date}
              onClick={() => toggleDay(day.date)}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs cursor-pointer transition-all ${
                habitData[day.date]
                  ? 'bg-gradient-to-br from-neon-cyan to-neon-green text-dark-bg font-bold'
                  : 'bg-white/5 hover:bg-neon-cyan/20'
              }`}
            >
              {day.label}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4 text-neon-cyan">
          ✅ Weekly Reflection Checklist
        </h3>
        <p className="text-gray-300 mb-4">Every Sunday, spend 20 minutes on this:</p>

        <div className="space-y-3 mb-6">
          <div>
            <label className="text-sm text-neon-cyan mb-1 block">
              What did I build/create this week? (Not just consume)
            </label>
            <input
              type="text"
              value={checklist.created_this_week}
              onChange={(e) =>
                setChecklist((prev) => ({ ...prev, created_this_week: e.target.value }))
              }
              className="w-full"
              placeholder="Describe what you built..."
            />
          </div>

          <div>
            <label className="text-sm text-neon-cyan mb-1 block">
              What concept clicked? Write it in your own words.
            </label>
            <input
              type="text"
              value={checklist.concept_clicked}
              onChange={(e) =>
                setChecklist((prev) => ({ ...prev, concept_clicked: e.target.value }))
              }
              className="w-full"
              placeholder="What clicked this week..."
            />
          </div>

          <div>
            <label className="text-sm text-neon-cyan mb-1 block">
              Where did I get stuck? Note it for next week.
            </label>
            <input
              type="text"
              value={checklist.got_stuck}
              onChange={(e) =>
                setChecklist((prev) => ({ ...prev, got_stuck: e.target.value }))
              }
              className="w-full"
              placeholder="Where you got stuck..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="protected-time"
              checked={checklist.protected_time}
              onChange={(e) =>
                setChecklist((prev) => ({ ...prev, protected_time: e.target.checked }))
              }
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor="protected-time" className="text-sm cursor-pointer">
              Did I protect my learning time?
            </label>
          </div>

          <div>
            <label className="text-sm text-neon-cyan mb-1 block">
              One thing I'll do differently next week.
            </label>
            <input
              type="text"
              value={checklist.do_differently}
              onChange={(e) =>
                setChecklist((prev) => ({ ...prev, do_differently: e.target.value }))
              }
              className="w-full"
              placeholder="What to do differently..."
            />
          </div>
        </div>

        <div className="bg-neon-cyan/10 border-l-4 border-neon-cyan rounded-r-lg p-4 mb-4">
          <p className="font-semibold mb-2 text-sm">Weekly Journal:</p>
          <p className="text-xs text-gray-400 mb-2">
            What's one thing you learned this week that changed how you think?
          </p>
        </div>
        <textarea
          value={weeklyJournal}
          onChange={(e) => setWeeklyJournal(e.target.value)}
          placeholder="Write your weekly reflection here..."
          className="w-full min-h-[120px]"
        />

        <button onClick={saveWeeklyReflection} className="btn-primary mt-4">
          Save Weekly Reflection
        </button>
      </div>
    </div>
  );
}
