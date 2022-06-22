// @ts-check
// @global harden

import { test } from '@agoric/zoe/tools/prepare-test-env-ava.js';

import bundleSource from '@endo/bundle-source';

import { E } from '@endo/eventual-send';
import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';
import { makeZoeKit } from '@agoric/zoe';

import { AmountMath } from '@agoric/ertp';

// check if our code bundle is what is indeed installed
test('deploy contract for testing', async (t) => {
  const { admin: fakeVatAdmin } = makeFakeVatAdmin();
  const { zoeService: zoe } = makeZoeKit(fakeVatAdmin);

  const helloBundle = await bundleSource('./src/contract.js');
  const moolaMinterInstallation = await E(zoe).install(helloBundle);

  t.is(await E(moolaMinterInstallation).getBundle(), helloBundle);
});

test('mint me 80 moola', async (t) => {
  const { admin: fakeVatAdmin } = makeFakeVatAdmin();
  const { zoeService: zoe } = makeZoeKit(fakeVatAdmin);

  const helloBundle = await bundleSource('./src/contract.js');
  const moolaMinterInstallation = await E(zoe).install(helloBundle);

  t.is(await E(moolaMinterInstallation).getBundle(), helloBundle);

  const { publicFacet } = await E(zoe).startInstance(
    moolaMinterInstallation,
    {},
  );
  const { makeMintInvitation, getIssuer } = publicFacet;

  const mintSomeInvitation = makeMintInvitation();

  const issuer = getIssuer();

  const requestedAmount = AmountMath.make(issuer.getBrand(), 80n);

  const mintProposal = harden({
    want: { Tokens: requestedAmount },
  });
  const mySeat = await E(zoe).offer(mintSomeInvitation, mintProposal);
  const offerResult = await E(mySeat).getOfferResult();

  t.is('Here you go', offerResult);

  const tokensReceived = await E(mySeat).getPayout('Tokens');
  t.deepEqual(requestedAmount, await issuer.getAmountOf(tokensReceived));

  const purse = issuer.makeEmptyPurse();
  purse.deposit(tokensReceived);
  t.deepEqual(requestedAmount, purse.getCurrentAmount());
});
