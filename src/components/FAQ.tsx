import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What games does VSharp support?',
    answer:
      'VSharp currently supports popular games including PUBG, Valorant, Fortnite, Apex Legends, Delta Force, and Marvel Rivals. We regularly update our support for new games and maintain existing ones.',
  },
  {
    question: 'Is VSharp safe to use?',
    answer:
      'Yes, VSharp provides secure and regularly updated cheats with advanced anti-detection systems. Our team continuously monitors and updates our software to ensure maximum safety and performance.',
  },
  {
    question: 'How fast is the delivery?',
    answer:
      "All VSharp cheats are delivered instantly after purchase. You'll receive access to your chosen cheat immediately through our secure delivery system.",
  },
  {
    question: 'Do you offer customer support?',
    answer:
      'Yes, we provide 24/7 customer support through our Discord server. Our dedicated support team is always ready to help you with any questions or issues.',
  },
  {
    question: 'Can I use VSharp on multiple devices?',
    answer:
      'Each VSharp license is valid for one device at a time. However, you can transfer your license to another device if needed, with certain limitations.',
  },
  {
    question: 'How often are the cheats updated?',
    answer:
      'Our cheats are updated regularly to maintain compatibility with game updates and to ensure optimal performance. We typically release updates within 24 hours of game patches.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 dark:bg-dark-bg bg-light-bg dark:text-dark-primary text-light-primary relative overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary-400/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-particle"></div>
        <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-primary-300/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-purple-500/50 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-lg md:text-xl dark:text-dark-secondary text-light-secondary max-w-2xl mx-auto">
            Find answers to common questions about our services and products
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="glass-dark backdrop-blur-xl rounded-2xl overflow-hidden border border-primary-500/20 hover:border-primary-400/40 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center group"
              >
                <span className="text-lg md:text-xl font-semibold group-hover:text-primary-400 transition-colors duration-300">
                  {item.question}
                </span>
                <FaChevronDown
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  } group-hover:text-primary-400`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-dark-secondary dark:text-dark-secondary text-light-secondary">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
