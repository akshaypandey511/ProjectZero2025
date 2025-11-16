const express = require('express');
const router = express.Router();
const {
  getAllVocabulary,
  getByCategory,
  getRandomVocabulary,
  updateProgress,
  getProgress,
} = require('../controllers/vocabularyController');
const { protect } = require('../middleware/auth');

router.get('/', getAllVocabulary);
router.get('/category/:category', getByCategory);
router.get('/random', getRandomVocabulary);
router.post('/progress', protect, updateProgress);
router.get('/progress', protect, getProgress);

module.exports = router;
