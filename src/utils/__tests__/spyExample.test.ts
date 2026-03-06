describe('spyOn example', () => {
  test('spies on console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    console.log('hello', 123);

    expect(spy).toHaveBeenCalledWith('hello', 123);

    spy.mockRestore();
  });
});
