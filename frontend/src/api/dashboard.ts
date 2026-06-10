import { getDashboardStats } from "../services/guestStorage";

export async function fetchDashboardStats() {
    return getDashboardStats();
}