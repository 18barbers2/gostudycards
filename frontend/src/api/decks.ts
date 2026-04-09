import * as guest from '../services/guestStorage';
import type { Deck } from '../types';

export async function getDecks(_userId: string): Promise<Deck[]> {
    return guest.getDecks();
}

export async function createDeck(name: string, description: string | undefined, ownerId: string): Promise<Deck> {
    return guest.createDeck(name, description, ownerId);
}

export async function getDeck(deckId: string): Promise<Deck> {
    const deck = guest.getDeck(deckId);
    if (!deck) throw new Error(`Deck ${deckId} not found`);
    return deck;
}

export async function deleteDeck(deckId: string): Promise<void> {
    return guest.deleteDeck(deckId);
}