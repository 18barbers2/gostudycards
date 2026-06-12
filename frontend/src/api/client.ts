 
const BASE_URL = import.meta.env.VITE_API_URL;

export async function get(path: string) {
    const res = await fetch(`${BASE_URL}${path}`)
    if(!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
    return res.json()
}

export async function del(path: string) {
    const res = await fetch(`${BASE_URL}${path}`, { method: 'DELETE' })
    if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`)
}

export async function patch(path: string, body: unknown) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error(`PATCH ${path} failed: ${res.status}`)
    return res.json()
}

export async function post(path: string, body: unknown) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    if(!res.ok) throw new Error(`POST ${path} failed: ${res.status}`)
    return res.json()
}

