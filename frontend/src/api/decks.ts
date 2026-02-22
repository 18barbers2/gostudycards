import { get } from './client'
import type { Deck } from '../types'


export async function getDecks(userId: string): Promise<Deck[]> {
    return get(`/decks?userId=${userId}`)
}