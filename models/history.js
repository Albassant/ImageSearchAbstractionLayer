const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var HistorySchema = Schema({
  term: String,
  when: { type: Date, default: Date.now }
});

var history = mongoose.model('history', HistorySchema);

module.exports = history;