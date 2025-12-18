import Person from './Person';

export const ReachOut = () => {
	return (
		<>
			<div className="mt-12">
				<h3 className="text-xl font-bold text-gray-900 mb-2">Praat mee</h3>
				<p className="text-gray-700">
					Heb je ideeën, feedback of wil je bijdragen? Neem dan graag contact met ons op.
				</p>
			</div>
			<div className="bg-white/90 mt-4 rounded-xl shadow-sm border border-gray-200/50 py-8 px-4 xl:px-8">
				<div className="space-y-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-4 lg:gap-x-10 xl:gap-x-18">
						<Person
							name="Jelle Prins"
							imageSrc="/jelle.webp"
							imageAlt="Portretfoto Jelle Prins"
							description="Medeoprichter van AI-bedrijf Cradle."
							links={[
								{ type: 'linkedin', href: 'https://linkedin.com/in/jelleprins' },
								{ type: 'x', href: 'https://x.com/jelleprins' },
								{ type: 'email', href: 'mailto:jelleprins@gmail.com' },
							]}
						/>
						<Person
							name="Onno Eric Blom"
							imageSrc="/onno.webp"
							imageAlt="Portretfoto Onno Eric Blom"
							description="Oprichter en Directeur Herprogrammeer de Overheid."
							links={[
								{ type: 'linkedin', href: 'https://www.linkedin.com/in/onnoericblom/' },
								{ type: 'website', href: 'https://herprogrammeerdeoverheid.nl' },
								{ type: 'email', href: 'mailto:onno@herprogrammeerdeoverheid.nl' },
							]}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
