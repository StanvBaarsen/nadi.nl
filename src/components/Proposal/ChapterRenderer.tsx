'use client';
import React from "react";
import { Section } from "@/types";
import FadeIn from "@/components/animations/FadeIn";
import { SectionRenderer } from "@/components/SectionRenderer";
import { getChapterInfo } from "@/lib/proposalUtils";
import { Link as LinkIcon } from "lucide-react";
import { Toast } from "@/components/Toast";

const ChapterRenderer: React.FC<{
	chapter: Section;
	index: number;
	isNavOpen?: boolean;
	onToggleNav?: () => void;
}> = ({ chapter, index, isNavOpen, onToggleNav }) => {
	const { id, title: displayTitle, number: displayNumber, isUnnumbered, isSubchapter } = getChapterInfo(chapter, index);
    const [showToast, setShowToast] = React.useState(false);

	const titleLower = chapter.title ? chapter.title.toLowerCase() : "";
	const isSamenvatting = titleLower.includes("samenvatting") || titleLower.includes("summary");
	const isInleiding = titleLower.includes("inleiding") || titleLower.includes("introduction");
	const isDankwoord = titleLower.includes("dankwoord") || titleLower.includes("acknowledgements");
	const isEpilogue = titleLower.includes("epiloog") || titleLower.includes("epilogue");

	// Determine if we should show the purple block
	const showPurpleBlock = (!isUnnumbered && !isSubchapter && !isSamenvatting || isInleiding || isEpilogue) && index !== 0;

	const copyLink = () => {
		const url = `${window.location.origin}${window.location.pathname}#${id}`;
		navigator.clipboard.writeText(url);
        setShowToast(true);
	};

	return (
		<div className="mb-0" id={id}>
            <Toast message="Link gekopieerd naar klembord" isVisible={showToast} onClose={() => setShowToast(false)} />
			{showPurpleBlock ? (
				<div className="bg-[#EDE9F4] w-full py-20 mb-12">
					<div className="container mx-auto px-8 md:px-8 max-w-4xl">
						<div className="flex justify-between items-start">
							<div className="flex flex-col items-start my-auto group flex-1 min-w-0">
								<div className="flex items-center w-full">
									<h2 className={`text-4xl md:text-5xl font-bold tracking-tight text-slate-900 font-space-grotesk leading-tight max-w-3xl ${isUnnumbered ? 'my-0' : ''}`}>
										{displayTitle}
									</h2>
                                    <div className="pl-4 shrink-0">
                                        <button 
                                            onClick={copyLink}
                                            className="opacity-30 group-hover:opacity-100 transition-opacity p-2 hover:bg-black/5 rounded-full text-slate-500 hover:text-slate-900 text-base cursor-pointer"
                                            aria-label="Copy link to chapter"
                                        >
                                            <LinkIcon size={20} />
                                        </button>
                                    </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="container mx-auto px-8 max-w-4xl mb-6 group">
					{index !== 0 && (
						<div className="table w-full mb-8">
							<div className="table-row">
								<div className="table-cell align-middle">
									<h2 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 font-space-grotesk leading-tight max-w-3xl">
										{displayTitle}
									</h2>
								</div>
								<div className="table-cell align-middle w-1 pl-4">
									<button 
										onClick={copyLink}
										className="opacity-30 group-hover:opacity-100 transition-opacity p-2 hover:bg-black/5 rounded-full text-slate-500 hover:text-slate-900 text-base cursor-pointer"
										aria-label="Copy link to chapter"
									>
										<LinkIcon size={20} />
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			)}

			<div className="container mx-auto px-8 max-w-4xl mb-20">
				<FadeIn>
					<div className="article-content prose prose-lg prose-slate max-w-none text-slate-600 leading-[1.75] mb-16">
						{chapter.blocks.map((block, i) => (
							<SectionRenderer key={i} block={block} />
						))}
					</div>
				</FadeIn>
			</div>
		</div>
	);
};

export default ChapterRenderer;
