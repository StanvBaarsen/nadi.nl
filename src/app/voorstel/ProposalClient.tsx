'use client';
import React from "react";
import { ProposalContent } from "@/types";
import { SiteHeader } from "@/components/SiteHeader";
import FadeIn from "@/components/animations/FadeIn";
import ChapterRenderer from "@/components/Proposal/ChapterRenderer";
import TableOfContents from "@/components/Proposal/TableOfContents";
import MobileNavigation from "@/components/Proposal/MobileNavigation";
import { getChapterInfo } from "@/lib/proposalUtils";
import { ShareButtons } from "@/components/ShareButtons";
import { ReachOut } from "@/components/ReachOut";
import { ScrollToTop } from "@/components/ScrollToTop";

interface ProposalClientProps {
  proposal: ProposalContent;
}

const ProposalClient: React.FC<ProposalClientProps> = ({ proposal }) => {
		// Navigate to / and scroll to petition section on mobile
		const handleScrollToPetition = (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			if (typeof window !== 'undefined') {
				const isMobile = window.innerWidth < 1024;
				if (isMobile) {
					window.location.href = '/#petitie';
				} else {
					window.location.href = '/';
				}
			}
		};
	const [headerVisible, setHeaderVisible] = React.useState(false);

	const chapterInfos = proposal.sections.map((section, index) => getChapterInfo(section, index));
    
    const heroChapter = {
        id: 'intro',
        title: 'Hoe werkt NADI?',
        number: '',
        isUnnumbered: true,
        isSubchapter: false
    };

		const mobileChapters = [heroChapter, ...chapterInfos];

		// Find the index of the first chapter that will show a purple block
		const firstPurpleBlockIndex = proposal.sections.findIndex((section, index) => {
			const { isUnnumbered, isSubchapter } = getChapterInfo(section, index);
			const titleLower = section.title ? section.title.toLowerCase() : "";
			const isSamenvatting = titleLower.includes("samenvatting") || titleLower.includes("summary");
			const isInleiding = titleLower.includes("inleiding") || titleLower.includes("introduction");
			const isEpilogue = titleLower.includes("epiloog") || titleLower.includes("epilogue");
			// Logic from ChapterRenderer
			return (!isUnnumbered && !isSubchapter && !isSamenvatting || isInleiding || isEpilogue) && index !== 0;
		});

	return (
		<div className="relative min-h-screen bg-white font-inter selection:bg-blue-100 selection:text-blue-900">
			<div className="absolute top-0 left-0 right-0 z-50 no-print">
				<SiteHeader />
			</div>

						{/* Hero Section */}
						<div id="intro" className="relative min-h-[60vh] flex flex-col justify-center pt-40 pb-20 overflow-hidden bg-[#EDE9F4] print-hero">
							<div className="container mx-auto px-8 max-w-4xl text-center"></div>
				<div className="container mx-auto px-8 max-w-4xl text-center">
					<h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 font-space-grotesk leading-[1.1] text-slate-900">
						<FadeIn delay={200}>Hoe werkt NADI?</FadeIn>
					</h1>
				</div>
			</div>

			{/* Content */}
			<div className="flex relative w-full">
				{/* Sidebar Wrapper - Desktop */}
				<div className="hidden lg:block sticky top-0 h-[calc(100vh)] z-40 w-80 shrink-0 no-print">
					<TableOfContents chapters={chapterInfos} isOpen={true} setIsOpen={() => {}} />
				</div>

                <MobileNavigation chapters={mobileChapters} />

				{/* Main Content */}
				<main className="flex-1 min-w-0 pb-0 pt-8">
					{proposal.sections.map((section, index) => (
						<React.Fragment key={index}>
							{/* Insert button before the first purple block */}
							{index === firstPurpleBlockIndex && (
								<div className="container mx-auto px-8 max-w-4xl text-center mb-8">
									<button
										onClick={handleScrollToPetition}
										className="inline-flex items-center text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors underline underline-offset-4 decoration-2 mb-10 cursor-pointer block lg:hidden mx-auto"
									>
										Naar de petitie
										<svg xmlns="http://www.w3.org/2000/svg" className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<line x1="5" y1="12" x2="19" y2="12"></line>
											<polyline points="12 5 19 12 12 19"></polyline>
										</svg>
									</button>
								</div>
							)}
							<ChapterRenderer
								chapter={section}
								index={index}
							/>
						</React.Fragment>
					))}
					{/* Button at the bottom of the page */}
					<div className="container mx-auto px-8 max-w-4xl text-center mb-8">
						<button
							onClick={handleScrollToPetition}
							className="inline-flex items-center text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors underline underline-offset-4 decoration-2 mb-10 cursor-pointer block lg:hidden mx-auto"
						>
							Naar de petitie
							<svg xmlns="http://www.w3.org/2000/svg" className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<line x1="5" y1="12" x2="19" y2="12"></line>
								<polyline points="12 5 19 12 12 19"></polyline>
							</svg>
						</button>
					</div>
					<div id="petition-section" className="container mx-auto px-8 md:px-8 max-w-4xl mb-20">
						<ShareButtons title="Deel deze pagina" />
						<ReachOut />
					</div>
					<ScrollToTop />
				</main>

			</div>
		</div>
	);
};

export default ProposalClient;
