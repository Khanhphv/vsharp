import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCopy, FaCheck } from 'react-icons/fa';
import SEOHead from '../components/SEOHead';
import { getSEOConfig, getStructuredData, SEO_CONFIG } from '../config/seo';

interface License {
  key: string;
  service: string;
  version: string;
}

interface ApiData {
  keys: string[];
  licenses: License[];
  message: string;
  success: boolean;
}

interface TransactionData {
  success: boolean;
  message: string;
  data: ApiData;
  error: string | null;
}

const TransactionDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);

  // SEO Configuration
  const seoConfig = getSEOConfig('transactionDetails');
  const structuredData = [
    getStructuredData('organization'),
    getStructuredData('breadcrumbList')
  ];

  useEffect(() => {
    // Get transaction data from location state or URL params
    const data = location.state?.transactionData;
    if (data) {
      setTransactionData(data);
    } else {
      // Fallback: try to get from URL params
      const params = new URLSearchParams(location.search);
      const txHash = params.get('txHash');
      if (txHash) {
        // You could fetch transaction data here if needed
        navigate('/tools');
      }
    }
  }, [location, navigate]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard:', text);
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!transactionData) {
    return (
      <div className="pt-24 dark:bg-dark-bg bg-light-bg dark:text-dark-primary text-light-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading transaction details...</p>
        </div>
      </div>
    );
  }

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
      <div className="pt-24 dark:bg-dark-bg bg-light-bg dark:text-dark-primary text-light-primary min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/tools')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Tools
            </button>
            <h1 className="text-3xl font-bold text-center">Transaction Details</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>

          {/* Transaction Status Badge */}
          <div className="mb-8 text-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Transaction Submitted
            </span>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Right Column - Raw Data & Actions */}
            <div className="space-y-6">
              {/* Raw API Response */}
              <div className="bg-dark-surface/50 rounded-2xl p-6 border border-dark-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-primary-500">Raw API Response</h2>
                  <button
                    onClick={() => {
                      copyToClipboard(transactionData.data.keys.join(', '), 'raw');
                    }}
                    className="flex items-center gap-2 px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white rounded text-sm transition-colors"
                  >
                    {copied === 'raw' ? (
                      <FaCheck className="w-3 h-3" />
                    ) : (
                      <FaCopy className="w-3 h-3" />
                    )}
                    Copy JSON
                  </button>
                </div>

                <pre className="text-xs overflow-x-auto bg-dark-bg p-4 rounded border max-h-96 overflow-y-auto">
                  {JSON.stringify(transactionData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetails;
