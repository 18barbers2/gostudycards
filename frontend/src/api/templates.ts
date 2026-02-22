import { get, post } from './client';
import type { CardTemplate } from '../types';

export async function getTemplate(deckId: string): Promise<CardTemplate | null> {
    return get(`/templates?deckId=${deckId}`);
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
