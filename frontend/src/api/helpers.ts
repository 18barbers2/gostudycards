export function isGuest(): boolean {
    return localStorage.getItem('isGuest') === 'true';
}