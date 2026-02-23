// A field definition on a card template
export interface CardField {
    id: string;
    name: string;
    isDefault: boolean;
}

// The reusable template that defines a card's layout (created in CardBuilder)
export interface CardTemplate {
    id: string;
    deckId: string;
    ownerId: string;
    frontTemplate: string;
    backTemplate: string;
    style: string;
    fields: CardField[];
    createdAt: string;
    updatedAt: string;
}

// A single filled-in card instance (created in AddCard)
export interface CardEntry {
    id: string;
    templateId: string;
    deckId: string;
    data: Record<string, string>; // e.g. { Question: "...", Answer: "...", Hint: "..." }
    // SRS scheduling
    nextReviewAt: string;
    interval: number;      // days until next review
    easeFactor: number;    // difficulty multiplier
    reviewCount: number;
    masteredAt?: string;   // set once when interval first crosses the mastered threshold
}

// One record written per review event — used to power activity histograms and stats
export interface ReviewLog {
    id: string;
    cardId: string;
    deckId: string;
    userId: string;
    reviewedAt: string;              // ISO timestamp — group by date for the histogram
    rating: 'retry' | 'hard' | 'medium' | 'easy';
    previousInterval: number;        // interval before this review
    newInterval: number;             // interval after this review
}

// A deck of cards
export interface Deck {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    templateId?: string;
    cardIds: string[];
    createdAt?: string;
    updatedAt?: string;
}
