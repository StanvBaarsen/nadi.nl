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
	const chapterInfos = proposal.sections.map((section, index) => getChapterInfo(section, index));

	const heroChapter = {
		id: 'intro',
		title: 'Hoe werkt NADI?',
		number: '',
		isUnnumbered: true,
		isSubchapter: false
	};

	const mobileChapters = [heroChapter, ...chapterInfos];

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
						<ChapterRenderer
							key={index}
							chapter={section}
							index={index}
						/>
					))}
					<div className="container mx-auto px-8 md:px-8 max-w-4xl mb-20">
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
