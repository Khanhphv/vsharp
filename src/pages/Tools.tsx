import React, { useState } from 'react';
import { FaRocket, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../src/context/WalletContext';
import {
  NETWORK_CONFIG,
  getTokenConfig,
  isNativeToken,
  getSupportedTokens,
} from '../config/networks';
import SEOHead from '../components/SEOHead';
import { getSEOConfig, getStructuredData, SEO_CONFIG } from '../config/seo';
import { DISCORD_INVITE_LINK } from '../constants/links';

// Web3 types
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

interface Window {
  ethereum?: EthereumProvider;
  open: (url: string) => Window | null;
}

declare const window: Window;

const features: {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: number | string;
  isSale: boolean;
  ethPrice: number; // ETH price in wei
  usdtPrice: number; // USDT price
}[] = [
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'Apex-vsharp',
    description: 'VSHARP PRODUCT FOR APEX LEGENDS',
    price: '0.06LTC',
    ethPrice: 0.00034,
    usdtPrice: 1, // $15 USDT
    isSale: true,
  },
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'DF-MAIN',
    description: 'Main delta force cheat.',
    price: '0.06LTC',
    ethPrice: 0.00034,
    usdtPrice: 1,
    isSale: true,
  },
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'RUST-HYPRO',
    description: 'This service is specific for Seller HYDRO for RUST cheat.',
    price: '0.06LTC',
    ethPrice: 0.00034,
    usdtPrice: 1,
    isSale: true,
  },
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'BO6-VSHARP',
    description: 'This is a vsharp brand of Black OPS 6 cheat.',
    price: '0.06LTC',
    ethPrice: 0.00034,
    usdtPrice: 1,
    isSale: true,
  },
];

async function createInvoice({
  amount,
  currency,
  currency2,
  email,
  service,
}: {
  amount: number;
  currency: string;
  currency2: string;
  email: string;
  service: string;
}) {
  const response = await fetch(`${NETWORK_CONFIG.PAYMENT.apiUrl}/invoices/coin-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency, currency2, email, service }),
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

// Web3 payment function with token support
async function processWeb3Payment({
  amount,
  service,
  tokenSymbol,
}: {
  amount: number;
  service: string;
  tokenSymbol: string;
}) {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
  }

  // Request account access
  const accounts = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
  const account = accounts[0];

  if (!account) {
    throw new Error('No account found. Please connect your MetaMask wallet.');
  }

  // Get current chain ID
  const chainId = (await window.ethereum.request({ method: 'eth_chainId' })) as string;

  // Get token configuration
  const tokenConfig = getTokenConfig(tokenSymbol, chainId);
  if (!tokenConfig) {
    throw new Error(`${tokenSymbol} is not supported on this network.`);
  }

  let transactionParameters: {
    to: string;
    from: string;
    value: string;
    data: string;
  };

  if (isNativeToken(tokenConfig.address)) {
    // Native token payment (BNB, ETH)
    const balance = (await window.ethereum.request({
      method: 'eth_getBalance',
      params: [account, 'latest'],
    })) as string;

    const balanceInEth = parseInt(balance, 16) / 10 ** 18;

    if (balanceInEth < amount + 0.01) {
      throw new Error(
        `Insufficient balance. You have ${balanceInEth.toFixed(4)} ${tokenSymbol} but need at least ${(amount + 0.01).toFixed(4)} ${tokenSymbol} (including gas fees).`
      );
    }

    const amountInWei = (amount * 10 ** 18).toString(16);

    transactionParameters = {
      to: NETWORK_CONFIG.PAYMENT.walletAddress,
      from: account,
      value: `0x${amountInWei}`,
      data: '0x',
    };
  } else {
    // ERC-20 token payment (USDT)
    // First check USDT balance
    const balanceData = {
      to: tokenConfig.address,
      data: `0x70a08231${account.slice(2).padStart(64, '0')}`, // balanceOf(address)
    };

    const balanceResult = (await window.ethereum.request({
      method: 'eth_call',
      params: [balanceData, 'latest'],
    })) as string;

    const balance = parseInt(balanceResult, 16) / 10 ** tokenConfig.decimals;
    console.log('USDT balance:', balance);
    console.log('Required USDT:', amount);

    if (balance < amount) {
      throw new Error(
        `Insufficient USDT balance. You have ${balance.toFixed(2)} USDT but need ${amount} USDT.`
      );
    }

    // Prepare USDT transfer data
    const amountInSmallestUnit = (amount * 10 ** tokenConfig.decimals).toString(16);
    const transferData = `0xa9059cbb${NETWORK_CONFIG.PAYMENT.walletAddress.slice(2).padStart(64, '0')}${amountInSmallestUnit.padStart(64, '0')}`;

    transactionParameters = {
      to: tokenConfig.address,
      from: account,
      value: '0x0',
      data: transferData,
    };
  }

  console.log('Transaction parameters:', transactionParameters);

  try {
    // Hash transaction parameters for verification
    const paramHash = await hashTransactionParams(transactionParameters);
    console.log('Transaction parameter hash:', paramHash);

    // Send transaction
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    // Validate transaction hash
    if (
      !txHash ||
      txHash === '0x' ||
      txHash === '0x0' ||
      (typeof txHash === 'string' && txHash.length < 10)
    ) {
      throw new Error('Transaction failed: Invalid transaction hash received.');
    }

    console.log('Transaction hash:', txHash);

    // Create a combined hash for additional verification
    const combinedData = `${txHash}-${paramHash}-${Date.now()}`;
    const verificationHash = await hashTransaction(combinedData);
    console.log('Verification hash:', verificationHash);

    // Send transaction details to your backend
    const response = await fetch(`${NETWORK_CONFIG.PAYMENT.apiUrl}/payments/web3`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        txHash,
        amount,
        service,
        userAddress: account,
        network: NETWORK_CONFIG.TARGET_NETWORK.name.toLowerCase().replace(' ', '_'),
        tokenSymbol,
        paramHash,
        verificationHash,
      }),
    });

    if (!response.ok) {
      alert('Please contact to admin via discord: ' + DISCORD_INVITE_LINK);
      throw new Error(`Payment verification failed: ${response.status}`);
    }

    const responseData = await response.json();

    return { txHash, account, responseData, paramHash, verificationHash };
  } catch (error) {
    console.error('Transaction error:', error);

    // Handle specific MetaMask errors
    if (error instanceof Error) {
      if (
        error.message.includes('does not have a transaction hash') ||
        error.message.includes('there was a problem')
      ) {
        throw new Error(
          'Transaction failed: Network rejected the transaction. This usually means insufficient balance or invalid parameters. Please check your balance and try again.'
        );
      } else if (error.message.includes('likely to fail')) {
        throw new Error('Transaction would fail. Please check your balance and try again.');
      } else if (error.message.includes('insufficient funds')) {
        throw new Error(`Insufficient funds. Please add more ${tokenSymbol} to your wallet.`);
      } else if (error.message.includes('user rejected')) {
        throw new Error('Transaction was cancelled by user.');
      } else if (error.message.includes('nonce')) {
        throw new Error('Transaction nonce error. Please try again.');
      } else if (error.message.includes('execution reverted')) {
        throw new Error('Transaction reverted. This might be due to contract issues.');
      } else if (error.message.includes('RPC Error')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
    }
    throw error;
  }
}

// Fast transaction status monitoring with shorter intervals
async function getTransactionStatus(txHash: string): Promise<{
  status: 'pending' | 'confirmed' | 'failed';
  confirmations?: number;
  blockNumber?: number;
  error?: string;
}> {
  try {
    // Get transaction receipt
    const receipt = (await window.ethereum?.request({
      method: 'eth_getTransactionReceipt',
      params: [txHash],
    })) as {
      status: string;
      blockNumber: string;
    } | null;

    if (!receipt) {
      return { status: 'pending' };
    }

    // Check if transaction was successful
    if (receipt.status === '0x1') {
      // Get current block number to calculate confirmations
      const currentBlock = (await window.ethereum?.request({
        method: 'eth_blockNumber',
        params: [],
      })) as string;

      const confirmations = parseInt(currentBlock, 16) - parseInt(receipt.blockNumber, 16);

      return {
        status: 'confirmed',
        confirmations,
        blockNumber: parseInt(receipt.blockNumber, 16),
      };
    } else {
      return {
        status: 'failed',
        error: 'Transaction failed on blockchain',
      };
    }
  } catch (error) {
    return {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Failed to check transaction status',
    };
  }
}

// Accelerated transaction monitoring with shorter intervals
async function monitorTransactionFast(
  txHash: string,
  onStatusUpdate: (status: {
    status: 'pending' | 'confirmed' | 'failed' | 'timeout';
    confirmations?: number;
    blockNumber?: number;
    error?: string;
  }) => void
) {
  const maxAttempts = 60; // 2 minutes with 2-second intervals for faster feedback
  let attempts = 0;

  const pollStatus = async () => {
    if (attempts >= maxAttempts) {
      onStatusUpdate({
        status: 'timeout',
        error: 'Transaction monitoring timed out. Please check manually.',
      });
      return;
    }

    const status = await getTransactionStatus(txHash);
    onStatusUpdate(status);

    if (status.status === 'confirmed' || status.status === 'failed') {
      return; // Stop polling
    }

    attempts++;
    setTimeout(pollStatus, 2000); // Poll every 2 seconds for faster updates
  };

  pollStatus();
}

// Function to accelerate pending transactions (if supported by the network)
async function accelerateTransaction(txHash: string) {
  try {
    // This is a placeholder for transaction acceleration services
    // You can integrate with services like Flashbots, MEV-Boost, or network-specific accelerators

    // Example: Send a replacement transaction with higher gas
    const currentGasPrice = (await window.ethereum?.request({
      method: 'eth_gasPrice',
      params: [],
    })) as string;

    const acceleratedGasPrice = parseInt(currentGasPrice, 16) * 1.5; // 50% higher gas

    // Note: This is a simplified example. Real acceleration requires more complex logic
    console.log(
      'Transaction acceleration attempted for:',
      txHash,
      'with gas price:',
      acceleratedGasPrice
    );

    return true;
  } catch (error) {
    console.error('Transaction acceleration failed:', error);
    return false;
  }
}

// Utility function to hash transaction data
async function hashTransaction(data: string): Promise<string> {
  // Simple hash function using built-in crypto
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  // Use Web Crypto API for SHA-256 hashing
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Hash transaction parameters for verification
async function hashTransactionParams(params: {
  to: string;
  from: string;
  value: string;
  data: string;
  nonce?: string;
  gasPrice?: string;
  gasLimit?: string;
}): Promise<string> {
  const paramString = JSON.stringify(params, Object.keys(params).sort());
  return await hashTransaction(paramString);
}
const DEFAULT_PAYMENT_METHOD = 'web3';

const Tools: React.FC = () => {
  const navigate = useNavigate();
  const {
    isConnected: walletConnected,
    walletAddress,
    connectWallet,
    isOnTargetNetwork,
    currentNetworkName,
    switchToTargetNetwork,
  } = useWallet();
  const [selectedFeature, setSelectedFeature] = useState<(typeof features)[0] | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'ltc' | 'web3'>(DEFAULT_PAYMENT_METHOD);
  const [selectedToken, setSelectedToken] = useState<string>('ETH');
  const [currentChainId, setCurrentChainId] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<{
    status: 'pending' | 'confirmed' | 'failed' | 'timeout';
    confirmations?: number;
    blockNumber?: number;
    error?: string;
  } | null>(null);
  const [currentTxHash, setCurrentTxHash] = useState<string | null>(null);
  const [accelerating, setAccelerating] = useState(false);

  // SEO Configuration
  const seoConfig = getSEOConfig('tools');
  const structuredData = [getStructuredData('organization'), getStructuredData('breadcrumbList')];

  const handleFeatureClick = (feature: (typeof features)[0]) => {
    // setSelectedFeature(feature);
    console.log('feature', feature);
    setAmount(1);
    setEmail('');
    setError(null);
    setSuccess(null);
    setTransactionStatus(null);
    setCurrentTxHash(null);
    setPaymentMethod(DEFAULT_PAYMENT_METHOD);
    setSelectedToken('ETH');
  };

  const handleClosePopup = () => {
    setSelectedFeature(null);
    setAmount(1);
    setEmail('');
    setError(null);
    setSuccess(null);
    setTransactionStatus(null);
    setCurrentTxHash(null);
    setPaymentMethod(DEFAULT_PAYMENT_METHOD);
    setSelectedToken('ETH');
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeature) return;

    setLoading(true);
    setError(null);
    setSuccess(null);
    setTransactionStatus(null);

    try {
      if (paymentMethod === 'web3') {
        // Web3 payment
        if (!walletConnected) {
          await connectWallet();
        }

        // Check if user is on target network
        if (!isOnTargetNetwork) {
          setError(
            `Please switch to ${NETWORK_CONFIG.TARGET_NETWORK.name} to make payments. Click "Switch to ${NETWORK_CONFIG.TARGET_NETWORK.symbol}" in the header.`
          );
          setLoading(false);
          return;
        }

        const tokenAmount = getTotalPrice();

        const result = await processWeb3Payment({
          amount: tokenAmount,
          service: selectedFeature.title,
          tokenSymbol: selectedToken || 'ETH',
        });

        setCurrentTxHash(result.txHash as string);
        setTransactionStatus({ status: 'pending' });
        setSuccess(`Transaction submitted! Hash: ${result.txHash}`);
        // Navigate to transaction details page
        navigate('/transaction-details', {
          state: { transactionData: result.responseData },
        });

        // Start fast monitoring
        monitorTransactionFast(result.txHash as string, (status) => {
          setTransactionStatus(status);
          if (status.status === 'confirmed') {
            setSuccess(
              `Payment confirmed! Block: ${status.blockNumber}, Confirmations: ${status.confirmations}`
            );
          } else if (status.status === 'failed') {
            setError(`Transaction failed: ${status.error}`);
          } else if (status.status === 'timeout') {
            setError(`Transaction monitoring timed out. Please check manually: ${result.txHash}`);
          }
        });
      } else {
        // LTC payment (original method)
        const priceNum = parseFloat(String(selectedFeature.price).replace(/[^\d.]/g, ''));
        const invoice = await createInvoice({
          amount: priceNum * amount,
          currency: 'LTC',
          currency2: 'LTC',
          email,
          service: selectedFeature.title,
        });
        setSuccess('Invoice created successfully!');
        window.open(invoice.paymentUrl);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    if (!selectedFeature) return 0;

    if (paymentMethod === 'web3') {
      if (selectedToken === 'USDT') {
        return selectedFeature.usdtPrice * amount;
      } else if (selectedToken === 'ETH') {
        return selectedFeature.ethPrice * amount;
      } else {
        // Default to ETH price for other tokens
        return selectedFeature.ethPrice * amount;
      }
    } else {
      return parseFloat(String(selectedFeature.price).replace(/[^\d.]/g, '')) * amount;
    }
  };

  const getPriceDisplay = () => {
    if (!selectedFeature) return '';

    if (paymentMethod === 'web3') {
      return `${getTotalPrice()} ${selectedToken}`;
    } else {
      return `${getTotalPrice()} LTC`;
    }
  };

  const getTransactionStatusDisplay = () => {
    if (!transactionStatus) return null;

    switch (transactionStatus.status) {
      case 'pending':
        return (
          <div className="text-yellow-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              Transaction pending...
            </div>
            {currentTxHash && (
              <div className="mt-1 text-xs text-gray-400">
                Hash: {currentTxHash.slice(0, 10)}...{currentTxHash.slice(-8)}
              </div>
            )}
            <button
              onClick={handleAccelerateTransaction}
              disabled={accelerating}
              className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors disabled:opacity-50"
            >
              {accelerating ? 'Accelerating...' : '🚀 Accelerate'}
            </button>
          </div>
        );
      case 'confirmed':
        return (
          <div className="text-green-400 text-sm text-center">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              Transaction confirmed!
            </div>
            <div className="mt-1 text-xs text-gray-400">
              Block: {transactionStatus.blockNumber} | Confirmations:{' '}
              {transactionStatus.confirmations}
            </div>
          </div>
        );
      case 'failed':
        return (
          <div className="text-red-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded-full"></div>
              Transaction failed
            </div>
            {transactionStatus.error && (
              <div className="mt-1 text-xs text-gray-400">{transactionStatus.error}</div>
            )}
          </div>
        );
      case 'timeout':
        return (
          <div className="text-orange-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
              Monitoring timed out
            </div>
            <div className="mt-1 text-xs text-gray-400">Please check transaction manually</div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleAccelerateTransaction = async () => {
    if (!currentTxHash || !walletAddress) return;

    setAccelerating(true);
    try {
      const success = await accelerateTransaction(currentTxHash);
      if (success) {
        setSuccess('Transaction acceleration requested!');
      } else {
        setError('Failed to accelerate transaction');
      }
    } catch (err) {
      setError('Acceleration failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setAccelerating(false);
    }
  };

  // Get available tokens for current network
  const getAvailableTokens = () => {
    if (!currentChainId) return [];
    return getSupportedTokens(currentChainId);
  };

  // Update chain ID when wallet connects or network changes
  React.useEffect(() => {
    const updateChainId = async () => {
      if (window.ethereum && walletConnected) {
        try {
          const chainId = (await window.ethereum.request({ method: 'eth_chainId' })) as string;
          setCurrentChainId(chainId);

          // Set default token based on available tokens
          const availableTokens = getSupportedTokens(chainId);
          if (
            availableTokens.length > 0 &&
            !availableTokens.find((t) => t.symbol === selectedToken)
          ) {
            setSelectedToken(availableTokens[0].symbol);
          }
        } catch (error) {
          console.error('Failed to get chain ID:', error);
        }
      }
    };

    updateChainId();
  }, [walletConnected, selectedToken]);

  const getErrorDisplay = (errorMessage: string) => {
    if (errorMessage.includes('Insufficient balance')) {
      return (
        <div className="text-red-400 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            Insufficient Balance
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• Add more ETH to your wallet</p>
            <p>• Ensure you have enough for the payment + gas fees</p>
            <p>• Gas fees typically range from 0.001-0.01 ETH</p>
          </div>
        </div>
      );
    } else if (errorMessage.includes('likely to fail')) {
      return (
        <div className="text-red-400 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            Transaction Would Fail
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• Check your wallet balance</p>
            <p>• Try with a smaller amount</p>
            <p>• Ensure you're on the correct network</p>
          </div>
        </div>
      );
    } else if (errorMessage.includes('user rejected')) {
      return (
        <div className="text-yellow-400 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            Transaction Cancelled
          </div>
          <div className="text-xs text-gray-400">You cancelled the transaction in MetaMask.</div>
        </div>
      );
    } else {
      return (
        <div className="text-red-400 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            Transaction Error
          </div>
          <div className="text-xs text-gray-400">{errorMessage}</div>
        </div>
      );
    }
  };

  return (
    <>
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        url={seoConfig.url}
        structuredData={structuredData}
        googleAnalyticsId={SEO_CONFIG.analytics.googleAnalyticsId}
        googleTagManagerId={SEO_CONFIG.analytics.googleTagManagerId}
      />
      <div className="pt-10 dark:bg-dark-bg bg-light-bg dark:text-dark-primary text-light-primary py-12 md:py-20">
        <section
          id="features"
          className="dark:bg-dark-bg bg-light-bg dark:text-dark-primary text-light-primary py-12 md:py-20 cursor-default"
        >
          <div className="mx-auto w-full lg:max-w-[64rem] px-4">
            <header className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold dark:text-dark-primary text-light-primary">
                Tools
              </h2>
              <p className="text-lg md:text-xl dark:text-dark-secondary text-light-secondary mt-4 max-w-2xl mx-auto">
                Experience premium gaming advantages with our trusted platform
              </p>
            </header>
            <section
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12"
              role="region"
              aria-label="Platform features"
            >
              {features.map((feature, index) => (
                <article
                  key={index}
                  onClick={() => handleFeatureClick(feature)}
                  className="group relative flex flex-col justify-between text-center p-8 rounded-3xl bg-gradient-to-br from-dark-surface/80 to-dark-surface/40 dark:from-dark-surface/80 dark:to-dark-surface/40 from-light-surface/80 to-light-surface/40 backdrop-blur-sm border border-dark-border/30 dark:border-dark-border/30 border-light-border/30 hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 overflow-hidden cursor-pointer h-full min-h-[420px]"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  {feature.isSale && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white animate-pulse">
                        SALE
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="relative z-10 flex flex-col flex-1">
                    <div>
                      <div className="flex justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                        <div
                          className="p-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-600/20 group-hover:from-primary-500/30 group-hover:to-purple-600/30 transition-all duration-500"
                          aria-hidden="true"
                        >
                          {feature.icon}
                        </div>
                      </div>
                      <h3
                        className="text-lg md:text-xl font-bold mb-3 dark:text-dark-primary text-light-primary group-hover:text-primary-400 transition-colors duration-300"
                        itemProp="name"
                      >
                        {feature.title}
                      </h3>
                      <div className="mt-4">
                        <span className="text-lg font-bold text-primary-500">${feature.price}</span>
                        <br />
                        <span className="text-sm text-gray-400">
                          or {feature.ethPrice} ETH / {feature.usdtPrice} USDT
                        </span>
                      </div>
                      <p
                        className="dark:text-dark-secondary text-light-secondary text-sm md:text-base leading-relaxed group-hover:text-dark-primary dark:group-hover:text-dark-primary group-hover:text-light-primary transition-colors duration-300 min-h-[48px] flex items-center justify-center"
                        itemProp="description"
                      >
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-6">
                      <button
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 group-hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFeatureClick(feature);
                        }}
                      >
                        <FaShoppingCart className="w-4 h-4" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                  <div
                    className="absolute top-4 right-4 w-2 h-2 bg-primary-500/30 rounded-full animate-pulse"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="absolute bottom-6 left-6 w-1 h-1 bg-purple-500/40 rounded-full animate-ping"
                    aria-hidden="true"
                  ></div>
                </article>
              ))}
            </section>
          </div>
        </section>
        {/* Popup for buying */}
        {selectedFeature && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleClosePopup}
          >
            <div
              className="bg-dark-surface p-8 rounded-3xl max-w-md w-full mx-4 transform transition-all relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={handleClosePopup}
              >
                &times;
              </button>
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-600/20">
                  {selectedFeature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                {selectedFeature.title} - Key Day
              </h3>
              <p className="text-dark-secondary mb-6 text-center">{selectedFeature.description}</p>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-dark-secondary mb-3">
                  Payment Method
                </label>
                <div className="flex gap-3">
                  {/* <button
                    type="button"
                    onClick={() => setPaymentMethod('ltc')}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                      paymentMethod === 'ltc'
                        ? 'border-primary-500 bg-primary-500/20 text-primary-500'
                        : 'border-dark-border text-dark-secondary hover:border-primary-500'
                    }`}
                  >
                    Litecoin (LTC)
                  </button> */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('web3')}
                    className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                      paymentMethod === 'web3'
                        ? 'border-primary-500 bg-primary-500/20 text-primary-500'
                        : 'border-dark-border text-dark-secondary hover:border-primary-500'
                    }`}
                  >
                    <FaWallet className="inline w-4 h-4 mr-2" />
                    Web3
                  </button>
                </div>
              </div>

              {/* Token Selection for Web3 */}
              {paymentMethod === 'web3' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-dark-secondary mb-3">
                    Select Token
                  </label>
                  {currentChainId ? (
                    <div className="flex gap-3 flex-wrap">
                      {getAvailableTokens().map((token) => (
                        <button
                          key={token.symbol}
                          type="button"
                          onClick={() => setSelectedToken(token.symbol)}
                          className={`flex-1 min-w-[80px] py-2 px-4 rounded-lg border transition-colors ${
                            selectedToken === token.symbol
                              ? 'border-primary-500 bg-primary-500/20 text-primary-500'
                              : 'border-dark-border text-dark-secondary hover:border-primary-500'
                          }`}
                        >
                          {token.symbol}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">
                      Connect wallet to see available tokens
                    </div>
                  )}
                </div>
              )}

              {/* Wallet Connection Status */}
              {paymentMethod === 'web3' && (
                <div className="mb-4 p-3 rounded-lg bg-dark-surface/50 border border-dark-border">
                  {walletConnected ? (
                    <div className="space-y-2">
                      <div className="text-green-400 text-sm">
                        <FaWallet className="inline w-4 h-4 mr-2" />
                        Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </div>
                      <div
                        className={`text-sm ${
                          isOnTargetNetwork ? 'text-green-400' : 'text-yellow-400'
                        }`}
                      >
                        Network: {currentNetworkName}
                        {!isOnTargetNetwork && (
                          <button
                            onClick={switchToTargetNetwork}
                            className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
                          >
                            Switch to {NETWORK_CONFIG.TARGET_NETWORK.symbol}
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-yellow-400 text-sm">
                      <FaWallet className="inline w-4 h-4 mr-2" />
                      MetaMask not connected
                      <button
                        onClick={connectWallet}
                        className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleBuy}>
                {paymentMethod === 'ltc' && (
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-dark-secondary mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-dark-surface border border-dark-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                    />
                    <p className="text-sm text-dark-secondary mt-2">
                      We will send the invoice to your email.
                    </p>
                  </div>
                )}

                <div className="mb-4">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-dark-secondary mb-2"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-xl bg-dark-surface border border-dark-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                  />
                </div>

                <div className="text-center mb-4">
                  <span className="text-lg font-medium text-dark-secondary">Total: </span>
                  <span className="text-2xl font-bold text-primary-500">{getPriceDisplay()}</span>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-dark-surface/50 border border-red-500/30">
                    {getErrorDisplay(error)}
                  </div>
                )}
                {success && <div className="text-green-500 text-center mb-2">{success}</div>}

                {getTransactionStatusDisplay()}

                <button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
                  disabled={
                    loading ||
                    (paymentMethod === 'web3' && (!walletConnected || !isOnTargetNetwork))
                  }
                >
                  {loading ? (
                    'Processing...'
                  ) : (
                    <>
                      {paymentMethod === 'web3' ? (
                        <FaWallet className="w-4 h-4" />
                      ) : (
                        <FaShoppingCart className="w-4 h-4" />
                      )}
                      {paymentMethod === 'web3' ? 'Pay with MetaMask' : 'Buy Now'}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tools;
