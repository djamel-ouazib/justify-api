const DAILY_WORD_LIMIT = 80_000

interface TokenUsage {
    count: number
    date: string
}

const store = new Map<string, TokenUsage>()

function today(): string {
    return new Date().toISOString().slice(0, 10)
}

export function checkRateLimit(token: string, wordCount: number): boolean {
    const now = today()
    const usage = store.get(token)

    if (!usage || usage.date !== now) {
        store.set(token, { count: wordCount, date: now })
        return true
    }

    if (usage.count + wordCount > DAILY_WORD_LIMIT) {
        return false
    }

    usage.count += wordCount
    return true
}
