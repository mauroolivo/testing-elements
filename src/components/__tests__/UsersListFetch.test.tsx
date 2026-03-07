import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersListFetch from '../UsersListFetch';

describe('UsersListFetch', () => {
  const realFetch = global.fetch;

  const users = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    address: {
      street: '',
      suite: '',
      city: `City${i + 1}`,
      zipcode: '',
      geo: { lat: '0', lng: '0' },
    },
    phone: `000-000-000${i + 1}`,
    website: `site${i + 1}.com`,
    company: { name: `Company${i + 1}`, catchPhrase: '', bs: '' },
  }));

  afterEach(() => {
    global.fetch = realFetch;
    jest.resetAllMocks();
  });

  test('renders users returned by fetch', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => users });

    render(<UsersListFetch />);

    expect(screen.getByText(/loading users/i)).toBeInTheDocument();

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(10);
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });

  test('matches snapshot', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => users });

    const { asFragment } = render(<UsersListFetch />);
    await screen.findAllByRole('listitem');
    expect(asFragment()).toMatchSnapshot();
  });
});
