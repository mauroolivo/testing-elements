import { fetchUser } from './externalApi';

export async function getUserName(userId: number): Promise<string> {
  const user = await fetchUser(userId);
  return user.name;
}

export default getUserName;
