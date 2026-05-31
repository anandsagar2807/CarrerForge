import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate, Edit3, Download, ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <LayoutTemplate className="h-6 w-6" />,
    title: 'Choose a Template',
    description: 'Browse our collection of professional, ATS-friendly templates designed for your industry.',
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    number: '02',
    icon: <Edit3 className="h-6 w-6" />,
    title: 'Add Your Content',
    description: 'Fill in your details with AI-powered suggestions to highlight your achievements.',
    gradient: 'from-blue-700 to-blue-900'
  },
  {
    number: '03',
    icon: <Download className="h-6 w-6" />,
    title: 'Download & Apply',
    description: 'Export your polished resume and start landing interviews at your dream company.',
    gradient: 'from-blue-700 to-blue-900'
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="pt-8 md:pt-12 pb-20 md:pb-32 bg-slate-50 relative overflow-hidden">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-semibold mb-6"
          >
            <Sparkles className="h-4 w-4 text-blue-700" />
            <span className="text-blue-900">
              How It Works
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Create Your Resume in
            <br />
            <span className="text-blue-800">
              3 Simple Steps
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Our streamlined process makes it easy to build a professional resume that stands out
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.gradient} text-white rounded-2xl shadow-lg mb-6 relative z-10 hover:scale-105 transition-transform duration-300`}>
                {step.icon}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center text-sm font-bold text-slate-900 shadow-md">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/templates')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            Start Building Free
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-sm text-slate-600 mt-4">No credit card required • Free forever</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
