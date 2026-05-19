import type { CardEntry, CardTemplate } from '../types';

const ALWAYS_DUE = '2020-01-01T00:00:00.000Z';

// ─── Shared style helpers (inlined per template for portability) ───────────────
// Accent pill:  background:rgba(91,140,245,0.1); border:1px solid rgba(91,140,245,0.25); border-radius:999px; padding:3px 12px
// Muted label:  font-size:0.58rem; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.28)
// Divider:      width:28px; height:1px; background:rgba(91,140,245,0.3)

export const MOCK_TEMPLATES: CardTemplate[] = [

    // ── 1 · Japanese JLPT N5 ──────────────────────────────────────────────────
    // Front: huge kanji, romaji in an accent pill underneath
    // Back:  English meaning with a soft label
    {
        id: 'tmpl-1', deckId: '1', ownerId: '1ilkimen2',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">Japanese</div>
  <div style="font-size:3.8rem;color:white;line-height:1;font-weight:400;">{{Kanji}}</div>
  <div style="font-size:0.68rem;letter-spacing:0.14em;color:rgba(91,140,245,0.85);background:rgba(91,140,245,0.1);border:1px solid rgba(91,140,245,0.25);border-radius:999px;padding:4px 14px;">{{Romaji}}</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">English</div>
  <div style="width:28px;height:1px;background:rgba(91,140,245,0.3);"></div>
  <div style="font-size:1.6rem;color:white;font-weight:300;">{{English}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f1-1', name: 'Kanji', isDefault: true },
            { id: 'f1-2', name: 'Romaji', isDefault: false },
            { id: 'f1-3', name: 'English', isDefault: false },
        ],
    },

    // ── 2 · Spanish Verbs ─────────────────────────────────────────────────────
    // Front: verb large, ending type as a pill (-ar / -er / -ir)
    // Back:  conjugation table feel + meaning muted below
    {
        id: 'tmpl-2', deckId: '2', ownerId: '1ilkimen2',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">infinitive</div>
  <div style="font-size:2.2rem;color:white;font-weight:400;letter-spacing:-0.01em;">{{Verb}}</div>
  <div style="font-size:0.65rem;letter-spacing:0.12em;color:rgba(91,140,245,0.8);background:rgba(91,140,245,0.1);border:1px solid rgba(91,140,245,0.22);border-radius:999px;padding:3px 12px;">{{Ending}}</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
  <div style="font-size:1.1rem;color:white;letter-spacing:0.04em;">{{Conjugation}}</div>
  <div style="width:28px;height:1px;background:rgba(91,140,245,0.3);margin:2px 0;"></div>
  <div style="font-size:0.8rem;color:rgba(255,255,255,0.5);font-style:italic;">{{Meaning}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f2-1', name: 'Verb', isDefault: true },
            { id: 'f2-2', name: 'Ending', isDefault: false },
            { id: 'f2-3', name: 'Conjugation', isDefault: false },
            { id: 'f2-4', name: 'Meaning', isDefault: false },
        ],
    },

    // ── 3 · Calculus I ────────────────────────────────────────────────────────
    // Front: rule name in a monospace code-chip, clean label above
    // Back:  formula large + example muted
    {
        id: 'tmpl-3', deckId: '3', ownerId: 'mathprofessor',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">calculus</div>
  <div style="font-size:1.4rem;color:#8cb4ff;font-family:monospace;background:rgba(91,140,245,0.08);padding:8px 20px;border-radius:10px;border:1px solid rgba(91,140,245,0.2);letter-spacing:0.02em;">{{Rule}}</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
  <div style="font-size:1.3rem;color:white;font-family:monospace;">{{Formula}}</div>
  <div style="width:28px;height:1px;background:rgba(91,140,245,0.3);margin:2px 0;"></div>
  <div style="font-size:0.75rem;color:rgba(255,255,255,0.45);font-family:monospace;">{{Example}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f3-1', name: 'Rule', isDefault: true },
            { id: 'f3-2', name: 'Formula', isDefault: false },
            { id: 'f3-3', name: 'Example', isDefault: false },
        ],
    },

    // ── 4 · World Capitals ────────────────────────────────────────────────────
    // Front: "capital of" muted label, country name bold + continent pill
    // Back:  capital city large
    {
        id: 'tmpl-4', deckId: '4', ownerId: 'geoking99',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">capital of</div>
  <div style="font-size:2rem;color:white;font-weight:500;letter-spacing:-0.02em;">{{Country}}</div>
  <div style="font-size:0.62rem;letter-spacing:0.12em;color:rgba(91,140,245,0.8);background:rgba(91,140,245,0.1);border:1px solid rgba(91,140,245,0.22);border-radius:999px;padding:3px 12px;">{{Continent}}</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">capital</div>
  <div style="font-size:2.2rem;color:white;font-weight:300;">{{Capital}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f4-1', name: 'Country', isDefault: true },
            { id: 'f4-2', name: 'Continent', isDefault: false },
            { id: 'f4-3', name: 'Capital', isDefault: false },
        ],
    },

    // ── 5 · Medical Terminology ───────────────────────────────────────────────
    // Front: term large with a "prefix / suffix / word" type pill
    // Back:  definition clean
    {
        id: 'tmpl-5', deckId: '5', ownerId: 'nurserachel',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:2rem;color:white;font-weight:400;letter-spacing:0.04em;">{{Term}}</div>
  <div style="font-size:0.62rem;letter-spacing:0.14em;color:rgba(91,140,245,0.8);background:rgba(91,140,245,0.1);border:1px solid rgba(91,140,245,0.22);border-radius:999px;padding:3px 12px;">{{Type}}</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
  <div style="width:28px;height:1px;background:rgba(91,140,245,0.3);"></div>
  <div style="font-size:1rem;color:white;line-height:1.5;text-align:center;max-width:90%;">{{Definition}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f5-1', name: 'Term', isDefault: true },
            { id: 'f5-2', name: 'Type', isDefault: false },
            { id: 'f5-3', name: 'Definition', isDefault: false },
        ],
    },

    // ── 6 · Python Programming ────────────────────────────────────────────────
    // Front: concept in a code block chip, python label above
    // Back:  explanation + example in monospace
    {
        id: 'tmpl-6', deckId: '6', ownerId: 'codewizard',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">python</div>
  <div style="font-size:1.2rem;color:#8cb4ff;font-family:monospace;background:rgba(91,140,245,0.08);padding:10px 20px;border-radius:10px;border:1px solid rgba(91,140,245,0.2);">{{Concept}}</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
  <div style="font-size:0.9rem;color:white;text-align:center;">{{Explanation}}</div>
  <div style="width:28px;height:1px;background:rgba(91,140,245,0.3);margin:2px 0;"></div>
  <div style="font-size:0.78rem;color:rgba(140,180,255,0.75);font-family:monospace;">{{Example}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f6-1', name: 'Concept', isDefault: true },
            { id: 'f6-2', name: 'Explanation', isDefault: false },
            { id: 'f6-3', name: 'Example', isDefault: false },
        ],
    },

    // ── 7 · Classical Music Composers ─────────────────────────────────────────
    // Front: composer name elegant, era pill below
    // Back:  notable works
    {
        id: 'tmpl-7', deckId: '7', ownerId: 'musiclover88',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">composer</div>
  <div style="font-size:1.5rem;color:white;font-weight:300;letter-spacing:-0.01em;text-align:center;">{{Composer}}</div>
  <div style="font-size:0.62rem;letter-spacing:0.1em;color:rgba(91,140,245,0.8);background:rgba(91,140,245,0.1);border:1px solid rgba(91,140,245,0.22);border-radius:999px;padding:3px 12px;">{{Era}}</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">notable works</div>
  <div style="width:28px;height:1px;background:rgba(91,140,245,0.3);"></div>
  <div style="font-size:0.9rem;color:white;text-align:center;line-height:1.5;">{{Notable Works}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f7-1', name: 'Composer', isDefault: true },
            { id: 'f7-2', name: 'Era', isDefault: false },
            { id: 'f7-3', name: 'Notable Works', isDefault: false },
        ],
    },

    // ── 8 · French Food Vocabulary ────────────────────────────────────────────
    // Front: word in italic with a "français" pill
    // Back:  English translation
    {
        id: 'tmpl-8', deckId: '8', ownerId: '1ilkimen2',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:2.2rem;color:white;font-style:italic;font-weight:300;letter-spacing:0.01em;">{{French}}</div>
  <div style="font-size:0.62rem;letter-spacing:0.14em;color:rgba(91,140,245,0.8);background:rgba(91,140,245,0.1);border:1px solid rgba(91,140,245,0.22);border-radius:999px;padding:3px 12px;">français</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">English</div>
  <div style="font-size:1.6rem;color:white;font-weight:300;">{{English}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f8-1', name: 'French', isDefault: true },
            { id: 'f8-2', name: 'English', isDefault: false },
        ],
    },

    // ── 9 · US History ────────────────────────────────────────────────────────
    // Front: event text + century pill
    // Back:  year large, significance muted below
    {
        id: 'tmpl-9', deckId: '9', ownerId: 'historybuff',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">US history</div>
  <div style="font-size:1.1rem;color:white;font-weight:500;line-height:1.35;text-align:center;max-width:88%;">{{Event}}</div>
  <div style="font-size:0.62rem;letter-spacing:0.12em;color:rgba(91,140,245,0.8);background:rgba(91,140,245,0.1);border:1px solid rgba(91,140,245,0.22);border-radius:999px;padding:3px 12px;">{{Century}}</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
  <div style="font-size:2.2rem;color:white;font-weight:300;">{{Year}}</div>
  <div style="width:28px;height:1px;background:rgba(91,140,245,0.3);"></div>
  <div style="font-size:0.78rem;color:rgba(255,255,255,0.5);text-align:center;line-height:1.4;max-width:88%;">{{Significance}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f9-1', name: 'Event', isDefault: true },
            { id: 'f9-2', name: 'Century', isDefault: false },
            { id: 'f9-3', name: 'Year', isDefault: false },
            { id: 'f9-4', name: 'Significance', isDefault: false },
        ],
    },

    // ── 10 · German Articles ──────────────────────────────────────────────────
    // Front: article + noun large, gender pill below
    // Back:  case declension table-style
    {
        id: 'tmpl-10', deckId: '10', ownerId: '1ilkimen2',
        frontTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">deutsch</div>
  <div style="font-size:2rem;color:white;font-weight:400;letter-spacing:0.01em;">{{Article + Noun}}</div>
  <div style="font-size:0.62rem;letter-spacing:0.14em;color:rgba(91,140,245,0.8);background:rgba(91,140,245,0.1);border:1px solid rgba(91,140,245,0.22);border-radius:999px;padding:3px 12px;">{{Gender}}</div>
</div>`,
        backTemplate: `
<div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
  <div style="font-size:0.58rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.28);">cases</div>
  <div style="width:28px;height:1px;background:rgba(91,140,245,0.3);"></div>
  <div style="font-size:0.9rem;color:white;font-family:monospace;letter-spacing:0.04em;line-height:1.6;">{{Cases}}</div>
</div>`,
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f10-1', name: 'Article + Noun', isDefault: true },
            { id: 'f10-2', name: 'Gender', isDefault: false },
            { id: 'f10-3', name: 'Cases', isDefault: false },
        ],
    },
];

export const MOCK_CARDS: CardEntry[] = [
    // ── Deck 1 · Japanese JLPT N5 (Kanji / Romaji / English split) ───────────
    { id: 'j1', templateId: 'tmpl-1', deckId: '1', data: { Kanji: '猫', Romaji: 'neko', English: 'cat' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j2', templateId: 'tmpl-1', deckId: '1', data: { Kanji: '犬', Romaji: 'inu', English: 'dog' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j3', templateId: 'tmpl-1', deckId: '1', data: { Kanji: '水', Romaji: 'mizu', English: 'water' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j4', templateId: 'tmpl-1', deckId: '1', data: { Kanji: '食べる', Romaji: 'taberu', English: 'to eat' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j5', templateId: 'tmpl-1', deckId: '1', data: { Kanji: '学校', Romaji: 'gakkou', English: 'school' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j6', templateId: 'tmpl-1', deckId: '1', data: { Kanji: '電車', Romaji: 'densha', English: 'train' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j7', templateId: 'tmpl-1', deckId: '1', data: { Kanji: '友達', Romaji: 'tomodachi', English: 'friend' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j8', templateId: 'tmpl-1', deckId: '1', data: { Kanji: 'ありがとう', Romaji: 'arigatou', English: 'thank you' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // ── Deck 2 · Spanish Verbs (Ending field added) ───────────────────────────
    { id: 's1', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'hablar', Ending: '-ar', Conjugation: 'hablo, hablas, habla', Meaning: 'to speak' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 's2', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'comer', Ending: '-er', Conjugation: 'como, comes, come', Meaning: 'to eat' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 's3', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'vivir', Ending: '-ir', Conjugation: 'vivo, vives, vive', Meaning: 'to live' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 's4', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'ser', Ending: '-er', Conjugation: 'soy, eres, es', Meaning: 'to be (permanent)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 's5', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'estar', Ending: '-ar', Conjugation: 'estoy, estás, está', Meaning: 'to be (temporary)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // ── Deck 3 · Calculus I ───────────────────────────────────────────────────
    { id: 'c1', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'Power Rule', Formula: 'd/dx[xⁿ] = nxⁿ⁻¹', Example: 'd/dx[x³] = 3x²' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'c2', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'Chain Rule', Formula: 'd/dx[f(g(x))] = f\'(g(x))·g\'(x)', Example: 'd/dx[sin(x²)] = cos(x²)·2x' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'c3', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'Product Rule', Formula: 'd/dx[f·g] = f\'g + fg\'', Example: 'd/dx[x·sin(x)] = sin(x)+x·cos(x)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'c4', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'Quotient Rule', Formula: 'd/dx[f/g] = (f\'g - fg\')/g²', Example: 'd/dx[x/sin(x)]' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'c5', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'sin derivative', Formula: 'd/dx[sin(x)] = cos(x)', Example: 'd/dx[sin(2x)] = 2cos(2x)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // ── Deck 4 · World Capitals (Continent field added) ───────────────────────
    { id: 'w1', templateId: 'tmpl-4', deckId: '4', data: { Country: 'France', Continent: 'Europe', Capital: 'Paris' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w2', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Japan', Continent: 'Asia', Capital: 'Tokyo' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w3', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Brazil', Continent: 'S. America', Capital: 'Brasília' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w4', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Australia', Continent: 'Oceania', Capital: 'Canberra' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w5', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Canada', Continent: 'N. America', Capital: 'Ottawa' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w6', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Egypt', Continent: 'Africa', Capital: 'Cairo' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // ── Deck 5 · Medical Terminology (Type field added) ───────────────────────
    { id: 'm1', templateId: 'tmpl-5', deckId: '5', data: { Term: 'cardio-', Type: 'prefix', Definition: 'relating to the heart (e.g. cardiovascular)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm2', templateId: 'tmpl-5', deckId: '5', data: { Term: 'neuro-', Type: 'prefix', Definition: 'relating to nerves or the nervous system' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm3', templateId: 'tmpl-5', deckId: '5', data: { Term: '-itis', Type: 'suffix', Definition: 'inflammation (e.g. appendicitis)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm4', templateId: 'tmpl-5', deckId: '5', data: { Term: '-ectomy', Type: 'suffix', Definition: 'surgical removal (e.g. appendectomy)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm5', templateId: 'tmpl-5', deckId: '5', data: { Term: 'hyper-', Type: 'prefix', Definition: 'above normal, excessive (e.g. hypertension)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm6', templateId: 'tmpl-5', deckId: '5', data: { Term: 'hypo-', Type: 'prefix', Definition: 'below normal, deficient (e.g. hypoglycemia)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm7', templateId: 'tmpl-5', deckId: '5', data: { Term: '-ology', Type: 'suffix', Definition: 'study of (e.g. cardiology)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // ── Deck 6 · Python Programming ───────────────────────────────────────────
    { id: 'p1', templateId: 'tmpl-6', deckId: '6', data: { Concept: 'List comprehension', Explanation: 'Concise way to create lists', Example: '[x**2 for x in range(10)]' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'p2', templateId: 'tmpl-6', deckId: '6', data: { Concept: 'Dictionary', Explanation: 'Key-value pairs, mutable and unordered', Example: 'd = {"key": "value"}' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'p3', templateId: 'tmpl-6', deckId: '6', data: { Concept: 'Lambda function', Explanation: 'Anonymous single-expression function', Example: 'square = lambda x: x**2' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'p4', templateId: 'tmpl-6', deckId: '6', data: { Concept: 'Decorator', Explanation: 'Function that wraps another to extend behaviour', Example: '@staticmethod' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // ── Deck 7 · Classical Music (Era moved to its own field) ─────────────────
    { id: 'cm1', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Johann Sebastian Bach', Era: 'Baroque', 'Notable Works': 'Brandenburg Concertos, The Well-Tempered Clavier' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'cm2', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Wolfgang Amadeus Mozart', Era: 'Classical', 'Notable Works': 'Symphony No. 40, The Magic Flute' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'cm3', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Ludwig van Beethoven', Era: 'Romantic', 'Notable Works': 'Symphony No. 9, Moonlight Sonata' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'cm4', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Frédéric Chopin', Era: 'Romantic', 'Notable Works': 'Nocturnes, Ballade No. 1' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'cm5', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Claude Debussy', Era: 'Impressionist', 'Notable Works': 'Clair de lune, La Mer' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // ── Deck 8 · French Food Vocabulary ──────────────────────────────────────
    { id: 'ff1', templateId: 'tmpl-8', deckId: '8', data: { French: 'le pain', English: 'bread' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff2', templateId: 'tmpl-8', deckId: '8', data: { French: 'le fromage', English: 'cheese' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff3', templateId: 'tmpl-8', deckId: '8', data: { French: 'la viande', English: 'meat' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff4', templateId: 'tmpl-8', deckId: '8', data: { French: 'les légumes', English: 'vegetables' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff5', templateId: 'tmpl-8', deckId: '8', data: { French: "l'addition", English: 'the bill (restaurant)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff6', templateId: 'tmpl-8', deckId: '8', data: { French: 'bien cuit', English: 'well done (cooking)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // ── Deck 9 · US History (Century field added) ─────────────────────────────
    { id: 'h1', templateId: 'tmpl-9', deckId: '9', data: { Event: 'Declaration of Independence signed', Century: '18th century', Year: '1776', Significance: 'Formally declared the 13 colonies independent from Britain' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'h2', templateId: 'tmpl-9', deckId: '9', data: { Event: 'US Constitution ratified', Century: '18th century', Year: '1788', Significance: 'Established the framework of the US federal government' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'h3', templateId: 'tmpl-9', deckId: '9', data: { Event: 'Civil War ends', Century: '19th century', Year: '1865', Significance: 'Preserved the Union and led to abolition of slavery' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'h4', templateId: 'tmpl-9', deckId: '9', data: { Event: 'Moon landing', Century: '20th century', Year: '1969', Significance: 'Apollo 11 — first humans on the Moon' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'h5', templateId: 'tmpl-9', deckId: '9', data: { Event: "Women's suffrage (19th Amendment)", Century: '20th century', Year: '1920', Significance: 'Granted women the right to vote' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // ── Deck 10 · German Articles (Gender field added) ────────────────────────
    { id: 'g1', templateId: 'tmpl-10', deckId: '10', data: { 'Article + Noun': 'der Mann', Gender: 'masculine', Cases: 'Nom: der | Acc: den | Dat: dem | Gen: des' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'g2', templateId: 'tmpl-10', deckId: '10', data: { 'Article + Noun': 'die Frau', Gender: 'feminine', Cases: 'Nom: die | Acc: die | Dat: der | Gen: der' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'g3', templateId: 'tmpl-10', deckId: '10', data: { 'Article + Noun': 'das Kind', Gender: 'neuter', Cases: 'Nom: das | Acc: das | Dat: dem | Gen: des' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
];
