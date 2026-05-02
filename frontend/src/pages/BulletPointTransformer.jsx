import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  ArrowLeft,
  Download,
  Plus,
  Trash2,
  Loader,
  CheckCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { transformBullets } from '../services/aiToolsService';

const BulletPointTransformer = () => {
  const navigate = useNavigate();
  const [bullets, setBullets] = useState(['']);
  const [jobContext, setJobContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const addBullet = () => {
    setBullets([...bullets, '']);
  };

  const removeBullet = (index) => {
    if (bullets.length > 1) {
      setBullets(bullets.filter((_, i) => i !== index));
    }
  };

  const updateBullet = (index, value) => {
    const newBullets = [...bullets];
    newBullets[index] = value;
    setBullets(newBullets);
  };

  const handleTransform = async () => {
    const validBullets = bullets.filter(b => b.trim());
    if (validBullets.length === 0) {
      setError('Please enter at least one bullet point');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await transformBullets(validBullets, jobContext);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to transform bullets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyTransformedBullet = (index, transformed) => {
    updateBullet(index, transformed);
  };

  const getImprovementColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yellow-50/30">
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
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Bullet Point Transformer</h1>
                    <p className="text-sm text-slate-600">Convert bullets into powerful XYZ formula statements</p>
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
            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-yellow-900 mb-2">XYZ Formula</h3>
                  <p className="text-sm text-yellow-800 leading-relaxed mb-3">
                    <strong>Accomplished [X]</strong> as measured by <strong>[Y]</strong> by doing <strong>[Z]</strong>
                  </p>
                  <p className="text-xs text-yellow-700">
                    Every bullet will be transformed to include: Action Verb + Task + Measurable Result
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">Your Bullet Points</h2>

              {/* Job Context */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Context (Optional)
                </label>
                <input
                  type="text"
                  value={jobContext}
                  onChange={(e) => setJobContext(e.target.value)}
                  placeholder="e.g., Software Engineer at Google"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10 transition-all text-slate-900"
                />
              </div>

              {/* Bullet Points */}
              <div className="space-y-4 mb-6">
                {bullets.map((bullet, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <textarea
                        value={bullet}
                        onChange={(e) => updateBullet(index, e.target.value)}
                        placeholder={`Bullet point ${index + 1}...`}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10 transition-all resize-none text-slate-900"
                        rows={3}
                      />
                    </div>
                    {bullets.length > 1 && (
                      <button
                        onClick={() => removeBullet(index)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addBullet}
                className="w-full py-3 px-4 border-2 border-dashed border-slate-300 text-slate-600 font-semibold rounded-xl hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Another Bullet
              </button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <HelpCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTransform}
                disabled={loading || bullets.every(b => !b.trim())}
                className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-yellow-600 to-orange-700 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Transforming...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Transform Bullets
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
                  {/* Overall Improvement */}
                  <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Overall Improvement
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{result.overallImprovement}</p>
                  </div>

                  {/* Transformed Bullets */}
                  {result.transformedBullets && result.transformedBullets.length > 0 && (
                    <div className="space-y-4">
                      {result.transformedBullets.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="font-bold text-slate-900">Bullet #{index + 1}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getImprovementColor(item.improvementScore)} bg-opacity-10`}>
                              +{item.improvementScore}% Better
                            </span>
                          </div>

                          {/* Original */}
                          <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-xs font-semibold text-red-600 mb-1">BEFORE</p>
                            <p className="text-sm text-slate-700 line-through">{item.original}</p>
                          </div>

                          {/* Transformed */}
                          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-xs font-semibold text-green-600 mb-1">AFTER (XYZ Formula)</p>
                            <p className="text-sm text-slate-900 font-medium">{item.transformed}</p>
                          </div>

                          {/* Breakdown */}
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-xs font-semibold text-blue-600 mb-1">Action Verb</p>
                              <p className="text-sm text-slate-900 font-medium">{item.actionVerb}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <p className="text-xs font-semibold text-purple-600 mb-1">Task</p>
                              <p className="text-sm text-slate-900 font-medium">{item.task}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <p className="text-xs font-semibold text-green-600 mb-1">Metric</p>
                              <p className="text-sm text-slate-900 font-medium">{item.metric}</p>
                            </div>
                          </div>

                          {/* Impact */}
                          <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                            <p className="text-xs font-semibold text-slate-600 mb-1">BUSINESS IMPACT</p>
                            <p className="text-sm text-slate-700">{item.impact}</p>
                          </div>

                          {/* Missing Info Questions */}
                          {item.missingInfo && item.missingInfo.length > 0 && (
                            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                              <p className="text-xs font-semibold text-yellow-700 mb-2">
                                📋 Answer these to make it even better:
                              </p>
                              <ul className="space-y-1">
                                {item.missingInfo.map((q, i) => (
                                  <li key={i} className="text-sm text-yellow-800">• {q}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Apply Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => applyTransformedBullet(index, item.transformed)}
                            className="w-full mt-4 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Replace Original
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Metrics Needed */}
                  {result.metricsNeeded && result.metricsNeeded.length > 0 && (
                    <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
                      <h3 className="text-lg font-bold text-yellow-900 mb-4">
                        📊 Add Metrics for Maximum Impact
                      </h3>
                      <div className="space-y-4">
                        {result.metricsNeeded.map((item, index) => (
                          <div key={index} className="p-4 bg-white rounded-lg border border-yellow-200">
                            <p className="text-sm font-semibold text-slate-900 mb-2">{item.bullet}</p>
                            <ul className="space-y-1">
                              {item.questions.map((q, i) => (
                                <li key={i} className="text-sm text-slate-600">• {q}</li>
                              ))}
                            </ul>
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
                      className="flex-1 py-3 px-6 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Export All
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
                  <Zap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Transform?</h3>
                  <p className="text-slate-600">
                    Enter your bullet points to get started. Results will appear here.
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

export default BulletPointTransformer;
