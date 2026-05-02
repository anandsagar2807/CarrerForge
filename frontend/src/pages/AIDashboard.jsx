import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Target,
  Zap,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Clock
} from 'lucide-react';

const AIToolCard = ({ tool, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Premium badge for featured tools */}
      {tool.featured && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="px-3 py-1 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3" />
            Premium
          </div>
        </div>
      )}

      <div className="relative h-full bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-700 transition-all duration-300">
        {/* Icon */}
        <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
          <tool.icon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{tool.title}</h3>
        <p className="text-slate-600 leading-relaxed mb-6">{tool.description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {tool.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(tool.path)}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          {tool.cta}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </motion.button>

        {/* Stats */}
        {tool.stats && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {tool.stats.time}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {tool.stats.improvement}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AIDashboard = () => {
  const navigate = useNavigate();

  const aiTools = [
    {
      icon: Brain,
      title: 'Brutal Honest Review',
      description: 'Get a no-nonsense review from a senior hiring manager. Discover exactly why your resume might get rejected.',
      gradient: 'from-red-600 to-red-800',
      features: [
        'Simulates FAANG hiring manager',
        'Identifies rejection reasons',
        'Spots red flags instantly',
        'Actionable improvement steps'
      ],
      cta: 'Get Honest Feedback',
      path: '/ai-tools/brutal-review',
      featured: true,
      stats: {
        time: '2-3 min',
        improvement: '+45% pass rate'
      }
    },
    {
      icon: Target,
      title: 'ATS Optimizer',
      description: 'Compare your resume against job descriptions. Get keyword analysis and ATS-optimized rewrites.',
      gradient: 'from-blue-700 to-blue-900',
      features: [
        'Keyword heatmap analysis',
        'Missing keywords detection',
        'ATS compatibility score',
        'Optimized bullet rewrites'
      ],
      cta: 'Optimize for ATS',
      path: '/ai-tools/ats-optimizer',
      featured: true,
      stats: {
        time: '3-4 min',
        improvement: '+60% ATS score'
      }
    },
    {
      icon: Zap,
      title: 'Bullet Point Transformer',
      description: 'Transform weak bullets into powerful XYZ formula statements with measurable results.',
      gradient: 'from-yellow-600 to-orange-700',
      features: [
        'XYZ formula conversion',
        'Adds measurable metrics',
        'Smart question prompts',
        'One-click replacement'
      ],
      cta: 'Transform Bullets',
      path: '/ai-tools/bullet-transformer',
      stats: {
        time: '2-3 min',
        improvement: '+50% impact'
      }
    },
    {
      icon: Sparkles,
      title: 'Industry Tone Match',
      description: 'Rewrite your resume to match the culture and tone of top companies like Google, Amazon, or McKinsey.',
      gradient: 'from-purple-600 to-purple-800',
      features: [
        'Company culture matching',
        'Industry-specific language',
        'Elite tone transformation',
        'Role-specific optimization'
      ],
      cta: 'Match Industry Tone',
      path: '/ai-tools/industry-tone',
      stats: {
        time: '3-5 min',
        improvement: '+40% culture fit'
      }
    },
    {
      icon: TrendingUp,
      title: 'Final Polish Review',
      description: 'Eliminate weak words, clichés, and generic statements. Get executive-level premium language.',
      gradient: 'from-green-600 to-green-800',
      features: [
        'Removes weak words & clichés',
        'Fixes tense inconsistencies',
        'Premium language upgrade',
        'Grammar & readability check'
      ],
      cta: 'Polish Resume',
      path: '/ai-tools/final-polish',
      stats: {
        time: '2-3 min',
        improvement: '+35% quality'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">AI Resume Tools</h1>
              <p className="text-slate-600 mt-1">Premium AI-powered tools to transform your resume</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-700" />
            <span className="text-sm font-bold text-blue-900">5 Advanced AI Tools</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Transform Your Resume with
            <br />
            <span className="text-blue-800">AI-Powered Intelligence</span>
          </h2>

          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Get brutally honest feedback, optimize for ATS, transform bullet points, match industry tone, and polish to perfection.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-700" />
              <span className="font-medium">Enterprise-grade AI</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">Instant results</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">4.9/5 rating</span>
            </div>
          </div>
        </motion.div>

        {/* AI Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {aiTools.map((tool, index) => (
            <AIToolCard key={tool.title} tool={tool} index={index} />
          ))}
        </div>

        {/* Premium CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Unlock All Premium Features
            </h3>
            <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
              Get unlimited access to all AI tools, priority processing, advanced analytics, and export capabilities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/#pricing')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all duration-300 shadow-xl"
            >
              Upgrade to Pro
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIDashboard;
