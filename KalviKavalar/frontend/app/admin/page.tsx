
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Users, Map as MapIcon, Bell, FileText, Settings,
    TrendingUp, AlertCircle, ChevronRight, Activity
} from 'lucide-react';
import styles from './admin.module.css';

const ADMIN_STATS = [
    { label: "Total Students", value: "15,240", change: "+12%", color: "#4f46e5" },
    { label: "District Attendance", value: "92.4%", change: "+0.5%", color: "#10b981" },
    { label: "At-Risk Students", value: "482", change: "-5%", color: "#ef4444" },
    { label: "Success Stories", value: "112", change: "+24", color: "#f59e0b" }
];

const ALERTS = [
    { block: "Uthamapalayam", risk: "CRITICAL", msg: "High drop-off in Grade 9 girls during harvest." },
    { block: "Andipatti", risk: "HIGH", msg: "Attendance dip below 70% in 5 village schools." },
    { block: "Bodinayakanur", risk: "MEDIUM", msg: "Migration patterns detected in tea worker families." }
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className={styles.admin_layout}>
            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebar_logo}>
                    KALVI KAVALAR
                </div>
                <nav style={{ flex: 1 }}>
                    <div className={`${styles.nav_item_admin} ${styles.nav_item_admin_active}`}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </div>
                    <div className={styles.nav_item_admin}>
                        <Users size={20} />
                        <span>Schools</span>
                    </div>
                    <div className={styles.nav_item_admin}>
                        <MapIcon size={20} />
                        <span>Heatmap</span>
                    </div>
                    <div className={styles.nav_item_admin}>
                        <AlertCircle size={20} />
                        <span>Alerts</span>
                    </div>
                </nav>
                <div className={styles.nav_item_admin}>
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
            </aside>

            {/* Main Stats Area */}
            <main className={styles.main_content}>
                <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>Theni District Overview</h1>
                        <p style={{ margin: 0, color: '#94a3b8' }}>Real-time data for Dropout Prevention (Kalvi Kavalar)</p>
                    </div>
                    <button style={{ background: 'var(--admin-indigo)', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '10px', fontWeight: 800 }}>
                        GENERATE REPORT
                    </button>
                </header>

                {/* Global KPIs */}
                <div className={styles.kpi_grid}>
                    {ADMIN_STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            className={styles.kpi_card}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={styles.kpi_label}>{stat.label}</div>
                            <div className={styles.kpi_value} style={{ color: stat.color }}>{stat.value}</div>
                            <div style={{ fontSize: '0.7rem', color: '#10b981', marginTop: '0.5rem' }}>
                                {stat.change} vs last month
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Analytical Section */}
                <div className={styles.dashboard_flex}>
                    {/* Interactive Heatmap Mockup */}
                    <div className={styles.map_card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>District Dropout Risk Heatmap</h3>
                            <TrendingUp size={18} color="#94a3b8" />
                        </div>
                        <div style={{ width: '100%', height: '350px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="map_placeholder"
                                style={{ textAlign: 'center', color: '#64748b' }}
                            >
                                <Activity size={80} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                                <p>Interactive Map Component Loading...</p>
                                <i style={{ fontSize: '0.8rem' }}>Showing Hotspots in Andipatti & Periyakulam</i>
                            </motion.div>
                        </div>
                    </div>

                    {/* Notification Sidebar */}
                    <div className={styles.notification_card}>
                        <h3 style={{ margin: 0, marginBottom: '1.5rem' }}>Recent Alerts</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {ALERTS.map((alert, i) => (
                                <motion.div
                                    key={i}
                                    style={{ borderLeft: '3px solid', borderColor: alert.risk === 'CRITICAL' ? '#ef4444' : '#f59e0b', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0 12px 12px 0' }}
                                    whileHover={{ x: 5 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>{alert.block}</span>
                                        <span className={styles.status_badge_critical}>{alert.risk}</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>{alert.msg}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
