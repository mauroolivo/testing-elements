import { fireEvent, render, screen, within } from '@testing-library/react';

import PerformancePage from '@/app/performance/page';

function getRenderCounts(sectionLabel: string) {
  const section = screen.getByRole('region', { name: sectionLabel });
  const badges = within(section).getAllByText(/render count:/i);

  return badges.map((badge) =>
    Number(badge.textContent?.match(/(\d+)/)?.[0] ?? 0)
  );
}

describe('PerformancePage', () => {
  it('rerenders every row in the naive list when a single row changes', () => {
    render(<PerformancePage />);

    expect(getRenderCounts('Naive list')).toEqual(Array(10).fill(1));

    fireEvent.change(screen.getByLabelText('Naive row 3 value'), {
      target: { value: 'Row 3 updated' },
    });

    expect(getRenderCounts('Naive list')).toEqual(Array(10).fill(2));
  });

  it('rerenders only the changed row in the optimized list', () => {
    render(<PerformancePage />);

    expect(getRenderCounts('Optimized list')).toEqual(Array(10).fill(1));

    fireEvent.change(screen.getByLabelText('Optimized row 3 value'), {
      target: { value: 'Row 3 updated' },
    });

    expect(getRenderCounts('Optimized list')).toEqual([
      1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
    ]);
  });
});
