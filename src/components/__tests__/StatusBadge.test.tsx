import { render, screen } from '@testing-library/react';
import StatusBadge from '@/components/StatusBadge';
import type { Status } from '@/components/StatusBadge';

describe('StatusBadge', () => {
  test.each([
    ['success', 'Success', 'status-success'],
    ['warning', 'Warning', 'status-warning'],
    ['error', 'Error', 'status-error'],
  ])('renders %s status', (status, expectedText, expectedClass) => {
    render(<StatusBadge status={status as Status} />);

    const el = screen.getByRole('status');
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(expectedText);
    expect(el).toHaveClass(expectedClass);
  });

  it('renders custom label when provided', () => {
    render(<StatusBadge status="success" label="All good" />);
    expect(screen.getByText('All good')).toBeInTheDocument();
  });
});
