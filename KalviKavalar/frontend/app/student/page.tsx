
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Flame, Star, BookOpen, User, Trophy, LayoutGrid, Heart,
    Sparkles, Compass, MapPin, Bell, Search, GraduationCap
} from 'lucide-react';
import styles from './student.module.css';

// Mock data reflecting current session state
const STUDENT_PROFILE = {
    name: "Ananya",
    streak: 7,
    coins: 1250,
    attendance: 94,
    rank: 3,
    block: "Andipatti",
    season: "Grapes Harvest (Critical)"
};

// Animation variants for orchestration
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
} as const;

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
} as const;

export default function StudentHome() {
    const [greeting, setGreeting] = useState("Vanakam");
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        const timer = setInterval(() => {
            setGreeting(prev => prev === "Vanakam" ? "வணக்கம்" : "Vanakam");
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            className={styles.container}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Background Decorative Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 20, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--glow-magenta), transparent)', zIndex: 0 }}
            />

            {/* Header Segment */}
            <motion.header className={styles.header} variants={itemVariants}>
                <div style={{ position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        <motion.h1
                            className={styles.greeting}
                            key={greeting}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.6 }}
                        >
                            {greeting}, <span>{STUDENT_PROFILE.name}!</span>
                        </motion.h1>
                    </AnimatePresence>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{ position: 'absolute', top: -10, left: -20, opacity: 0.2 }}
                    >
                        <Sparkles size={16} color="var(--gold-primary)" />
                    </motion.div>
                </div>

                <div className={styles.user_avatar_container}>
                    <div className={styles.avatar_glow} />
                    <motion.div
                        className={styles.avatar_circle}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <User size={24} color="var(--magenta-primary)" />
                    </motion.div>
                </div>
            </motion.header>

            {/* The Dynamic Fire Streak (Agent 10 Integration) */}
            <motion.div
                className={styles.streak_card}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
            >
                <div className={styles.fire_glow} />
                <motion.div
                    className={styles.fire_icon_wrapper}
                    animate={{
                        scale: [1, 1.15, 1],
                        filter: ["drop-shadow(0 0 5px #ff5722)", "drop-shadow(0 0 20px #ff5722)", "drop-shadow(0 0 5px #ff5722)"]
                    }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    style={{ fontSize: '3.5rem', zIndex: 2 }}
                >
                    🔥
                </motion.div>
                <div className={styles.streak_info} style={{ zIndex: 2 }}>
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Attendance Streak
                    </motion.h3>
                    <p>{STUDENT_PROFILE.streak} Days Fire!</p>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '0.5rem' }}>
                        {[...Array(7)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1 + (i * 0.1) }}
                                style={{ width: '12px', height: '12px', background: i < 7 ? '#ffd700' : 'rgba(255,255,255,0.2)', borderRadius: '50%' }}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.streak_bg_icon}>🔥</div>
            </motion.div>

            {/* Kalvi Coins Interactive Belt */}
            <motion.div
                className={styles.coin_belt}
                variants={itemVariants}
                whileHover={{ boxShadow: "0 0 20px var(--glow-magenta)" }}
            >
                <div className={styles.coin_label_group}>
                    <motion.div
                        className={styles.coin_icon_wrapper}
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <Star fill="var(--gold-primary)" size={24} color="transparent" />
                    </motion.div>
                    <span style={{ fontWeight: 700, letterSpacing: '0.05em' }}>KALVI COINS</span>
                </div>
                <motion.div
                    className={styles.coin_value}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    key={STUDENT_PROFILE.coins}
                >
                    {STUDENT_PROFILE.coins.toLocaleString()}
                </motion.div>
            </motion.div>

            {/* Glass Stat Grid with Micro-Animations */}
            <div className={styles.stats_grid_complex}>
                <motion.div className={styles.glass_stat_card} variants={itemVariants} whileHover={{ y: -8 }}>
                    <motion.div
                        className={styles.progress_arc_placeholder}
                        style={{ border: '4px solid rgba(76, 175, 80, 0.1)', borderRadius: '50%', borderTop: '4px solid #4caf50' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <div style={{ position: 'absolute', top: '1.8rem', left: '0', right: '0', fontWeight: 800, color: '#4caf50' }}>{STUDENT_PROFILE.attendance}%</div>
                    <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.6, marginTop: '2.5rem' }}>ATTENDANCE</p>
                </motion.div>

                <motion.div className={styles.glass_stat_card} variants={itemVariants} whileHover={{ y: -8 }}>
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <Trophy size={28} color="var(--gold-primary)" />
                    </motion.div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: '0.5rem' }}>#{STUDENT_PROFILE.rank}</div>
                    <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.6 }}>DISTRICT RANK</p>
                </motion.div>
            </div>

            {/* The Seasonal Alert Overlay (Agent 14 Integration) */}
            <motion.div
                className={styles.empowerment_banner}
                variants={itemVariants}
                style={{ borderColor: 'rgba(233, 30, 99, 0.3)' }}
            >
                <motion.div
                    className={styles.quote_symbol}
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                >
                    <GraduationCap size={100} />
                </motion.div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <MapPin size={16} color="var(--magenta-primary)" />
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.6 }}>{STUDENT_PROFILE.block} BLOCK</span>
                    </div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Harvest Season is here!</h4>
                    <p style={{ margin: '0.5rem 0 0.8rem', fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.5 }}>
                        Protect your education fire. Complete 5 modules this week to earn double coins!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, background: 'var(--magenta-primary)', color: 'white' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            background: 'transparent', border: '2px solid var(--magenta-primary)',
                            color: 'var(--magenta-primary)', padding: '0.8rem 1.5rem', borderRadius: '14px',
                            fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer'
                        }}
                    >
                        START LEARNING
                    </motion.button>
                </div>
            </motion.div>

            {/* Floating Dynamic Navigation */}
            <nav className={styles.nav_bar_floating}>
                {[
                    { id: 'home', icon: LayoutGrid, label: 'Home' },
                    { id: 'learn', icon: BookOpen, label: 'Learn' },
                    { id: 'goals', icon: Compass, label: 'Explore' },
                    { id: 'profile', icon: User, label: 'Me' }
                ].map((tab) => (
                    <div
                        key={tab.id}
                        className={styles.nav_item_complex}
                        onClick={() => setActiveTab(tab.id)}
                        style={{ color: activeTab === tab.id ? 'var(--magenta-primary)' : '#64748b' }}
                    >
                        {activeTab === tab.id && <motion.div layoutId="nav_indicator" className={styles.tab_indicator} />}
                        <motion.div whileTap={{ y: -5 }}>
                            <tab.icon size={22} />
                        </motion.div>
                        <span style={{ fontSize: '0.65rem', fontWeight: activeTab === tab.id ? 800 : 500 }}>{tab.label}</span>
                        {activeTab === tab.id && <motion.div layoutId="nav_pill" className={styles.active_pill} />}
                    </div>
                ))}
            </nav>
        </motion.div>
    );
}
