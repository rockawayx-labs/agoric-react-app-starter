import {useAgoricWalletContext} from '@rbflabs/agoric-react-components';

export const useOffers = (status: any) => {
  const {offers} = useAgoricWalletContext();

  if (!offers) return undefined

  switch (status) {
    case 'accepted':
      return offers.filter(o => o.status === 'accept');
    case 'declined':
      return offers.filter(o => o.status === 'decline');
    case 'pending':
      return offers.filter(o => o.status === 'pending');
    case 'completed':
      return offers.filter(o => o.status === 'complete');
    case 'proposed':
      return offers.filter(o => o.status === undefined);
    default:
      return offers;
  }
};
