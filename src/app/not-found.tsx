import Link from 'next/link';
import { PageLayout } from '@/components/PageLayout';

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-9xl font-bold tracking-tighter text-black mb-8">
          404
        </h2>
        <p className="text-3xl text-gray-600 mb-12 font-light">
          Deze pagina was te disruptief.
        </p>
        <Link 
          href="/"
          className="inline-block bg-black px-10 py-4 text-sm font-mono uppercase tracking-widest text-white transition-all hover:bg-gray-800"
        >
          Terug naar de homepage
        </Link>
      </div>
    </PageLayout>
  );
}
