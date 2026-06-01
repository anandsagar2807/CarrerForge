import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import {
  ArrowRight,
  Sparkles,
  Check,
  Bot,
  Cpu,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Award,
  Clock,
  BellRing,
  Gift,
  Zap,
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import PremiumFooter from '../components/PremiumFooter';
import PremiumHeroShowcase from '../components/PremiumHeroShowcase';
import InteractivePlayground from '../components/InteractivePlayground';

/* ─── Animation Variants ─── */
const badgeVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Dynamic Notification Bar ─── */
const homeNotifications = [
  {
    icon: Gift,
    eyebrow: 'New launch',
    message: 'Premium ATS resume templates are now live — build a polished resume in minutes.',
    cta: 'Explore templates',
    href: '/templates',
    accent: 'from-[#F59E0B] via-[#DB2777] to-[#7C3AED]',
  },
  {
    icon: Zap,
    eyebrow: 'AI update',
    message: 'Our AI keyword matcher now gives sharper suggestions for every job description.',
    cta: 'Try ATS checker',
    href: '/ai-tools/ats-optimizer',
    accent: 'from-[#22C55E] via-[#4F46E5] to-[#7C3AED]',
  },
  {
    icon: BellRing,
    eyebrow: 'Career tip',
    message: 'Resumes with quantified achievements get noticed faster. Let CareerForge Pro refine yours.',
    cta: 'Start free',
    href: '/sign-up',
    accent: 'from-[#4F46E5] via-[#7C3AED] to-[#DB2777]',
  },
];

const HomeNotificationBar = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = homeNotifications[activeIndex];
  const Icon = active.icon;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % homeNotifications.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative z-[60] overflow-hidden border-b border-white/20 bg-[#09090B] text-white shadow-[0_10px_40px_-24px_rgba(79,70,229,0.9)]">
      <div className={`absolute inset-0 bg-gradient-to-r ${active.accent} opacity-90 transition-all duration-700`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.18),transparent_24%)]" />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,.35)_45%,transparent_60%)] animate-pulse" />

      <button
        type="button"
        onClick={() => navigate(active.href)}
        className="section-container relative flex min-h-[42px] w-full items-center justify-center gap-3 px-4 py-2 text-center text-sm font-semibold tracking-tight transition-transform duration-300 hover:scale-[1.005] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <span className="hidden sm:inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/25 backdrop-blur-md">
          <Icon className="h-3.5 w-3.5" />
        </span>

        <AnimatePresence mode="wait">
          <motion.span
            key={active.message}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
          >
            <span className="rounded-full bg-white/18 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] ring-1 ring-white/20 backdrop-blur-md">
              {active.eyebrow}
            </span>
            <span className="text-white/95">{active.message}</span>
            <span className="inline-flex items-center gap-1 font-black text-white underline decoration-white/45 underline-offset-4">
              {active.cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
};

/* ─── Hero Section (inline) ─── */
const HeroSection = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const ctaHref = isSignedIn ? '/templates' : '/sign-up';

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_48%,#EEF2FF_100%)]">
      {/* Background orbs - Apple-inspired mesh gradient */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply">
        <div className="absolute -top-[10%] left-[-10%] h-[50rem] w-[50rem] rounded-full bg-gradient-to-br from-[#E0E7FF]/80 to-[#C7D2FE]/70 blur-[130px]" />
        <div className="absolute top-[10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-[#F3E8FF]/70 to-[#FCE7F3]/55 blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[20%] h-[36rem] w-[36rem] rounded-full bg-[#DCFCE7]/65 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

        {/* Subtle realistic grain overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="relative z-10 section-container w-full py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-128px)] md:min-h-[calc(100vh-160px)]">
          {/* LEFT — Copy */}
          <div className="relative">
            <div className="absolute -left-8 top-8 hidden h-28 w-28 rounded-full border border-white/70 bg-white/25 blur-sm lg:block" />
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 border border-white/80 backdrop-blur-xl shadow-[0_20px_50px_-25px_rgba(79,70,229,0.45)]"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#4F46E5]/20 border border-[#7C3AED]/20">
                <Sparkles className="h-4 w-4 text-[#7C3AED]" />
              </span>
              <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] bg-clip-text text-transparent">
                #1 AI Resume Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-6xl sm:text-7xl lg:text-[88px] font-black text-[#09090B] leading-[0.92] tracking-[-0.055em] drop-shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            >
              Land Your Dream Job{' '}
              <span className="relative inline-block pb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#DB2777]">
                  Faster
                </span>
                <svg className="absolute w-full h-[14px] -bottom-2 left-0 text-[#7C3AED]/40" viewBox="0 0 300 20" preserveAspectRatio="none">
                  <path d="M5,15 Q150,0 295,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DB2777] to-[#F59E0B]">
                with AI
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.06 }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-[#475569] leading-relaxed max-w-xl font-medium tracking-[-0.015em]"
            >
              Create ATS-ready resumes with precision AI. From keyword alignment to impact-first bullet
              suggestions — CareerForge Pro helps you ship job-ready resumes in minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.12 }}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(ctaHref)}
                style={{
                  boxShadow: '0 8px 20px -6px rgba(79, 70, 229, 0.4), inset 0 1px 0px rgba(255, 255, 255, 0.2)'
                }}
                className="group relative inline-flex items-center gap-2.5 px-8 py-4.5 bg-gradient-to-b from-[#7C3AED] via-[#6366F1] to-[#4F46E5] text-white font-bold rounded-2xl transition-all duration-300 overflow-hidden ring-1 ring-white/25"
              >
                {/* Button glare effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-[15px] tracking-wide">Get Started Free</span>
                <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/ai-tools/ats-optimizer')}
                style={{
                  boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(226, 232, 240, 1)'
                }}
                className="inline-flex items-center gap-2.5 px-8 py-4.5 bg-white/60 backdrop-blur-xl text-[#0F172A] font-bold rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <ShieldCheck className="h-4 w-4 text-[#22C55E]" />
                <span className="text-[15px] tracking-wide">Check ATS Score</span>
              </motion.button>
            </motion.div>

            {/* Trust micro-bar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.18 }}
              className="mt-8 flex items-center gap-6 text-sm text-[#64748B]"
            >
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#22C55E]" />
                <span className="font-medium">No credit card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#22C55E]" />
                <span className="font-medium">ATS-friendly</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#22C55E]" />
                <span className="font-medium">50k+ users</span>
              </div>
            </motion.div>

            {/* ATS Score Preview Card - Realistic glassmorphism */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.22 }}
              className="mt-8 bg-white/75 backdrop-blur-2xl rounded-[24px] border border-white p-5 relative overflow-hidden"
              style={{
                boxShadow: '0 8px 32px -8px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.5)'
              }}
            >
              {/* Shine effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <div className="text-4xl font-black text-[#16A34A] tracking-tighter leading-none drop-shadow-sm">94%</div>
                  <div className="text-[12px] font-bold text-[#64748B] mt-1.5 uppercase tracking-widest">ATS Match</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#16A34A] tracking-tighter leading-none drop-shadow-sm">Top 10%</div>
                  <div className="text-[12px] font-bold text-[#64748B] mt-1.5 uppercase tracking-widest">Global Rank</div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center gap-2 relative z-10">
                <div className="w-6 h-6 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-3.5 w-3.5 text-[#16A34A]" />
                </div>
                <span className="text-[13px] font-semibold text-[#334155] tracking-tight">
                  Your resume is <span className="text-[#16A34A]">highly competitive</span> for this role
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Premium Hero Showcase */}
          <PremiumHeroShowcase />
        </div>
      </div>
    </section>
  );
};

/* ─── Trusted-By Logos Bar ─── */
const trustedCompanies = [
  'Google',
  'Microsoft',
  'Amazon',
  'Meta',
  'Apple',
  'Stripe',
  'Netflix',
  'Spotify',
];

const TrustedByBar = () => (
  <section className="py-14 bg-white border-b border-[#E2E8F0]/50 relative z-10">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mb-8">
          Trusted by professionals hired at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-70 grayscale contrast-200">
          {trustedCompanies.map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-xl md:text-2xl font-black text-[#cbd5e1] hover:text-[#94a3b8] transition-colors duration-300 tracking-tighter"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {company}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── Stats Bar ─── */
const statsData = [
  { icon: Users, value: '50k+', label: 'Active Users', color: 'from-[#4F46E5] to-[#7C3AED]' },
  { icon: TrendingUp, value: '48%', label: 'Interview Boost', color: 'from-[#22C55E] to-[#16A34A]' },
  { icon: Award, value: '95%', label: 'ATS Pass Rate', color: 'from-[#7C3AED] to-[#DB2777]' },
  { icon: Clock, value: '5 min', label: 'Avg. Creation Time', color: 'from-[#EAB308] to-[#CA8A04]' },
];

const StatsBar = () => (
  <section className="py-20 bg-[#FAFAFA]">
    <div className="section-container">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsData.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerChild}
            className="group relative bg-white/60 backdrop-blur-xl rounded-3xl border border-[#E2E8F0] p-8 text-center hover:bg-white hover:border-[#CBD5E1]/60 transition-all duration-500 overflow-hidden"
            style={{
              boxShadow: '0 4px 24px -12px rgba(0,0,0,0.05)'
            }}
          >
            {/* Subtle glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

            <div
              className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-[18px] flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}
            >
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-4xl font-black text-[#09090B] mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─── AI Tools CTA Section ─── */
const aiTools = [
  {
    icon: Bot,
    title: 'AI Resume Writer',
    description: 'Generate compelling, role-specific bullet points and summaries with advanced AI.',
    gradient: 'from-[#7C3AED] to-[#4F46E5]',
  },
  {
    icon: Target,
    title: 'Smart Job Matching',
    description: 'Upload a job description and get instant keyword alignment suggestions.',
    gradient: 'from-[#4F46E5] to-[#7C3AED]',
  },
  {
    icon: Cpu,
    title: 'ATS Score Checker',
    description: 'Real-time scoring against 50+ ATS filters — completely free, no signup required.',
    gradient: 'from-[#22C55E] to-[#16A34A]',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-First Design',
    description: 'Your data is encrypted end-to-end. We never share or sell your personal information.',
    gradient: 'from-[#EAB308] to-[#CA8A04]',
  },
];

const AIToolsCTA = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[50rem] h-[50rem] bg-gradient-to-br from-[#7C3AED]/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-br from-[#4F46E5]/10 to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7C3AED]/10 to-[#4F46E5]/10 border border-[#7C3AED]/20 rounded-full mb-6"
          >
            <Bot className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-[13px] font-bold text-[#7C3AED] uppercase tracking-wider">AI-Powered</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-[56px] font-black text-[#09090B] mb-6 tracking-tighter leading-[1.05]"
          >
            Supercharge Your Resume
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#4F46E5] to-[#DB2777]">
              with AI Intelligence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#52525B] font-medium tracking-tight"
          >
            Our suite of AI tools analyzes, optimizes, and perfects your resume so you can focus on what
            matters — landing interviews.
          </motion.p>
        </div>

        {/* Tools Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aiTools.map((tool) => (
            <motion.div
              key={tool.title}
              variants={staggerChild}
              className="group relative bg-[#FAFAFA] rounded-[24px] border border-[#E2E8F0]/80 p-8 hover:bg-white hover:border-[#CBD5E1] transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: '0 4px 20px -8px rgba(0,0,0,0.03)'
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/60 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div
                className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-[20px] flex items-center justify-center mb-6 shadow-xl shadow-[${tool.gradient.split(' ')[1].replace(/[\[\]]/g, '')}]/20 group-hover:scale-110 transition-transform duration-500`}
              >
                <tool.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#09090B] mb-3 tracking-tight">{tool.title}</h3>
              <p className="text-[15px] font-medium text-[#64748B] leading-relaxed">{tool.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(isSignedIn ? '/templates' : '/sign-up')}
            style={{
              boxShadow: '0 8px 20px -6px rgba(79, 70, 229, 0.4), inset 0 1px 0px rgba(255, 255, 255, 0.2)'
            }}
            className="group relative inline-flex items-center gap-2.5 px-10 py-5 bg-gradient-to-b from-[#6366F1] to-[#4F46E5] text-white font-bold rounded-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 tracking-wide text-lg">Try AI Tools Free</span>
            <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── ATS Score Preview Section ─── */
const ATSScorePreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply">
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-[#22C55E]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-[#16A34A]/10 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#22C55E]/10 to-[#16A34A]/10 border border-[#22C55E]/20 rounded-full mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span className="text-[13px] font-bold text-[#16A34A] uppercase tracking-wider">Free ATS Score Checker</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-[56px] font-black text-[#09090B] mb-6 tracking-tighter leading-[1.05]"
          >
            Check Your ATS Score
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#059669]">
              — Completely Free
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#52525B] font-medium tracking-tight"
          >
            Instantly analyze how well your resume matches any job description. Get your ATS compatibility
            score, keyword analysis, and actionable suggestions — no signup required.
          </motion.p>
        </div>

        {/* ATS Score Visual Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Score Card */}
          <motion.div
            variants={staggerChild}
            className="group relative bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-[20px] flex items-center justify-center mb-6 shadow-lg shadow-[#22C55E]/20 group-hover:scale-110 transition-transform duration-500">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-black text-[#09090B] mb-3 tracking-tight">ATS Compatibility</h3>
            <p className="text-[15px] font-medium text-[#64748B] leading-relaxed">
              Get a detailed percentage score showing how well your resume aligns with the job description
              and ATS requirements.
            </p>
            <div className="mt-6 pt-5 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Sample Score</span>
                <span className="text-[18px] font-black text-[#16A34A]">94%</span>
              </div>
              <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] relative"
                  style={{ width: '94%' }}
                >
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 w-1/2" style={{ filter: 'blur(4px)' }} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Keywords Card */}
          <motion.div
            variants={staggerChild}
            className="group relative bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-[20px] flex items-center justify-center mb-6 shadow-lg shadow-[#4F46E5]/20 group-hover:scale-110 transition-transform duration-500">
              <Cpu className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-black text-[#09090B] mb-3 tracking-tight">Keyword Analysis</h3>
            <p className="text-[15px] font-medium text-[#64748B] leading-relaxed">
              See exactly which keywords are found and which are missing from your resume, with importance
              levels and context.
            </p>
            <div className="mt-6 pt-5 border-t border-[#F1F5F9] flex flex-wrap gap-2.5">
              <span className="px-3 py-1.5 bg-[#F0FDF4] text-[#15803D] text-[13px] font-bold rounded-xl border border-[#BBF7D0] shadow-sm">
                React ✓
              </span>
              <span className="px-3 py-1.5 bg-[#F0FDF4] text-[#15803D] text-[13px] font-bold rounded-xl border border-[#BBF7D0] shadow-sm">
                Leadership ✓
              </span>
              <span className="px-3 py-1.5 bg-[#FEF2F2] text-[#B91C1C] text-[13px] font-bold rounded-xl border border-[#FECACA] opacity-70">
                Agile ✗
              </span>
              <span className="px-3 py-1.5 bg-[#FEF2F2] text-[#B91C1C] text-[13px] font-bold rounded-xl border border-[#FECACA] opacity-70">
                Kubernetes ✗
              </span>
            </div>
          </motion.div>

          {/* Suggestions Card */}
          <motion.div
            variants={staggerChild}
            className="group relative bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-500"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#DB2777] to-[#9D174D] rounded-[20px] flex items-center justify-center mb-6 shadow-lg shadow-[#DB2777]/20 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-black text-[#09090B] mb-3 tracking-tight">Actionable Suggestions</h3>
            <p className="text-[15px] font-medium text-[#64748B] leading-relaxed">
              Get specific, prioritized recommendations to improve your resume's ATS compatibility and
              stand out to recruiters.
            </p>
            <div className="mt-6 pt-5 border-t border-[#F1F5F9] space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#16A34A]" />
                </div>
                <span className="text-[13px] font-bold text-[#334155]">Add "Agile methodology"</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#16A34A]" />
                </div>
                <span className="text-[13px] font-bold text-[#334155]">Include leadership metrics</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#16A34A]" />
                </div>
                <span className="text-[13px] font-bold text-[#334155]">Quantify impact statements</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/ai-tools/ats-optimizer')}
            className="group inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-bold rounded-2xl shadow-lg shadow-[#22C55E]/25 hover:shadow-xl transition-all duration-300"
          >
            Check ATS Score — Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="mt-3 text-sm text-[#64748B]">
            No credit card · No signup required · Instant results
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── LandingPage ─── */
const LandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white text-dark font-sans overflow-x-hidden">
      {/* Ambient background blobs - Modern realistic gradient mesh */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden mix-blend-multiply">
        <div className="absolute top-[-10%] left-[-10%] h-[50rem] w-[50rem] rounded-full bg-[#3B82F6]/10 blur-[120px] opacity-70" />
        <div className="absolute top-[20%] right-[-15%] h-[45rem] w-[45rem] rounded-full bg-[#8B5CF6]/10 blur-[130px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[20%] h-[35rem] w-[35rem] rounded-full bg-[#10B981]/10 blur-[120px] opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60rem] w-[60rem] rounded-full bg-[#6366F1]/5 blur-[150px] opacity-80" />

        {/* Subtle realistic grain overlay */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      </div>

      <HomeNotificationBar />
      <Navbar />

      <main className="relative">
        {/* Hero */}
        <HeroSection />

        {/* Trusted By */}
        <TrustedByBar />

        {/* Stats */}
        <StatsBar />

        {/* AI Playground */}
        <InteractivePlayground />

        {/* Features */}
        <section id="powerful-features" className="py-24 lg:py-32 bg-white">
          <div className="section-container">
            <Features />
          </div>
        </section>

        {/* AI Tools CTA */}
        <AIToolsCTA />

        {/* ATS Score Preview */}
        <ATSScorePreview />

        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <FAQ />
      </main>

      <PremiumFooter />
    </div>
  );
};

export default LandingPage;
