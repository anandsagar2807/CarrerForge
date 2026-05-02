import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ArrowLeft,
  Download,
  Loader,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Award,
  BarChart3
} from 'lucide-react';
import FileUpload from '../components/ai-tools/FileUpload';
import { getFinalPolishReview } from '../services/aiToolsService';

const FinalPolishReview = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = async (file) => {
    setError('File upload coming soon. Please paste your resume text below.');
  };

  const handlePolish = async () => {
    if (!resumeText.trim()) {
      setError('Please enter your resume text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getFinalPolishReview(resumeText);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to polish resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getPremiumBadge = (level) => {
    const badges = {
      Executive: 'bg-purple-100 text-purple-800 border-purple-300',
      Senior: 'bg-blue-100 text-blue-800 border-blue-300',
      Professional: 'bg-green-100 text-green-800 border-green-300',
      Entry: 'bg-slate-100 text-slate-800 border-slate-300'
    };
    return badges[level] || badges.Entry;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Final Polish Review</h1>
                    <p className="text-sm text-slate-600">Transform into executive-level premium language</p>
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
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePolish}
                disabled={loading || !resumeText.trim()}
                className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-green-600 to-green-800 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Polishing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Polish to Perfection
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-green-900 mb-2">What Gets Polished</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Weak words replaced with power verbs</li>
                    <li>• Clichés eliminated completely</li>
                    <li>• Tense inconsistencies fixed</li>
                    <li>• Generic statements made specific</li>
                    <li>• Grammar and readability optimized</li>
                    <li>• Executive-level language upgrade</li>
                  </ul>
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
                  {/* Quality Scores */}
                  <div className="bg-white rounded-2xl p-8 border-2 border-green-200 shadow-lg">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-700" />
                      Quality Metrics
                    </h3>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(result.qualityScore)} mb-2`}>
                          <span className="text-3xl font-bold">{result.qualityScore}</span>
                        </div>
                        <p className="text-sm text-slate-600 font-semibold">Quality Score</p>
                      </div>
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(result.readabilityScore)} mb-2`}>
                          <span className="text-3xl font-bold">{result.readabilityScore}</span>
                        </div>
                        <p className="text-sm text-slate-600 font-semibold">Readability</p>
                      </div>
                    </div>

                    <div className="text-center pt-4 border-t border-slate-200">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${getPremiumBadge(result.premiumLevel)}`}>
                        {result.premiumLevel} Level
                      </span>
                    </div>
                  </div>

                  {/* Polished Resume */}
                  {result.polishedResume && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-green-700" />
                        Polished Resume
                      </h3>
                      <div className="p-4 bg-green-50 rounded-xl border border-green-200 max-h-96 overflow-y-auto">
                        <pre className="text-sm text-slate-900 leading-relaxed whitespace-pre-wrap font-sans">
                          {result.polishedResume}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Changes Summary */}
                  {result.changes && result.changes.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Key Changes Made</h3>
                      <div className="space-y-3">
                        {result.changes.map((change, index) => (
                          <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex items-start gap-2 mb-2">
                              <span className="text-xs font-semibold text-slate-500 uppercase">{change.type}</span>
                            </div>
                            <div className="mb-2">
                              <p className="text-xs font-semibold text-red-600 mb-1">BEFORE</p>
                              <p className="text-sm text-slate-600 line-through">{change.before}</p>
                            </div>
                            <div className="mb-2">
                              <p className="text-xs font-semibold text-green-600 mb-1">AFTER</p>
                              <p className="text-sm text-slate-900 font-medium">{change.after}</p>
                            </div>
                            <p className="text-xs text-slate-600">
                              <strong>Why:</strong> {change.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weak Words Removed */}
                  {result.weakWords && result.weakWords.length > 0 && (
                    <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
                      <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Weak Words Eliminated
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.weakWords.map((word, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-red-100 text-red-800 text-sm font-medium rounded-lg border border-red-300 line-through"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clichés Removed */}
                  {result.cliches && result.cliches.length > 0 && (
                    <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                      <h3 className="text-lg font-bold text-orange-900 mb-4">Clichés Removed</h3>
                      <div className="space-y-2">
                        {result.cliches.map((cliche, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border border-orange-200">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm text-orange-700 line-through font-medium">{cliche.phrase}</span>
                            </div>
                            <p className="text-xs text-slate-600">
                              <strong>Replaced with:</strong> {cliche.replacement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tense Issues Fixed */}
                  {result.tenseIssues && result.tenseIssues.length > 0 && (
                    <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
                      <h3 className="text-lg font-bold text-yellow-900 mb-4">Tense Inconsistencies Fixed</h3>
                      <div className="space-y-2">
                        {result.tenseIssues.map((issue, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border border-yellow-200">
                            <p className="text-sm text-slate-700 mb-1">
                              <span className="text-red-600 line-through">{issue.incorrect}</span>
                              <span className="mx-2 text-slate-400">→</span>
                              <span className="text-green-700 font-semibold">{issue.correct}</span>
                            </p>
                            <p className="text-xs text-slate-600">{issue.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Generic Lines Improved */}
                  {result.genericLines && result.genericLines.length > 0 && (
                    <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                      <h3 className="text-lg font-bold text-blue-900 mb-4">Generic Statements Made Specific</h3>
                      <div className="space-y-3">
                        {result.genericLines.map((line, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border border-blue-200">
                            <div className="mb-2">
                              <p className="text-xs font-semibold text-slate-500 mb-1">GENERIC</p>
                              <p className="text-sm text-slate-600">{line.generic}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-blue-600 mb-1">SPECIFIC</p>
                              <p className="text-sm text-slate-900 font-medium">{line.specific}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-6 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Export Polished Resume
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
                  <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Polish?</h3>
                  <p className="text-slate-600">
                    Enter your resume to transform it into executive-level language. Results will appear here.
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

export default FinalPolishReview;
