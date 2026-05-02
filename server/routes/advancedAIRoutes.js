const express = require('express');
const router = express.Router();
const advancedAIController = require('../controllers/advancedAIController');

// Advanced AI Tools Routes
router.post('/brutal-review', advancedAIController.brutalHonestReview);
router.post('/ats-optimizer', advancedAIController.atsOptimizer);
router.post('/transform-bullets', advancedAIController.transformBullets);
router.post('/industry-tone', advancedAIController.industryToneMatch);
router.post('/final-polish', advancedAIController.finalPolishReview);
router.post('/analyze-strength', advancedAIController.analyzeResumeStrength);

module.exports = router;
