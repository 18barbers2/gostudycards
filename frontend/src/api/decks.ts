import * as guest from '../services/guestStorage';
import type { Deck } from '../types';
import { isGuest } from './helpers';
import { get, del } from './client'

export async function getDecks(userId: string): Promise<Deck[]> {
    if(isGuest()){
        return guest.getDecks();
    }
    else{
        return get(`/api/decks?userId=${userId}`);
    }
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

    if(isGuest()){
        return guest.deleteDeck(deckId);
    }
    else{
        return del(`/api/decks/${deckId}`);
    }
}