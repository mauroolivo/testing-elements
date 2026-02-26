import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveClassStartingWith(prefix: string): R;
      toHaveCapitalizedText(): R;
      toHaveAriaLabelForm(): R;
    }
  }
}

export {};
