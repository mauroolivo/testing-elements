jest.mock('../externalApi', () => ({
  fetchUser: jest.fn(),
}));

import * as api from '../externalApi';
import { getUserName } from '../userService';

describe('getUserName', () => {
  test('calls fetchUser and returns name using jest.fn()', async () => {
    const mockUser = { id: 1, name: 'Alice' };
    // Use the mocked function provided by jest.mock
    (api.fetchUser as jest.Mock).mockResolvedValue(mockUser);

    const name = await getUserName(1);

    expect(api.fetchUser).toHaveBeenCalledWith(1);
    expect(name).toBe('Alice');

    // Inspect mock call details
    expect((api.fetchUser as jest.Mock).mock.calls.length).toBe(1);

    (api.fetchUser as jest.Mock).mockReset();
  });
});
