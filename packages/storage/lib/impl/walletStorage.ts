import { createStorage } from '../base/base';
import { StorageEnum } from '../base/enums';
import type { BaseStorage } from '../base/types';
import { z } from 'zod';

export const DEFAULT_WALLET_INFO: WalletInfo = {
  address: '',
  isConnected: false,
  isFirstLogin: true,
};
export const walletInfoValidator = z.object({
  address: z.string(),
  isConnected: z.boolean(),
  isFirstLogin: z.boolean(),
});

export type WalletInfo = z.infer<typeof walletInfoValidator>;

export type WalletInfoStorage = BaseStorage<WalletInfo> & {
  logout: () => Promise<void>;
  login: (address: string) => Promise<void>;
  finishFirstLogin: () => Promise<void>;
};

const storage = createStorage<WalletInfo>('wallet-info-storage', DEFAULT_WALLET_INFO, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const walletStorage: WalletInfoStorage = {
  ...storage,
  logout: async () => {
    await storage.set(() => DEFAULT_WALLET_INFO);
  },
  login: async address => {
    await storage.set(currentWalletInfo => {
      return { ...currentWalletInfo, address, isConnected: true };
    });
  },
  finishFirstLogin: async () => {
    await storage.set(currentWalletInfo => {
      return { ...currentWalletInfo, isFirstLogin: false };
    });
  },
};
