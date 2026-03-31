import { get, post, patch, del } from './client';
import type { CardEntry } from '../types';

export async function getCards(deckId: string): Promise<CardEntry[]> {
    return get(`/cards?deckId=${deckId}`);
}

export async function getFieldUsageCount(deckId: string, fieldName: string): Promise<number> {
    const result: { count: number } = await get(`/cards/field-count?deckId=${encodeURIComponent(deckId)}&fieldName=${encodeURIComponent(fieldName)}`);
    return result.count;
}

// Renames a field key across all cards in a deck
export async function renameFieldInCards(deckId: string, oldName: string, newName: string): Promise<void> {
    return patch('/cards/rename-field', { deckId, oldName, newName });
}

// Removes a field key from the data JSON of every card in a deck
export async function removeFieldFromCards(deckId: string, fieldName: string): Promise<void> {
    return patch('/cards/remove-field', { deckId, fieldName });
}

export async function deleteCard(cardId: string): Promise<void> {
    return del(`/cards/${cardId}`);
}

export async function createCard(
    templateId: string,
    deckId: string,
    data: Record<string, string>
): Promise<CardEntry> {
    return post('/cards', { templateId, deckId, data });
}
