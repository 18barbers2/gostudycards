import { getDashboardStats } from "../services/guestStorage";
import { isGuest } from "./helpers";
import * as client from './client';

export async function fetchDashboardStats() {

    if(isGuest()){
        return getDashboardStats();
    }
    else{
        return client.get(`/api/dashboard`)
    }
}