import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import RequestLabPage from '@/app/request-lab/page';

const featuredProduct = {
  id: 7,
  title: 'A compact espresso machine',
  category: 'kitchen-accessories',
};

const searchResults = {
  products: [
    {
      id: 101,
      title: 'Phone Tripod Stand',
      category: 'mobile-accessories',
    },
  ],
  total: 1,
  skip: 0,
  limit: 30,
};

const deletedTodo = {
  id: 13,
  todo: 'Archived by MSW',
  completed: false,
  userId: 12,
  isDeleted: true,
  deletedOn: '2026-03-20T08:30:00.000Z',
};

let capturedCreateTodoBody: unknown = null;

const server = setupServer(
  http.get('https://dummyjson.com/products/7', () => {
    return HttpResponse.json(featuredProduct);
  }),
  http.get('https://dummyjson.com/products/search', ({ request }) => {
    const { searchParams } = new URL(request.url);

    if (searchParams.get('q') !== 'phone') {
      return HttpResponse.json(
        { message: 'Unexpected query' },
        { status: 400 }
      );
    }

    return HttpResponse.json(searchResults);
  }),
  http.post('https://dummyjson.com/todos/add', async ({ request }) => {
    capturedCreateTodoBody = await request.json();

    return HttpResponse.json({
      id: 151,
      ...((capturedCreateTodoBody as Record<string, unknown>) ?? {}),
    });
  }),
  http.delete('https://dummyjson.com/todos/13', () => {
    return HttpResponse.json(deletedTodo);
  })
);

describe('RequestLabPage', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    capturedCreateTodoBody = null;
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('renders four live request actions', () => {
    render(<RequestLabPage />);

    expect(
      screen.getByRole('heading', {
        name: /four external requests, one compact debugging surface/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /fetch product/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /search phone/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create todo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /delete todo 13/i })
    ).toBeInTheDocument();
  });

  it('shows compact response details for the featured product request', async () => {
    const user = userEvent.setup();

    render(<RequestLabPage />);

    await user.click(screen.getByRole('button', { name: /fetch product/i }));

    const requestCard = screen
      .getByRole('heading', { name: /featured product/i })
      .closest('article') as HTMLElement;

    expect(await within(requestCard).findByText(/200 ok/i)).toBeInTheDocument();
    expect(
      within(requestCard).getByText('https://dummyjson.com/products/7')
    ).toBeInTheDocument();
    expect(
      within(requestCard).getByText(/a compact espresso machine/i)
    ).toBeInTheDocument();
    expect(
      within(requestCard).getByText(/application\/json/i)
    ).toBeInTheDocument();
  });

  it('captures the POST body and renders the created todo JSON', async () => {
    const user = userEvent.setup();

    render(<RequestLabPage />);

    await user.click(screen.getByRole('button', { name: /create todo/i }));

    const requestCard = screen
      .getByRole('heading', { name: /create todo/i })
      .closest('article') as HTMLElement;

    expect(await within(requestCard).findByText(/151/i)).toBeInTheDocument();
    expect(
      within(requestCard).getAllByText(/review msw 2 request handling/i)
    ).toHaveLength(2);
    expect(capturedCreateTodoBody).toEqual({
      todo: 'Review MSW 2 request handling',
      completed: false,
      userId: 12,
    });
  });

  it('renders an error state when the service responds with a failure', async () => {
    const user = userEvent.setup();

    server.use(
      http.delete('https://dummyjson.com/todos/13', () => {
        return HttpResponse.json(
          { message: 'Delete failed' },
          { status: 503, statusText: 'Service Unavailable' }
        );
      })
    );

    render(<RequestLabPage />);

    await user.click(screen.getByRole('button', { name: /delete todo 13/i }));

    const requestCard = screen
      .getByRole('heading', { name: /delete todo/i })
      .closest('article') as HTMLElement;

    expect(
      await within(requestCard).findByText(/503 service unavailable/i)
    ).toBeInTheDocument();
    expect(
      within(requestCard).getByText(/request failed with status 503/i)
    ).toBeInTheDocument();
    expect(within(requestCard).getByText(/delete failed/i)).toBeInTheDocument();
  });
});
