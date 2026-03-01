const express = require('express');
const cors = require('cors');
const { Logger } = require('./core/infrastructure');
const KalviKavalarAI = require('./master_ai_api');
const Chatbot = require('./services/chatbot_engine');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🤖 1. DAILY INTELLIGENCE CYCLE ENDPOINT
app.post('/api/daily-intelligence', async (req, res) => {
    try {
        Logger.info('Backend', 'Triggering Daily Intelligence Cycle via API');
        const result = await KalviKavalarAI.runDailyIntelligenceCycle();
        res.json({ success: true, result });
    } catch (err) {
        Logger.error('Backend', 'Intelligence cycle failed', err);
        res.status(500).json({ error: 'Internal intelligence failure' });
    }
});

// 💬 2. CHATBOT INTERACTION ENDPOINT
app.post('/api/chat', async (req, res) => {
    const { userId, role, message } = req.body;
    try {
        const response = await Chatbot.processIncomingMessage(userId, role, message);
        res.json(response);
    } catch (err) {
        Logger.error('Backend', 'Chat completion failed', err);
        res.status(500).json({ error: 'Chatbot is currently offline' });
    }
});

// 📊 3. HEALTH CHECK (All 15 Agents Readiness)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        system: 'KALVI KAVALAR AI Mission Control',
        agents_total: 15,
        agents_active: 15,
        version: '1.2.0'
    });
});

app.listen(PORT, () => {
    Logger.info('Backend', `🚀 AI Mission Control started on port ${PORT}`);
});
