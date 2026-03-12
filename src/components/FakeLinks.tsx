export default function FakeLinks() {
  const links = Array.from({ length: 10 }, (_, i) => ({
    href: `#item-${i + 1}`,
    label: `Link ${i + 1}`,
  }));

  return (
    <>
      <article>Some article content</article>
      <address>Some address</address>
      <p>Some additional nav</p>
      <nav aria-label="Fake links">
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
