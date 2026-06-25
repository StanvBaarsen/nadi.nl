import type { Metadata } from 'next';
import { PageLayout } from '@/components/PageLayout';

export const metadata: Metadata = {
	title: 'Open brief - NADI',
	description:
		'Belofte van investeerders, onderzoekers, kennisinstellingen en bedrijven voor NADI. Een open brief aan de Tweede Kamer.',
};

interface LetterSection {
	number: string;
	title: string;
	paragraphs: string[];
}

const intro: string[] = [
	"Met grote belangstelling hebben wij kennisgenomen van de Kamerbrief 'Bevindingen verkenning naar een Nationaal Agentschap voor Disruptieve Innovatie (NADI)' van 9 februari 2026. Wij onderschrijven de conclusie dat NADI van grote toegevoegde waarde kan zijn voor het Nederlandse innovatievermogen.",
	'Wij schrijven deze brief als investeerders, onderzoekers, kennisinstellingen en innovatieve bedrijven, van startups tot gevestigde technologiebedrijven. Als partijen die dagelijks werken aan de ontwikkeling, toepassing en financiering van baanbrekende technologie. Als partijen die niet alleen geven om het verdienvermogen van Nederland, maar ook om onze strategische onafhankelijkheid en de grote maatschappelijke transities. Ieder van ons ziet vanuit de eigen praktijk hetzelfde structurele probleem: Nederland produceert excellent wetenschappelijk onderzoek, maar er ontbreekt een schakel om dat door te ontwikkelen tot oplossingen voor grote maatschappelijke problemen en tot nieuwe industrieën. Kennis die hier blijft liggen vindt vaak alsnog een toepassing in het buitenland, waar vervolgens dan ook de vruchten worden geplukt.',
];

const sectionsBeforeQuote: LetterSection[] = [
	{
		number: '01',
		title: 'Een gat in de financiering',
		paragraphs: [
			'Aan de ene kant van het ecosysteem staat de publieke financiering van onderzoek. Mede dankzij deze financiering behoren onze universiteiten en kennisinstellingen tot de wereldtop, en produceren we per hoofd van de bevolking meer invloedrijke publicaties dan vrijwel elk ander land.',
			'Aan de andere kant staat het durfkapitaal. Venture Capital, Invest-NL en de regionale ontwikkelingsmaatschappijen nemen technologisch risico en investeren ook in vroege fases. Echter, bij veel onderzoek is het technologisch risico nog te groot, en het pad naar succes nog te ver weg voor durfkapitaal.',
			"Tussen onderzoeksfinanciering en investeerders valt voor potentieel baanbrekende innovaties een gat. De 'Valley of Death'. Bestaande onderzoeksfinanciering richt zich niet op dergelijk meerjarig, hoog-risico onderzoek, en voor investeerders is het in dit stadium nog te onzeker. Daardoor blijft dit onderzoek zonder natuurlijke financier.",
			"Het State of Dutch Tech-rapport van Techleap laat zien wat dat doet: deeptech-bedrijven die wél door de 'Valley of Death' komen, groeien goed door, maar dit zijn er te weinig. Het overbruggen van dit gat is precies waar NADI voor bedoeld is.",
		],
	},
	{
		number: '02',
		title: 'Een andere aanpak',
		paragraphs: [
			'Voor dit type onderzoek is internationaal een bewezen oplossing gevonden. DARPA (VS, sinds 1958), ARIA (VK, 2022) en SPRIND (Duitsland, 2019) laten zien dat het werkt: een zelfstandige organisatie die risico durft te nemen, en die snel kan beslissen doordat programmaleiders een breed mandaat krijgen over de inzet van middelen.',
			'DARPA stond zo aan de basis van het internet, GPS, autonome voertuigen en mRNA-technologie. NADI is op ditzelfde model gebaseerd, en het Wennink-rapport van december 2025 beveelt voor Nederland een organisatie volgens dit model aan.',
		],
	},
	{
		number: '03',
		title: 'Hoe NADI werkt',
		paragraphs: [
			"NADI definieert per programma een groot maatschappelijk of economisch probleem, 'een programma', zonder de oplossing voor te schrijven. Neem als voorbeeld: hoe verdedigen we onze onderzeekabels tegen sabotage? Onderzoekers, startups, kennisinstellingen en gevestigde bedrijven worden uitgedaagd om met oplossingsroutes te komen. Autonome onderzeeërs die patrouilleren. Sensoren die direct op de kabels sabotage detecteren. Satellietmonitoring. Meerdere routes worden parallel gefinancierd, want niemand weet vooraf welke werkt. Teams die hun mijlpalen halen krijgen meer middelen, routes die vastlopen worden gestopt. Zo zoeken we oplossingen voor uitdagingen in industrieën en gebieden die variëren van bijvoorbeeld de landbouw, het klimaat, nationale veiligheid en zorg, en jagen we ontwikkelingen aan in de chipindustrie, farmacie en robotica.",
			'Eén Program Director per programma heeft drie tot vijf jaar en een budget van €10 tot €100 miljoen, met autonomie over de inzet. Al het inhoudelijke werk vindt plaats buiten NADI, bij universiteiten, onderzoeksinstellingen als TNO, startups en bedrijven. Bij NADI zelf werken alleen de Program Directors en een kleine staf.',
		],
	},
	{
		number: '04',
		title: 'Een natuurlijke keten',
		paragraphs: [
			"Toen DARPA in 2004 een programma uitschreef voor zelfrijdende auto's, bestond er geen vraag naar zelfrijdende auto's. Maar iedereen met verbeeldingsvermogen kon inzien dat als de technologie zou werken, er een markt van honderden miljarden zou ontstaan. En als de overheid, bijvoorbeeld Defensie, zich committeert als eerste afnemer van een prototype, verdwijnt het marktrisico vrijwel volledig.",
			'Dit raakt aan wat een ARPA-organisatie onderscheidt van een investeerder. Ilan Gur, oprichtend directeur van het Britse ARIA, omschrijft het zo: durfkapitaal zoekt naar golven die al zijn ontstaan en surft daarop mee, terwijl een agentschap als NADI er juist is om de energie toe te voegen waar de zee nog vlak is, en zo de golf te maken.',
			"Zo ontstaat een natuurlijke keten. Teams die de NADI-fase doorkomen worden interessant voor durfkapitalisten, Invest-NL, regionale ontwikkelingsmaatschappijen en andere investeerders. Elke euro die NADI besteedt aan het wegnemen van technologisch risico kan vele euro's aan privaat vervolgkapitaal mobiliseren. In het geval van de zelfrijdende auto's investeerde DARPA €14 miljoen, en volgde de private markt met tientallen miljarden dollars.",
		],
	},
];

const sectionsAfterQuote: LetterSection[] = [
	{
		number: '05',
		title: 'Onze belofte',
		paragraphs: [
			'Daarom spreken wij als ondertekenaars het volgende uit.',
			'De investeerders onder ons beloven om, indien NADI wordt opgericht conform de kernwaarden uit het ontwerpvoorstel, met voldoende autonomie, hoge risicotolerantie, uitzonderlijk talent en voldoende structurele schaal, de veelbelovende innovaties die voortkomen uit NADI-programma’s actief door te financieren.',
			'De onderzoekers, kennisinstellingen en bedrijven onder ons beloven om actief deel te nemen aan NADI-programma’s: om oplossingsroutes voor te stellen, teams te vormen rond de uitdagingen die NADI formuleert, en veelbelovende technologie door te ontwikkelen tot werkende toepassingen en nieuwe bedrijvigheid. Wij zien in NADI de kans om onderzoek, ondernemerschap en grote maatschappelijke vraagstukken met elkaar te verbinden.',
		],
	},
	{
		number: '06',
		title: 'Voorwaarden voor succes',
		paragraphs: [
			'De verkenning identificeert vijf kernwaarden: uitzonderlijk talent met mandaat, autonomie en onafhankelijkheid, hoge risicotolerantie, snelheid en wendbaarheid, en voldoende schaal. Wij onderschrijven deze volledig. Afzwakking van één element ondermijnt het geheel.',
			'Concreet vragen wij om geen compromissen op vier punten. Ten eerste: echte onafhankelijkheid. Geen agentschap dat bestuurd wordt via departementale aansturing of coalitiebelangen. Doorbraaktechnologie ontwikkelt zich op tijdschalen die kabinetsperiodes overstijgen, en vraagt om spelregels die niet bij elke formatie ter discussie staan. Ten tweede: Program Directors met mandaat en ruimte om te falen, zoals het ARPA-model voorschrijft. Ten derde: een meerjarig budget dat niet bij elke begrotingsronde opnieuw ter discussie staat.',
			'Ten vierde: een revolverend deel van maximaal 30% van het budget. Wanneer 100% van het kapitaal via investeringen moet worden terugverdiend, kan NADI geen hoger risico nemen dan durfkapitaal en kan zij haar functie niet vervullen.',
		],
	},
	{
		number: '07',
		title: 'Tot slot',
		paragraphs: [
			"Het coalitieakkoord reserveert €500 miljoen voor NADI, maar in de vorm van revolverend kapitaal. Daarmee kan NADI niet van start: NADI's invloed ligt grotendeels in de fase vóórdat aandelen kunnen worden genomen om de inleg terug te verdienen. Het Wennink-rapport beveelt voor een Nederlandse ARPA-organisatie €1,5 tot €2 miljard aan. Voor een geloofwaardige start is, afgemeten aan agentschappen als ARIA en SPRIND, minimaal €300 miljoen nodig plus €150 miljoen per jaar, genoeg om zes tot tien programma’s parallel te draaien. De Kamerbrief van 9 februari laat zien dat de voorbereiding serieus en gedegen is. Het is nu aan de politiek om door te pakken.",
			'Nederland heeft de onderzoekers, de ingenieurs en de ondernemers. Met NADI krijgen zij een ambitieuze visie om naartoe te werken, financiering voor het risico dat niemand anders neemt en zicht op een eerste grote klant. Met onze belofte krijgen zij het vervolgkapitaal, de onderzoekscapaciteit en de bedrijven die deze technologie verder ontwikkelen en naar de markt brengen. Samen kunnen we van Nederland een land maken waar baanbrekende technologie niet alleen wordt uitgevonden, maar ook wordt gebouwd, geschaald en vermarkt.',
		],
	},
];

const signatories: string[] = [
	'Jelle Prins, Co-founder Cradle, AI Deltaplan',
	'Beau-Anne Chilla, Partner FORWARD.one',
	'Peter Wennink, persoonlijke titel',
	'Tjark Tjin-A-Tsoi, CEO & Chairman of the board of directors TNO',
	'Jacqueline van de Ende, Co-founder & CEO Carbon Equity',
	'Constantijn Van Oranje-Nassau, Co-founder & envoy Techleap',
	'Rinke Zonneveld, CEO Invest-NL',
	'Hamed Sadeghian, Co-founder & CEO Nearfield Instruments',
	'Matthijs Rijlaarsdam, Co-founder & CEO QuantWare',
	'Eline Beest, Voorzitter Tech Champions',
	'Christian Rood, Co-founder & CEO LeydenJar Technologies',
	'Fabrizio Del Maffeo, Co-founder & CEO Axelera AI',
	'Anke Huiskes, Co-founder, Managing Partner NP-Hard Ventures',
	'Harm de Vries, Co-founder & General Partner Innovation Industries',
	'Eva de Mol, Managing Partner CapitalT',
	'Johan van Mil, Co-founder Peak',
	'Julia Padberg, Partner SET Ventures',
	'Joseph Peeraer, Founding Partner Positron',
	'Ilonka Jankovich, Partner Rubio Impact Ventures',
	'Sebastiaan Vaessen, Chief Strategy Officer Prosus Group & Co-founder & Partner Coalition Capital',
	'Thijs van der Burgt, CEO & Co-founder Norrsken Amsterdam',
	'Arjan van den Born, Algemeen Directeur ROM Utrecht Region',
	'Janet Nieboer, CEO ROM inWest',
	'Robert Koldenhof, Directeur & bestuurder LIOF',
	'Frank Lansink, General Partner Inkef',
	'Roland van der Vorst, Board Advisor Rabobank',
	'Dina Boonstra, Algemeen Directeur NV NOM',
	'Wendy de Jong, Algemeen Directeur Oost NL',
	'Brigit van Dijk - van de Reijt, CEO Brabantse Ontwikkelings Maatschappij (BOM)',
	'Michiel Dijkman, Chairman of the Board of Directors Economic Boards Nederland',
	'Femke Brenninkmeijer, Voorzitter Economic Board Zuid-Holland',
	'Johan Feenstra, CEO SMART Photonics',
	'Koenraad Wiedhaup, Co-founder & CEO Leyden Labs',
	'Robert Gaal, Co-founder & CEO Klime',
	'Kiki Laurens, CEO Thorizon',
	'Salar Al Khafaji, founder & CEO Monumental',
	'Pim de Witte, Co-founder & CEO General Intuition',
	'Maurits Schönfeld, Senior Director Northern Europe Uber',
	'Max Welling, Co-founder & CTO CuspAI',
	'Boudewijn Wijnands, founder & CEO Fortaegis Technologies',
	'Roy Jakobs, CEO Philips',
	'Maurice Geraets, Executive Director NXP Semiconductors Netherlands B.V.',
	'Michiel van der Maat, CCO & member of the Executive Board Neways Electronics International NV',
	'Dennis Schipper, CEO Demcon',
	'Erick Webbe, CEO Kickstart AI',
	'Will Crowcombe, Managing Director FSO Instruments',
	'Ben Tax, Managing Director Rijk Zwaan',
	'Stephanie Hottenhuis, CEO & Chair to the Board KPMG',
	'Siete Hamminga, CEO & founder Robin Radar Systems',
	'Mark Heine, CEO Fugro',
	'Alle leden, Universiteiten van Nederland UNL-koepel',
	'Ingrid Thijssen, Voorzitter College van Bestuur Technische Universiteit Delft (TU Delft)',
	'Coen van Oostrum, Voorzitter VNO-NCW',
	'Koen Janssen, President of the Executive Board Technische Universiteit Eindhoven (TU/e)',
	'Tom Veldkamp, Rector Magnificus & lid College van Bestuur Universiteit Twente',
	'Sjoukje Heimovaara, President of the Executive Board Wageningen University & Research (WUR)',
	'Pamela Habibović, President a.i. Universiteit Maastricht',
	'Margrethe Jonkman, President of the Executive Board & Voorzitter College van Bestuur Vrije Universiteit Amsterdam (VU)',
	'Vinod Subramaniam, Voorzitter College van Bestuur Universiteit van Amsterdam (UVA)',
	'Jacquelien Scherpen, Rector Magnificus Rijksuniversiteit Groningen (RUG)',
	'Jouke de Vries, Voorzitter College van Bestuur Rijksuniversiteit Groningen (RUG)',
	'Annelien Bredenoord, President (bestuursvoorzitter) Erasmus Universiteit Rotterdam',
	'Luc Sels, President Leiden University',
	'Tijs Wilbrink, Director Strategic Partnerships imec',
	'Erik Holl, Managing Director Johnson & Johnson Innovative Medicine',
	'Wim van de Donk, Rector Magnificus, voorzitter College van Bestuur Tilburg University',
	'Caspar Van den Berg, Voorzitter Universiteiten van Nederland',
	'Gerda Verburg, Non Executive Director, Boegbeeld, initiatiefnemer voedselsysteem strategie 2050 Next Food Collective',
	'Bertwin Kampman, Director Founded',
	'Lex Hoefsloot, persoonlijke titel',
	'Marco van de Werf, AI Strategy Advisor, persoonlijke titel',
	'Hans Wijers, persoonlijke titel',
	'Frans Blom, Chairman of the Supervisory Board / Lid Van Lanschot Kempen / DenkWerk',
	'As Tempelman, CEO Signify',
	'Marc de Jong, multi-commissaris en investeerder, persoonlijke titel',
	'Karien van Gennip, persoonlijke titel',
	'Theo Henrar, Voorzitter FME',
	'Fonger Ypma, Founder & CEO Arctic Reflections',
	'Hans van Goudoever, Voorzitter raad van bestuur Amsterdam UMC / UMCNL',
];

const references: string[] = [
	"Kamerbrief 'Bevindingen verkenning naar een Nationaal Agentschap voor Disruptieve Innovatie (NADI)', 9 februari 2026 (Kamerstuk 33009-175)",
	'Ontwerpvoorstel voor een Nationaal Agentschap voor Disruptieve Innovatie, projectgroep Verkenning NADI, 30 januari 2026',
	"Coalitieakkoord 'Aan de slag, Bouwen aan een beter Nederland', budgettaire bijlage, maatregel 20 (NADI: €500 miljoen kapitaalstorting)",
	'Wennink-rapport, december 2025: aanbeveling van een naar ARPA-model opgezette organisatie met een meerjarig budget van €1,5 tot €2 miljard',
	'State of Dutch Tech, Techleap, jaarrapport over het Nederlandse startup- en scaleup-ecosysteem',
];

function Section({ section }: { section: LetterSection }) {
	return (
		<section className="mt-14 first:mt-0 scroll-mt-24">
			<h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-5 font-display leading-tight">
				{parseInt(section.number, 10)}. {section.title}
			</h2>
			{section.paragraphs.map((p, i) => (
				<p key={i} className="text-lg text-gray-800 leading-relaxed mb-5 last:mb-0">
					{p}
				</p>
			))}
		</section>
	);
}

export default function OpenBrief() {
	return (
		<PageLayout>
			<article className="article-content">
				<header className="mb-12">
					<h1 className="mt-8 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] font-display">
						Belofte van investeerders, onderzoekers, kennisinstellingen en bedrijven voor NADI
					</h1>
					<p className="mt-8 text-lg italic text-gray-600 font-sans">
						Aan de leden van de Tweede Kamer der Staten-Generaal,
					</p>
				</header>

				{intro.map((p, i) => (
					<p key={i} className="text-lg text-gray-800 leading-relaxed mb-5">
						{p}
					</p>
				))}

				<div className="mt-12 space-y-14">
					{sectionsBeforeQuote.map((section) => (
						<Section key={section.number} section={section} />
					))}
				</div>

				<figure className="my-16 sm:my-20 px-4 sm:px-8">
					<blockquote className="text-3xl sm:text-4xl font-serif font-medium text-black leading-tight text-center">
						&ldquo;Durfkapitaal surft op de golf. Onze rol is om de golf te maken.&rdquo;
					</blockquote>
					<figcaption className="mt-6 text-center text-sm font-semibold tracking-[0.15em] text-gray-500 uppercase">
						Ilan Gur, oprichtend directeur ARIA
					</figcaption>
				</figure>

				<div className="space-y-14">
					{sectionsAfterQuote.map((section) => (
						<Section key={section.number} section={section} />
					))}
				</div>

				<section className="mt-12 pt-8">
					<p className="text-lg text-gray-800 mb-8">Hoogachtend,</p>
					<ul className="list-disc pl-6 space-y-2.5 marker:text-gray-400">
						{signatories.map((name, i) => (
							<li key={i} className="text-base text-gray-700 leading-snug pl-1">
								{name}
							</li>
						))}
					</ul>
				</section>

				<section className="mt-6">
					<h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-5 font-display leading-tight">
						Referenties
					</h2>
					<ul className="list-disc pl-6 space-y-3 marker:text-gray-400">
						{references.map((ref, i) => (
							<li key={i} className="text-sm text-gray-600 leading-relaxed pl-1">
								{ref}
							</li>
						))}
					</ul>
				</section>
			</article>
		</PageLayout>
	);
}
