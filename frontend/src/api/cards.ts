import * as guest from '../services/guestStorage';
import * as client from './client';
import type { CardEntry } from '../types';
import { isGuest } from './helpers';

// SM-2 SRS calculation — mirrors the backend logic for guest-side use
function calculateSRS(card: CardEntry, rating: string): Partial<CardEntry> {
    let { interval, easeFactor, reviewCount } = card;

    switch (rating) {
        case 'retry':
            interval = 1;
            easeFactor = Math.max(1.3, easeFactor - 0.2);
            break;
        case 'hard':
            interval = Math.max(1, Math.round(interval * 1.2));
            easeFactor = Math.max(1.3, easeFactor - 0.15);
            break;
        case 'medium':
            interval = Math.round(interval * easeFactor);
            break;
        case 'easy':
            interval = Math.round(interval * easeFactor * 1.3);
            easeFactor = Math.min(4.0, easeFactor + 0.1);
            break;
    }

    interval = Math.max(1, interval);
    reviewCount += 1;

    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + interval);

    const MASTERY_THRESHOLD = 21;
    const masteredAt = !card.masteredAt && interval >= MASTERY_THRESHOLD
        ? nextReviewAt.toISOString()
        : card.masteredAt;

    return { interval, easeFactor, reviewCount, nextReviewAt: nextReviewAt.toISOString(), masteredAt };
}

export async function getDueCards(deckId: string): Promise<CardEntry[]> {
    if (isGuest()) return guest.getDueCards(deckId);
    return client.get(`/api/cards/due?deckId=${deckId}`);
}

export async function submitReview(
    cardId: string,
    rating: string,
    userId: string,
    deckId: string,
    currentCard: CardEntry
): Promise<CardEntry> {
    if (isGuest()) {
        const srs = calculateSRS(currentCard, rating);
        guest.updateCardSRS(cardId, srs);
        guest.addReviewLog({
            cardId,
            deckId,
            userId,
            reviewedAt: new Date().toISOString(),
            rating: rating as 'retry' | 'hard' | 'medium' | 'easy',
            previousInterval: currentCard.interval,
            newInterval: srs.interval!,
        });
        return { ...currentCard, ...srs };
    }
    return client.patch(`/api/cards/${cardId}/review`, { rating, userId, deckId });
}

export async function getCards(deckId: string): Promise<CardEntry[]> {
    if(isGuest()){
        return guest.getCards(deckId);
    }
    else {
        return client.get(`/api/cards?deckId=${deckId}`);
    }
}

export async function getFieldUsageCount(deckId: string, fieldName: string): Promise<number> {
    return guest.getFieldUsageCount(deckId, fieldName);
}

export async function renameFieldInCards(deckId: string, oldName: string, newName: string): Promise<void> {
    if(isGuest()){
        return guest.renameFieldInCards(deckId, oldName, newName);
    }
    else{
        return client.patch(`/api/cards/rename-field`, { deckId, oldName, newName });
    }
}

export async function removeFieldFromCards(deckId: string, fieldName: string): Promise<void> {
    if(isGuest()){
        return guest.removeFieldFromCards(deckId, fieldName);
    }
    else{
        return client.patch(`/api/cards/remove-field`, { deckId, fieldName });
    }

}

export async function deleteCard(cardId: string): Promise<void> {
    if(isGuest()){
        return guest.deleteCard(cardId);
    }
    else {
        return client.del(`/api/cards/${cardId}`);
    }
}

export async function createCard(
    templateId: string,
    deckId: string,
    data: Record<string, string>
): Promise<CardEntry> {
    return guest.createCard(templateId, deckId, data);
}