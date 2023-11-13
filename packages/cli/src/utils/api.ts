export function getRequestConfig() {
  return {
    headers: {
      'Authorization': `Bearer ${process.env.YUZU_API_KEY}`
    }
  }
}