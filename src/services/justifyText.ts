const LINE_WIDTH = 80

export function justifyText(text: string): string {
    const paragraphs = text.split(/\n/)
    return paragraphs.map(justifyParagraph).join('\n')
}

function justifyParagraph(paragraph: string): string {
    if (paragraph.trim() === '') return ''
    const words = paragraph.trim().split(/\s+/)
    const lines = buildLines(words)
    return lines
        .map((line, index) => {
            const isLastLine = index === lines.length - 1
            return isLastLine ? line.join(' ') : justifyLine(line)
        })
        .join('\n')
}

function buildLines(words: string[]): string[][] {
    const lines: string[][] = []
    let current: string[] = []
    let currentLength = 0
    for (const word of words) {
        const addedLength =
            current.length === 0 ? word.length : currentLength + 1 + word.length
        if (addedLength <= LINE_WIDTH) {
            current.push(word)
            currentLength = addedLength
        } else {
            if (current.length > 0) lines.push(current)
            current = [word]
            currentLength = word.length
        }
    }
    if (current.length > 0) lines.push(current)
    return lines
}

function justifyLine(words: string[]): string {
    if (words.length === 1) return words[0]
    const totalChars = words.reduce((sum, w) => sum + w.length, 0)
    const totalSpaces = LINE_WIDTH - totalChars
    const gaps = words.length - 1
    const baseSpace = Math.floor(totalSpaces / gaps)
    const extraSpaces = totalSpaces % gaps
    let result = ''
    for (let i = 0; i < words.length - 1; i++) {
        const spaces = baseSpace + (i < extraSpaces ? 1 : 0)
        result += words[i] + ' '.repeat(spaces)
    }
    result += words[words.length - 1]
    return result
}
