// guestStorage.ts
// All guest data lives in the browser's localStorage under these keys.
// MOCK_DECKS are the read-only sample decks every guest can browse.
// Anything the guest creates (decks, cards, templates) is saved here and
// disappears when they clear their browser data or we call clearGuestData().

import { MOCK_DECKS } from '../data/decks';
import { MOCK_CARDS, MOCK_TEMPLATES } from '../data/mockStudyData';
import type { Deck, CardEntry, CardTemplate, CardField, ReviewLog } from '../types';

const DECKS_KEY     = 'gsc_decks';
const CARDS_KEY     = 'gsc_cards';
const TEMPLATES_KEY = 'gsc_templates';
const CARD_SRS_KEY  = 'gsc_card_srs';
const REVIEW_LOGS_KEY = 'gsc_review_logs';

type CardSRSState = {
    interval: number;
    easeFactor: number;
    nextReviewAt: string;
    reviewCount: number;
    masteredAt?: string;
};

// ── Internal helpers ──────────────────────────────────────────────────────────

function loadJSON<T>(key: string): T[] {
    try {
        return JSON.parse(localStorage.getItem(key) ?? '[]');
    } catch {
        return [];
    }
}

function saveJSON<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
}

// ── Decks ─────────────────────────────────────────────────────────────────────

export function getDecks(): Deck[] {
    const guestDecks = loadJSON<Deck>(DECKS_KEY);
    // Sample decks come first so they appear at the top of the list
    return [...MOCK_DECKS, ...guestDecks];
}

export function getDeck(deckId: string): Deck | null {
    const mock = MOCK_DECKS.find(d => d.id === deckId);
    if (mock) return mock;
    const guestDecks = loadJSON<Deck>(DECKS_KEY);
    return guestDecks.find(d => d.id === deckId) ?? null;
}

export function createDeck(name: string, description: string | undefined, ownerId: string): Deck {
    const deck: Deck = {
        id: crypto.randomUUID(),
        name,
        description,
        ownerId,
        cardIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const existing = loadJSON<Deck>(DECKS_KEY);
    saveJSON(DECKS_KEY, [...existing, deck]);
    return deck;
}

export function deleteDeck(deckId: string): void {
    // Sample decks (MOCK_DECKS) are read-only — silently ignore attempts to delete them
    const decks = loadJSON<Deck>(DECKS_KEY);
    saveJSON(DECKS_KEY, decks.filter(d => d.id !== deckId));
    // Clean up any cards and templates that belong to this deck too
    const cards = loadJSON<CardEntry>(CARDS_KEY);
    saveJSON(CARDS_KEY, cards.filter(c => c.deckId !== deckId));
    const templates = loadJSON<CardTemplate>(TEMPLATES_KEY);
    saveJSON(TEMPLATES_KEY, templates.filter(t => t.deckId !== deckId));
}

// ── Cards ─────────────────────────────────────────────────────────────────────

export function getCards(deckId: string): CardEntry[] {
    const mockCards = MOCK_CARDS.filter(c => c.deckId === deckId);
    const guestCards = loadJSON<CardEntry>(CARDS_KEY).filter(c => c.deckId === deckId);
    return [...mockCards, ...guestCards];
}

export function createCard(templateId: string, deckId: string, data: Record<string, string>): CardEntry {
    const card: CardEntry = {
        id: crypto.randomUUID(),
        templateId,
        deckId,
        data,
        nextReviewAt: new Date().toISOString(),
        interval: 0,
        easeFactor: 2.5,
        reviewCount: 0,
    };
    const existing = loadJSON<CardEntry>(CARDS_KEY);
    saveJSON(CARDS_KEY, [...existing, card]);
    return card;
}

export function deleteCard(cardId: string): void {
    const cards = loadJSON<CardEntry>(CARDS_KEY);
    saveJSON(CARDS_KEY, cards.filter(c => c.id !== cardId));
}

export function getFieldUsageCount(deckId: string, fieldName: string): number {
    return getCards(deckId).filter(c => fieldName in c.data).length;
}

export function renameFieldInCards(deckId: string, oldName: string, newName: string): void {
    const cards = loadJSON<CardEntry>(CARDS_KEY);
    const updated = cards.map(c => {
        if (c.deckId !== deckId || !(oldName in c.data)) return c;
        const data = { ...c.data, [newName]: c.data[oldName] };
        delete data[oldName];
        return { ...c, data };
    });
    saveJSON(CARDS_KEY, updated);
}

export function removeFieldFromCards(deckId: string, fieldName: string): void {
    const cards = loadJSON<CardEntry>(CARDS_KEY);
    const updated = cards.map(c => {
        if (c.deckId !== deckId) return c;
        const data = { ...c.data };
        delete data[fieldName];
        return { ...c, data };
    });
    saveJSON(CARDS_KEY, updated);
}

// ── Templates ─────────────────────────────────────────────────────────────────

export function getTemplate(deckId: string): CardTemplate | null {
    const guestTemplate = loadJSON<CardTemplate>(TEMPLATES_KEY).find(t => t.deckId === deckId);
    if (guestTemplate) return guestTemplate;
    return MOCK_TEMPLATES.find(t => t.deckId === deckId) ?? null;
}

export function createTemplate(
    deckId: string,
    ownerId: string,
    frontTemplate: string,
    backTemplate: string,
    style: string,
    fields: Array<{ name: string; isDefault: boolean }>
): CardTemplate {
    const template: CardTemplate = {
        id: crypto.randomUUID(),
        deckId,
        ownerId,
        frontTemplate,
        backTemplate,
        style,
        // The backend normally generates field IDs — we do it ourselves here
        fields: fields.map(f => ({ id: crypto.randomUUID(), name: f.name, isDefault: f.isDefault })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const existing = loadJSON<CardTemplate>(TEMPLATES_KEY);
    saveJSON(TEMPLATES_KEY, [...existing, template]);
    return template;
}

export function updateTemplate(
    templateId: string,
    fields: Array<{ name: string; isDefault: boolean }>
): CardTemplate | null {
    const templates = loadJSON<CardTemplate>(TEMPLATES_KEY);
    const existing = templates.find(t => t.id === templateId);
    if (!existing) return null;
    // Preserve IDs for existing fields so references stay stable; generate new IDs for new fields
    const updatedFields: CardField[] = fields.map(f => {
        const match = existing.fields.find(ef => ef.name === f.name);
        return { id: match?.id ?? crypto.randomUUID(), name: f.name, isDefault: f.isDefault };
    });
    const updated: CardTemplate = { ...existing, fields: updatedFields, updatedAt: new Date().toISOString() };
    saveJSON(TEMPLATES_KEY, templates.map(t => t.id === templateId ? updated : t));
    return updated;
}

export function updateFullTemplate(
    templateId: string,
    frontTemplate: string,
    backTemplate: string,
    style: string,
    fields: Array<{ name: string; isDefault: boolean }>
): CardTemplate | null {
    const templates = loadJSON<CardTemplate>(TEMPLATES_KEY);
    const existing = templates.find(t => t.id === templateId);
    if (!existing) return null;
    const updatedFields: CardField[] = fields.map(f => {
        const match = existing.fields.find(ef => ef.name === f.name);
        return { id: match?.id ?? crypto.randomUUID(), name: f.name, isDefault: f.isDefault };
    });
    const updated: CardTemplate = {
        ...existing,
        frontTemplate,
        backTemplate,
        style,
        fields: updatedFields,
        updatedAt: new Date().toISOString(),
    };
    saveJSON(TEMPLATES_KEY, templates.map(t => t.id === templateId ? updated : t));
    return updated;
}

// ── SRS overlay ───────────────────────────────────────────────────────────────

function loadSRSMap(): Record<string, CardSRSState> {
    try {
        return JSON.parse(localStorage.getItem(CARD_SRS_KEY) ?? '{}');
    } catch {
        return {};
    }
}

export function updateCardSRS(cardId: string, patch: Partial<CardSRSState>): void {
    const map = loadSRSMap();
    map[cardId] = { ...map[cardId], ...patch } as CardSRSState;
    localStorage.setItem(CARD_SRS_KEY, JSON.stringify(map));
}

export function getDueCards(deckId: string): CardEntry[] {
    const cards = getCards(deckId);
    const srsMap = loadSRSMap();
    const now = new Date();
    return cards
        .map(card => ({ ...card, ...srsMap[card.id] }))
        .filter(card => new Date(card.nextReviewAt) <= now);
}

// ── Review logs ───────────────────────────────────────────────────────────────

export function addReviewLog(log: Omit<ReviewLog, 'id'>): void {
    const logs = loadJSON<ReviewLog>(REVIEW_LOGS_KEY);
    saveJSON(REVIEW_LOGS_KEY, [...logs, { ...log, id: crypto.randomUUID() }]);
}

export function getWeeklyActivity(): { date: string; count: number }[] {
    const logs = loadJSON<ReviewLog>(REVIEW_LOGS_KEY);
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().slice(0, 10);
    });
    return days.map(date => ({
        date,
        count: logs.filter(l => l.reviewedAt.slice(0, 10) === date).length,
    }));
}

export function getDashboardStats() {

    const decks = getDecks();
    const srsMap = loadSRSMap();
    const now = new Date();

    let totalCards = 0;
    let dueCount = 0;
    let newCount = 0;
    let learningCount = 0;
    let masteredCount = 0;

    for (const deck of decks){
        const cards = getCards(deck.id);
        totalCards += cards.length;

        for (const card of cards){
            const srs = srsMap[card.id];
            if (new Date(srs?.nextReviewAt ?? card.nextReviewAt) <= now) dueCount++;
            
            if (!srs || srs.reviewCount === 0) newCount++;

            else if (srs.interval < 21 ) learningCount++;
            else masteredCount++;
        }
    }

    return {
        deckCount: decks.length,
        totalCards: totalCards,
        dueCount: dueCount,
        weeklyActivity: getWeeklyActivity(),
        masteryDistribution: { new: newCount, learning: learningCount, mastered: masteredCount }
    };

}

// ── Cleanup ───────────────────────────────────────────────────────────────────

export function clearGuestData(): void {
    localStorage.removeItem(DECKS_KEY);
    localStorage.removeItem(CARDS_KEY);
    localStorage.removeItem(TEMPLATES_KEY);
    localStorage.removeItem(CARD_SRS_KEY);
    localStorage.removeItem(REVIEW_LOGS_KEY);
}

// Initialization

export function initGuestSession(): void {

    // Don't overwrite if they've already been using the app
    if (localStorage.getItem(REVIEW_LOGS_KEY)) return;


    // See SRS states
    const srsMap = {
        'j1': { interval: 30, easeFactor: 2.8, nextReviewAt: future(14), reviewCount: 12 },
        'j2': { interval: 7,  easeFactor: 2.5, nextReviewAt: future(3),  reviewCount: 4  },
        'j3': { interval: 1,  easeFactor: 2.5, nextReviewAt: past(1),    reviewCount: 1  },
    };

    localStorage.setItem(CARD_SRS_KEY, JSON.stringify(srsMap))


    // Seed 7 days of review activity
    const logs = generateFakeReviewLogs();
    localStorage.setItem(REVIEW_LOGS_KEY, JSON.stringify(logs))
}

function future(days: number) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString;
}


function past(days: number) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString;
}


function generateFakeReviewLogs() {
    throw new Error('Function not implemented.');

}
