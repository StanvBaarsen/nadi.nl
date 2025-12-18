import type React from 'react';
import { Mail } from 'lucide-react';

type SocialType = 'linkedin' | 'x' | 'website' | 'email';

type SocialLink = {
	href: string;
	type: SocialType;
};

type PersonProps = {
	name: string;
	imageSrc: string;
	imageAlt: string;
	description: string;
	links?: SocialLink[];
	imageClassName?: string;
	imageStyle?: React.CSSProperties;
};

const SocialIcon = ({ type }: { type: SocialType }) => {
	if (type === 'linkedin') {
		return (
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				<circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		);
	}

	if (type === 'x') {
		return (
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		);
	}

	if (type === 'email') {
		return <Mail size={16} strokeWidth={2} />;
	}

	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
			<path d="M2 12h20" stroke="currentColor" strokeWidth="2" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" />
		</svg>
	);
};

const Person = ({
	name,
	imageSrc,
	imageAlt,
	description,
	links = [],
	imageClassName = '',
	imageStyle,
}: PersonProps) => {
	return (
		<div className="flex items-start gap-3 md:gap-4 xl:gap-6">
			<div className="w-16 h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden flex-shrink-0">
				<img
					src={imageSrc}
					alt={imageAlt}
					className={`w-16 h-16 xl:w-20 xl:h-20 rounded-full object-cover flex-shrink-0 ${imageClassName}`}
					style={imageStyle}
				/>
			</div>
			<div className="flex-1">
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 xl:mb-3">
					<span className="font-bold text-gray-900 text-lg xl:text-xl">{name}</span>
					<div className="flex items-center gap-2">
						{links.map((link) => (
							<a
								key={`${name}-${link.href}`}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`transition-colors ${link.type === 'linkedin' ? 'text-blue-600 hover:text-blue-800' : 'text-gray-600 hover:text-gray-800'}`}
							>
								<SocialIcon type={link.type} />
							</a>
						))}
					</div>
				</div>
				<p className="text-gray-700 font-inter leading-relaxed text-sm xl:text-base">
					{description}
				</p>
			</div>
		</div>
	);
};

export type { PersonProps, SocialLink };
export default Person;
