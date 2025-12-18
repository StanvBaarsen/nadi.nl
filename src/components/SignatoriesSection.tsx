'use client';

import React, { useState } from 'react';
import { Signatory } from '@/types';
import { SignatoriesList } from './SignatoriesList';
import { SignatureForm } from './SignatureForm';

interface SignatoriesSectionProps {
    idPrefix?: string;
}

export const SignatoriesSection: React.FC<SignatoriesSectionProps> = ({ idPrefix = '' }) => {
	const [signatories, setSignatories] = useState<Signatory[]>([]);
	const [signatoriesCount, setSignatoriesCount] = useState<number>(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [layoutStyle, setLayoutStyle] = useState({ top: 116, height: 'calc(100vh - 148px)' });

    React.useEffect(() => {
        const fetchSignatories = async () => {
            try {
                const res = await fetch('/api/signatories');
                if (res.ok) {
                    const data = await res.json();
                    if (data.signatories) {
                        setSignatories(data.signatories);
                        setSignatoriesCount(data.count);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch signatories', error);
            }
        };

        fetchSignatories();
    }, []);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const headerHeight = 84;
            const gap = 32;
            const minTop = 32;
            
            const top = Math.max(minTop, headerHeight + gap - scrollY);
            const height = window.innerHeight - top - gap;
            
            setLayoutStyle({ top, height: `${height}px` });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial calc

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

	const handleSign = (newSignatory: Signatory) => {
		setSignatories([...signatories, newSignatory]);
	};

	return (
		<div 
                style={
                    {
                        '--sig-top': `${layoutStyle.top}px`,
                        '--sig-height': layoutStyle.height
                    } as React.CSSProperties
                }
                className="lg:fixed lg:right-8 lg:top-[var(--sig-top)] lg:h-[var(--sig-height)] lg:w-[28rem] lg:z-40 lg:flex lg:flex-col lg:justify-center pointer-events-none"
            >
                <div
                    className={`mx-0 md:mx-8 lg:mx-0 py-2 md:p-4 lg:p-0 lg:py-0 bg-white border border-gray-200 shadow-xl rounded-2xl flex flex-col
                        pointer-events-auto transition-all duration-1000 ease-out transform
                        ${isVisible ? 'lg:translate-y-0 lg:opacity-100' : 'lg:translate-y-12 lg:opacity-0'}
                        lg:max-h-[calc(100vh-7rem)] lg:max-h-full`}
                >
                    <div className="p-5 lg:p-6 !pb-0 flex-none">
                        <h2 className="text-4xl lg:text-2xl font-bold tracking-tight text-slate-900 mb-2 font-space-grotesk">Onderteken de petitie</h2>
                        {!isFormSubmitted && <p className="text-slate-600"><i>{signatoriesCount} anderen gingen je voor.</i></p>}
                    </div>
                    <div className="p-5 lg:p-6 !pt-6 !pb-0 flex-1 lg:overflow-y-auto lg:scrollbar-hide">
                        <SignatureForm onSign={handleSign} onSubmitted={() => setIsFormSubmitted(true)} idPrefix={idPrefix} />
                        {!isFormSubmitted && (
                            <div className="mt-4 pt-2">
                                <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3 mt-0">Recente ondertekenaars</h3>
                                <SignatoriesList signatories={signatories} />
                            </div>
                        )}
                    </div>
                </div>
		</div>
	);
};
