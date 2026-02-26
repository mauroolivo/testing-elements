'use client';
import LoginForm from '@/components/LoginForm';
import FakeLinks from '@/components/FakeLinks';
import StatusBadge from '@/components/StatusBadge';

export default function Home() {
  function handleLogin(data: { username: string; password: string }) {
    // placeholder handler for the demo page
    // in real app, call your auth API here
    console.log('login', data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="w-full">
          <StatusBadge status="success" label="Demo page" />
          <h2 className="mb-6 text-2xl font-semibold">Sign in</h2>
          <LoginForm onSubmit={handleLogin} />
          <div className="mt-8">
            <h3 className="mb-3 text-lg font-medium">Quick links</h3>
            <FakeLinks />
          </div>
        </div>
      </main>
    </div>
  );
}
