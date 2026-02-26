import { render, screen } from '@testing-library/react';
import Pill from '@/components/Pill';

describe('Pill', () => {
  it('has a variant class and capitalized label', () => {
    render(<Pill variant="success" label="All good" />);
    const el = screen.getByRole('status');

    // custom matcher: checks for a class that starts with the prefix
    expect(el).toHaveClassStartingWith('pill-');

    // custom matcher: checks first char is capitalized
    expect(el).toHaveCapitalizedText();

    // built-in matcher from Testing Library Matchers
    expect(el).toBeVisible();
  });
});
