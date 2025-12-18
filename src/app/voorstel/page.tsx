import { getProposalContent } from '@/lib/content';
import ProposalClient from './ProposalClient';

export default async function Proposal() {
	const proposal = await getProposalContent();

	return <ProposalClient proposal={proposal} />;
}
