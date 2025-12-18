import React from 'react';
import { SiteHeader } from './SiteHeader';

interface PageLayoutProps {
	children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen text-black font-sans selection:bg-black selection:text-white">
			<SiteHeader />
			<div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 pb-20">
				<main className="mt-16 sm:mt-24">
					{children}
				</main>
			</div>
		</div>
	);
};
