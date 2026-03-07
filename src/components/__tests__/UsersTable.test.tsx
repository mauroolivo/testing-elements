import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import UsersTable from '../UsersTable';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeUser = (id: number) => ({
  id,
  name: `User ${id}`,
  username: `user${id}`,
  email: `user${id}@example.com`,
  address: {
    street: '',
    suite: '',
    city: `City${id}`,
    zipcode: '',
    geo: { lat: '0', lng: '0' },
  },
  phone: `000-000-000${id}`,
  website: `site${id}.com`,
  company: { name: `Company${id}`, catchPhrase: '', bs: '' },
});

describe('UsersTable', () => {
  test('renders users returned by axios', async () => {
    const users = Array.from({ length: 10 }, (_, i) => makeUser(i + 1));
    mockedAxios.get.mockResolvedValue({ data: users });

    render(<UsersTable />);

    // initially shows loading
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(10);

    // verify a couple of rendered values
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });
});
