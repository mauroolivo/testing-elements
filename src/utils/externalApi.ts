export async function fetchUser(
  userId: number
): Promise<{ id: number; name: string }> {
  // Fake external API - in real code this would call `fetch` or another HTTP client
  return Promise.resolve({ id: userId, name: `User ${userId}` });
}

export default fetchUser;
