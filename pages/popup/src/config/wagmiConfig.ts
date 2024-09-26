// disable no-any rule
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@src/index.css';
import '@extension/ui/dist/global.css';

import '@rainbow-me/rainbowkit/styles.css';
import { createConfig, http } from 'wagmi';
// 1. import `NextUIProvider` component
import { mainnet } from 'wagmi/chains';
import { injected } from '@wagmi/core';
import { createMetaMaskProvider } from '../MetamaskExtensionConnector';
import { coinbaseWallet, safe, walletConnect } from '@wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    // RPC URL for each chain
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`),
  },
  connectors: [
    injected({
      target: {
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyhd1fjTekurlg8BdXJ48GilL3XmantUOqjg&s',
        id: 'metamask_injected',
        name: 'Metamask Extension',
        provider: window => {
          if (window?.ethereum) return window?.ethereum;
          if (window?.coinbaseWalletExtension) return window?.coinbaseWalletExtension;
          if (window?.phantom) return window?.phantom.ethereum;

          if ((window as any)['metamaskProvider']) {
            return (window as any)['metamaskProvider'];
          } else {
            (window as any)['metamaskProvider'] = createMetaMaskProvider();
            return (window as any)['metamaskProvider'];
          }
        },
      },
    }),
    injected({
      target: {
        icon: 'https://cdn-icons-png.flaticon.com/512/4964/4964811.png',
        id: 'injected',
        name: 'Injected Browser Wallet',
        provider: window => {
          if (window?.ethereum) return window?.ethereum;
          if (window?.coinbaseWalletExtension) return window?.coinbaseWalletExtension;
          if (window?.phantom) return window?.phantom.ethereum;
          return undefined;
        },
      },
    }),
    coinbaseWallet(),
    safe(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      showQrModal: false,
    }),
  ],
});
