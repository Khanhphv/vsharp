// Network configuration from environment variables
export const NETWORK_CONFIG = {
  // Target network for payments
  TARGET_NETWORK: {
    chainId: import.meta.env.VITE_TARGET_NETWORK_CHAIN_ID || '0x1',
    name: import.meta.env.VITE_TARGET_NETWORK_NAME || 'Ethereum Mainnet',
    symbol: import.meta.env.VITE_TARGET_NETWORK_SYMBOL || 'ETH',
    decimals: parseInt(import.meta.env.VITE_TARGET_NETWORK_DECIMALS || '18'),
    rpcUrl: import.meta.env.VITE_TARGET_NETWORK_RPC_URL || 'https://mainnet.infura.io/v3/',
    explorerUrl: import.meta.env.VITE_TARGET_NETWORK_EXPLORER_URL || 'https://etherscan.io/',
  },

  // Payment configuration
  PAYMENT: {
    walletAddress:
      import.meta.env.VITE_PAYMENT_WALLET_ADDRESS || '0x1e6b5434CdC524eCeF542920e2aA7B7BbfA253A6',
    apiUrl: import.meta.env.VITE_PAYMENT_API_URL || 'https://payment.vsharp.net/api',
  },

  // Supported networks
  SUPPORTED_NETWORKS: (import.meta.env.VITE_SUPPORTED_NETWORKS || '0x1,0x38,0x61').split(','),

  // Network names mapping
  NETWORK_NAMES: (() => {
    return {
      '0x1': 'Ethereum',
      '0x38': 'BNB Smart Chain',
      '0x61': 'BSC Testnet',
    };
  })(),
};

// Helper functions
export const isTargetNetwork = (chainId: string | null): boolean => {
  return chainId === NETWORK_CONFIG.TARGET_NETWORK.chainId;
};

export const getNetworkName = (chainId: string | null): string => {
  if (!chainId) return 'Unknown Network';
  return (
    NETWORK_CONFIG.NETWORK_NAMES[chainId as keyof typeof NETWORK_CONFIG.NETWORK_NAMES] ||
    'Unknown Network'
  );
};

export const isSupportedNetwork = (chainId: string | null): boolean => {
  if (!chainId) return false;
  return NETWORK_CONFIG.SUPPORTED_NETWORKS.includes(chainId);
};
