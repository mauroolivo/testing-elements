export default function FakeLinks() {
  const links = Array.from({ length: 10 }, (_, i) => ({
    href: `#item-${i + 1}`,
    label: `Link ${i + 1}`,
  }));

  return (
    <>
      <article>Some article content</article>
      <address role="address">Some address</address>
      <nav>Some additional nav</nav>
      <nav aria-label="fake-links">
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
