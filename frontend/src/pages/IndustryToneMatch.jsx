import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  Download,
  Building2,
  Loader,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import FileUpload from '../components/ai-tools/FileUpload';
import { matchIndustryTone } from '../services/aiToolsService';

const IndustryToneMatch = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const companyCategories = {
    'FAANG': ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Netflix'],
    'Consulting': ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'Accenture', 'PwC'],
    'Finance': ['Goldman Sachs', 'JP Morgan', 'BlackRock', 'Morgan Stanley', 'Citadel'],
    'Startups': ['YC Companies', 'Unicorns', 'Series A-B', 'Early Stage'],
    'Enterprise': ['IBM', 'Oracle', 'SAP', 'Salesforce', 'Adobe']
  };

  const handleFileUpload = async (file) => {
    setError('File upload coming soon. Please paste your resume text below.');
  };

  const toggleCompany = (company) => {
    setSelectedCompanies(prev =>
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const handleMatch = async () => {
    if (!resumeText.trim() || selectedCompanies.length === 0 || !targetRole.trim()) {
      setError('Please enter resume text, select companies, and specify target role');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await matchIndustryTone(resumeText, selectedCompanies, targetRole);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to match industry tone. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Industry Tone Match</h1>
                    <p className="text-sm text-slate-600">Match your resume to top company cultures</p>
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

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Target Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Senior Software Engineer, Product Manager"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10 transition-all text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Select Target Companies ({selectedCompanies.length} selected)
                </label>
                <div className="space-y-4">
                  {Object.entries(companyCategories).map(([category, companies]) => (
                    <div key={category}>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        {category}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {companies.map((company) => (
                          <motion.button
                            key={company}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleCompany(company)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                              selectedCompanies.includes(company)
                                ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-md'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {company}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <Building2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMatch}
                disabled={loading || !resumeText.trim() || selectedCompanies.length === 0 || !targetRole.trim()}
                className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Matching Tone...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Match Industry Tone
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
                  {/* Culture Fit Score */}
                  {result.cultureFit && (
                    <div className="bg-white rounded-2xl p-8 border-2 border-purple-200 shadow-lg">
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-purple-100 mb-4">
                          <span className="text-5xl font-bold text-purple-700">{result.cultureFit.score}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Culture Fit Score</h3>
                        <p className="text-slate-600">How well your resume matches the target culture</p>
                      </div>

                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-6">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.cultureFit.score}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-800"
                        />
                      </div>

                      {result.cultureFit.strengths && result.cultureFit.strengths.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-green-700 mb-2">✓ Strengths</p>
                          <ul className="space-y-1">
                            {result.cultureFit.strengths.map((strength, i) => (
                              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.cultureFit.gaps && result.cultureFit.gaps.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-orange-700 mb-2">⚠ Gaps to Address</p>
                          <ul className="space-y-1">
                            {result.cultureFit.gaps.map((gap, i) => (
                              <li key={i} className="text-sm text-slate-700">• {gap}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Rewritten Summary */}
                  {result.rewrittenSummary && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-700" />
                        Industry-Matched Summary
                      </h3>
                      <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <p className="text-sm text-slate-900 leading-relaxed">{result.rewrittenSummary}</p>
                      </div>
                    </div>
                  )}

                  {/* Rewritten Experience */}
                  {result.rewrittenExperience && result.rewrittenExperience.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Rewritten Experience</h3>
                      <div className="space-y-4">
                        {result.rewrittenExperience.map((exp, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="mb-3">
                              <p className="text-xs font-semibold text-slate-500 mb-1">ORIGINAL</p>
                              <p className="text-sm text-slate-600">{exp.original}</p>
                            </div>
                            <div className="mb-3">
                              <p className="text-xs font-semibold text-purple-600 mb-1">INDUSTRY-MATCHED</p>
                              <p className="text-sm text-slate-900 font-medium">{exp.rewritten}</p>
                            </div>
                            <div className="mb-2">
                              <p className="text-xs font-semibold text-slate-600 mb-1">TONE CHANGES</p>
                              <p className="text-xs text-slate-600">{exp.toneChanges}</p>
                            </div>
                            {exp.keyPhrases && exp.keyPhrases.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {exp.keyPhrases.map((phrase, i) => (
                                  <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                                    {phrase}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Language Adjustments */}
                  {result.languageAdjustments && result.languageAdjustments.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Language Adjustments</h3>
                      <div className="space-y-3">
                        {result.languageAdjustments.map((adj, index) => (
                          <div key={index} className="p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm text-red-600 line-through">{adj.from}</span>
                              <span className="text-slate-400">→</span>
                              <span className="text-sm text-green-700 font-semibold">{adj.to}</span>
                            </div>
                            <p className="text-xs text-slate-600">{adj.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tone Analysis */}
                  {result.toneAnalysis && (
                    <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                      <h3 className="text-lg font-bold text-purple-900 mb-4">Tone Transformation</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-purple-700 mb-1">Before</p>
                          <p className="text-sm text-slate-700">{result.toneAnalysis.before}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-purple-700 mb-1">After</p>
                          <p className="text-sm text-slate-700">{result.toneAnalysis.after}</p>
                        </div>
                        {result.toneAnalysis.keyDifferences && result.toneAnalysis.keyDifferences.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-purple-700 mb-2">Key Differences</p>
                            <ul className="space-y-1">
                              {result.toneAnalysis.keyDifferences.map((diff, i) => (
                                <li key={i} className="text-sm text-slate-700">• {diff}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-6 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Export Rewritten Resume
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
                  <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Match?</h3>
                  <p className="text-slate-600">
                    Enter your resume, select companies, and specify role. Results will appear here.
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

export default IndustryToneMatch;
