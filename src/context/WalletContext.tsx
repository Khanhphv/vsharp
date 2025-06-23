import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { NETWORK_CONFIG, isTargetNetwork, getNetworkName } from '../config/networks';

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (eventName: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (eventName: string, handler: (...args: unknown[]) => void) => void;
}

interface Window {
  ethereum?: EthereumProvider;
  location: Location;
}

declare const window: Window;

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  error: string | null;
  currentNetwork: string | null;
  switchToTargetNetwork: () => Promise<void>;
  isOnTargetNetwork: boolean;
  currentNetworkName: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = (await window.ethereum.request({ method: 'eth_accounts' })) as string[];
        if (accounts.length > 0) {
          setIsConnected(true);
          setWalletAddress(accounts[0]);
        }

        // Check current network
        const chainId = (await window.ethereum.request({ method: 'eth_chainId' })) as string;
        setCurrentNetwork(chainId);
      } catch {
        console.error('Error checking wallet connection');
      }
    }
  };

  const switchToTargetNetwork = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORK_CONFIG.TARGET_NETWORK.chainId }],
      });
      setCurrentNetwork(NETWORK_CONFIG.TARGET_NETWORK.chainId);
      setError(null);
    } catch (switchError: unknown) {
      // This error code indicates that the chain has not been added to MetaMask
      const error = switchError as { code?: number };
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: NETWORK_CONFIG.TARGET_NETWORK.chainId,
                chainName: NETWORK_CONFIG.TARGET_NETWORK.name,
                nativeCurrency: {
                  name: NETWORK_CONFIG.TARGET_NETWORK.name,
                  symbol: NETWORK_CONFIG.TARGET_NETWORK.symbol,
                  decimals: NETWORK_CONFIG.TARGET_NETWORK.decimals,
                },
                rpcUrls: [NETWORK_CONFIG.TARGET_NETWORK.rpcUrl],
                blockExplorerUrls: [NETWORK_CONFIG.TARGET_NETWORK.explorerUrl],
              },
            ],
          });
          setCurrentNetwork(NETWORK_CONFIG.TARGET_NETWORK.chainId);
        } catch {
          setError(`Failed to add ${NETWORK_CONFIG.TARGET_NETWORK.name} to MetaMask`);
        }
      } else {
        setError(`Failed to switch to ${NETWORK_CONFIG.TARGET_NETWORK.name}`);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];

      if (accounts.length > 0) {
        setIsConnected(true);
        setWalletAddress(accounts[0]);

        // Check current network
        const chainId = (await window.ethereum.request({ method: 'eth_chainId' })) as string;
        setCurrentNetwork(chainId);

        if (!isTargetNetwork(chainId)) {
          setError(`Please switch to ${NETWORK_CONFIG.TARGET_NETWORK.name} to make payments`);
        }
      }
    } catch {
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setError(null);
    setCurrentNetwork(null);
  };

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accountArray = accounts as string[];
        if (accountArray.length === 0) {
          // User disconnected
          setIsConnected(false);
          setWalletAddress('');
        } else {
          // User switched accounts
          setIsConnected(true);
          setWalletAddress(accountArray[0]);
        }
      };

      const handleChainChanged = (chainId: unknown) => {
        // Update current network when chain changes
        const newChainId = chainId as string;
        setCurrentNetwork(newChainId);

        if (!isTargetNetwork(newChainId)) {
          setError(`Please switch to ${NETWORK_CONFIG.TARGET_NETWORK.name} to make payments`);
        } else {
          setError(null);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const value: WalletContextType = {
    isConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    isConnecting,
    error,
    currentNetwork,
    switchToTargetNetwork,
    isOnTargetNetwork: isTargetNetwork(currentNetwork),
    currentNetworkName: getNetworkName(currentNetwork),
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
