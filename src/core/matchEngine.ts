export type FormatKey = 'digits' | 'contains' | 'symbol' | 'letter' | 'four' | 'size' | 'keyword'

export type MatchResult = 'matched' | 'unmatched'
export type PrintStatus = 'printed' | 'pending' | 'failed'

export interface MatchOptions {
  formats: Set<FormatKey>
  rangeMin: number
  rangeMax: number
  keyword: string
}

export interface MatchOutput {
  matched: boolean
  matchStr: string
}

// Extracts the first integer found in a string, returns null if none
export function extractFirstNumber(text: string): number | null {
  const m = text.match(/\d+/)
  if (!m) return null
  return parseInt(m[0], 10)
}

// Returns a match string if the content satisfies the given format, null otherwise
function checkFormat(content: string, key: FormatKey, keyword: string): string | null {
  const trimmed = content.trim()

  switch (key) {
    case 'digits':
      // Pure digits only
      if (/^\d+$/.test(trimmed)) return trimmed
      return null

    case 'contains':
      // Contains at least one digit sequence
      if (/\d+/.test(trimmed)) {
        const m = trimmed.match(/\d+/)
        return m ? m[0] : null
      }
      return null

    case 'symbol':
      // Digits + symbols (but not letters), e.g. "123+" "42~"
      if (/\d/.test(trimmed) && /^[\d\s+\-*/\\,.!?~@#$%^&()[\]{}<>=_|:;'"]+$/.test(trimmed)) {
        const m = trimmed.match(/\d+/)
        return m ? trimmed : null
      }
      return null

    case 'letter':
      // Letters + digits, e.g. "M42" "42L"
      if (/\d/.test(trimmed) && /[a-zA-Z]/.test(trimmed) && /^[a-zA-Z0-9\s]+$/.test(trimmed)) {
        return trimmed
      }
      return null

    case 'four':
      // Exactly a 4-digit number
      if (/^\d{4}$/.test(trimmed)) return trimmed
      return null

    case 'size': {
      // Digits followed by a size suffix (XS/S/M/L/XL/XXL/XXXL or Chinese sizes)
      const sizeRe = /^(\d+)\s*(xs|s|m|l|xl|xxl|xxxl|[小中大])?$/i
      const sm = trimmed.match(sizeRe)
      if (sm) return trimmed
      return null
    }

    case 'keyword': {
      // Must contain a number AND the keyword
      if (!keyword) return null
      const kw = keyword.toLowerCase()
      if (/\d/.test(trimmed) && trimmed.toLowerCase().includes(kw)) {
        const m = trimmed.match(/\d+/)
        return m ? trimmed : null
      }
      return null
    }
  }
}

export function matchMessage(content: string, opts: MatchOptions): MatchOutput {
  if (!content) return { matched: false, matchStr: '' }

  // No formats selected → match everything, skip range check
  if (opts.formats.size === 0) {
    return { matched: true, matchStr: content }
  }

  // Format check: OR logic — any selected format can satisfy
  let formatStr: string | null = null
  for (const key of opts.formats) {
    const result = checkFormat(content, key, opts.keyword)
    if (result !== null) {
      formatStr = result
      break
    }
  }
  if (formatStr === null) return { matched: false, matchStr: '' }

  // Range check: only applies to the number extracted from the matched format string
  const num = extractFirstNumber(formatStr)
  if (num !== null) {
    if (num < opts.rangeMin || num > opts.rangeMax) {
      return { matched: false, matchStr: '' }
    }
  }

  return { matched: true, matchStr: formatStr }
}
