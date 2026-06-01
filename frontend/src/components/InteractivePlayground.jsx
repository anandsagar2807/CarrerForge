import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Bot, Target, ShieldCheck, CheckCircle2, RefreshCw, Cpu, Star, Zap } from 'lucide-react';

const presetBullets = [
  {
    role: 'Software Engineer',
    boring: 'Wrote some code in React and fixed bugs.',
    enhanced: 'Architected responsive React/TypeScript modules serving 500k+ daily active users, optimizing bundle size to reduce initial page load times by 32%.',
    metrics: ['32% faster load times', 'TypeScript migration', '500k+ DAU'],
    scoreBefore: 42,
    scoreAfter: 97,
    insights: [
      { type: 'verb', label: 'Strong Action Verb', text: 'Replaced "wrote code" with "Architected" for executive presence.' },
      { type: 'metric', label: 'Quantifiable Impact', text: 'Quantified performance with "32% faster load times" and "500k+ DAU".' },
      { type: 'ats', label: 'ATS Alignment', text: 'Integrated key technical terms like "TypeScript modules" and "bundle size".' }
    ]
  },
  {
    role: 'Product Manager',
    boring: 'Responsible for leading feature releases and talking to users.',
    enhanced: 'Spearheaded the design and rollout of 4 high-priority SaaS core features, utilizing user data analytics to increase trial-to-paid conversion rates by 22%.',
    metrics: ['+22% Conversion', '4 Core Features', 'SaaS Product Lifecycle'],
    scoreBefore: 35,
    scoreAfter: 94,
    insights: [
      { type: 'verb', label: 'Strong Action Verb', text: 'Upgraded "responsible for leading" to "Spearheaded" to show ownership.' },
      { type: 'metric', label: 'Quantifiable Impact', text: 'Added clear product metrics: "22% conversion boost".' },
      { type: 'ats', label: 'ATS Alignment', text: 'Included business keywords: "trial-to-paid conversion", "SaaS features".' }
    ]
  },
  {
    role: 'Marketing Specialist',
    boring: 'Managed social media accounts and wrote blog posts.',
    enhanced: 'Designed and executed multi-channel digital campaigns across LinkedIn and Twitter, generating 14k+ qualified inbound leads and expanding organic reach by 125%.',
    metrics: ['14k+ Organic Leads', '+125% Reach Expansion', 'ROI Aligned'],
    scoreBefore: 38,
    scoreAfter: 96,
    insights: [
      { type: 'verb', label: 'Strong Action Verb', text: 'Replaced "managed" and "wrote" with "Designed and executed".' },
      { type: 'metric', label: 'Quantifiable Impact', text: 'Added metrics showing tangible growth: "14k+ leads" and "125% reach".' },
      { type: 'ats', label: 'ATS Alignment', text: 'Leveraged high-impact marketing keywords: "multi-channel digital campaigns", "inbound leads".' }
    ]
  },
  {
    role: 'Customer Success Manager',
    boring: 'Answered customer support tickets and helped clients.',
    enhanced: 'Managed premium accounts representing $1.8M ARR, achieving a record-high 98.4% CSAT rating and reducing annual customer churn by 18% through proactive quarterly reviews.',
    metrics: ['$1.8M ARR Managed', '98.4% CSAT Score', '-18% Customer Churn'],
    scoreBefore: 45,
    scoreAfter: 98,
    insights: [
      { type: 'verb', label: 'Strong Action Verb', text: 'Changed "answered support tickets" to "Managed ARR" and "achieved CSAT".' },
      { type: 'metric', label: 'Quantifiable Impact', text: 'Demonstrated direct revenue impact: "$1.8M ARR" and "18% churn reduction".' },
      { type: 'ats', label: 'ATS Alignment', text: 'Aligned keywords: "ARR management", "CSAT rating", "customer churn".' }
    ]
  }
];

const InteractivePlayground = () => {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customText, setCustomText] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // For dynamic scanning steps
  const [typedOutput, setTypedOutput] = useState('');
  const [atsScore, setAtsScore] = useState(40);

  const activePreset = presetBullets[selectedPreset];

  // If user edits text, reset result to encourage optimizing again
  const handleTextChange = (e) => {
    setCustomText(e.target.value);
    if (showResult) {
      setShowResult(false);
      setTypedOutput('');
    }
  };

  const handlePresetSelect = (idx) => {
    setSelectedPreset(idx);
    setCustomText('');
    setShowResult(false);
    setTypedOutput('');
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    setShowResult(false);
    setTypedOutput('');
    setActiveStep(0);

    // Simulate multi-stage AI optimization steps
    const timer1 = setTimeout(() => setActiveStep(1), 800);
    const timer2 = setTimeout(() => setActiveStep(2), 1600);
    const timer3 = setTimeout(() => {
      setIsOptimizing(false);
      setShowResult(true);
      
      // Animate ATS Score rising
      let currentScore = activePreset.scoreBefore;
      const targetScore = activePreset.scoreAfter;
      const scoreInterval = setInterval(() => {
        if (currentScore < targetScore) {
          currentScore += 2;
          if (currentScore > targetScore) currentScore = targetScore;
          setAtsScore(currentScore);
        } else {
          clearInterval(scoreInterval);
        }
      }, 25);

      // Simulate typewriter effect for enhanced bullet
      const fullText = activePreset.enhanced;
      let charIdx = 0;
      const typeInterval = setInterval(() => {
        if (charIdx < fullText.length) {
          setTypedOutput((prev) => prev + fullText.charAt(charIdx));
          charIdx++;
        } else {
          clearInterval(typeInterval);
        }
      }, 12);

    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-16 md:py-24 border-y border-slate-200/50">
      {/* Background ambient details */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply overflow-hidden">
        <div className="absolute top-[20%] left-[-5%] w-[35rem] h-[35rem] bg-indigo-50/70 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[35rem] h-[35rem] bg-violet-50/70 rounded-full blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100/80 rounded-full mb-5 shadow-sm"
          >
            <Bot className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-widest">
              Live AI Playground
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-black text-[#09090B] tracking-tight leading-[1.1] mb-6"
          >
            Experience Instant{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600">
              AI Resume Tuning
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed"
          >
            Try our context-aware optimization engine right now. Select a predefined weak resume bullet point or write your own to watch the professional conversion in real-time.
          </motion.p>
        </div>

        {/* Dynamic Playground Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto px-4">
          {/* LEFT: Input & Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-white/70 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.04)] relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Free Demo</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-500 animate-pulse" />
              1. Provide Your Weak Bullet
            </h3>

            {/* Role Selectors */}
            <div className="mb-6">
              <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                Select Predefined Job Role
              </label>
              <div className="flex flex-wrap gap-2.5">
                {presetBullets.map((pb, idx) => (
                  <button
                    key={pb.role}
                    type="button"
                    onClick={() => handlePresetSelect(idx)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${
                      selectedPreset === idx && !customText
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/15'
                        : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    {pb.role}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Job Title Input */}
            <div className="mb-5">
              <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                Target Role / Industry
              </label>
              <div className="relative">
                <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  disabled
                  value={`Senior ${activePreset.role} / Executive Level`}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-10 pr-4 text-sm font-semibold text-slate-800 focus:outline-none opacity-80"
                />
              </div>
            </div>

            {/* Bullet Point Textarea */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                  Weak Experience Statement
                </label>
                {customText && (
                  <button
                    type="button"
                    onClick={() => handlePresetSelect(selectedPreset)}
                    className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset to preset
                  </button>
                )}
              </div>
              <textarea
                value={customText || activePreset.boring}
                onChange={handleTextChange}
                placeholder="Type your own weak resume bullet here..."
                rows={3}
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none transition-all resize-none"
              />
              <p className="mt-1.5 text-[11px] text-slate-400 italic">
                Tip: Resumes that lack active verbs or metrics struggle to pass ATS filters.
              </p>
            </div>

            {/* Optimize CTA */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              disabled={isOptimizing}
              onClick={handleOptimize}
              className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all duration-300 disabled:opacity-50"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Optimizing experience syntax...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span className="tracking-wide">Tune Bullet Point instantly</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </motion.button>
          </div>

          {/* RIGHT: AI Output Display (5 Cols) */}
          <div className="lg:col-span-5 h-full">
            <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-white/10 text-white shadow-2xl shadow-indigo-950/20 relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              {/* Decorative grid overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

              {/* Status Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    AI Analysis Terminal
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-extrabold tracking-widest text-indigo-300 uppercase">
                  v3.5 Core
                </span>
              </div>

              {/* Terminal View Body */}
              <div className="flex-1 my-6 relative z-10 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {/* Phase A: Idle Placeholder */}
                  {!isOptimizing && !showResult && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <Bot className="w-14 h-14 text-indigo-400/40 mx-auto mb-4" />
                      <h4 className="text-base font-bold text-white mb-2">Ready for Analysis</h4>
                      <p className="text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                        Configure your role on the left and click **Tune Bullet Point** to view the live optimization scan.
                      </p>
                    </motion.div>
                  )}

                  {/* Phase B: Scanning Overlay */}
                  {isOptimizing && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <Cpu className="w-5 h-5 text-indigo-400 animate-spin" />
                        <span className="text-xs font-semibold text-indigo-200">Analyzing syntax & keyword density...</span>
                      </div>
                      
                      <div className="space-y-3 pl-8 border-l border-white/10">
                        <div className={`text-xs flex items-center gap-2 transition-all duration-300 ${activeStep >= 0 ? 'text-indigo-400 font-bold' : 'text-slate-500'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${activeStep >= 0 ? 'bg-indigo-400' : 'bg-slate-700'}`} />
                          Parsing experience statements...
                        </div>
                        <div className={`text-xs flex items-center gap-2 transition-all duration-300 ${activeStep >= 1 ? 'text-indigo-400 font-bold' : 'text-slate-500'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${activeStep >= 1 ? 'bg-indigo-400' : 'bg-slate-700'}`} />
                          Upgrading weak verbs with active impact metrics...
                        </div>
                        <div className={`text-xs flex items-center gap-2 transition-all duration-300 ${activeStep >= 2 ? 'text-indigo-400 font-bold' : 'text-slate-500'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${activeStep >= 2 ? 'bg-indigo-400' : 'bg-slate-700'}`} />
                          Structuring ATS compliance tags...
                        </div>
                      </div>

                      {/* Moving pulse light bar */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                          className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Phase C: Finished Results */}
                  {showResult && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
                      {/* Metric Score Gauge Block */}
                      <div className="flex items-center justify-between bg-white/5 rounded-2xl p-4 border border-white/5">
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ATS Match Score</div>
                          <div className="flex items-baseline gap-2 mt-1.5">
                            <span className="text-3xl font-black text-emerald-400">{atsScore}%</span>
                            <span className="text-xs font-bold text-slate-400 line-through">was {activePreset.scoreBefore}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">ATS Friendly</span>
                        </div>
                      </div>

                      {/* Enhanced Output Statement */}
                      <div>
                        <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-2 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Enhanced Experience Statement
                        </div>
                        <div className="bg-indigo-950/40 rounded-2xl p-4 border border-indigo-500/20 text-xs font-medium leading-[1.65] text-indigo-50 min-h-[75px]">
                          {typedOutput}
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-1.5 h-3.5 bg-indigo-400 ml-0.5 align-middle"
                          />
                        </div>
                      </div>

                      {/* Enhanced Metrics Tags */}
                      {typedOutput.length === activePreset.enhanced.length && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-3 border-t border-white/5 pt-4"
                        >
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Extracted Core Metrics</div>
                          <div className="flex flex-wrap gap-2">
                            {activePreset.metrics.map((metric) => (
                              <span key={metric} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
                                {metric}
                              </span>
                            ))}
                          </div>

                          {/* Dynamic Analysis Breakdown list */}
                          <div className="mt-3.5 space-y-2">
                            {activePreset.insights.map((ins, i) => (
                              <div key={i} className="flex items-start gap-2 text-[11px] text-slate-400">
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-white mr-1">{ins.label}:</span>
                                  {ins.text}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Live CTA link for complete conversion */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-400 relative z-10">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  Score: Excellent (Top 5%)
                </span>
                <a
                  href="/sign-up"
                  className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-1"
                >
                  Enhance your full resume <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePlayground;
