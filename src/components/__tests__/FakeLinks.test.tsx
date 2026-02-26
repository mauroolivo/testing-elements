import { render, screen } from '@testing-library/react';
import FakeLinks from '@/components/FakeLinks';

describe('FakeLinks', () => {
  it('renders 10 fake links', () => {
    render(<FakeLinks />);

    const nav = screen.getByRole('navigation', { name: /fake-links/i });
    expect(nav).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(10);
    expect(links[0]).toHaveTextContent('Link 1');
    expect(links[9]).toHaveTextContent('Link 10');

    const navs = screen.getAllByRole('navigation');
    expect(navs).toHaveLength(2);
    const address = screen.getByRole('address');
    expect(address).toBeInTheDocument();

    const alert = screen.queryByRole('alert');
    expect(alert).not.toBeInTheDocument();
    expect(alert).toBeNull();

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
  });
});
