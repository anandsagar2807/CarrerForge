import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileCheck, Target, Download, Shield, Zap, Sparkles, Wand2, Clock, Lock, Palette, Globe, Crown, Check, X as XIcon } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Writing',
    description: 'Generate compelling bullet points and descriptions tailored to your target role using advanced AI.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Search,
    title: 'ATS Optimization',
    description: 'Pass applicant tracking systems with AI-powered keyword optimization and formatting.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Palette,
    title: 'Premium Templates',
    description: 'Choose from 15+ professionally designed, recruiter-approved templates for any industry.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Target,
    title: 'Smart Job Matching',
    description: 'Upload job descriptions and get instant suggestions to tailor your resume perfectly.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Download,
    title: 'Multi-Format Export',
    description: 'Download as PDF, Word, or share via a unique public link. ATS-friendly formats guaranteed.',
    gradient: 'from-blue-700 to-blue-900',
    bgGradient: 'from-blue-50 to-blue-100',
  },
];

const comparisonFeatures = [
  { name: 'Resume Templates', free: '4 free templates', pro: 'All 8+ templates including premium', icon: Palette },
  { name: 'AI Generations', free: '5 per month', pro: 'Unlimited', icon: Wand2 },
  { name: 'PDF Export', free: 'With watermark', pro: 'Clean, no watermark', icon: Download },
  { name: 'ATS Scans', free: '10 per month', pro: 'Unlimited', icon: Search },
  { name: 'Premium Templates', free: 'Locked', pro: 'Full access (Corporate, Creative, Executive, Tech)', icon: Crown },
  { name: 'Priority Support', free: 'Email only', pro: 'Priority chat & email', icon: Shield },
  { name: 'Custom Branding', free: 'Not available', pro: 'Add your logo & colors', icon: Globe },
  { name: 'Resumes Created', free: '3 maximum', pro: 'Unlimited', icon: FileCheck },
];

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative"
  >
    <div className="relative h-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Icon container */}
      <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}>
        <feature.icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {feature.title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  </motion.div>
);

const ComparisonRow = ({ feature, index }) => {
  const Icon = feature.icon;
  const isFreeLocked = feature.free === 'Locked' || feature.free === 'Not available' || feature.free === 'With watermark';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex items-center gap-4 py-4 px-6 rounded-xl ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'} hover:bg-blue-50/50 transition-colors`}
    >
      <div className="flex items-center gap-3 min-w-[200px]">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center shadow-sm">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-900 text-sm">{feature.name}</span>
      </div>
      <div className="flex-1 flex items-center justify-between gap-4">
        <div className={`flex items-center gap-2 text-sm ${isFreeLocked ? 'text-slate-400' : 'text-slate-600'}`}>
          {isFreeLocked ? (
            <XIcon className="w-4 h-4 text-red-400" />
          ) : (
            <Check className="w-4 h-4 text-slate-500" />
          )}
          <span>{feature.free}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
          <Check className="w-4 h-4 text-blue-600" />
          <span>{feature.pro}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          id="powerful-features"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-blue-700" />
          <span className="text-sm font-bold text-blue-900">
            Powerful Features
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
        >
          Everything you need to
          <br />
          <span className="text-blue-800">
            land your dream job
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500"
        >
          Our platform combines cutting-edge AI with proven resume strategies used by professionals at top companies.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      {/* Free vs Pro Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-amber-50 border border-blue-200 rounded-full mb-6"
          >
            <Crown className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-slate-700">
              Free vs Pro Comparison
            </span>
          </motion.div>

          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            See what you get with <span className="text-blue-800">Pro</span>
          </h3>
          <p className="text-slate-500 text-lg">
            Upgrade to unlock all premium features and take your resume to the next level.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="flex items-center gap-4 py-5 px-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
            <div className="min-w-[200px]">
              <span className="font-bold text-slate-900">Feature</span>
            </div>
            <div className="flex-1 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600">Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center">
                  <Crown className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-blue-800">Pro</span>
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-100">
            {comparisonFeatures.map((feature, index) => (
              <ComparisonRow key={feature.name} feature={feature} index={index} />
            ))}
          </div>

          {/* Upgrade CTA */}
          <div className="py-6 px-6 bg-gradient-to-r from-blue-50 to-blue-100/50 border-t border-slate-200 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/pricing'}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Pro — $12/month
              <Zap className="w-4 h-4" />
            </motion.button>
            <p className="text-slate-500 text-sm mt-3">7-day free trial • Cancel anytime • No credit card required to start</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
