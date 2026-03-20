export async function until<T>(
  callback: () => Promise<T> | T
): Promise<[null, T] | [unknown, null]> {
  try {
    const result = await callback();
    return [null, result];
  } catch (error: unknown) {
    return [error, null];
  }
}
