'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Signatory } from '@/types';
import Link from 'next/link';
import { Check, Mail, ArrowRight, AlertCircle } from 'lucide-react';

interface SignatureFormProps {
  onSign: (signatory: Signatory) => void;
  onSubmitted?: () => void;
  idPrefix?: string;
}

export const SignatureForm: React.FC<SignatureFormProps> = ({ onSign, onSubmitted, idPrefix = '' }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [email, setEmail] = useState('');
  const [keepUpdated, setKeepUpdated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isResend, setIsResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | HTMLDivElement>(null);

  useEffect(() => {
    if (isSubmitted && formRef.current) {
      if (window.innerWidth < 1024) {
        const mobileContainer = document.getElementById('petitie');
        const element = mobileContainer || formRef.current;
        const yOffset = -60; 
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    console.log('Form submitting...', { name, role, affiliation, email });
    
    if (name && role && affiliation && email) {
      setIsSubmitting(true);

      try {
        const response = await fetch('/api/signatories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            role,
            affiliation,
            email,
            keepUpdated,
          }),
        });
        
        const data = await response.json();

        if (!response.ok) {
          if (data.error === 'ALREADY_SIGNED') {
            setErrorMessage(data.message);
            return;
          }
          throw new Error(data.error || 'Submission failed');
        }

        console.log('Form submission response:', response.status);

        // onSign({ name, role, affiliation }); // Don't add to list immediately as verification is required
        setSubmittedEmail(email);
        setIsResend(data.isResend);
        setIsSubmitted(true);
        if (onSubmitted) {
          onSubmitted();
        }
        setName('');
        setRole('');
        setAffiliation('');
        setEmail('');
        setKeepUpdated(false);
      } catch (error) {
        console.error('Form submission error:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Er is iets misgegaan. Probeer het later opnieuw.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  if (isSubmitted) {
    return (
      <div ref={formRef as React.RefObject<HTMLDivElement>} className="mt-0 p-6 bg-gray-50 rounded-xl border border-gray-100 mb-8">
        {/* Progress Steps */}
        <div className="flex items-center gap-3 mb-8 text-sm font-medium">
            <div className="flex items-center gap-2 text-green-600">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={14} />
                </div>
                <span>Ondertekend</span>
            </div>
            <div className="h-px w-8 bg-gray-300" />
            <div className="flex items-center gap-2 text-gray-400">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                    <Mail size={14} />
                </div>
                <span>E-mail bevestigd</span>
            </div>
        </div>

        <h3 className="font-bold text-xl mb-4">Nog één stap te gaan</h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {isResend 
            ? <span>We hebben opnieuw een e-mail gestuurd naar <strong className="text-gray-900">{submittedEmail}</strong>.</span>
            : <span>We hebben een e-mail gestuurd naar <strong className="text-gray-900">{submittedEmail}</strong>.</span>
          } 
          {' '}Klik op de bevestigingslink in deze e-mail om je ondertekening definitief te maken.
        </p>

        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6 flex gap-3 items-start">
            <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-yellow-800 font-medium">
                Geen e-mail? Check je spam-map.
            </p>
        </div>

        <Link 
          href="/voorstel"
          className="inline-flex items-center text-sm font-mono uppercase tracking-widest text-gray-900 hover:text-black transition-colors group"
        >
          Meer lezen over NADI
          <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <form 
      ref={formRef as React.RefObject<HTMLFormElement>}
      onSubmit={handleSubmit} 
      className="space-y-6 md:space-y-4 px-2 md:px-0"
    >
      <div className="space-y-5 md:space-y-3">
        <div className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <label htmlFor={`${idPrefix}name`} className="w-24 shrink-0 text-[10px] font-mono uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Naam</label>
          <input
            type="text"
            id={`${idPrefix}name`}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block w-full border-b border-gray-300 bg-transparent py-3 md:py-1 text-base md:text-sm text-black focus:border-black focus:outline-none transition-colors placeholder:text-gray-300"
            placeholder="Voor- en achternaam"
          />
        </div>

        <div className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <label htmlFor={`${idPrefix}role`} className="w-24 shrink-0 text-[10px] font-mono uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Functie</label>
          <input
            type="text"
            id={`${idPrefix}role`}
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="block w-full border-b border-gray-300 bg-transparent py-3 md:py-1 text-base md:text-sm text-black focus:border-black focus:outline-none transition-colors placeholder:text-gray-300"
            placeholder="Functietitel"
          />
        </div>

        <div className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <label htmlFor={`${idPrefix}affiliation`} className="w-24 shrink-0 text-[10px] font-mono uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Organisatie</label>
          <input
            type="text"
            id={`${idPrefix}affiliation`}
            name="affiliation"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            required
            className="block w-full border-b border-gray-300 bg-transparent py-3 md:py-1 text-base md:text-sm text-black focus:border-black focus:outline-none transition-colors placeholder:text-gray-300"
            placeholder="Organisatie/affiliatie"
          />
        </div>

        <div className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <label htmlFor={`${idPrefix}email`} className="w-24 shrink-0 text-[10px] font-mono uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Email</label>
          <input
            type="email"
            id={`${idPrefix}email`}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full border-b border-gray-300 bg-transparent py-3 md:py-1 text-base md:text-sm text-black focus:border-black focus:outline-none transition-colors placeholder:text-gray-300"
            placeholder="Emailadres"
          />
        </div>

        <div className="flex items-start gap-4 md:gap-3 pt-2 md:pt-1">
          <div className="flex items-center h-5">
            <input
              id={`${idPrefix}keepUpdated`}
              name="keepUpdated"
              type="checkbox"
              checked={keepUpdated}
              onChange={(e) => setKeepUpdated(e.target.checked)}
              className="h-5 w-5 md:h-4 md:w-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer transition-all duration-200 ease-in-out hover:border-black hover:shadow-sm"
            />
          </div>
          <div className="text-sm">
            <label htmlFor={`${idPrefix}keepUpdated`} className="font-medium text-gray-700 text-sm md:text-xs cursor-pointer select-none">
              Hou me op de hoogte van ontwikkelingen rondom NADI
            </label>
          </div>
        </div>
      </div>

      <div className="pt-2 md:pt-1 flex flex-col justify-start gap-3 md:gap-2">
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black px-8 md:px-6 py-3 md:py-2 text-xs md:text-[10px] font-mono uppercase tracking-widest text-white transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer rounded-md w-full md:w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Laden...' : 'Ondertekenen'}
        </button>
        <p className="text-xs md:text-[10px] text-gray-400 leading-tight">
          Door te ondertekenen ga je ermee akkoord dat je naam op deze website kan worden getoond.
        </p>
      </div>
    </form>
  );
};
