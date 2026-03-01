/**
 * KALVI KAVALAR - KALVI THUNAI (Education Companion)
 * Intelligent Chatbot Engine supporting Tamil/English for 4 User Roles
 */

const { db, Logger, randomUUID } = require('../core/infrastructure');
const Predictive = require('./predictive_analytics');
const Comm = require('./communication_engagement');
const Ops = require('./intervention_ops');

// 🌐 TAMIL & ENGLISH TEMPLATE ENGINE
const RESPONSES = {
    ta: {
        greeting: (name) => `வணக்கம் ${name}! கல்வி காவலர் உதவி மையத்திற்கு வரவேற்கிறோம். இன்று உங்களுக்கு எப்படி உதவ முடியும்?`,
        attendance_student: (data) => `${data.name}, உங்கள் வருகை நிலை: இன்று ${data.status === 'present' ? 'வந்தது' : 'இல்லை'}. கடந்த 7 நாட்களில் ${data.presentCount} நாட்கள் வந்துள்ளீர்கள். ${data.streak > 3 ? 'மிகவும் நன்று!' : 'தொடர்ந்து பள்ளிக்கு வாருங்கள்.'}`,
        risk_high: (name) => `முக்கிய எச்சரிக்கை! ${name} அடிக்கடி பள்ளிக்கு வருவதில்லை. இது அவரது எதிர்காலத்தை பாதிக்கும். உதவிக்கு எங்களை தொடர்பு கொள்ளவும்.`,
        emergency: (type) => `🚨 அவசர உதவி! ${type} புகாரளிக்கப்பட்டுள்ளது. காவல்துறை மற்றும் உதவி மையங்களுக்கு தகவல் அனுப்பப்பட்டுள்ளது. தயவுசெய்து பாதுகாப்பாக இருங்கள்.`,
        points: (p) => `உங்களிடம் ${p.points} புள்ளிகள் உள்ளன. நீங்கள் 🌟 லெவல் ${p.level} நிலையில் உள்ளீர்கள்!`,
        not_understood: "மன்னிக்கவும், நீங்கள் சொல்வது எனக்கு புரியவில்லை. தயவுசெய்து சுருக்கமாக கூறவும் அல்லது கீழே உள்ள பொத்தான்களை பயன்படுத்தவும்.",
        help_menu: "உதவி விருப்பங்கள்:\n1️⃣ வருகை\n2️⃣ ஆபத்து நிலை\n3️⃣ வழிகாட்டி\n4️⃣ உதவித்தொகை\n5️⃣ அவசர உதவி"
    },
    en: {
        greeting: (name) => `Hello ${name}! Welcome to Kalvi Kavalar support. How can I help you today?`,
        attendance_student: (data) => `${data.name}, your attendance: Today ${data.status}. Last 7 days: ${data.presentCount}/7. ${data.streak > 3 ? 'Excellent streak!' : 'Keep attending daily.'}`,
        risk_high: (name) => `Important Alert! ${name} is missing school frequently. Immediate attention is required. Click help for support.`,
        emergency: (type) => `🚨 Emergency Reported: ${type}. Authorities and 1098 Childline have been notified. Stay safe.`,
        points: (p) => `You have ${p.points} points. You are at 🌟 Level ${p.level}!`,
        not_understood: "I'm sorry, I didn't quite catch that. Could you rephrase it or use the buttons below?",
        help_menu: "Help Options:\n1️⃣ Attendance\n2️⃣ Risk Level\n3️⃣ Mentor\n4️⃣ Scholarships\n5️⃣ Emergency"
    }
};

const ChatbotEngine = {
    // 🧠 1. INPUT PROCESSING & LANGUAGE DETECTION
    async processIncomingMessage(userId, userRole, message, messageType = 'text') {
        const lang = this.detectLanguage(message);
        const cleaned = message.trim().toLowerCase();
        const entities = await this.extractEntities(cleaned, lang);

        Logger.info('Chatbot', `Processing ${userRole} message: "${message}" (${lang})`);

        const intent = await this.classifyIntent(userRole, cleaned, entities, lang);
        const response = await this.generateResponse(userId, userRole, intent, entities, lang);

        await this.logConversation(userId, userRole, message, response.text, intent.type);

        return {
            ...response,
            language: lang,
            intent: intent.type
        };
    },

    detectLanguage(text) {
        // Simple Tamil Unicode check
        const tamilPattern = /[\u0B80-\u0BFF]/;
        return tamilPattern.test(text) ? 'ta' : 'en';
    },

    async extractEntities(text, lang) {
        const entities = {
            date: new Date(),
            studentName: null,
            urgent: text.includes('help') || text.includes('emergency') || text.includes('உதவி')
        };
        // Simple entity extraction logic (can be expanded with NLP)
        return entities;
    },

    // 🎯 2. INTENT CLASSIFICATION
    async classifyIntent(role, text, entities, lang) {
        // Priority: Emergency first
        if (entities.urgent || text.includes('marriage') || text.includes('work') || text.includes('கல்யாணம்')) {
            return { type: 'EMERGENCY', confidence: 1.0 };
        }

        // Role-Specific Intent Mapping
        const mappings = {
            student: {
                attendance: ['attendance', 'streak', 'வைகை', 'நாட்கள்'],
                points: ['points', 'badges', 'coins', 'புள்ளிகள்'],
                mentor: ['mentor', 'help', 'வழிகாட்டி'],
                career: ['career', 'job', 'nurse', 'வேலை']
            },
            parent: {
                attendance: ['daughter', 'attendance', 'மகள்', 'பள்ளி'],
                risk: ['risk', 'safe', 'dropout', 'ஆபத்து'],
                money: ['scholarship', 'aid', 'money', 'உதவித்தொகை']
            }
        };

        const roleMap = mappings[role] || mappings.student;
        for (const [intent, keywords] of Object.entries(roleMap)) {
            if (keywords.some(k => text.includes(k))) return { type: intent.toUpperCase(), confidence: 0.8 };
        }

        return { type: 'GENERAL_HELP', confidence: 0.5 };
    },

    // 🔨 3. RESPONSE GENERATION & AGENT INTEGRATION
    async generateResponse(userId, role, intent, entities, lang) {
        const t = RESPONSES[lang];
        let text = t.not_understood;
        const actions = [];
        const buttons = [];

        try {
            switch (intent.type) {
                case 'ATTENDANCE':
                    const student = await db.get('students', userId);
                    const att = await db.query('attendance', a => a.studentId === userId);
                    text = t.attendance_student({
                        name: student.name,
                        status: att[0]?.status || 'unknown',
                        presentCount: att.filter(a => a.status === 'present').length,
                        streak: 5
                    });
                    buttons.push({ label: lang === 'ta' ? 'மேலும் விவரம்' : 'Full Report', action: 'VIEW_STATS' });
                    break;

                case 'POINTS':
                    const profile = await Comm.GamificationEngine.getProfile(userId);
                    text = t.points(profile);
                    buttons.push({ label: 'Leaderboard', action: 'VIEW_LEADERBOARD' });
                    break;

                case 'CAREER':
                    text = lang === 'ta' ? "தேனி மாவட்ட மாணவிகளுக்கு நர்சிங், ஆசிரியர் பணி மற்றும் காவல்துறை பணிகளில் அதிக வாய்ப்புகள் உள்ளன. உங்களுக்கு எது பிடிக்கும்?" : "There are many opportunities in Nursing, Teaching, and Police for girls in Theni. What interests you?";
                    buttons.push({ label: 'Nursing', action: 'CAREER_NURSE' }, { label: 'Police', action: 'CAREER_POLICE' });
                    break;

                case 'SUCCESS_STORY':
                    text = lang === 'ta' ? "பெரியகுளத்தைச் சேர்ந்த அனு இப்பொழுது ஒரு பெரிய மென்பொருள் நிறுவனத்தில் வேலை செய்கிறார். அவர் தனது படிப்பை விடவில்லை!" : "Anu from Periyakulam now works in a big software company. She never gave up on her education!";
                    buttons.push({ label: 'More Stories', action: 'LOAD_STORIES' });
                    break;

                case 'EMERGENCY':
                    const emergency = await Ops.EmergencyDispatcher.triggerEmergencyResponse(userId, 'UNCERTAIN_THREAT');
                    text = t.emergency('CRITICAL');
                    buttons.push({ label: 'I am safe', action: 'RESOLVE_EMERGENCY' });
                    break;

                case 'GENERAL_HELP':
                    const user = await db.get('students', userId) || await db.get('parents', userId) || { name: 'User' };
                    text = t.greeting(user.name) + "\n\n" + t.help_menu;
                    buttons.push({ label: 'Talk to Human', action: 'ESCALATE' });
                    break;
            }
        } catch (err) {
            Logger.error('Chatbot', 'Error generating response', err);
            text = "SYSTEM ERROR: My AI brain is recharging. Try again in a moment.";
        }

        return { text, buttons, timestamp: new Date() };
    },

    async logConversation(userId, role, msg, res, intent) {
        await db.set('chat_logs', randomUUID(), {
            userId, role, message: msg, response: res, intent, timestamp: new Date()
        });
    }
};

module.exports = ChatbotEngine;
