const CIN7_API_BASE_URL = 'https://inventory.dearsystems.com/externalapi'
const CIN7_API_USERNAME = process.env.CIN7_API_USERNAME
const CIN7_API_KEY = process.env.CIN7_API_KEY

interface RateLimitState {
  tokens: number
  lastRefill: number
  requestQueue: Promise<void>
}

const g = globalThis as any
if (!g.__cin7RateLimit) {
  g.__cin7RateLimit = {
    tokens: 50,
    lastRefill: Date.now(),
    requestQueue: Promise.resolve(),
  } as RateLimitState
}
const rateLimit: RateLimitState = g.__cin7RateLimit

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_TOKENS = 50

function enqueueRequest<T>(fn: () => Promise<T>): Promise<T> {
  const result = rateLimit.requestQueue.then(fn, fn)
  rateLimit.requestQueue = result.then(() => {}, () => {})
  return result
}

async function acquireRateLimitToken(): Promise<void> {
  const now = Date.now()
  const elapsed = now - rateLimit.lastRefill
  if (elapsed >= RATE_LIMIT_WINDOW_MS) {
    rateLimit.tokens = RATE_LIMIT_MAX_TOKENS
    rateLimit.lastRefill = now
  }

  if (rateLimit.tokens > 0) {
    rateLimit.tokens--
    return
  }

  const waitMs = RATE_LIMIT_WINDOW_MS - elapsed + 2000
  await new Promise(resolve => setTimeout(resolve, waitMs))
  rateLimit.tokens = RATE_LIMIT_MAX_TOKENS - 1
  rateLimit.lastRefill = Date.now()
}

export async function fetchCin7Data(
  endpoint: string,
  params?: Record<string, string>,
  baseUrlOverride?: string,
  silent = false
) {
  if (!CIN7_API_USERNAME || !CIN7_API_KEY) {
    throw new Error('Cin7 API credentials are not configured')
  }

  return enqueueRequest(async () => {
    await acquireRateLimitToken()

    const baseUrl = baseUrlOverride || CIN7_API_BASE_URL
    const url = new URL(`${baseUrl}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const MAX_RETRIES = 3
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'api-auth-accountid': CIN7_API_USERNAME,
          'api-auth-applicationkey': CIN7_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })

      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '0', 10)
        const waitMs = retryAfter > 0 ? retryAfter * 1000 : 65_000
        rateLimit.tokens = 0
        rateLimit.lastRefill = Date.now()
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, waitMs))
          await acquireRateLimitToken()
          continue
        }
        throw new Error(`Cin7 API rate limited (429) after ${MAX_RETRIES} retries`)
      }

      const responseText = await response.text()

      if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
        throw new Error(`Cin7 API returned HTML error page. Status: ${response.status}.`)
      }

      if (!response.ok) {
        throw new Error(`Cin7 API error: ${response.status} - ${response.statusText}`)
      }

      try {
        return JSON.parse(responseText)
      } catch (parseError) {
        throw new Error(`Invalid JSON response from Cin7 API: ${parseError}`)
      }
    }

    throw new Error('fetchCin7Data: exhausted retries')
  })
}
