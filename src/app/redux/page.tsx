import CounterBox from '@/components/CounterBox';
import PostComments from '@/components/PostComments';

export default function ReduxPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 dark:bg-zinc-900">
      <CounterBox />
      <PostComments postId={3} />
    </main>
  );
}
