// Network configuration from environment variables

// Token configuration types
interface TokenConfig {
  address: string;
  symbol: string;
  decimals: number;
  name: string;
}

interface NetworkTokens {
  [chainId: string]: TokenConfig;
}

interface TokensConfig {
  [tokenSymbol: string]: NetworkTokens;
}

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
  SUPPORTED_NETWORKS: (import.meta.env.VITE_SUPPORTED_NETWORKS || '0x1').split(','),

  // Network names mapping
  NETWORK_NAMES: (() => {
    return {
      '0x1': 'Ethereum',
    };
  })(),

  // Token configuration
  TOKENS: {
    // USDT on different networks
    USDT: {
      '0x1': {
        // Ethereum
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        symbol: 'USDT',
        decimals: 6,
        name: 'Tether USD',
      },
    },
    // ETH token
    ETH: {
      '0x1': {
        // Ethereum
        address: '0x0000000000000000000000000000000000000000', // Native token
        symbol: 'ETH',
        decimals: 18,
        name: 'Ethereum',
      },
    },
  } as TokensConfig,
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

// Token helper functions
export const getTokenConfig = (tokenSymbol: string, chainId: string | null): TokenConfig | null => {
  if (!chainId || !tokenSymbol) return null;
  const tokenNetworks = NETWORK_CONFIG.TOKENS[tokenSymbol];
  return tokenNetworks?.[chainId] || null;
};

export const getSupportedTokens = (
  chainId: string | null
): (TokenConfig & { symbol: string })[] => {
  if (!chainId) return [];

  const supportedTokens: (TokenConfig & { symbol: string })[] = [];
  for (const [symbol, networks] of Object.entries(NETWORK_CONFIG.TOKENS)) {
    if (networks[chainId]) {
      const tokenConfig = networks[chainId];
      supportedTokens.push({
        ...tokenConfig,
        symbol, // Override with the key symbol
      });
    }
  }
  return supportedTokens;
};

export const isNativeToken = (tokenAddress: string): boolean => {
  return tokenAddress === '0x0000000000000000000000000000000000000000';
};
