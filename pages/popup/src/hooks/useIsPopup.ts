import * as React from 'react';

export const useIsPopup = () => {
  const [isInPopupMode, setIsInPopupMode] = React.useState(false);
  React.useEffect(() => {
    if (window && window.location.pathname.includes('popup')) {
      setIsInPopupMode(true);
    }
  }, []);

  return isInPopupMode;
};
