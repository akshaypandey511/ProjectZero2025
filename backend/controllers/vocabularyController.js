const Vocabulary = require('../models/Vocabulary');
const User = require('../models/User');

// @desc    Get all vocabulary words
// @route   GET /api/vocabulary
exports.getAllVocabulary = async (req, res) => {
  try {
    const { category, level } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (level) filter.level = level;

    const vocabulary = await Vocabulary.find(filter);
    res.json({ success: true, count: vocabulary.length, data: vocabulary });
  } catch (error) {
    console.error('Get vocabulary error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get vocabulary by category
// @route   GET /api/vocabulary/category/:category
exports.getByCategory = async (req, res) => {
  try {
    const vocabulary = await Vocabulary.find({ category: req.params.category });
    res.json({ success: true, count: vocabulary.length, data: vocabulary });
  } catch (error) {
    console.error('Get vocabulary by category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get random vocabulary for practice
// @route   GET /api/vocabulary/random
exports.getRandomVocabulary = async (req, res) => {
  try {
    const { limit = 10, category } = req.query;
    const filter = category ? { category } : {};

    const vocabulary = await Vocabulary.aggregate([
      { $match: filter },
      { $sample: { size: parseInt(limit) } }
    ]);

    res.json({ success: true, count: vocabulary.length, data: vocabulary });
  } catch (error) {
    console.error('Get random vocabulary error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update user progress
// @route   POST /api/vocabulary/progress
exports.updateProgress = async (req, res) => {
  try {
    const { vocabularyId, masteryLevel } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    // Find existing progress entry
    const progressIndex = user.progress.findIndex(
      p => p.vocabularyId.toString() === vocabularyId
    );

    if (progressIndex > -1) {
      // Update existing progress
      user.progress[progressIndex].masteryLevel = masteryLevel;
      user.progress[progressIndex].lastReviewed = Date.now();
    } else {
      // Add new progress entry
      user.progress.push({
        vocabularyId,
        masteryLevel,
        lastReviewed: Date.now(),
      });
    }

    await user.save();

    res.json({ success: true, message: 'Progress updated' });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get user progress
// @route   GET /api/vocabulary/progress
exports.getProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('progress.vocabularyId');
    res.json({ success: true, data: user.progress });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get vocabulary statistics
// @route   GET /api/vocabulary/stats
exports.getStats = async (req, res) => {
  try {
    const totalWords = await Vocabulary.countDocuments();
    res.json({ success: true, data: { totalWords } });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
