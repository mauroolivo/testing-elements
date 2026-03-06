export function mcd(a: number, b: number): number {
  // Normalize to non-negative integers
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));

  // By convention, gcd(0,0) = 0
  if (a === 0 && b === 0) return 0;

  // Euclidean algorithm
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }

  return a;
}

export default mcd;
