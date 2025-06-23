import React, { useState } from 'react';
import { FaWallet, FaCopy, FaCheck, FaExchangeAlt } from 'react-icons/fa';
import { useWallet } from '../context/WalletContext';
import { NETWORK_CONFIG } from '../config/networks';
import MetaMask from '../../public/metamask.svg';

const WalletConnect: React.FC<{ className?: string }> = ({ className }) => {
  const {
    isConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    isConnecting,
    error,
    switchToTargetNetwork,
    isOnTargetNetwork,
    currentNetworkName,
  } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy address');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <FaWallet className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-500 font-medium">
            Connected: {formatAddress(walletAddress)}
          </span>
          <button
            onClick={copyAddress}
            className="p-1 rounded hover:bg-green-500/20 transition-colors"
            title="Copy address"
          >
            {copied ? (
              <FaCheck className="w-3 h-3 text-green-500" />
            ) : (
              <FaCopy className="w-3 h-3 text-green-500" />
            )}
          </button>
          <button
            onClick={disconnectWallet}
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Disconnect
          </button>
        </div>

        {/* Network Status */}
        <div
          className={`p-2 rounded-lg text-xs font-medium ${
            isOnTargetNetwork
              ? 'bg-green-500/10 border border-green-500/20 text-green-500'
              : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-500'
          }`}
        >
          Network: {currentNetworkName}
          {!isOnTargetNetwork && (
            <button
              onClick={switchToTargetNetwork}
              className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs transition-colors"
            >
              <FaExchangeAlt className="w-3 h-3" />
              Switch to {NETWORK_CONFIG.TARGET_NETWORK.symbol}
            </button>
          )}
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-[50px]">
      {/* <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-primary-600 disabled:bg-primary-400 text-white rounded-lg transition-colors"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button> */}
      <button onClick={connectWallet} disabled={isConnecting}>
        <img src={MetaMask} alt="MetaMask" className="w-10 h-10" />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </button>
    </div>
  );
};

export default WalletConnect;
