import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import axios from 'axios';
import UsersTable from '../UsersTable';

jest.mock('axios');

type AxiosManualMock = jest.Mocked<typeof axios> & {
  __setMockResponse: (data: unknown) => void;
  __setMockError: (error: unknown) => void;
  __reset: () => void;
};

const mockedAxios = axios as AxiosManualMock;

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
  beforeEach(() => {
    cleanup();
    mockedAxios.__reset();
    jest.clearAllMocks();
  });

  afterAll(() => {
    cleanup();
    mockedAxios.__reset();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

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

  test('renders users with manual mock helpers from __mocks__', async () => {
    const users = Array.from({ length: 3 }, (_, i) => makeUser(i + 1));
    mockedAxios.__setMockResponse(users);

    render(<UsersTable />);

    expect(screen.getByText(/loading users/i)).toBeInTheDocument();

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users'
    );
    expect(screen.getByText('User 3')).toBeInTheDocument();
    expect(
      screen.getByText('City2 — Company2 — site2.com')
    ).toBeInTheDocument();
  });
});
