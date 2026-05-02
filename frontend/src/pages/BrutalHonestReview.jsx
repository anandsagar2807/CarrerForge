import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  AlertTriangle,
  TrendingDown,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Download,
  Share2,
  Loader
} from 'lucide-react';
import FileUpload from '../components/ai-tools/FileUpload';
import { getBrutalHonestReview } from '../services/aiToolsService';

const BrutalHonestReview = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = async (file) => {
    // TODO: Implement file parsing
    setError('File upload coming soon. Please paste your resume text below.');
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please enter your resume text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getBrutalHonestReview(resumeText);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-700 bg-red-100 border-red-300';
      case 'High':
        return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'Medium':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/ai-tools')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Brutal Honest Review</h1>
                    <p className="text-sm text-slate-600">Get unfiltered feedback from a senior hiring manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">Upload or Paste Resume</h2>

              <FileUpload onFileSelect={handleFileUpload} />

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-sm text-slate-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Paste Resume Text
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your complete resume here..."
                  className="w-full h-64 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10 transition-all resize-none text-slate-900"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAnalyze}
                disabled={loading || !resumeText.trim()}
                className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Get Brutal Feedback
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Warning Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-2">⚠️ Brutally Honest Feedback</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    This tool simulates a senior hiring manager from top companies. The feedback will be direct, harsh, and unfiltered. It's designed to show you exactly why your resume might get rejected. Be prepared for tough criticism.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Results Section */}
          <div>
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Overall Verdict */}
                  <div className="bg-white rounded-2xl p-8 border-2 border-red-200 shadow-lg">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <XCircle className="w-7 h-7 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Overall Verdict</h3>
                        <p className="text-red-700 font-semibold text-lg leading-relaxed">
                          {result.overallVerdict}
                        </p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-red-600">{result.honestScore?.current || 0}</p>
                        <p className="text-xs text-slate-500 mt-1">Current Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">{result.honestScore?.potential || 0}</p>
                        <p className="text-xs text-slate-500 mt-1">Potential Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-700">
                          {(result.honestScore?.potential || 0) - (result.honestScore?.current || 0)}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Gap to Close</p>
                      </div>
                    </div>
                  </div>

                  {/* Rejection Reasons */}
                  {result.rejectionReasons && result.rejectionReasons.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                        Why You'd Get Rejected
                      </h3>
                      <ul className="space-y-3">
                        {result.rejectionReasons.map((reason, index) => (
                          <li key={index} className="flex items-start gap-3 text-slate-700">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Red Flags */}
                  {result.redFlags && result.redFlags.length > 0 && (
                    <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                      <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Red Flags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.redFlags.map((flag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-red-100 text-red-800 text-sm font-medium rounded-lg border border-red-300"
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weak Points */}
                  {result.weakPoints && result.weakPoints.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Weak Points to Fix</h3>
                      <div className="space-y-4">
                        {result.weakPoints.map((point, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-slate-900">{point.section}</h4>
                            </div>
                            <p className="text-sm text-red-700 mb-2">
                              <strong>Issue:</strong> {point.issue}
                            </p>
                            <p className="text-sm text-slate-600 mb-2">
                              <strong>Impact:</strong> {point.impact}
                            </p>
                            <p className="text-sm text-green-700">
                              <strong>Fix:</strong> {point.fix}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actionable Steps */}
                  {result.actionableSteps && result.actionableSteps.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Action Plan</h3>
                      <div className="space-y-3">
                        {result.actionableSteps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className={`px-2 py-1 text-xs font-bold rounded ${getPriorityColor(step.priority)}`}>
                              {step.priority}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-900 mb-1">{step.action}</p>
                              <p className="text-xs text-slate-600">{step.why}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Strengths */}
                  {result.strengthsIfAny && result.strengthsIfAny.length > 0 && (
                    <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                      <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        What's Working
                      </h3>
                      <ul className="space-y-2">
                        {result.strengthsIfAny.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-6 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Export Report
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-6 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-5 h-5" />
                      Share Results
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-12 border-2 border-dashed border-slate-300 text-center"
                >
                  <Brain className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ready for Brutal Honesty?</h3>
                  <p className="text-slate-600">
                    Upload or paste your resume to get started. Results will appear here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrutalHonestReview;
