import Person from './Person';

export const ReachOut = () => {
	return (
		<>
			<div className="mt-12">
				<h3 className="text-xl font-bold text-gray-900 mb-2">Praat mee</h3>
				<p className="text-gray-700">
					Heb je ideeën, feedback of wil je bijdragen? Neem contact op.
				</p>
			</div>
			<div className="bg-white/90 mt-4 rounded-xl shadow-sm border border-gray-200/50 py-8 px-4 xl:px-8">
				<div className="space-y-8">
					<Person
						name="Jelle Prins"
						imageSrc="/jelle.webp"
						imageAlt="Portretfoto Jelle Prins"
						description='Medeoprichter van AI-bedrijf Cradle en was verantwoordelijk voor de eerste apps van Uber, Booking.com en Catawiki. Schreef in 2025 het <a href="https://www.aiplan.nl/deltaplan" target="_blank" rel="noopener noreferrer">Nationaal AI Deltaplan</a>.'
						links={[
							{ type: 'linkedin', href: 'https://linkedin.com/in/jelleprins' },
							{ type: 'email', href: 'mailto:jelle@nadi.nl' },
						]}
					/>
				</div>
			</div>
		</>
	);
};
