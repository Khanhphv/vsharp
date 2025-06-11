import React from 'react';
import { FaRocket } from 'react-icons/fa';

const features: {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: number | string;
}[] = [
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'Apex-vsharp',
    description: 'VSHARP PRODUCT FOR APEX LEGENDS',
    price: '...',
  },
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'DF-MAIN',
    description: 'Main delta force cheat.',
    price: '...',
  },
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'RUST-HYPRO',
    description: 'This service is specific for Seller HYDRO for RUST cheat.',
    price: '...',
  },
  {
    icon: <FaRocket className="w-8 h-8 md:w-10 md:h-10 text-primary-500" />,
    title: 'BO6-VSHARP',
    description: 'This is a vsharp brand of Black OPS 6 cheat.',
    price: '...',
  },
];

const Tools: React.FC = () => {
  const handleFeatureClick = (feature: (typeof features)[0]) => {
    console.log(feature);
  };

  // eslint-disable-next-line no-constant-binary-expression
  // const totalPrice = selectedFeature ? selectedFeature.price * (Number(amount) ?? 1) : 0;

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
                className="group relative text-center p-8 rounded-3xl bg-gradient-to-br from-dark-surface/80 to-dark-surface/40 dark:from-dark-surface/80 dark:to-dark-surface/40 from-light-surface/80 to-light-surface/40 backdrop-blur-sm border border-dark-border/30 dark:border-dark-border/30 border-light-border/30 hover:border-primary-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/20 overflow-hidden cursor-pointer"
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                {/* Content */}
                <div className="relative z-10">
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
                    className="dark:text-dark-secondary text-light-secondary text-sm md:text-base leading-relaxed group-hover:text-dark-primary dark:group-hover:text-dark-primary group-hover:text-light-primary transition-colors duration-300"
                    itemProp="description"
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Floating particles effect */}
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

      {/* Popup */}
      {/* {selectedFeature && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleClosePopup}
        >
          <div
            className="bg-dark-surface p-8 rounded-3xl max-w-md w-full mx-4 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-600/20">
                {selectedFeature.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">{selectedFeature.title}</h3>
            <p className="text-dark-secondary mb-6">{selectedFeature.description}</p>
            <div className="text-center mb-6">
              <span className="text-2xl font-bold text-primary-500">
                ${selectedFeature.price} / day
              </span>
            </div>
            <div className="mb-6">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-dark-secondary mb-2"
              >
                Amount
              </label>
              <input
                required
                type="number"
                id="amount"
                onChange={handleAmountChange}
                className="w-full px-4 py-2 rounded-xl bg-dark-surface border border-dark-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
              />
            </div>
            <div className="text-center mb-6">
              <span className="text-lg font-medium text-dark-secondary">Total: </span>
              <span className="text-2xl font-bold text-primary-500">${totalPrice}</span>
            </div>
            <button
              className="w-full bg-primary-500 text-white py-3 rounded-xl hover:bg-primary-600 transition-colors"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Tools;
