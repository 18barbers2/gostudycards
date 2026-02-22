import { get } from './client'


export async function getDecks(userId: string) {
    return get(`/decks?userId=${userId}`)
}