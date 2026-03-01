/**
 * KALVI KAVALAR - Master AI API
 * Unified Entry Point for All 15 Agents
 */

const Predictive = require('./services/predictive_analytics');
const Comm = require('./services/communication_engagement');
const Ops = require('./services/intervention_ops');
const { db, Logger } = require('./core/infrastructure');

const KalviKavalarAI = {
    // 🔍 AGENT 4: ATTENDANCE PATTERN DETECTOR
    // Deep logic for day-of-week, seasonal, and holiday patterns
    async detectPatterns(studentId) {
        const attendance = await db.query('attendance', a => a.studentId === studentId);
        const dayMap = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday' };

        const absencesByDay = attendance.filter(a => a.status === 'absent').reduce((acc, a) => {
            const day = a.date.getDay();
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        }, {});

        const patterns = [];
        if (absencesByDay[1] > 2) patterns.push('Monday-Regular-Absence');
        if (absencesByDay[5] > 2) patterns.push('Friday-Holiday-Extension');

        await db.set('patterns', studentId, { studentId, patterns, lastAnalyzed: new Date() });
        return patterns;
    },

    // 🚀 MASTER SIMULATION: END-TO-END FLOW
    async runDailyIntelligenceCycle() {
        Logger.info('MasterAI', 'Starting Daily Processing Cycle...');
        if (!Predictive || !Predictive.DropoutPredictor) {
            Logger.error('MasterAI', 'CRITICAL: Predictive module or DropoutPredictor is undefined!');
            console.log('Predictive object state:', Predictive);
            throw new Error('Predictive module load failed');
        }

        // 1. Predict Risks (Agent 1)
        const students = await db.list('students');
        for (const s of students) {
            await Predictive.DropoutPredictor.predictDropoutRisk(s.id);
        }

        // 2. Monitor for Early Warnings (Agent 2)
        await Predictive.EarlyWarningSystem.monitorStudents();

        // 3. Match Mentors (Agent 11)
        const highRisk = await db.query('riskScores', r => r.score > 50);
        for (const r of highRisk) {
            await Ops.MentorMatcher.findBestMentor(r.studentId);
        }

        // 4. Update Game State (Agent 10)
        for (const s of students) {
            await Comm.GamificationEngine.awardPoints(s.id, 'attendance');
        }

        Logger.info('MasterAI', 'Daily Intelligence Cycle Completed.');
    },

    // Standardized Agent Accessors
    Predictor: Predictive.DropoutPredictor,
    Warning: Predictive.EarlyWarningSystem,
    RiskAnalyzer: Predictive.RiskFactorAnalyzer,
    PatternDetector: (studentId) => KalviKavalarAI.detectPatterns(studentId), // Self-contained here
    Communicator: Comm.ParentCommunicator,
    Voice: Comm.VoiceAssistant,
    Emergency: Ops.EmergencyDispatcher,
    Translator: Comm.Translator,
    Personalizer: Comm.ContentPersonalizer,
    Gamification: Comm.GamificationEngine,
    Matcher: Ops.MentorMatcher,
    Optimizer: Ops.InterventionOptimizer,
    Allocator: Ops.ResourceAllocator,
    Discovery: Predictive.PatternDiscoveryEngine,
    Simulator: Predictive.ImpactSimulator
};

module.exports = KalviKavalarAI;
