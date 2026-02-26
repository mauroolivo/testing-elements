function erry() {
    throw new Error('This is an error');
}
describe('Unrelated', () => {
  it('some raw testing', () => {
    expect([1, 2, 3]).toContain(2);
    expect([1, 2, 3]).not.toContain(4);

    expect(false).toBeFalsy();
    const me = { name: 'Mauro' };
    expect(me).toHaveProperty('name', 'Mauro');
    expect(me).toMatchObject({ name: 'Mauro' });
    expect(() => erry()).toThrow('This is an error');
  });
});
