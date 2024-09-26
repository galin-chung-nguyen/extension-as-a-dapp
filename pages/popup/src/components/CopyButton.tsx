import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import * as React from 'react';

interface CopyButtonProps {
  textToCopy: string;
  customIcon?: JSX.Element;
  customMessage?: string;
}

export function CopyButton({ textToCopy, customIcon, customMessage }: CopyButtonProps): JSX.Element {
  return (
    <button
      className="flex p-2 rounded-full cursor-pointer hover:bg-theme-3 hover:bg-opacity-20 text-theme-3"
      onClick={(): void => {
        void navigator.clipboard.writeText(textToCopy);
        toast.success(customMessage ?? 'Copied to clipboard');
      }}>
      {customIcon ? customIcon : <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />}
    </button>
  );
}
