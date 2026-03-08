import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocalStorageNote from '../LocalStorageNote';

describe('LocalStorageNote', () => {
  const originalLocalStorage = window.localStorage;

  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      configurable: true,
    });
    jest.resetAllMocks();
  });

  test('loads the saved note from localStorage', async () => {
    const getItemMock = window.localStorage.getItem as jest.Mock;
    getItemMock.mockReturnValue('Read more tests');

    render(<LocalStorageNote />);

    // wait for effect to run and UI to update
    const input = await screen.findByDisplayValue('Read more tests');
    const message = await screen.findByText('Saved note: Read more tests');

    expect(window.localStorage.getItem).toHaveBeenCalledWith('favorite-note');
    expect(input).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  test('saves the typed note to localStorage', async () => {
    render(<LocalStorageNote />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Note'), 'Practice Jest mocks');
    await user.click(screen.getByRole('button', { name: 'Save note' }));

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'favorite-note',
      'Practice Jest mocks'
    );
    expect(
      screen.getByText('Saved note: Practice Jest mocks')
    ).toBeInTheDocument();
  });
});
