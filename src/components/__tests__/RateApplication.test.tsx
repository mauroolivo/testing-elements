import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RateApplication from '@/components/RateApplication';

describe('RateApplication', () => {
  it('logs the submitted name and rating', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<RateApplication />);

    await user.type(screen.getByLabelText(/user name/i), 'Mauro');
    await user.type(screen.getByLabelText(/rating/i), '5');
    await user.click(screen.getByRole('button', { name: /submit rating/i }));

    expect(consoleSpy).toHaveBeenCalledWith({
      userName: 'Mauro',
      rating: 5,
    });

    consoleSpy.mockRestore();
  });
});
