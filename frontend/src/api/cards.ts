import * as guest from '../services/guestStorage';
import type { CardEntry } from '../types';

export async function getCards(deckId: string): Promise<CardEntry[]> {
    return guest.getCards(deckId);
}

export async function getFieldUsageCount(deckId: string, fieldName: string): Promise<number> {
    return guest.getFieldUsageCount(deckId, fieldName);
}

export async function renameFieldInCards(deckId: string, oldName: string, newName: string): Promise<void> {
    return guest.renameFieldInCards(deckId, oldName, newName);
}

export async function removeFieldFromCards(deckId: string, fieldName: string): Promise<void> {
    return guest.removeFieldFromCards(deckId, fieldName);
}

export async function deleteCard(cardId: string): Promise<void> {
    return guest.deleteCard(cardId);
}

export async function createCard(
    templateId: string,
    deckId: string,
    data: Record<string, string>
): Promise<CardEntry> {
    return guest.createCard(templateId, deckId, data);
}