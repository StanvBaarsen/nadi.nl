import { getLetterContent } from '@/lib/content';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { LetterHeader } from '@/components/LetterHeader';
import { SectionRenderer } from '@/components/SectionRenderer';
import { SignatoriesSection } from '@/components/SignatoriesSection';
import { ShareButtons } from '@/components/ShareButtons';
import { ReachOut } from '@/components/ReachOut';
import { HomeHero } from '@/components/HomeHero';

export default async function Home() {
  const letter = await getLetterContent();

  return (
    <div className="relative min-h-screen text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <SiteHeader />
      
      <div className="px-4 lg:px-8 flex flex-col lg:flex-row gap-12">
        {/* Main Content - Takes up remaining space */}
        <div className="flex-1 pt-24 lg:pt-32 min-w-0">
          <HomeHero />
          
          <div className="bg-white rounded-3xl p-0 md:p-0 xl:p-12 mb-20 max-w-4xl mx-auto">
            <main>
              <div className="article-content prose prose-lg prose-slate max-w-none">
                {letter.sections.map((section) => (
                  <div key={section.id}>
                    {section.blocks.map((block, index) => (
                      <SectionRenderer key={index} block={block} />
                    ))}
                  </div>
                ))}
              </div>

              <div id="petitie" className="lg:hidden mb-12">
                <SignatoriesSection idPrefix="mobile-" />
              </div>

              <div className="mt-16 mb-12 text-center">
                <Link 
                  href="/voorstel" 
                  className="inline-flex items-center text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors underline underline-offset-4 decoration-2"
                >
                  Meer info over de werking van NADI
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>

              <ShareButtons title="Deel deze petitie" />

              <ReachOut />
              
              <footer className="mt-20 pt-12 border-t border-gray-100 text-center">
                <a 
                  href="https://paulgraham.com/hamming.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-inherit no-underline hover:text-inherit cursor-default"
                >
                  <blockquote className="font-serif text-xl text-gray-600 italic leading-relaxed">
                    &quot;What is the most important problem in your field and why are you not working on it?&quot;
                  </blockquote>
                  <cite className="block mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest not-italic">
                    — Richard Hamming
                  </cite>
                </a>
              </footer>
            </main>
          </div>
        </div>

        {/* Petition Sidebar - Fixed width to match the fixed element */}
        <aside className="hidden lg:block w-full lg:w-[28rem] lg:shrink-0 pt-8 lg:pt-0">
          <SignatoriesSection />
        </aside>
      </div>
    </div>
  );
}
