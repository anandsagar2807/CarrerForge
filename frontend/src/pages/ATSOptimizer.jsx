import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  ArrowLeft,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Loader,
  Zap,
  BarChart3
} from 'lucide-react';
import FileUpload from '../components/ai-tools/FileUpload';
import { optimizeForATS } from '../services/aiToolsService';

const ATSOptimizer = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = async (file) => {
    setError('File upload coming soon. Please paste your resume text below.');
  };

  const handleOptimize = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please enter both resume text and job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await optimizeForATS(resumeText, jobDescription);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to optimize resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getCompatibilityBadge = (compatibility) => {
    const colors = {
      Excellent: 'bg-green-100 text-green-800 border-green-300',
      Good: 'bg-blue-100 text-blue-800 border-blue-300',
      Fair: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      Poor: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[compatibility] || colors.Poor;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">ATS Optimizer</h1>
                    <p className="text-sm text-slate-600">Optimize your resume for Applicant Tracking Systems</p>
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
              <h2 className="text-xl font-bold text-slate-900 mb-4">Upload Resume</h2>
              <FileUpload onFileSelect={handleFileUpload} />

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-sm text-slate-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Paste Resume Text
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your complete resume here..."
                  className="w-full h-48 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10 transition-all resize-none text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  className="w-full h-48 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10 transition-all resize-none text-slate-900"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOptimize}
                disabled={loading || !resumeText.trim() || !jobDescription.trim()}
                className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    Optimize for ATS
                  </>
                )}
              </motion.button>
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
                  {/* ATS Score Card */}
                  <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreColor(result.atsScore)} mb-4`}>
                        <span className="text-5xl font-bold">{result.atsScore}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">ATS Score</h3>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${getCompatibilityBadge(result.compatibility)}`}>
                        {result.compatibility} Compatibility
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.atsScore}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${result.atsScore >= 80 ? 'bg-green-600' : result.atsScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
                      />
                    </div>
                  </div>

                  {/* Keyword Heatmap */}
                  {result.keywordHeatmap && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-700" />
                        Keyword Coverage
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(result.keywordHeatmap).map(([category, data]) => (
                          <div key={category}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-slate-700 capitalize">{category}</span>
                              <span className="text-sm font-bold text-blue-700">{data.percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${data.percentage}%` }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-blue-600 to-blue-800"
                              />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {data.found} of {data.total} keywords found
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Keywords */}
                  {result.missingKeywords && result.missingKeywords.length > 0 && (
                    <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                      <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Missing Critical Keywords
                      </h3>
                      <div className="space-y-3">
                        {result.missingKeywords.slice(0, 10).map((item, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border border-red-200">
                            <div className="flex items-start justify-between mb-2">
                              <span className="font-semibold text-slate-900">{item.keyword}</span>
                              <span className={`px-2 py-1 text-xs font-bold rounded ${
                                item.importance === 'Critical' ? 'bg-red-100 text-red-700' :
                                item.importance === 'High' ? 'bg-orange-100 text-orange-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {item.importance}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">
                              <strong>Add to:</strong> {item.whereToAdd}
                            </p>
                            <p className="text-sm text-slate-600">
                              <strong>Context:</strong> {item.context}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Found Keywords */}
                  {result.foundKeywords && result.foundKeywords.length > 0 && (
                    <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                      <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Found Keywords
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.foundKeywords.slice(0, 20).map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-lg border border-green-300 flex items-center gap-2"
                          >
                            {item.keyword}
                            <span className="text-xs bg-green-200 px-1.5 py-0.5 rounded">×{item.frequency}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optimized Bullets */}
                  {result.optimizedBullets && result.optimizedBullets.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-700" />
                        Optimized Bullet Points
                      </h3>
                      <div className="space-y-4">
                        {result.optimizedBullets.slice(0, 5).map((bullet, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="mb-3">
                              <p className="text-xs font-semibold text-slate-500 mb-1">ORIGINAL</p>
                              <p className="text-sm text-slate-600 line-through">{bullet.original}</p>
                            </div>
                            <div className="mb-3">
                              <p className="text-xs font-semibold text-green-600 mb-1">OPTIMIZED</p>
                              <p className="text-sm text-slate-900 font-medium">{bullet.optimized}</p>
                            </div>
                            {bullet.keywordsAdded && bullet.keywordsAdded.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-2">
                                {bullet.keywordsAdded.map((kw, i) => (
                                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                                    +{kw}
                                  </span>
                                ))}
                              </div>
                            )}
                            <p className="text-xs text-slate-600">
                              <strong>Why better:</strong> {bullet.improvement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Wins */}
                  {result.quickWins && result.quickWins.length > 0 && (
                    <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Quick Wins
                      </h3>
                      <ul className="space-y-2">
                        {result.quickWins.map((win, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{win}</span>
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
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-12 border-2 border-dashed border-slate-300 text-center"
                >
                  <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Optimize?</h3>
                  <p className="text-slate-600">
                    Enter your resume and job description to get started. Results will appear here.
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

export default ATSOptimizer;
