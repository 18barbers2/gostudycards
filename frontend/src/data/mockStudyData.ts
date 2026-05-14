import type { CardEntry, CardTemplate } from '../types';

// nextReviewAt is set to the past so all mock cards are always due for review
const ALWAYS_DUE = '2020-01-01T00:00:00.000Z';

export const MOCK_TEMPLATES: CardTemplate[] = [
    {
        id: 'tmpl-1', deckId: '1', ownerId: '1ilkimen2',
        frontTemplate: '<div style="text-align:center;font-size:2rem;">{{Japanese}}</div>',
        backTemplate: '<div style="text-align:center;font-size:1.5rem;">{{English}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f1-1', name: 'Japanese', isDefault: true },
            { id: 'f1-2', name: 'English', isDefault: false },
        ],
    },
    {
        id: 'tmpl-2', deckId: '2', ownerId: '1ilkimen2',
        frontTemplate: '<div style="text-align:center;font-size:1.5rem;">{{Verb}} (infinitive)</div>',
        backTemplate: '<div style="text-align:center;font-size:1.5rem;">{{Conjugation}}</div><div style="color:#aaa;margin-top:8px;">{{Meaning}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f2-1', name: 'Verb', isDefault: true },
            { id: 'f2-2', name: 'Conjugation', isDefault: false },
            { id: 'f2-3', name: 'Meaning', isDefault: false },
        ],
    },
    {
        id: 'tmpl-3', deckId: '3', ownerId: 'mathprofessor',
        frontTemplate: '<div style="text-align:center;font-size:1.25rem;">{{Rule}}</div>',
        backTemplate: '<div style="text-align:center;font-size:1.25rem;">{{Formula}}</div><div style="color:#aaa;margin-top:8px;">{{Example}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f3-1', name: 'Rule', isDefault: true },
            { id: 'f3-2', name: 'Formula', isDefault: false },
            { id: 'f3-3', name: 'Example', isDefault: false },
        ],
    },
    {
        id: 'tmpl-4', deckId: '4', ownerId: 'geoking99',
        frontTemplate: '<div style="text-align:center;font-size:1.5rem;">Capital of {{Country}}?</div>',
        backTemplate: '<div style="text-align:center;font-size:2rem;">{{Capital}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f4-1', name: 'Country', isDefault: true },
            { id: 'f4-2', name: 'Capital', isDefault: false },
        ],
    },
    {
        id: 'tmpl-5', deckId: '5', ownerId: 'nurserachel',
        frontTemplate: '<div style="text-align:center;font-size:1.5rem;">{{Term}}</div>',
        backTemplate: '<div style="text-align:center;font-size:1.25rem;">{{Definition}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f5-1', name: 'Term', isDefault: true },
            { id: 'f5-2', name: 'Definition', isDefault: false },
        ],
    },
    {
        id: 'tmpl-6', deckId: '6', ownerId: 'codewizard',
        frontTemplate: '<div style="text-align:center;font-size:1.25rem;">{{Concept}}</div>',
        backTemplate: '<div style="text-align:center;font-size:1.1rem;">{{Explanation}}</div><div style="color:#aaa;margin-top:8px;font-family:monospace;">{{Example}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f6-1', name: 'Concept', isDefault: true },
            { id: 'f6-2', name: 'Explanation', isDefault: false },
            { id: 'f6-3', name: 'Example', isDefault: false },
        ],
    },
    {
        id: 'tmpl-7', deckId: '7', ownerId: 'musiclover88',
        frontTemplate: '<div style="text-align:center;font-size:1.5rem;">{{Composer}}</div>',
        backTemplate: '<div style="text-align:center;font-size:1.1rem;">{{Era}}</div><div style="color:#aaa;margin-top:8px;">{{Notable Works}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f7-1', name: 'Composer', isDefault: true },
            { id: 'f7-2', name: 'Era', isDefault: false },
            { id: 'f7-3', name: 'Notable Works', isDefault: false },
        ],
    },
    {
        id: 'tmpl-8', deckId: '8', ownerId: '1ilkimen2',
        frontTemplate: '<div style="text-align:center;font-size:1.5rem;">{{French}}</div>',
        backTemplate: '<div style="text-align:center;font-size:1.5rem;">{{English}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f8-1', name: 'French', isDefault: true },
            { id: 'f8-2', name: 'English', isDefault: false },
        ],
    },
    {
        id: 'tmpl-9', deckId: '9', ownerId: 'historybuff',
        frontTemplate: '<div style="text-align:center;font-size:1.25rem;">{{Event}}</div>',
        backTemplate: '<div style="text-align:center;font-size:1.5rem;">{{Year}}</div><div style="color:#aaa;margin-top:8px;">{{Significance}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f9-1', name: 'Event', isDefault: true },
            { id: 'f9-2', name: 'Year', isDefault: false },
            { id: 'f9-3', name: 'Significance', isDefault: false },
        ],
    },
    {
        id: 'tmpl-10', deckId: '10', ownerId: '1ilkimen2',
        frontTemplate: '<div style="text-align:center;font-size:1.5rem;">{{Article + Noun}}</div>',
        backTemplate: '<div style="text-align:center;font-size:1.25rem;">{{Cases}}</div>',
        style: '', createdAt: ALWAYS_DUE, updatedAt: ALWAYS_DUE,
        fields: [
            { id: 'f10-1', name: 'Article + Noun', isDefault: true },
            { id: 'f10-2', name: 'Cases', isDefault: false },
        ],
    },
];

export const MOCK_CARDS: CardEntry[] = [
    // Deck 1 — Japanese JLPT N5
    { id: 'j1', templateId: 'tmpl-1', deckId: '1', data: { Japanese: '猫 (neko)', English: 'cat' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j2', templateId: 'tmpl-1', deckId: '1', data: { Japanese: '犬 (inu)', English: 'dog' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j3', templateId: 'tmpl-1', deckId: '1', data: { Japanese: '水 (mizu)', English: 'water' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j4', templateId: 'tmpl-1', deckId: '1', data: { Japanese: '食べる (taberu)', English: 'to eat' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j5', templateId: 'tmpl-1', deckId: '1', data: { Japanese: '学校 (gakkou)', English: 'school' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j6', templateId: 'tmpl-1', deckId: '1', data: { Japanese: '電車 (densha)', English: 'train' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j7', templateId: 'tmpl-1', deckId: '1', data: { Japanese: '友達 (tomodachi)', English: 'friend' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'j8', templateId: 'tmpl-1', deckId: '1', data: { Japanese: 'ありがとう (arigatou)', English: 'thank you' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // Deck 2 — Spanish Verbs
    { id: 's1', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'hablar', Conjugation: 'hablo, hablas, habla', Meaning: 'to speak' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 's2', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'comer', Conjugation: 'como, comes, come', Meaning: 'to eat' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 's3', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'vivir', Conjugation: 'vivo, vives, vive', Meaning: 'to live' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 's4', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'ser', Conjugation: 'soy, eres, es', Meaning: 'to be (permanent)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 's5', templateId: 'tmpl-2', deckId: '2', data: { Verb: 'estar', Conjugation: 'estoy, estás, está', Meaning: 'to be (temporary)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // Deck 3 — Calculus I
    { id: 'c1', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'Power Rule', Formula: 'd/dx[xⁿ] = nxⁿ⁻¹', Example: 'd/dx[x³] = 3x²' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'c2', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'Chain Rule', Formula: 'd/dx[f(g(x))] = f\'(g(x)) · g\'(x)', Example: 'd/dx[sin(x²)] = cos(x²) · 2x' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'c3', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'Product Rule', Formula: 'd/dx[f·g] = f\'g + fg\'', Example: 'd/dx[x·sin(x)] = sin(x) + x·cos(x)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'c4', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'Quotient Rule', Formula: 'd/dx[f/g] = (f\'g - fg\') / g²', Example: 'd/dx[x/sin(x)]' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'c5', templateId: 'tmpl-3', deckId: '3', data: { Rule: 'Derivative of sin', Formula: 'd/dx[sin(x)] = cos(x)', Example: 'd/dx[sin(2x)] = 2cos(2x)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // Deck 4 — World Capitals
    { id: 'w1', templateId: 'tmpl-4', deckId: '4', data: { Country: 'France', Capital: 'Paris' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w2', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Japan', Capital: 'Tokyo' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w3', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Brazil', Capital: 'Brasília' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w4', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Australia', Capital: 'Canberra' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w5', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Canada', Capital: 'Ottawa' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'w6', templateId: 'tmpl-4', deckId: '4', data: { Country: 'Egypt', Capital: 'Cairo' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // Deck 5 — Medical Terminology
    { id: 'm1', templateId: 'tmpl-5', deckId: '5', data: { Term: 'cardio-', Definition: 'relating to the heart (e.g. cardiovascular)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm2', templateId: 'tmpl-5', deckId: '5', data: { Term: 'neuro-', Definition: 'relating to nerves or the nervous system' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm3', templateId: 'tmpl-5', deckId: '5', data: { Term: '-itis', Definition: 'inflammation (e.g. appendicitis)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm4', templateId: 'tmpl-5', deckId: '5', data: { Term: '-ectomy', Definition: 'surgical removal (e.g. appendectomy)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm5', templateId: 'tmpl-5', deckId: '5', data: { Term: 'hyper-', Definition: 'above normal, excessive (e.g. hypertension)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm6', templateId: 'tmpl-5', deckId: '5', data: { Term: 'hypo-', Definition: 'below normal, deficient (e.g. hypoglycemia)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'm7', templateId: 'tmpl-5', deckId: '5', data: { Term: '-ology', Definition: 'study of (e.g. cardiology)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // Deck 6 — Python Programming
    { id: 'p1', templateId: 'tmpl-6', deckId: '6', data: { Concept: 'List comprehension', Explanation: 'Concise way to create lists', Example: '[x**2 for x in range(10)]' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'p2', templateId: 'tmpl-6', deckId: '6', data: { Concept: 'Dictionary', Explanation: 'Key-value pairs, mutable and unordered', Example: 'd = {"key": "value"}' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'p3', templateId: 'tmpl-6', deckId: '6', data: { Concept: 'Lambda function', Explanation: 'Anonymous single-expression function', Example: 'square = lambda x: x**2' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'p4', templateId: 'tmpl-6', deckId: '6', data: { Concept: 'Decorator', Explanation: 'Function that wraps another function to extend behaviour', Example: '@staticmethod' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // Deck 7 — Classical Music Composers
    { id: 'cm1', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Johann Sebastian Bach', Era: 'Baroque (1685–1750)', 'Notable Works': 'Brandenburg Concertos, The Well-Tempered Clavier' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'cm2', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Wolfgang Amadeus Mozart', Era: 'Classical (1756–1791)', 'Notable Works': 'Symphony No. 40, The Magic Flute' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'cm3', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Ludwig van Beethoven', Era: 'Classical/Romantic (1770–1827)', 'Notable Works': 'Symphony No. 9, Moonlight Sonata' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'cm4', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Frédéric Chopin', Era: 'Romantic (1810–1849)', 'Notable Works': 'Nocturnes, Ballade No. 1' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'cm5', templateId: 'tmpl-7', deckId: '7', data: { Composer: 'Claude Debussy', Era: 'Impressionist (1862–1918)', 'Notable Works': 'Clair de lune, La Mer' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // Deck 8 — French Food Vocabulary
    { id: 'ff1', templateId: 'tmpl-8', deckId: '8', data: { French: 'le pain', English: 'bread' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff2', templateId: 'tmpl-8', deckId: '8', data: { French: 'le fromage', English: 'cheese' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff3', templateId: 'tmpl-8', deckId: '8', data: { French: 'la viande', English: 'meat' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff4', templateId: 'tmpl-8', deckId: '8', data: { French: 'les légumes', English: 'vegetables' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff5', templateId: 'tmpl-8', deckId: '8', data: { French: 'l\'addition', English: 'the bill (restaurant)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'ff6', templateId: 'tmpl-8', deckId: '8', data: { French: 'bien cuit', English: 'well done (cooking)' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // Deck 9 — US History
    { id: 'h1', templateId: 'tmpl-9', deckId: '9', data: { Event: 'Declaration of Independence signed', Year: '1776', Significance: 'Formally declared the 13 colonies independent from Britain' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'h2', templateId: 'tmpl-9', deckId: '9', data: { Event: 'US Constitution ratified', Year: '1788', Significance: 'Established the framework of the US federal government' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'h3', templateId: 'tmpl-9', deckId: '9', data: { Event: 'Civil War ends', Year: '1865', Significance: 'Preserved the Union and led to abolition of slavery' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'h4', templateId: 'tmpl-9', deckId: '9', data: { Event: 'Moon landing', Year: '1969', Significance: 'Apollo 11 — first humans on the Moon' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'h5', templateId: 'tmpl-9', deckId: '9', data: { Event: 'Women\'s suffrage (19th Amendment)', Year: '1920', Significance: 'Granted women the right to vote' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },

    // Deck 10 — German Articles
    { id: 'g1', templateId: 'tmpl-10', deckId: '10', data: { 'Article + Noun': 'der Mann (masc.)', Cases: 'Nom: der | Acc: den | Dat: dem | Gen: des' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'g2', templateId: 'tmpl-10', deckId: '10', data: { 'Article + Noun': 'die Frau (fem.)', Cases: 'Nom: die | Acc: die | Dat: der | Gen: der' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
    { id: 'g3', templateId: 'tmpl-10', deckId: '10', data: { 'Article + Noun': 'das Kind (neut.)', Cases: 'Nom: das | Acc: das | Dat: dem | Gen: des' }, nextReviewAt: ALWAYS_DUE, interval: 1, easeFactor: 2.5, reviewCount: 0 },
];
