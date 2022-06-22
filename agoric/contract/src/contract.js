// @ts-check

import { Far } from '@endo/marshal';
import { AssetKind, AmountMath } from '@agoric/ertp';
import { assertProposalShape } from '@agoric/zoe/src/contractSupport/index.js';

/**
  This is a simple contract that can print some Moola tokens.
  Every contract must have a `start` function, which accepts zcf
  which is short for ZoeContractFacet (the part of Zoe that contracts
  have access to).

  The harden() function is used to prevent future modifications to objects.
  e.g. it prevents payment amounts from being modified after the payments
  are created.

  The Agoric team is working on removing the need to manually harden()
  objects. For now it's on us and the system tends to warn us that hardening
  is necessary.
*/

const start = async (zcf) => {
  // our internal mint for Moolas, only we have access to it
  const moolaMint = await zcf.makeZCFMint('Moola', AssetKind.NAT);
  const { brand: moolaBrand, issuer } = moolaMint.getIssuerRecord();

  const mintMoola = (seat) => {
    assertProposalShape(seat, {
      want: { Tokens: null },
    });
    const { want } = seat.getProposal();
    assert(
      AmountMath.isGTE(AmountMath.make(moolaBrand, 1000n), want.Tokens),
      'You ask too much!',
    );

    moolaMint.mintGains(want, seat);
    seat.exit();
    return 'Here you go';
  };

  // accessible to anyone
  const publicFacet = Far('publicFacet', {
    makeMintInvitation: () => zcf.makeInvitation(mintMoola, 'mintSome'),
    getIssuer: () => issuer,
  });

  // We also provide a public Facet that is available
  // to anyone holding a reference to the contract itself. We thus allow anyone to mint themselves money
  // Far() is necessary when we deploy the contract to our local testnet and want to access it from a dApp
  // Docs: https://agoric.com/documentation/guides/js-programming/far.html
  return harden({ publicFacet });
};

harden(start);
export { start };
