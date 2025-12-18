import { SiteHeader } from '@/components/SiteHeader';
import { Suspense } from 'react';
import { ConfirmationContent } from './ConfirmationContent';

export default function ConfirmationPage() {
  return (
    <div className="relative min-h-screen text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <SiteHeader />
      
      <div className="px-4 lg:px-8 pt-32 lg:pt-40 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <Suspense fallback={<div>Laden...</div>}>
            <ConfirmationContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
