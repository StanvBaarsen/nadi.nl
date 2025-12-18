'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { XCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatedCheckmark } from '@/components/AnimatedCheckmark';

export function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      router.replace('/');
      return;
    }

    const verifyToken = async () => {
      // Add a small artificial delay to show the loading state and make the transition feel more deliberate
      await new Promise(resolve => setTimeout(resolve, 800));

      try {
        const response = await fetch(`/api/verify?token=${token}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setStatus('success');
        } else {
          setStatus('error');
          let msg = 'Er is iets misgegaan bij het verifiëren van uw handtekening.';
          if (data.error === 'expired_token') msg = 'De verificatielink is verlopen.';
          if (data.error === 'invalid_token') msg = 'Ongeldige verificatielink.';
          if (data.error === 'verification_failed') msg = 'Verificatie mislukt. Probeer het later opnieuw.';
          setErrorMessage(msg);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setErrorMessage('Er is een serverfout opgetreden.');
      }
    };

    verifyToken();
  }, [token, router]);

  if (status === 'loading') {
    return (
      <div className="text-center py-12 flex flex-col items-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse"></div>
          <Loader2 className="w-16 h-16 text-black animate-spin relative z-10" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold mb-4 font-space-grotesk animate-pulse">Verifiëren...</h1>
        <p className="text-lg text-gray-500">
          Een moment geduld, we controleren uw handtekening.
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="flex justify-center mb-8">
          <AnimatedCheckmark />
        </div>
        <h1 className="text-3xl font-bold mb-4 font-space-grotesk">Handtekening geverifieerd</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
          Bedankt voor uw steun. Uw handtekening is succesvol geverifieerd en toegevoegd aan de lijst.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-block bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all active:scale-95"
          >
            Terug naar home
          </Link>
          <Link 
            href="/voorstel"
            className="inline-block border border-black text-black px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all active:scale-95"
          >
            Meer weten over NADI
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-center mb-6">
        <XCircle className="w-16 h-16 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4 font-space-grotesk">Verificatie mislukt</h1>
      <p className="text-lg text-gray-600 mb-8">
        {errorMessage}
      </p>
      <div className="flex justify-center">
        <Link 
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Terug naar home
        </Link>
      </div>
    </div>
  );
}
