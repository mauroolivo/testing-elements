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
});
