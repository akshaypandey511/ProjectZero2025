const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
  german: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['greetings', 'numbers', 'colors', 'family', 'food', 'animals', 'body', 'clothing', 'house', 'verbs', 'adjectives', 'time', 'places'],
  },
  level: {
    type: String,
    default: 'A1',
  },
  exampleSentence: {
    type: String,
  },
  pronunciation: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vocabulary', vocabularySchema);
