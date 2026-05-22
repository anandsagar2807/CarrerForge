import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    ShieldCheck,
    TrendingUp,
    ArrowUpRight,
    Check,
    Star,
    Bot,
    CircleDot,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   PREMIUM HERO SHOWCASE — Editorial-grade
   right-side visual hallmark component.
   ───────────────────────────────────────────── */

// ─── Animated ATS Score Ring ───
const ATSScoreRing = ({ score, delay = 0 }) => {
    const [displayScore, setDisplayScore] = useState(0);
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (displayScore / 100) * circumference;

    useEffect(() => {
        const timeout = setTimeout(() => {
            let frame = 0;
            const totalFrames = 60;
            const animate = () => {
                frame++;
                const progress = easeOutCubic(frame / totalFrames);
                setDisplayScore(Math.round(score * progress));
                if (frame < totalFrames) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, delay);
        return () => clearTimeout(timeout);
    }, [score, delay]);

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    return (
        <div className="relative w-[140px] h-[140px]">
            {/* Subtle outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#22C55E]/10 to-[#16A34A]/5 blur-md" />

            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                {/* Background track */}
                <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="rgba(148,163,184,0.12)"
                    strokeWidth="6"
                />
                {/* Score arc */}
                <motion.circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.8, delay: delay / 1000, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                {/* Gradient definition */}
                <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22C55E" />
                        <stop offset="50%" stopColor="#16A34A" />
                        <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[32px] font-extrabold text-[#0F172A] leading-none tracking-tighter">
                    {displayScore}
                    <span className="text-[16px] font-bold text-[#64748B] ml-0.5">%</span>
                </span>
                <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.12em] mt-1">
                    ATS Match
                </span>
            </div>
        </div>
    );
};

// ─── Resume Document — The centerpiece ───
const ResumeDocument = () => {
    const [activeLine, setActiveLine] = useState(null);

    // Simulate AI highlighting effect
    useEffect(() => {
        const lines = [0, 1, 2];
        let idx = 0;
        const interval = setInterval(() => {
            setActiveLine(lines[idx]);
            idx = (idx + 1) % lines.length;
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const bulletPoints = [
        {
            original: 'Managed a team of developers',
            enhanced: 'Led cross-functional team of 12 engineers, delivering 3 products ahead of schedule',
            metric: '2x faster delivery',
        },
        {
            original: 'Improved user experience',
            enhanced: 'Redesigned core UX flows, increasing user retention by 34% and NPS by 22 points',
            metric: '+34% retention',
        },
        {
            original: 'Built React applications',
            enhanced: 'Architected React/TypeScript platform serving 2M+ monthly active users with 99.9% uptime',
            metric: '2M+ MAU',
        },
    ];

    return (
        <div className="relative">
            {/* Paper shadow stack — creates realistic layered depth */}
            <div className="absolute inset-0 translate-y-[3px] rounded-[2px] bg-[#E2E8F0]/40" />
            <div className="absolute inset-0 translate-y-[6px] rounded-[2px] bg-[#E2E8F0]/20" />

            {/* Main paper surface */}
            <div
                className="relative bg-white rounded-[2px] overflow-hidden"
                style={{
                    boxShadow:
                        '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03), 0 12px 28px rgba(0,0,0,0.04)',
                }}
            >
                {/* Subtle paper grain texture overlay */}
                <div
                    className="absolute inset-0 opacity-[0.015] mix-blend-multiply pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* ─── Resume Header ─── */}
                <div className="px-6 pt-6 pb-4 border-b border-[#E2E8F0]/40">
                    <div className="flex items-start gap-4">
                        {/* Monogram avatar */}
                        <div
                            className="w-[44px] h-[44px] rounded-[6px] flex items-center justify-center text-white font-bold text-[15px] tracking-tight"
                            style={{
                                background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
                                boxShadow: '0 2px 8px rgba(30,27,75,0.25)',
                            }}
                        >
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4
                                className="text-[15px] font-extrabold text-[#0F172A] leading-tight tracking-tight"
                                style={{ fontFamily: "'Poppins', 'Inter', sans-serif" }}
                            >
                                Jessica Davidson
                            </h4>
                            <p className="text-[11px] font-semibold text-[#4338CA] tracking-wide uppercase mt-0.5">
                                Senior Engineering Manager
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-[9.5px] text-[#64748B] font-medium">
                                <span>san.francisco.ca</span>
                                <span className="text-[#CBD5E1]">·</span>
                                <span>jessica@davidson.io</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Experience Section ─── */}
                <div className="px-6 pt-4 pb-2">
                    <p
                        className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.16em] mb-3"
                        style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.16em' }}
                    >
                        Experience
                    </p>

                    <div className="space-y-3">
                        {bulletPoints.map((bp, i) => (
                            <div key={i} className="relative group">
                                {/* The enhanced bullet point — always visible */}
                                <div className="flex items-start gap-2">
                                    <CircleDot className="w-[3.5px] h-[3.5px] text-[#4338CA] mt-[6px] flex-shrink-0 fill-[#4338CA]" />
                                    <p className="text-[10.5px] text-[#1E293B] leading-[1.55] font-medium">
                                        {bp.enhanced}
                                    </p>
                                </div>

                                {/* AI enhancement highlight — appears on active line */}
                                <AnimatePresence mode="wait">
                                    {activeLine === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            className="mt-1.5 ml-[7px] overflow-hidden"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 px-2 py-[2px] rounded-[4px] bg-[#22C55E]/8 border border-[#22C55E]/15">
                                                    <Sparkles className="w-[8px] h-[8px] text-[#22C55E]" />
                                                    <span className="text-[8px] font-bold text-[#16A34A] uppercase tracking-wider">
                                                        AI Enhanced
                                                    </span>
                                                </div>
                                                <span className="text-[8px] font-bold text-[#059669] tracking-tight">
                                                    {bp.metric}
                                                </span>
                                            </div>
                                            {/* Before/after comparison */}
                                            <div className="mt-1 flex items-center gap-1.5">
                                                <span className="text-[8.5px] text-[#94A3B8] font-medium line-through decoration-[#CBD5E1]">
                                                    {bp.original}
                                                </span>
                                                <ArrowUpRight className="w-[7px] h-[7px] text-[#22C55E]" />
                                                <span className="text-[8.5px] text-[#22C55E] font-semibold">
                                                    {bp.metric}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Skills Section ─── */}
                <div className="px-6 pt-3 pb-5">
                    <p
                        className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.16em] mb-2.5"
                        style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.16em' }}
                    >
                        Core Competencies
                    </p>
                    <div className="flex flex-wrap gap-[5px]">
                        {[
                            'Product Strategy',
                            'React',
                            'TypeScript',
                            'System Design',
                            'Agile',
                            'Leadership',
                        ].map((skill, i) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.8 + i * 0.06 }}
                                className="px-[7px] py-[3px] text-[8.5px] font-semibold text-[#475569] rounded-[4px] border border-[#E2E8F0]/70 bg-[#F8FAFC]"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* ─── Footer ─── */}
                <div className="px-6 py-3 border-t border-[#E2E8F0]/30 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className="w-[5px] h-[5px] rounded-full bg-[#22C55E] animate-pulse" />
                        <span className="text-[8px] font-medium text-[#94A3B8]">Synced 2m ago</span>
                    </div>
                    <div className="flex items-center gap-[2px]">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-[8px] h-[8px] text-[#D97706] fill-[#D97706]" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Floating Annotation Callout ───
const AnnotationCallout = ({ icon, label, value, sublabel, color, position, delay }) => {
    const gradients = {
        indigo: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)',
        green: 'linear-gradient(135deg, #059669 0%, #22C55E 100%)',
        amber: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: position === 'right' ? 20 : -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`absolute z-20 ${position === 'right' ? '-right-3 lg:-right-6' : '-left-3 lg:-left-6'
                }`}
            style={{ top: position === 'right' ? '18%' : '72%' }}
        >
            {/* Connector line */}
            <div
                className={`absolute ${position === 'right' ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'
                    } top-1/2 -translate-y-1/2 w-[20px] h-[1px]`}
                style={{ backgroundColor: 'rgba(148,163,184,0.25)' }}
            />

            <div
                className="relative bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 border border-[#E2E8F0]/50"
                style={{
                    boxShadow:
                        '0 2px 8px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.03)',
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: gradients[color], boxShadow: `0 2px 6px rgba(0,0,0,0.15)` }}
                    >
                        <icon className="w-[14px] h-[14px] text-white" />
                    </div>
                    <div>
                        <p className="text-[13px] font-extrabold text-[#0F172A] leading-none tracking-tight">
                            {value}
                        </p>
                        <p className="text-[9px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mt-0.5">
                            {label}
                        </p>
                        {sublabel && (
                            <p className="text-[8px] font-medium text-[#94A3B8] mt-0.5">{sublabel}</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Main PremiumHeroShowcase Component ───
const PremiumHeroShowcase = () => {
    return (
        <div className="relative lg:pl-8">
            {/* Ambient glow behind the entire showcase */}
            <div className="absolute -inset-6 bg-gradient-to-br from-[#4338CA]/8 via-[#7C3AED]/5 to-[#22C55E]/5 rounded-3xl blur-2xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
            >
                {/* ─── Top Section: Resume Document ─── */}
                <div className="relative">
                    <ResumeDocument />

                    {/* Floating annotation callouts */}
                    <AnnotationCallout
                        icon={Bot}
                        label="AI Optimized"
                        value="3 Enhancements"
                        sublabel="Applied just now"
                        color="indigo"
                        position="right"
                        delay={1.2}
                    />
                    <AnnotationCallout
                        icon={ShieldCheck}
                        label="ATS Passed"
                        value="All Keywords"
                        sublabel="98% compatibility"
                        color="green"
                        position="left"
                        delay={1.5}
                    />
                </div>

                {/* ─── Bottom Section: ATS Score + Metrics ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mt-5 relative"
                >
                    <div
                        className="relative bg-white/90 backdrop-blur-md rounded-2xl border border-[#E2E8F0]/40 p-5 overflow-hidden"
                        style={{
                            boxShadow:
                                '0 1px 3px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.03)',
                        }}
                    >
                        {/* Subtle inner accent line */}
                        <div
                            className="absolute top-0 left-0 right-0 h-[1px]"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, #4338CA/20 30%, #7C3AED/20 50%, #22C55E/20 70%, transparent 100%)',
                            }}
                        />

                        <div className="flex items-center gap-6">
                            {/* ATS Score Ring */}
                            <ATSScoreRing score={94} delay={800} />

                            {/* Metrics Grid */}
                            <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <TrendingUp className="w-[10px] h-[10px] text-[#22C55E]" />
                                        <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.12em]">
                                            Interview Rate
                                        </span>
                                    </div>
                                    <p className="text-[20px] font-extrabold text-[#0F172A] leading-none tracking-tight">
                                        +47%
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <Star className="w-[10px] h-[10px] text-[#D97706]" />
                                        <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.12em]">
                                            User Rating
                                        </span>
                                    </div>
                                    <p className="text-[20px] font-extrabold text-[#0F172A] leading-none tracking-tight">
                                        4.9/5
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <Check className="w-[10px] h-[10px] text-[#4338CA]" />
                                        <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.12em]">
                                            Keywords
                                        </span>
                                    </div>
                                    <p className="text-[20px] font-extrabold text-[#0F172A] leading-none tracking-tight">
                                        42/44
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <ShieldCheck className="w-[10px] h-[10px] text-[#059669]" />
                                        <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.12em]">
                                            ATS Filters
                                        </span>
                                    </div>
                                    <p className="text-[20px] font-extrabold text-[#0F172A] leading-none tracking-tight">
                                        All Pass
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom accent bar */}
                        <div className="mt-4 pt-3 border-t border-[#E2E8F0]/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-[10px] h-[10px] text-[#7C3AED]" />
                                    <span className="text-[9px] font-semibold text-[#64748B]">
                                        AI-scored against 50+ ATS filters
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-[5px] h-[5px] rounded-full bg-[#22C55E]" />
                                    <span className="text-[8px] font-medium text-[#94A3B8]">Live</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PremiumHeroShowcase;