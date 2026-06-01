import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   PREMIUM HERO SHOWCASE — Editorial-grade
   right-side visual hallmark component.
   ───────────────────────────────────────────── */

const PremiumHeroShowcase = () => {
    // 3D Parallax Tilt state
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setRotateX(-y / 20);
        setRotateY(x / 20);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <div className="relative lg:pl-8">
            <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 10, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 2, rotateY: -4 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative perspective-1000"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
                {/* Ambient glow behind the entire showcase */}
                <div className="absolute -inset-10 bg-gradient-to-br from-[#4338CA]/10 via-[#7C3AED]/8 to-[#22C55E]/8 rounded-3xl blur-[40px] pointer-events-none" />

                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="relative"
                >
                    {/* Mockup Frame */}
                    <motion.div
                        className="relative rounded-[24px] overflow-hidden border border-slate-200/80 shadow-2xl bg-white aspect-[1/1.25] flex items-center justify-center p-3 select-none cursor-grab active:cursor-grabbing"
                        style={{
                            boxShadow: '0 25px 55px rgba(15,23,42,0.16)',
                            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                            transformStyle: 'preserve-3d',
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Glow reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />

                        {/* Photorealistic generated mockup image */}
                        <img
                            src="/premium_resume.png"
                            alt="Premium Executive Mahogany Resume Mockup"
                            className="w-full h-full object-cover rounded-2xl pointer-events-none"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PremiumHeroShowcase;