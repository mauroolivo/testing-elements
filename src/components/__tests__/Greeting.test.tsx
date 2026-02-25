import { render, screen } from '@testing-library/react';

import Greeting from '@/components/Greeting';

describe('Greeting', () => {
  it('renders the provided name', () => {
    render(<Greeting name="Mauro" />);

    expect(
      screen.getByRole('heading', { name: 'Hello, Mauro!' })
    ).toBeInTheDocument();
    expect(screen.getByText('Hello, Mauro!')).toBeInTheDocument();
  });
  it('get the provided name', () => {
    render(<Greeting name="Mauro" />);

    expect(screen.getByText('Hello, Mauro!')).toBeInTheDocument();
  });
});
