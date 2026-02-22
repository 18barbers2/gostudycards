import { get, post, patch } from './client';
import type { CardTemplate } from '../types';

export async function getTemplate(deckId: string): Promise<CardTemplate | null> {
    return get(`/templates?deckId=${deckId}`);
}

// Replaces the template's field list with the provided array.
// Used when the user adds or removes custom fields from the Add Card page.
export async function updateTemplate(
    templateId: string,
    fields: Array<{ name: string; isDefault: boolean }>
): Promise<CardTemplate> {
    return patch(`/templates/${templateId}`, { fields });
}

export async function createTemplate(
    deckId: string,
    ownerId: string,
    frontTemplate: string,
    backTemplate: string,
    style: string,
    fields: Array<{ name: string; isDefault: boolean }>
): Promise<CardTemplate> {
    return post('/templates', { deckId, ownerId, frontTemplate, backTemplate, style, fields });
}
