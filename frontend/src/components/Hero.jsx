import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { ArrowRight, CheckCircle, TrendingUp, Star, Users } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-purple-50 to-blue-50 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-12 lg:py-20">

          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8 w-fit"
            >
              <span className="text-sm font-semibold text-blue-700">
                #1 Resume Builder Platform
              </span>
              <div className="flex items-center gap-1 ml-2 px-2 py-0.5 bg-white rounded-full border border-blue-100">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-slate-700">4.9/5</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight"
            >
              Land Your Dream Job with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                AI-Powered Resumes
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed"
            >
              Create ATS-optimized resumes in minutes using advanced technology.{' '}
              <span className="font-semibold text-slate-900">
                Trusted by 50,000+ professionals
              </span>
              {' '}who landed interviews at top companies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <button
                onClick={() => navigate(isSignedIn ? '/templates' : '/sign-up')}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                Start Building Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/analyze')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
              >
                <TrendingUp className="h-5 w-5 text-blue-600" />
                ATS Score
              </button>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 md:gap-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500 -ml-0.5 first:ml-0" />
                  ))}
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm">4.9/5</span>
                  <span className="text-slate-500 text-sm ml-1">(2,847 reviews)</span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <span className="font-bold text-slate-900 text-sm">50,000+</span>
                  <span className="text-slate-500 text-sm ml-1">Users</span>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <span className="font-bold text-slate-900 text-sm">92%</span>
                  <span className="text-slate-500 text-sm ml-1">ATS Pass Rate</span>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mt-8"
            >
              {[
                { icon: <CheckCircle className="h-5 w-5" />, text: "No credit card", color: "text-green-600" },
                { icon: <CheckCircle className="h-5 w-5" />, text: "Students & Professionals", color: "text-blue-600" },
                { icon: <CheckCircle className="h-5 w-5" />, text: "Privacy Protected", color: "text-indigo-600" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-600">
                  <div className={item.color}>{item.icon}</div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Product Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Resume Preview */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Browser Header */}
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-white rounded-lg text-xs text-slate-500 font-medium border border-slate-200">
                    resumeforge.pro/builder
                  </div>
                </div>
              </div>

              {/* Resume Content */}
              <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Resume Preview */}
                  <div className="md:col-span-2">
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-1">Alex Johnson</h3>
                          <p className="text-sm text-blue-600 font-semibold">Senior Software Engineer</p>
                        </div>
                        <div className="text-xs text-slate-500 text-right">
                          alex.johnson@email.com<br />
                          San Francisco, CA
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Experience</h4>
                          <div className="space-y-2">
                            <div className="h-2 bg-slate-100 rounded-full w-full" />
                            <div className="h-2 bg-slate-100 rounded-full w-11/12" />
                            <div className="h-2 bg-slate-100 rounded-full w-4/5" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">React</div>
                            <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Node.js</div>
                            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">AWS</div>
                            <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Python</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Education</h4>
                          <div className="h-2 bg-slate-100 rounded-full w-3/4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ATS Score & Suggestions */}
                  <div className="space-y-4">
                    {/* ATS Score Card */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-700 uppercase">ATS Score</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="text-4xl font-bold text-green-600 mb-2">94%</div>
                      <div className="h-2 bg-green-200 rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "94%" }}
                          transition={{ duration: 1.5, delay: 1 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        />
                      </div>
                      <p className="text-xs text-slate-600 font-medium">Excellent! Ready for top companies</p>
                    </div>

                    {/* Job Match Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-bold text-slate-700 uppercase">Job Match</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">88%</div>
                      <p className="text-xs text-slate-600">Matching: Senior Dev at Google</p>
                    </div>

                    {/* AI Suggestions */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">Suggestions</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-slate-600">Keywords optimized</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-slate-600">Format ATS-friendly</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-slate-600">Action verbs added</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-slate-200 p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Interview Rate</div>
                  <div className="text-lg font-bold text-slate-900">+48%</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-xl p-4 hidden lg:block"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold">LIVE PREVIEW</span>
              </div>
              <p className="text-xs opacity-90">Real-time editing</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Company Logos Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="border-t border-slate-200 pt-12 pb-8 mt-12"
        >
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            Trusted by professionals from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((company) => (
              <div key={company} className="text-xl md:text-2xl font-bold text-slate-300">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
