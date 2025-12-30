export function apiKeyAuth(authHeader: string): boolean {
  const apiKey = authHeader?.split(' ')
  if (!apiKey) return false
  if (apiKey[apiKey.length - 1] !== process.env.CMS_API_KEY) return false
  return true
}
