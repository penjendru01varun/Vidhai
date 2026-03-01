/**
 * KALVI KAVALAR - Backend Core
 * Standardized Database & Utility Wrapper
 */

const { randomUUID } = require('crypto');

// Mocking Firebase Admin behavior for standalone implementation
// In production, this would use require('firebase-admin')
const db = {
    collections: {},
    async get(collection, id) {
        console.log(`[DB] Fetching ${collection}:${id}`);
        return this.collections[collection]?.[id] || null;
    },
    async set(collection, id, data) {
        if (!this.collections[collection]) this.collections[collection] = {};
        this.collections[collection][id] = { ...data, updatedAt: new Date() };
        console.log(`[DB] Saved ${collection}:${id}`);
        return true;
    },
    async query(collection, filterFn) {
        const docs = Object.values(this.collections[collection] || {});
        return docs.filter(filterFn);
    },
    async list(collection) {
        return Object.values(this.collections[collection] || {});
    }
};

const Logger = {
    info: (agent, msg) => console.log(`[INFO][${agent}] ${msg}`),
    warn: (agent, msg) => console.warn(`[WARN][${agent}] ${msg}`),
    error: (agent, msg, err) => console.error(`[ERROR][${agent}] ${msg}`, err),
    logTransaction: (agent, type, details) => {
        console.log(`[TX][${agent}] ${type}: ${JSON.stringify(details)}`);
    }
};

module.exports = { db, Logger, randomUUID };
