import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EventsTrigger from '@/components/EventsTrigger';

test('EventsTrigger demonstrates getBy, queryBy, and findBy', async () => {
  render(<EventsTrigger />);

  // getBy - fails fast if missing
  const btn = screen.getByText('Submit');

  // queryBy - check absence
  expect(screen.queryByText('Error')).not.toBeInTheDocument();

  // click to trigger async success
  await userEvent.click(btn);

  // findBy - wait for async element
  const msg = await screen.findByText('Success!');
  expect(msg).toBeInTheDocument();

  // now trigger an error state and demonstrate queryBy returning the element
  const errBtn = screen.getByText('Trigger error');
  await userEvent.click(errBtn);
  // wait for the async error to appear, then demonstrate `queryBy` returns it
  
  await screen.findByText('Error', {}, { timeout: 1500, interval: 100 });
  const err = screen.queryByText('Error');
  expect(err).toBeInTheDocument();
});
