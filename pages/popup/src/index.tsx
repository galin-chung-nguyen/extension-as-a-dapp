// import { createRoot } from 'react-dom/client';
// import '@src/index.css';
// import Popup from '@src/Popup';

// function init() {
//   const appContainer = document.querySelector('#app-container');
//   if (!appContainer) {
//     throw new Error('Can not find #app-container');
//   }
//   const root = createRoot(appContainer);

//   root.render(<Popup />);
// }

// init();
// disable no-any rule
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRoot } from 'react-dom/client';
import '@src/index.css';
import '@extension/ui/dist/global.css';

import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import { ConnectKitProvider } from 'connectkit';
import Main from './Main';
import { wagmiConfig } from './config/wagmiConfig';

const queryClient = new QueryClient();

const init = () => {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  // static console on server
  root.render(
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <NextUIProvider>
            <Main />
          </NextUIProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>,
  );
};
init();
