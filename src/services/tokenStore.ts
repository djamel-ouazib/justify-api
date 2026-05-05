import { v4 as uuidv4 } from 'uuid'

const tokens = new Map<string, string>()

export function getOrCreateToken(email: string): string {
    const existing = tokens.get(email)
    if (existing) return existing
    const token = uuidv4()
    tokens.set(email, token)
    return token
}

export function isValidToken(token: string): boolean {
    for (const t of tokens.values()) {
        if (t === token) return true
    }
    return false
}
