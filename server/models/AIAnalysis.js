const mongoose = require('mongoose');

const AIAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  toolType: {
    type: String,
    required: true,
    enum: ['brutal-review', 'ats-optimizer', 'bullet-transformer', 'industry-tone', 'final-polish']
  },
  resumeText: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: false
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  metadata: {
    targetCompanies: [String],
    targetRole: String,
    bullets: [String],
    jobContext: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
AIAnalysisSchema.index({ userId: 1, createdAt: -1 });
AIAnalysisSchema.index({ toolType: 1, createdAt: -1 });

module.exports = mongoose.model('AIAnalysis', AIAnalysisSchema);
