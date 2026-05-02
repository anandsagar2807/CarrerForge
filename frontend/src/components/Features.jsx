import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileCheck, Target, Download, Shield, Zap, Sparkles, Wand2, Clock, Lock, Palette, Globe } from 'lucide-react';

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
    </section>
  );
};

export default Features;
