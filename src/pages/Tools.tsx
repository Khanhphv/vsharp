import React, { useState } from 'react';
import { FaRocket, FaShoppingCart } from 'react-icons/fa';

const features: {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: number | string;
  isSale: boolean;
}[] = [
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'Apex-vsharp',
    description: 'VSHARP PRODUCT FOR APEX LEGENDS',
    price: '0.012LTC',
    isSale: true,
  },
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'DF-MAIN',
    description: 'Main delta force cheat.',
    price: '0.012LTC',
    isSale: true,
  },
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'RUST-HYPRO',
    description: 'This service is specific for Seller HYDRO for RUST cheat.',
    price: '0.012LTC',
    isSale: true,
  },
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'BO6-VSHARP',
    description: 'This is a vsharp brand of Black OPS 6 cheat.',
    price: '0.012LTC',
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
  const response = await fetch('http://localhost:8080/api/invoices/coin-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency, currency2, email, service }),
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

const Tools: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<(typeof features)[0] | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFeatureClick = (feature: (typeof features)[0]) => {
    setSelectedFeature(feature);
    setAmount(1);
    setEmail('');
    setError(null);
    setSuccess(null);
  };

  const handleClosePopup = () => {
    setSelectedFeature(null);
    setAmount(1);
    setEmail('');
    setError(null);
    setSuccess(null);
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFeature) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Extract numeric value from price string (e.g., '0.012LTC' -> 0.012)
      const priceNum = parseFloat(String(selectedFeature.price).replace(/[^\d.]/g, ''));
      const invoice = await createInvoice({
        amount: priceNum * amount,
        currency: 'LTC',
        currency2: 'LTC',
        email,
        service: selectedFeature.title,
      });
      setSuccess('Invoice created successfully!');
      setTimeout(() => {
        window.open(invoice.paymentUrl, '_blank');
      }, 3000);
      handleClosePopup();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 dark:bg-dark-bg bg-light-bg dark:text-dark-primary text-light-primary py-12 md:py-20">
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
            <h3 className="text-2xl font-bold text-center mb-4">{selectedFeature.title}</h3>
            <p className="text-dark-secondary mb-6 text-center">{selectedFeature.description}</p>
            <form onSubmit={handleBuy}>
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
                <span className="text-2xl font-bold text-primary-500">
                  ${parseFloat(String(selectedFeature.price).replace(/[^\d.]/g, '')) * amount} LTC
                </span>
              </div>
              {error && <div className="text-red-500 text-center mb-2">{error}</div>}
              {success && <div className="text-green-500 text-center mb-2">{success}</div>}
              <button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <FaShoppingCart className="w-4 h-4" /> Buy Now
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;
