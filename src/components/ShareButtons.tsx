'use client';

import React, { useEffect, useState } from 'react';
import { Linkedin, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
    title?: string;
}

const XIcon = ({ size = 24, className }: { size?: number | string; className?: string }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title = "Deel dit voorstel" }) => {
	const [url, setUrl] = useState('');

	useEffect(() => {
		setUrl(window.location.href);
	}, []);

	if (!url) return null;

	const text = "Bekijk en onderteken dit voorstel voor NADI, een Nederlandse ARPA-organisatie:";

	const shareLinks = [
		{
			name: 'WhatsApp',
			icon: MessageCircle,
			href: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
			color: 'bg-[#25D366] hover:bg-[#075E54]', // WhatsApp green and dark green on hover
		},
		{
			name: 'LinkedIn',
			icon: Linkedin,
			href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
			color: 'bg-[#0077b5] hover:bg-[#004182]',
		},
		{
			name: 'X',
			icon: XIcon,
			href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
			color: 'bg-black hover:bg-gray-800',
		},
	];

	return (
		<div className="mt-16 pt-8 border-t border-gray-200">
			<h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
			<div className="flex flex-wrap gap-3">
				{shareLinks.map((link) => (
					<a
						key={link.name}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-colors ${link.color}`}
					>
						<link.icon size={16} />
						{link.name}
					</a>
				))}
			</div>
		</div>
	);
};
