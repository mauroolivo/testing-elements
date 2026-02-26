// Custom Jest matchers (runtime implementations)
expect.extend({
  toHaveClassStartingWith(received: Element, prefix: string) {
    const classList = Array.from(received.classList || []);
    const pass = classList.some((c) => c.startsWith(prefix));
    return {
      pass,
      message: () =>
        pass
          ? `expected element not to have a class starting with ${prefix}`
          : `expected element to have a class starting with ${prefix}`,
    } as jest.CustomMatcherResult;
  },

  toHaveCapitalizedText(received: Element) {
    const text = (received.textContent || '').trim();
    const pass = text.length > 0 && /[A-ZÀ-Ÿ]/.test(text[0]);
    return {
      pass,
      message: () =>
        pass
          ? 'expected element text not to start with a capitalized letter'
          : 'expected element text to start with a capitalized letter',
    } as jest.CustomMatcherResult;
  },

  toHaveAriaLabelForm(received: Element) {
    const val = received.getAttribute && received.getAttribute('aria-label');
    const pass = val === 'form';
    return {
      pass,
      message: () =>
        pass
          ? `expected element not to have aria-label="form"`
          : `expected element to have aria-label="form", got ${String(val)}`,
    } as jest.CustomMatcherResult;
  },
});

export {};
