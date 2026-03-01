
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, Map as MapIcon, Bell, FileText, Settings,
    TrendingUp, AlertCircle, ChevronRight, Activity, MapPin, ShieldAlert, Clock
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

const DETAILED_ALERTS = [
    { id: 1, block: "Uthamapalayam", severity: "CRITICAL", msg: "Urgent: 12 students from Karunakkamuthanpatti village absent for 4 consecutive days.", time: "2 hours ago" },
    { id: 2, block: "Andipatti", severity: "HIGH", msg: "Route 4 bus service cancelled: 45 girls in Rajadhani unable to reach school.", time: "5 hours ago" },
    { id: 3, block: "Periyakulam", severity: "MEDIUM", msg: "Cluster detected: Seasonal migration starting in E.Pudupatti block.", time: "1 day ago" },
    { id: 4, block: "Theni", severity: "HIGH", msg: "System Alert: Grade 10 dropout probability increases in Muthanampatti cluster.", time: "1 day ago" },
    { id: 5, block: "Bodinaickanur", severity: "MEDIUM", msg: "Resource Request: B.Meenakshipuram school requires additional mentor support.", time: "2 days ago" }
];

const HEATMAP_DATA = [
    { id: 'uthamapalayam', name: 'Uthamapalayam', risk: 'HIGH', students: 145, path: "M150,50 L250,50 L250,150 L150,150 Z" },
    { id: 'bodinayakanur', name: 'Bodinaickanur', risk: 'MEDIUM', students: 82, path: "M50,100 L150,50 L150,150 L50,200 Z" },
    { id: 'periyakulam', name: 'Periyakulam', risk: 'LOW', students: 34, path: "M250,50 L350,100 L350,200 L250,150 Z" },
    { id: 'andipatti', name: 'Andipatti', risk: 'CRITICAL', students: 212, path: "M150,150 L250,150 L200,250 L100,250 Z" },
    { id: 'theni', name: 'Theni', risk: 'MEDIUM', students: 76, path: "M200,250 L300,200 L350,300 L200,350 Z" }
];

const SCHOOL_SUMMARY = [
    { taluk: "Uthamapalayam", primary: 2, middle: 1, high: 2, higher: 5, total: 10 },
    { taluk: "Bodinaickanur", primary: 1, middle: 2, high: 1, higher: 1, total: 5 },
    { taluk: "Periyakulam", primary: 0, middle: 0, high: 1, higher: 1, total: 2 },
    { taluk: "Andipatti", primary: 0, middle: 1, high: 0, higher: 2, total: 3 },
    { taluk: "Theni", primary: 0, middle: 3, high: 0, higher: 1, total: 4 },
    { taluk: "Unspecified Taluk", primary: 59, middle: 0, high: 0, higher: 0, total: 59 },
    { taluk: "DISTRICT TOTAL", primary: 62, middle: 7, high: 4, higher: 11, total: 84, isTotal: true }
];

const THENI_SCHOOLS = {
    higher_secondary: [
        { taluk: "Uthamapalayam", name: "Karunakkamuthanpatti - Govt. Higher Secondary School" },
        { taluk: "Uthamapalayam", name: "Vellaiammalpuram - Govt. Higher Secondary School" },
        { taluk: "Uthamapalayam", name: "Uthamapuram - Govt. Higher Secondary School" },
        { taluk: "Uthamapalayam", name: "MelaGudalur - Govt. Higher Secondary School" },
        { taluk: "Uthamapalayam", name: "Markayankottai - Govt. Higher Secondary School" },
        { taluk: "Bodinaickanur", name: "Muthayanchettipatti - Govt. Higher Secondary School" },
        { taluk: "Periyakulam", name: "E.Pudupatti - Govt. Higher Secondary School" },
        { taluk: "Andipatti", name: "Rajadhani - Govt. Higher Secondary School" },
        { taluk: "Andipatti", name: "Ethakovil - Govt. Higher Secondary School" },
        { taluk: "Theni", name: "Muthanampatti - Govt. Higher Secondary School" },
        { taluk: "Theni", name: "Annanji - Govt. Higher Secondary School" }
    ],
    other_schools: {
        Uthamapalayam: [
            { name: "Kullapagoundanpatti Govt High School", type: "High" },
            { name: "Narayanathevanpatti Govt High School", type: "High" },
            { name: "Palarpatti Govt Middle School", type: "Middle" },
            { name: "Rayappanpatti Govt Primary School", type: "Primary" },
            { name: "Thevaram Govt Primary School", type: "Primary" }
        ],
        Bodinaickanur: [
            { name: "B.Anaikaraipatti Govt High School", type: "High" },
            { name: "Bodi (East) Govt Middle School", type: "Middle" },
            { name: "B. Meenakshipuram Govt Middle School", type: "Middle" },
            { name: "Gkps - Muthaiyanchetty Patty", type: "Primary" }
        ],
        Periyakulam: [
            { name: "Pullakkapatti Govt High School", type: "High" }
        ],
        Andipatti: [
            { name: "Kathir Narasingapuram Govt Middle School", type: "Middle" }
        ],
        Theni: [
            { name: "Bommayagoundanpatti Govt Middle School", type: "Middle" },
            { name: "Kakkivadanpatti Govt Middle School", type: "Middle" },
            { name: "Karuvelnaickanpatti Govt Middle School", type: "Middle" }
        ]
    }
};

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [hoveredTaluk, setHoveredTaluk] = useState<any>(null);

    const generateExcelReport = () => {
        const headers = ["Student ID", "Name", "School", "Grade", "Attendance %", "Risk Level", "Village", "Taluk"];
        
        const taluks = ["Uthamapalayam", "Bodinaickanur", "Periyakulam", "Andipatti", "Theni"];
        const schools = [
            "Karunakkamuthanpatti HS", "Vellaiammalpuram HS", "Uthamapuram HS", 
            "MelaGudalur HS", "Markayankottai HS", "Muthayanchettipatti HS", 
            "E.Pudupatti HS", "Rajadhani HS", "Ethakovil HS", 
            "Muthanampatti HS", "Annanji HS"
        ];
        const names = ["Ananya", "Priya", "Meena", "Kavitha", "Selvi", "Divya", "Sneha", "Keerthika", "Harini", "Ishwarya", "Deepa", "Ramya", "Lakshmi", "Vani", "Sita"];
        const grades = ["6th", "7th", "8th", "9th", "10th", "11th", "12th"];

        const rows = [];
        for (let i = 1; i <= 200; i++) {
            const id = `ID_${i.toString().padStart(3, '0')}`;
            const name = names[Math.floor(Math.random() * names.length)];
            const taluk = taluks[Math.floor(Math.random() * taluks.length)];
            const school = schools[Math.floor(Math.random() * schools.length)];
            const grade = grades[Math.floor(Math.random() * grades.length)];
            const attendance = Math.floor(Math.random() * 60) + 40; // 40-100%
            let risk = "LOW";
            if (attendance < 50) risk = "CRITICAL";
            else if (attendance < 70) risk = "HIGH";
            else if (attendance < 85) risk = "MEDIUM";
            
            rows.push([id, name, school, grade, `${attendance}%`, risk, "Theni Village", taluk]);
        }

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Theni_Dropout_Risk_Report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'CRITICAL': return '#ef4444';
            case 'HIGH': return '#f59e0b';
            case 'MEDIUM': return '#4f46e5';
            case 'LOW': return '#10b981';
            default: return '#64748b';
        }
    };

    const renderHeatmapSVG = () => (
        <div className={styles.map_visualization_card}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Theni District Risk Heatmap</h3>
                <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Interactive visualization of dropout probability by taluk</p>
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                <svg viewBox="0 0 400 400" className={styles.theni_svg_map}>
                    {HEATMAP_DATA.map((taluk) => (
                        <motion.path
                            key={taluk.id}
                            d={taluk.path}
                            fill={getRiskColor(taluk.risk)}
                            fillOpacity={hoveredTaluk?.id === taluk.id ? 0.9 : 0.6}
                            className={styles.map_block}
                            onMouseEnter={() => setHoveredTaluk(taluk)}
                            onMouseLeave={() => setHoveredTaluk(null)}
                            onClick={() => alert(`Selected Taluk: ${taluk.name}\nRisk Level: ${taluk.risk}\nAt-Risk Students: ${taluk.students}`)}
                            whileHover={{ scale: 1.05, strokeWidth: 3 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    ))}
                </svg>

                {hoveredTaluk && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.map_tooltip}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: '#1e293b',
                            padding: '1rem',
                            borderRadius: '12px',
                            border: `2px solid ${getRiskColor(hoveredTaluk.risk)}`,
                            zIndex: 10,
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                            pointerEvents: 'none'
                        }}
                    >
                        <div style={{ fontWeight: 800, color: 'white', marginBottom: '0.2rem' }}>{hoveredTaluk.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.7rem', color: getRiskColor(hoveredTaluk.risk), fontWeight: 900 }}>{hoveredTaluk.risk} RISK</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Students at Risk: <b style={{ color: 'white' }}>{hoveredTaluk.students}</b></div>
                    </motion.div>
                )}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(level => (
                    <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: getRiskColor(level) }}></div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{level}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAlertsView = () => (
        <div className={styles.alerts_view_container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0 }}>Active Intervention Alerts</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span className={styles.status_badge_critical}>6 ACTIVE CRITICAL</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {DETAILED_ALERTS.map((alert) => (
                    <motion.div
                        key={alert.id}
                        className={styles.alert_full_card}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                                <ShieldAlert size={24} color={getRiskColor(alert.severity)} />
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
                                    <span style={{ fontWeight: 800 }}>{alert.block} Block</span>
                                    <span className={`${styles.severity_tag} ${alert.severity === 'CRITICAL' ? styles.sev_critical : alert.severity === 'HIGH' ? styles.sev_high : styles.sev_medium}`}>
                                        {alert.severity}
                                    </span>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{alert.msg}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.5 }}>
                                    <Clock size={12} />
                                    <span>{alert.time}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => alert(`Dispatching mentor to ${alert.block} block...`)}
                                style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'var(--admin-indigo)', border: 'none', color: 'white', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'filter 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                            >
                                DISPATCH MENTOR
                            </button>
                            <button
                                onClick={() => alert(`Viewing profile details for ${alert.block} risk group...`)}
                                style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                                VIEW PROFILE
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={styles.admin_layout}>
            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebar_logo}>
                    KALVI KAVALAR
                </div>
                <nav style={{ flex: 1 }}>
                    <div
                        className={`${styles.nav_item_admin} ${activeTab === 'dashboard' ? styles.nav_item_admin_active : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </div>
                    <div
                        className={`${styles.nav_item_admin} ${activeTab === 'schools' ? styles.nav_item_admin_active : ''}`}
                        onClick={() => setActiveTab('schools')}
                    >
                        <Users size={20} />
                        <span>Schools</span>
                    </div>
                    <div
                        className={`${styles.nav_item_admin} ${activeTab === 'heatmap' ? styles.nav_item_admin_active : ''}`}
                        onClick={() => setActiveTab('heatmap')}
                    >
                        <MapIcon size={20} />
                        <span>Heatmap</span>
                    </div>
                    <div
                        className={`${styles.nav_item_admin} ${activeTab === 'alerts' ? styles.nav_item_admin_active : ''}`}
                        onClick={() => setActiveTab('alerts')}
                    >
                        <AlertCircle size={20} />
                        <span>Alerts</span>
                    </div>
                </nav>
                <div className={styles.nav_item_admin}>
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={styles.main_content}>
                <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>
                            {activeTab === 'dashboard' ? 'Theni District Overview' :
                                activeTab === 'schools' ? 'Theni School Network' :
                                    activeTab === 'heatmap' ? 'Dropout Risk Heatmap' : 'Intervention Alerts'}
                        </h1>
                        <p style={{ margin: 0, color: '#94a3b8' }}>
                            {activeTab === 'dashboard' ? 'Real-time data for Dropout Prevention (Kalvi Kavalar)' :
                                activeTab === 'schools' ? 'Distribution of 84 Educational Institutions' :
                                    activeTab === 'heatmap' ? 'Geospatial risk analysis across 5 Taluks' : 'Critical action items for field mentors'}
                        </p>
                    </div>
                    <button
                        className={styles.generate_btn}
                        style={{ background: 'var(--admin-indigo)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}
                        onClick={generateExcelReport}
                    >
                        GENERATE REPORT
                    </button>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Global KPIs */}
                            <div className={styles.kpi_grid}>
                                {ADMIN_STATS.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        className={styles.kpi_card}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
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
                                <div className={styles.map_card} onClick={() => setActiveTab('heatmap')} style={{ cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h3 style={{ margin: 0 }}>Quick Heatmap Preview</h3>
                                        <TrendingUp size={18} color="#94a3b8" />
                                    </div>
                                    <div style={{ width: '100%', height: '350px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        <svg viewBox="0 0 400 400" style={{ width: '80%', height: '80%', opacity: 0.4 }}>
                                            {HEATMAP_DATA.map((taluk) => (
                                                <path key={taluk.id} d={taluk.path} fill={getRiskColor(taluk.risk)} />
                                            ))}
                                        </svg>
                                    </div>
                                    <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.5, marginTop: '1rem' }}>Click to view full interactive map</p>
                                </div>

                                <div className={styles.notification_card} onClick={() => setActiveTab('alerts')} style={{ cursor: 'pointer' }}>
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
                        </motion.div>
                    )}

                    {activeTab === 'schools' && (
                        <motion.div
                            key="schools"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={styles.schools_view_container}
                        >
                            <div className={styles.school_summary_card}>
                                <h3 style={{ margin: 0 }}>📊 SCHOOL COUNT SUMMARY</h3>
                                <table className={styles.school_data_table}>
                                    <thead>
                                        <tr>
                                            <th>Taluk</th>
                                            <th>Primary</th>
                                            <th>Middle</th>
                                            <th>High</th>
                                            <th>Higher Secondary</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {SCHOOL_SUMMARY.map((row, i) => (
                                            <tr key={i} className={row.isTotal ? styles.total_row : ''}>
                                                <td>{row.taluk}</td>
                                                <td>{row.primary}</td>
                                                <td>{row.middle}</td>
                                                <td>{row.high}</td>
                                                <td>{row.higher}</td>
                                                <td>{row.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h3 style={{ marginTop: '3.5rem' }}>📋 COMPLETE SCHOOL LIST</h3>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <h4 style={{ color: 'var(--admin-indigo)', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid rgba(79, 70, 229, 0.2)', paddingBottom: '0.5rem' }}>
                                    HIGHER SECONDARY SCHOOLS (11 Schools)
                                </h4>
                                <div className={styles.block_list_container}>
                                    {["Uthamapalayam", "Bodinaickanur", "Periyakulam", "Andipatti", "Theni"].map(taluk => {
                                        const schoolsInTaluk = THENI_SCHOOLS.higher_secondary.filter(s => s.taluk === taluk);
                                        if (schoolsInTaluk.length === 0) return null;
                                        return (
                                            <div key={taluk} className={styles.block_school_card}>
                                                <div className={styles.block_name}>{taluk} Taluk ({schoolsInTaluk.length} {schoolsInTaluk.length === 1 ? 'School' : 'Schools'})</div>
                                                {schoolsInTaluk.map((school, i) => (
                                                    <div key={i} className={styles.school_item_mini}>
                                                        <span>{school.name}</span>
                                                        <span className={styles.school_type_label}>Govt. HS</span>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <h4 style={{ color: 'var(--admin-indigo)', fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '2px solid rgba(79, 70, 229, 0.2)', paddingBottom: '0.5rem' }}>
                                OTHER EDUCATIONAL INSTITUTIONS
                            </h4>
                            <div className={styles.block_list_container}>
                                {Object.entries(THENI_SCHOOLS.other_schools).map(([block, schools]) => (
                                    <div key={block} className={styles.block_school_card}>
                                        <div className={styles.block_name}>{block} Taluk ({schools.length} Schools)</div>
                                        {schools.map((school, i) => (
                                            <div key={i} className={styles.school_item_mini}>
                                                <span>{school.name}</span>
                                                <span className={styles.school_type_label}>{school.type}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'heatmap' && (
                        <motion.div
                            key="heatmap"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className={styles.heatmap_view_container}
                        >
                            {renderHeatmapSVG()}
                        </motion.div>
                    )}

                    {activeTab === 'alerts' && (
                        <motion.div
                            key="alerts"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {renderAlertsView()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

