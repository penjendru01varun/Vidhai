
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Building2, LayoutDashboard, Heart } from 'lucide-react';

export default function Home() {
    return (
        <main style={{ minHeight: '100vh', background: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <div style={{ background: 'rgba(79, 70, 229, 0.1)', display: 'inline-flex', padding: '1rem', borderRadius: '20px', marginBottom: '1.5rem', color: '#4f46e5' }}>
                    <GraduationCap size={48} />
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, letterSpacing: '-0.05em' }}>KALVI KAVALAR</h1>
                <p style={{ opacity: 0.6, fontSize: '1.2rem' }}>Theni Dropout Prevention Ecosystem (Education Guardian)</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1000px', width: '100%' }}>

                {/* Student App Portal */}
                <Link href="/student" style={{ textDecoration: 'none' }}>
                    <motion.div
                        whileHover={{ y: -10 }}
                        style={{ background: 'rgba(233, 30, 99, 0.05)', border: '1px solid rgba(233, 30, 99, 0.2)', padding: '2rem', borderRadius: '30px', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <div style={{ color: '#e91e63', marginBottom: '1rem' }}><Heart size={32} /></div>
                        <h3 style={{ margin: 0, color: '#e91e63' }}>STUDENT PORTAL</h3>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Empowerment & Rewards</p>
                    </motion.div>
                </Link>

                {/* Parent App Portal */}
                <Link href="/parent" style={{ textDecoration: 'none' }}>
                    <motion.div
                        whileHover={{ y: -10 }}
                        style={{ background: 'rgba(46, 125, 50, 0.05)', border: '1px solid rgba(46, 125, 50, 0.2)', padding: '2rem', borderRadius: '30px', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <div style={{ color: '#2e7d32', marginBottom: '1rem' }}><Users size={32} /></div>
                        <h3 style={{ margin: 0, color: '#2e7d32' }}>PARENT PORTAL</h3>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Voice-First Updates</p>
                    </motion.div>
                </Link>

                {/* Admin App Portal */}
                <Link href="/admin" style={{ textDecoration: 'none' }}>
                    <motion.div
                        whileHover={{ y: -10 }}
                        style={{ background: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.2)', padding: '2rem', borderRadius: '30px', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <div style={{ color: '#4f46e5', marginBottom: '1rem' }}><LayoutDashboard size={32} /></div>
                        <h3 style={{ margin: 0, color: '#4f46e5' }}>ADMIN DASHBOARD</h3>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Strategic Intelligence</p>
                    </motion.div>
                </Link>

            </div>

            {/* Teacher App (Future Integration) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}
            >
                <Building2 size={16} />
                <span>Teacher Portal available in school kiosks</span>
            </motion.div>
        </main>
    );
}
