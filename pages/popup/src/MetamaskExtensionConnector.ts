// // Metamask provider for extension: https://github.com/MetaMask/extension-provider/blob/master/sample-extension/index.js
// // Example connector: https://github.com/Web3Auth/web3auth-wagmi-connector/blob/master/src/lib/connector.ts
// // Metamask provider interaction: https://docs.metamask.io/wallet/tutorials/javascript-dapp-simple/

import { MetaMaskInpageProvider } from '@metamask/providers';
import PortStream from 'extension-port-stream';
import { detect } from 'detect-browser';
const browser = detect();

export function createMetaMaskProvider() {
  let provider;
  try {
    const currentMetaMaskId = getMetaMaskId();
    console.log('curMetaMaskId= ', currentMetaMaskId);
    const metamaskPort = chrome.runtime.connect(currentMetaMaskId);
    const pluginStream = new PortStream(metamaskPort);
    provider = new MetaMaskInpageProvider(pluginStream);
  } catch (e) {
    console.dir(`Metamask connect error `, e);
    throw e;
  }
  return provider;
}

function getMetaMaskId() {
  // TODO: add more browser wallet ids (coinbase, phantom, ...)
  switch (browser && browser.name) {
    case 'firefox':
      return 'webextension@metamask.io';
    case 'chrome':
      return 'nkbihfbeogaeaoehlefnkodbefgpgknn';
    case 'edge':
      return 'ejbalbakoplchlghecdalmeeeajnimhm';
    case 'opera':
      return 'nkbihfbeogaeaoehlefnkodbefgpgknn';
  }
  return 'ejbalbakoplchlghecdalmeeeajnimhm';
}
