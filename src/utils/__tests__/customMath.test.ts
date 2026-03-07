import customMath from '../customMath';

describe('customMath', () => {
  test('add works with integers and floats', () => {
    const math = customMath();
    expect(math.add(1, 2)).toBe(3);
    expect(math.add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test('subtract works with positive and negative results', () => {
    const math = customMath();
    expect(math.subtract(5, 3)).toBe(2);
    expect(math.subtract(3, 5)).toBe(-2);
  });

  test('multiply works and handles zero', () => {
    const math = customMath();
    expect(math.multiply(4, 3)).toBe(12);
    expect(math.multiply(4, 0)).toBe(0);
  });

  test('divide works and division by zero yields Infinity', () => {
    const math = customMath();
    expect(math.divide(10, 2)).toBe(5);
    expect(math.divide(1, 0)).toBe(Infinity);
  });

  test('spyOn example: tracks calls to add method', () => {
    const math = customMath();
    const spy = jest.spyOn(math, 'add');

    const result = math.add(7, 8);

    expect(spy).toHaveBeenCalledWith(7, 8);
    expect(result).toBe(15);

    spy.mockRestore();
  });

  test('mocked implementation using jest.doMock (isolated)', () => {
    jest.isolateModules(() => {
      jest.doMock('../customMath', () => ({
        __esModule: true,
        default: () => ({
          add: () => 99,
          subtract: () => -99,
          multiply: () => 0,
          divide: () => 3,
        }),
      }));

      const mod = jest.requireMock('../customMath');
      const mocked = mod && mod.__esModule && mod.default ? mod.default : mod;

      const math = mocked();
      expect(math.add(1, 2)).toBe(99);
      expect(math.divide(9, 3)).toBe(3);
    });
  });

  test('mockImplementation example: override add behavior', () => {
    const math = customMath();
    const spy = jest.spyOn(math, 'add').mockImplementation((a: number, b: number) => a * b);

    expect(math.add(2, 3)).toBe(6);
    expect(spy).toHaveBeenCalledWith(2, 3);

    spy.mockRestore();
  });
});
