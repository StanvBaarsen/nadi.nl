'use client';
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import PixelatedImageReveal from '@/components/animations/PixelatedImageReveal';

export const HomeHero: React.FC = () => {
  return (
    <div className="relative pt-0 mb-12 print-hero">
      <div className="absolute top-[-1000px] bottom-0 left-[-100vw] w-[300vw] bg-[#EDE9F4] -z-10" />
      <div className="px-8 max-w-4xl mx-auto text-center flex flex-col items-center pt-10 lg:pt-0">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 font-space-grotesk leading-[1.1]">
          <span className="text-slate-900 inline-block"><FadeIn delay={400} className="inline">Nederland</FadeIn></span>{' '}
          <span className="text-slate-900 inline-block"><FadeIn delay={500} className="inline">heeft</FadeIn></span>{' '}
          <span className="text-slate-900 inline-block"><FadeIn delay={600} className="inline">een</FadeIn></span>{' '}
          <span className="text-slate-900 inline-block"><FadeIn delay={700} className="inline">Nationaal</FadeIn></span>{' '}
          <span className="text-slate-900 inline-block"><FadeIn delay={800} className="inline">Agentschap</FadeIn></span>{' '}
          <span className="text-slate-900 inline-block"><FadeIn delay={900} className="inline">voor</FadeIn></span>{' '}
          <span className="text-slate-900 inline-block"><FadeIn delay={1000} className="inline">Disruptieve</FadeIn></span>{' '}
          <span className="text-slate-900 inline-block"><FadeIn delay={1100} className="inline">Innovatie</FadeIn></span>{' '}
          <span className="text-slate-900 inline-block"><FadeIn delay={1200} className="inline">nodig</FadeIn></span>
        </h1>

        <FadeIn delay={1300}>
          <p className="text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto leading-snug font-light">
            Een onafhankelijke organisatie die stuurt op baanbrekende technologische doorbraken, gebaseerd op het ARPA-model.
          </p>
        </FadeIn>

        <div className="relative w-full max-w-md mx-auto mb-0 flex flex-col items-center mt-4">
          <PixelatedImageReveal
            src="/brein.svg"
            alt="NADI Brein"
            className="w-full h-auto mb-0 aspect-[612/713]"
            delay={800}
            gridSize={32}
          />
        </div>
      </div>
    </div>
  );
};
