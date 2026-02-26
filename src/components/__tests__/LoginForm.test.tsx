import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/LoginForm';

describe('LoginForm', () => {
  it('submits username and password', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();

    render(<LoginForm onSubmit={handle} />);

    const username = screen.getByLabelText('username') as HTMLInputElement;
    const password = screen.getByLabelText('password') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /sign in/i });

    await user.type(username, 'alice');
    await user.type(password, 's3cr3t');
    await user.click(button);

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenCalledWith({
      username: 'alice',
      password: 's3cr3t',
    });
  });
  it('has proper aria attributes', () => {
    render(<LoginForm />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveAriaLabelForm();
  });
});
