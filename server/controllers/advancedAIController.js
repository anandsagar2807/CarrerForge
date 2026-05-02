const advancedAIService = require('../services/advancedAIService');

// @desc    Brutal Honest Review
// @route   POST /api/ai/brutal-review
exports.brutalHonestReview = async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }
    const result = await advancedAIService.brutalHonestReview(resumeText);
    res.json(result);
  } catch (error) {
    console.error('brutalHonestReview error:', error.message);
    res.status(500).json({
      error: 'Failed to generate brutal honest review',
      details: error.message
    });
  }
};

// @desc    ATS Optimizer
// @route   POST /api/ai/ats-optimizer
exports.atsOptimizer = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: 'Resume text and job description are required'
      });
    }
    const result = await advancedAIService.atsOptimizer(resumeText, jobDescription);
    res.json(result);
  } catch (error) {
    console.error('atsOptimizer error:', error.message);
    res.status(500).json({
      error: 'Failed to optimize for ATS',
      details: error.message
    });
  }
};

// @desc    Bullet Point Transformer
// @route   POST /api/ai/transform-bullets
exports.transformBullets = async (req, res) => {
  try {
    const { bullets, jobContext } = req.body;
    if (!bullets || !Array.isArray(bullets) || bullets.length === 0) {
      return res.status(400).json({
        error: 'Bullets array is required'
      });
    }
    const result = await advancedAIService.bulletPointTransformer(bullets, jobContext);
    res.json(result);
  } catch (error) {
    console.error('transformBullets error:', error.message);
    res.status(500).json({
      error: 'Failed to transform bullet points',
      details: error.message
    });
  }
};

// @desc    Industry Tone Match
// @route   POST /api/ai/industry-tone
exports.industryToneMatch = async (req, res) => {
  try {
    const { resumeText, targetCompanies, targetRole } = req.body;
    if (!resumeText || !targetCompanies || !targetRole) {
      return res.status(400).json({
        error: 'Resume text, target companies, and target role are required'
      });
    }
    const result = await advancedAIService.industryToneMatch(
      resumeText,
      targetCompanies,
      targetRole
    );
    res.json(result);
  } catch (error) {
    console.error('industryToneMatch error:', error.message);
    res.status(500).json({
      error: 'Failed to match industry tone',
      details: error.message
    });
  }
};

// @desc    Final Polish Review
// @route   POST /api/ai/final-polish
exports.finalPolishReview = async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }
    const result = await advancedAIService.finalPolishReview(resumeText);
    res.json(result);
  } catch (error) {
    console.error('finalPolishReview error:', error.message);
    res.status(500).json({
      error: 'Failed to polish resume',
      details: error.message
    });
  }
};

// @desc    Analyze Resume Strength
// @route   POST /api/ai/analyze-strength
exports.analyzeResumeStrength = async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;
    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }
    const result = await advancedAIService.analyzeResumeStrength(resumeData, jobDescription);
    res.json(result);
  } catch (error) {
    console.error('analyzeResumeStrength error:', error.message);
    res.status(500).json({
      error: 'Failed to analyze resume strength',
      details: error.message
    });
  }
};

module.exports = exports;
