const Chatbot = require('./services/chatbot_engine');
const { Logger } = require('./core/infrastructure');

async function testChatbot() {
    Logger.info('TEST', 'Starting Kalvi Thunai (Chatbot) Integration Test...');

    const tests = [
        { role: 'student', msg: 'என் வருகை எப்படி உள்ளது?', note: 'Student Attendance (Tamil)' },
        { role: 'student', msg: 'how many points i have?', note: 'Student Gamification (English)' },
        { role: 'parent', msg: 'Priya marriage help!', note: 'Emergency Case (Bilingual)' },
        { role: 'student', msg: 'asdfghjkl', note: 'Unrecognized Input' }
    ];

    for (const t of tests) {
        Logger.info('TEST', `--- ${t.note} ---`);
        const res = await Chatbot.processIncomingMessage('stud_001', t.role, t.msg);
        console.log(`User (${t.role}): ${t.msg}`);
        console.log(`Bot: ${res.text}`);
        if (res.buttons) console.log(`Buttons: ${res.buttons.map(b => b.label).join(' | ')}`);
        console.log('\n');
    }

    Logger.info('TEST', 'Chatbot Test Completed.');
    process.exit(0);
}

testChatbot();
