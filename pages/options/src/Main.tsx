import '@src/Main.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
// import { OptionsPageEnv } from './config/env';
import WelcomeScreen from '@src/components/WelcomeScreen';
import MainScreen from '@src/components/MainScreen';
import { useAccount } from 'wagmi';
import { walletStorage } from '@extension/storage';
import React from 'react';

const Main = () => {
  const { address } = useAccount();

  const walletInfo = useStorage(walletStorage);

  // call logout() when first time logout
  React.useEffect(() => {
    if (!address && walletInfo.address) {
      walletStorage.logout();
    }
  }, [address, walletInfo.address]);

  // call login() when at first time login
  React.useEffect(() => {
    console.log('REfresh ', address, walletInfo.address);
    if (address && (!walletInfo.address || walletInfo.address !== address)) {
      walletStorage.login(address);
    }
  }, [address, walletInfo.address]);

  return (
    <div className="container mx-auto px-4 h-screen">
      {!walletInfo.address || walletInfo.isFirstLogin ? <WelcomeScreen address={address} /> : <MainScreen />}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Main, <div> Loading ... </div>), <div> Error Occur </div>);
