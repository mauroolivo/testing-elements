import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ReactWindowPage from '@/app/react-window/page';

jest.mock('react-window', () => {
  type MockListProps<RowProps extends object> = {
    rowComponent: React.ComponentType<
      {
        ariaAttributes: {
          'aria-posinset': number;
          'aria-setsize': number;
          role: 'listitem';
        };
        index: number;
        style: React.CSSProperties;
      } & RowProps
    >;
    rowCount: number;
    rowProps: RowProps;
    onRowsRendered?: (visible: {
      startIndex: number;
      stopIndex: number;
    }) => void;
  };

  return {
    __esModule: true,
    List: function MockList<RowProps extends object>({
      rowComponent: RowComponent,
      rowCount,
      rowProps,
      onRowsRendered,
    }: MockListProps<RowProps>) {
      React.useEffect(() => {
        onRowsRendered?.({
          startIndex: 0,
          stopIndex: Math.max(0, rowCount - 1),
        });
      }, [onRowsRendered, rowCount]);

      return (
        <div>
          {Array.from({ length: rowCount }, (_, index) => (
            <RowComponent
              key={index}
              index={index}
              style={{}}
              ariaAttributes={{
                'aria-posinset': index + 1,
                'aria-setsize': rowCount,
                role: 'listitem',
              }}
              {...rowProps}
            />
          ))}
        </div>
      );
    },
    useListRef: (initialValue: null) => React.useRef(initialValue),
  };
});

function getSelectedProductCard() {
  const heading = screen.getByText('Selected product');
  return heading.closest('div')?.parentElement as HTMLElement;
}

describe('ReactWindowPage', () => {
  it('renders the virtualized list demo with initial summary data', () => {
    render(<ReactWindowPage />);

    expect(
      screen.getByRole('heading', { name: /simple virtualized list example/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/search product/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /scroll to selected/i })
    ).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();

    const selectedCard = getSelectedProductCard();
    expect(within(selectedCard).getByText('Product 25')).toBeInTheDocument();
  });

  it('filters the list and lets the user select a visible product', async () => {
    const user = userEvent.setup();

    render(<ReactWindowPage />);

    await user.type(screen.getByLabelText(/search product/i), 'Product 999');

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(
      screen.getByText(/no selected product in the current filter/i)
    ).toBeInTheDocument();

    await user.click(screen.getByText('Product 999'));

    const selectedCard = getSelectedProductCard();
    expect(within(selectedCard).getByText('Product 999')).toBeInTheDocument();
    expect(within(selectedCard).getByText('Games')).toBeInTheDocument();
  });
});
