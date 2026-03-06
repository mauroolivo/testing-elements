import mcd from '../mcd';

describe('mcd', () => {
  test('computes gcd for positive integers', () => {
    expect(mcd(48, 18)).toBe(6);
    expect(mcd(54, 24)).toBe(6);
  });

  test('handles zeros', () => {
    expect(mcd(0, 5)).toBe(5);
    expect(mcd(5, 0)).toBe(5);
    expect(mcd(0, 0)).toBe(0);
  });

  test('handles negatives and non-integers by truncation', () => {
    expect(mcd(-12, 8)).toBe(4);
    // 7.9 -> 7, 3.2 -> 3
    expect(mcd(7.9, 3.2)).toBe(1);
  });

  test('spyOn example: tracks calls to mcd (wrapper)', () => {
    // ESM exports are read-only in many environments, so spying directly
    // on the imported binding can fail. Create a local wrapper object
    // referencing the function and spy on that instead.

    // The wrapper object is mutable, so you can spy on or replace
    // wrapper.mcd with jest.spyOn(wrapper, 'mcd') without trying to
    // redefine the original ESM module binding (which is read-only).
    const wrapper = { mcd };
    const spy = jest.spyOn(wrapper, 'mcd');

    const result = wrapper.mcd(8, 12);

    expect(spy).toHaveBeenCalledWith(8, 12);
    expect(result).toBe(4);

    spy.mockRestore();
  });
});
