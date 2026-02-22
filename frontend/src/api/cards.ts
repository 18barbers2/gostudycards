import { get, post } from './client';
import type { CardEntry } from '../types';

export async function getCards(deckId: string): Promise<CardEntry[]> {
    return get(`/cards?deckId=${deckId}`);
}

export async function createCard(
    templateId: string,
    deckId: string,
    data: Record<string, string>
): Promise<CardEntry> {
    return post('/cards', { templateId, deckId, data });
}
