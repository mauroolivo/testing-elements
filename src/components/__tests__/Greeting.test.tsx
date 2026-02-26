import { render, screen } from '@testing-library/react';

import Greeting from '@/components/Greeting';

describe('Greeting', () => {
  it('get the provided name', () => {
    render(<Greeting name="Mauro" />);
    const e: HTMLElement = screen.getByText('Hello, Mauro!');
    expect(e).toBeInTheDocument();
    const e2: HTMLElement = screen.getByRole('heading', {
      name: 'Hello, Mauro!',
    });
    expect(e2).toBeInTheDocument();
  });
});
