/**
 * KALVI KAVALAR - Full Backend Test & Simulation
 * Demonstrating the 15-Agent Intelligence Chain 
 */

const KalviKavalarAI = require('./master_ai_api');
const { db, randomUUID } = require('./core/infrastructure');

async function simulateFullSystem() {
    console.log('--- 🛡️ KALVI KAVALAR: Master Intelligence Cycle Simulation ---');

    // 1. Setup Mock State
    const sId = randomUUID();
    const pId = randomUUID();

    await db.set('students', sId, { name: 'Malthathi K.', block: 'Andipatti', bplStatus: true, careerInterest: 'Nursing' });
    await db.set('parents', pId, { name: 'Parvathi', literacyLevel: 'low', responseRate: 45, children: [sId] });
    await db.set('attendance', randomUUID(), { studentId: sId, date: new Date(), status: 'absent' });
    await db.set('mentors', randomUUID(), { name: 'Dr. Priya', active: true, block: 'Andipatti', careerPath: 'Healthcare', currentMentees: 0, maxMentees: 5 });

    // 2. Run Daily Processing (Agents 1, 2, 4, 10, 11, 14)
    console.log('\n[Phase 1] Analyzing Daily Attendance & Risk...');
    await KalviKavalarAI.runDailyIntelligenceCycle();

    // 3. Drill Down on a specific risk (Agents 3 & 4)
    console.log('\n[Phase 2] Diagnostic Analysis (Agent 3/4)...');
    const riskAnalysis = await KalviKavalarAI.RiskAnalyzer.analyzeRiskFactors(sId);
    const patterns = await KalviKavalarAI.PatternDetector(sId);
    console.log(`Risk Diagnostic: ${riskAnalysis.primaryFactor.description}`);
    console.log(`Detected Patterns: ${patterns.join(', ')}`);

    // 4. Trigger Intervention (Agents 5, 6, 7)
    console.log('\n[Phase 3] Communication & Emergency Triage (Agent 5/6/7)...');
    const optimalChannel = await KalviKavalarAI.Communicator.selectOptimalChannel(pId, 'CRITICAL');
    console.log(`Selected Channel for Parent: ${optimalChannel.channel} (Score: ${optimalChannel.score})`);

    const ivrResponse = await KalviKavalarAI.Voice.handleIncomingIVR(pId, '1');
    console.log(`IVR State: ${ivrResponse.messageTamil}`);

    const emergency = await KalviKavalarAI.Emergency.triggerEmergencyResponse(sId, 'CHILD_LABOR');
    console.log(`Emergency Status: ${emergency.status} (Protocol: ${emergency.protocol})`);

    // 5. Strategic Intelligence (Agents 14, 15)
    console.log('\n[Phase 4] Strategic Intelligence (Agent 14/15)...');
    const trends = await KalviKavalarAI.Discovery.discoverGeographicTrends();
    const simulation = await KalviKavalarAI.Simulator.runSimulation({ budget: 50000, focusBlock: 'Andipatti' });
    console.log('Projected Impact:', simulation.realistic.dropoutReduction);

    console.log('\n--- Simulation Complete ---');
}

simulateFullSystem();
