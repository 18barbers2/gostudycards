import { get, post, del } from './client'
import type { Deck } from '../types'


export async function getDecks(userId: string): Promise<Deck[]> {
    return get(`/decks?userId=${userId}`)
}

export async function createDeck(name: string, description: string | undefined, ownerId: string): Promise<Deck> {
    return post('/decks', { name, description, ownerId })
}

export async function deleteDeck(deckId: string): Promise<void> {
    return del(`/decks/${deckId}`)
}