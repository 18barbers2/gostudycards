import { get, post, patch } from './client';
import type { CardEntry } from '../types';

export async function getCards(deckId: string): Promise<CardEntry[]> {
    return get(`/cards?deckId=${deckId}`);
}

// Renames a field key across all cards in a deck
export async function renameFieldInCards(deckId: string, oldName: string, newName: string): Promise<void> {
    return patch('/cards/rename-field', { deckId, oldName, newName });
}

// Removes a field key from the data JSON of every card in a deck
export async function removeFieldFromCards(deckId: string, fieldName: string): Promise<void> {
    return patch('/cards/remove-field', { deckId, fieldName });
}

export async function createCard(
    templateId: string,
    deckId: string,
    data: Record<string, string>
): Promise<CardEntry> {
    return post('/cards', { templateId, deckId, data });
}
