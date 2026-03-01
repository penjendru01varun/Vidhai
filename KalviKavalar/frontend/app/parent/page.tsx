
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic, Volume2, MessageSquare, Phone, Activity, Heart,
    HelpCircle, Layers, Play, Pause, BellRing, Info
} from 'lucide-react';
import styles from './parent.module.css';

const PARENT_DASHBOARD_DATA = {
    daughter: "Ananya",
    status: "GOOD", // "GOOD", "AT_RISK", "ABSENT"
    updateDate: "March 1st, 2026",
    tamilNote: "அனன்யா இன்று பள்ளிக்கு வந்து உற்சாகமாக பங்கேற்றார். வகுப்பு தேர்வில் 100/100 எடுத்தார்!"
};

// Orchestration Variants
const listVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function ParentDashboard() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState('listen');

    const togglePlayback = () => setIsPlaying(!isPlaying);

    return (
        <motion.div
            className={styles.parent_container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Dynamic Header */}
            <motion.div
                className={styles.parent_header}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
            >
                <div className={styles.user_avatar_parent}>
                    <Heart size={32} color="var(--parent-green)" fill="rgba(46,125,50,0.1)" />
                </div>
                <div>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, opacity: 0.6 }}>Good Afternoon, Mother!</p>
                    <h2>Vanakam! வணக்கம்!</h2>
                </div>
            </motion.div>

            {/* High-Impact Status Card (Accessibility Focus) */}
            <motion.div
                className={styles.status_card_complex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
            >
                <div className={styles.status_glow} />

                <motion.div
                    className={styles.status_emoji_vibrate}
                    animate={{
                        rotate: [0, -5, 5, -5, 5, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                >
                    {PARENT_DASHBOARD_DATA.status === "GOOD" ? "🌟" : "🛡️"}
                </motion.div>

                <h3 className={styles.status_text_bold}>{PARENT_DASHBOARD_DATA.daughter} is a Star!</h3>
                <p className={styles.date_ribbon}>{PARENT_DASHBOARD_DATA.updateDate} Attendance: PRESENT</p>

                <motion.div
                    className={styles.tamil_voice_note_bubble}
                    whileHover={{ scale: 1.05 }}
                >
                    {PARENT_DASHBOARD_DATA.tamilNote}
                </motion.div>
            </motion.div>

            {/* CORE INTERACTION: PULSING AUDIO ORB (Agent 6 Simulation) */}
            <div className={styles.listen_interaction_zone}>
                <div className={styles.orb_ring_pulse}>
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid var(--parent-green)', borderRadius: '50%' }}
                            animate={{ scale: [1, 2.8], opacity: [0.6, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.8, ease: "easeOut" }}
                        />
                    ))}
                </div>

                <motion.div
                    className={styles.pulse_orb_primary}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlayback}
                >
                    <AnimatePresence mode='wait'>
                        {isPlaying ? (
                            <motion.div
                                key="pause"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                            >
                                <Pause size={64} fill="currentColor" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="play"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 90 }}
                            >
                                <Play size={64} fill="currentColor" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.p
                    className={styles.instruction_text}
                    animate={{ color: isPlaying ? 'var(--parent-green)' : '#94a3b8' }}
                >
                    {isPlaying ? "HEARING ATTENDANCE UPDATE..." : "PRESS TO HEAR UPDATE"}
                </motion.p>

                {/* Dynamic Voice Visualizer (Agent 6 Interface) */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className={styles.listening_waves_container}
                        >
                            {[...Array(15)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    style={{ width: '6px', background: 'var(--parent-green)', borderRadius: '4px' }}
                                    animate={{ height: [12, Math.random() * 45 + 15, 12] }}
                                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.04 }}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Support Actions Grid */}
            <motion.div
                className={styles.parent_action_grid}
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.button variants={itemVariants} className={styles.action_button_parent} whileTap={{ scale: 0.95 }}>
                    <div style={{ background: 'rgba(33, 150, 243, 0.1)', padding: '1rem', borderRadius: '18px' }}>
                        <Phone color="#2196f3" size={28} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>CALL TEACHER</span>
                </motion.button>

                <motion.button variants={itemVariants} className={styles.action_button_parent} whileTap={{ scale: 0.95 }}>
                    <div style={{ background: 'rgba(156, 39, 176, 0.1)', padding: '1rem', borderRadius: '18px' }}>
                        <HelpCircle color="#9c27b0" size={28} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>NEED HELP?</span>
                </motion.button>
            </motion.div>

            {/* Floating Navigation (High Tactility) */}
            <nav className={styles.parent_nav_tabs}>
                {[
                    { id: 'listen', icon: Volume2, label: 'LISTEN' },
                    { id: 'comm', icon: Heart, label: 'SISTERS' },
                    { id: 'alerts', icon: BellRing, label: 'ALERTS' }
                ].map((tab) => (
                    <motion.div
                        key={tab.id}
                        className={styles.nav_item_parent_complex}
                        onClick={() => setActiveTab(tab.id)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div style={{ position: 'relative' }}>
                            <tab.icon size={26} color={activeTab === tab.id ? 'var(--parent-green)' : '#94a3b8'} />
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="parent_nav_glow"
                                    style={{ position: 'absolute', top: -5, left: -5, right: -5, bottom: -5, background: 'rgba(46, 125, 50, 0.1)', borderRadius: '50%', zIndex: -1 }}
                                />
                            )}
                        </div>
                        <span className={`${styles.nav_item_parent_label} ${activeTab === tab.id ? styles.active_label : ''}`}>
                            {tab.id === 'listen' ? 'கேள்' : (tab.id === 'comm' ? 'சமூகம்' : 'அறிவிப்பு')}
                        </span>
                    </motion.div>
                ))}
            </nav>
        </motion.div>
    );
}
