import React, { JSX, useEffect, useState } from 'react';

type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export default function UsersListFetch(): JSX.Element {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as User[];
        if (!cancelled) setUsers(data);
      } catch (err: unknown) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message || 'Failed to load users');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading users…</div>;
  if (error) return <div>Error: {error}</div>;
  if (!users || users.length === 0) return <div>No users found.</div>;

  return (
    <div>
      <ul
        aria-label="users-list-fetch"
        style={{ listStyle: 'none', padding: 0, margin: 0 }}
      >
        {users.map((u) => (
          <li
            key={u.id}
            style={{
              padding: '12px 8px',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div style={{ fontWeight: 600 }}>{u.name}</div>
              <div style={{ color: '#6b7280' }}>{u.username}</div>
            </div>
            <div style={{ marginTop: 6, color: '#374151' }}>
              {u.email} • {u.phone}
            </div>
            <div style={{ marginTop: 6, color: '#374151' }}>
              {u.address.city} — {u.company.name} — {u.website}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
