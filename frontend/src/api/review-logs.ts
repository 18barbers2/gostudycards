import * as guest from '../services/guestStorage';
import * as client from './client';

function isGuest(): boolean {
    return localStorage.getItem('isGuest') === 'true';
}

export async function getWeeklyActivity(_userId: string): Promise<{ date: string; count: number }[]> {
    if (isGuest()) return guest.getWeeklyActivity();
    return client.get(`/api/review-logs/weekly?userId=${_userId}`);
}
