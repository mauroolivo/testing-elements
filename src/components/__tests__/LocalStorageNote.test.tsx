import { fireEvent, render, screen } from '@testing-library/react';
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

  test('loads the saved note from localStorage', () => {
    const getItemMock = window.localStorage.getItem as jest.Mock;
    getItemMock.mockReturnValue('Read more tests');

    render(<LocalStorageNote />);

    expect(window.localStorage.getItem).toHaveBeenCalledWith('favorite-note');
    expect(screen.getByDisplayValue('Read more tests')).toBeInTheDocument();
    expect(screen.getByText('Saved note: Read more tests')).toBeInTheDocument();
  });

  test('saves the typed note to localStorage', () => {
    render(<LocalStorageNote />);

    fireEvent.change(screen.getByLabelText('Note'), {
      target: { value: 'Practice Jest mocks' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save note' }));

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'favorite-note',
      'Practice Jest mocks'
    );
    expect(
      screen.getByText('Saved note: Practice Jest mocks')
    ).toBeInTheDocument();
  });
});
