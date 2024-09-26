import { withErrorBoundary, withSuspense } from '@extension/shared';
import { ConnectKitButton } from 'connectkit';
// import { OptionsPageEnv } from './config/env';
import { Button } from '@nextui-org/react';
import { walletStorage } from '@extension/storage';

const WelcomeScreen = ({ address }: { address: `0x${string}` | undefined }) => {
  return (
    <div className="h-full flex justify-center items-center">
      {address ? (
        <div className="text-center">
          <h1 className="text-xl font-bold py-0">Wallet connected ✅</h1>
          <ConnectKitButton.Custom>
            {({ isConnected, address }) => {
              return (
                <>
                  {isConnected && address && (
                    <div className="text-center">
                      <div className="py-2 flex justify-center">
                        <ConnectKitButton label="Connect" showBalance={true} showAvatar={true} mode="light" />
                      </div>
                      <Button
                        className="bg-primary text-white px-20 rounded-full"
                        size="md"
                        variant="solid"
                        onClick={() => walletStorage.finishFirstLogin()}>
                        ➡️ Continue
                      </Button>
                    </div>
                  )}
                </>
              );
            }}
          </ConnectKitButton.Custom>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold my-0">Welcome back 👋🏻</h1>
          <h3 className="py-2">Please connect to your crypto wallet to start using this app</h3>
          <ConnectKitButton.Custom>
            {({ isConnected, show }) => {
              return (
                <>
                  {!isConnected && (
                    <Button
                      className="bg-primary text-white px-20 rounded-full"
                      size="md"
                      variant="solid"
                      onClick={show}>
                      Connect
                    </Button>
                  )}
                </>
              );
            }}
          </ConnectKitButton.Custom>
          {/* <ConnectKitButton label="Connect" showBalance={true} showAvatar={true} mode="light" /> */}
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(WelcomeScreen, <div> Loading ... </div>), <div> Error Occur </div>);
