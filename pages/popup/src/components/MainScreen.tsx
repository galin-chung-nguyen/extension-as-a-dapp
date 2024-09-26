import { withErrorBoundary, withSuspense } from '@extension/shared';
import { ConnectKitButton } from 'connectkit';
import { Button } from '@nextui-org/react';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { useIsPopup } from '@src/hooks/useIsPopup';

const MainScreen = () => {
  const isInPopupMode = useIsPopup();

  return (
    <div className="">
      <div className="flex justify-center py-4 items-center">
        <ConnectKitButton label="Connect" showBalance={true} showAvatar={true} mode="light" />
        {isInPopupMode && (
          <Button
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="Open expanded view"
            className="h-5 w-5 min-w-5"
            size="md"
            onClick={() => {
              chrome.tabs.create({ url: 'options/index.html' });
            }}>
            <MdOutlineZoomOutMap />
          </Button>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(MainScreen, <div> Loading ... </div>), <div> Error Occur </div>);
