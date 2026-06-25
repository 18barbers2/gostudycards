import * as guest from '../services/guestStorage';
import * as client from './client';
import type { CardTemplate } from '../types';
import { isGuest } from './helpers';

export async function getTemplate(deckId: string): Promise<CardTemplate | null> {
    if(isGuest()){
        return guest.getTemplate(deckId);
    }
    else{
        return client.get(`/api/templates?deckId=${ deckId }`);
    }
}

export async function updateTemplate(
    templateId: string,
    fields: Array<{ name: string; isDefault: boolean }>
): Promise<CardTemplate> {
    const result = guest.updateTemplate(templateId, fields);
    if (!result) throw new Error(`Template ${templateId} not found`);
    return result;
}

export async function updateFullTemplate(
    templateId: string,
    frontTemplate: string,
    backTemplate: string,
    style: string,
    fields: Array<{ name: string; isDefault: boolean }>
): Promise<CardTemplate> {
    const result = guest.updateFullTemplate(templateId, frontTemplate, backTemplate, style, fields);
    if (!result) throw new Error(`Template ${templateId} not found`);
    return result;
}

export async function createTemplate(
    deckId: string,
    ownerId: string,
    frontTemplate: string,
    backTemplate: string,
    style: string,
    fields: Array<{ name: string; isDefault: boolean }>
): Promise<CardTemplate> {
    return guest.createTemplate(deckId, ownerId, frontTemplate, backTemplate, style, fields);
}