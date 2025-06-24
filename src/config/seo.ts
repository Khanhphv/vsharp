// SEO Configuration for VSharp
export const SEO_CONFIG = {
  // Site Information
  site: {
    name: 'VSharp',
    url: 'https://vsharp.net',
    description: "Discover VSharp's premium game cheats and hacks for PUBG, Valorant, Fortnite, Apex Legends & more. Instant delivery, 24/7 support, trusted by thousands of gamers worldwide.",
    keywords: 'game cheats, game hacks, PUBG cheats, Valorant hacks, Fortnite cheats, Apex Legends hacks, gaming mods, VSharp, premium cheats, instant delivery, aimbot, wallhack, ESP, gaming enhancement, competitive gaming',
    author: 'VSharp Team',
    locale: 'en_US',
    twitterHandle: '@VSharpOfficial',
  },

  // Analytics IDs (replace with actual IDs)
  analytics: {
    googleAnalyticsId: 'G-52E9JY19JG', // Replace with your GA4 ID
    googleTagManagerId: 'GTM-N7TBW7X5', // Replace with your GTM ID
  },

  // Default meta tags
  defaultMeta: {
    title: 'VSharp - Premium Game Cheats & Hacks | Unleash Your Gaming Potential',
    description: "Discover VSharp's premium game cheats and hacks for PUBG, Valorant, Fortnite, Apex Legends & more. Instant delivery, 24/7 support, trusted by thousands of gamers worldwide.",
    image: 'https://vsharp.net/og-image.png',
    type: 'website',
  },

  // Page-specific SEO configurations
  pages: {
    home: {
      title: 'VSharp - Premium Game Cheats & Hacks | Unleash Your Gaming Potential',
      description: "Discover VSharp's premium game cheats and hacks for PUBG, Valorant, Fortnite, Apex Legends & more. Instant delivery, 24/7 support, trusted by thousands of gamers worldwide.",
      keywords: 'game cheats, game hacks, PUBG cheats, Valorant hacks, Fortnite cheats, Apex Legends hacks, gaming mods, VSharp, premium cheats, instant delivery, aimbot, wallhack, ESP, gaming enhancement, competitive gaming',
      url: 'https://vsharp.net/',
    },
    tools: {
      title: 'VSharp Tools - Advanced Gaming Cheats & Hacks',
      description: 'Access VSharp\'s advanced gaming tools, cheats, and hacks for competitive advantage. Professional-grade software for serious gamers.',
      keywords: 'gaming tools, advanced cheats, professional hacks, competitive gaming tools, VSharp tools',
      url: 'https://vsharp.net/tools',
    },
    transactionDetails: {
      title: 'Transaction Details - VSharp Gaming Platform',
      description: 'View your VSharp transaction details and purchase history. Secure payment processing for gaming cheats and hacks.',
      keywords: 'transaction details, purchase history, VSharp payments, gaming platform transactions',
      url: 'https://vsharp.net/transaction-details',
    },
  },

  // Game-specific SEO configurations
  games: {
    pubg: {
      title: 'PUBG Cheats & Hacks - VSharp Premium Gaming Tools',
      description: 'Premium PUBG cheats and hacks with aimbot, wallhack, ESP, and more. Instant delivery, 24/7 support. Dominate the battlegrounds with VSharp.',
      keywords: 'PUBG cheats, PUBG hacks, PUBG aimbot, PUBG wallhack, PUBG ESP, PlayerUnknown Battlegrounds cheats',
      url: 'https://vsharp.net/games/pubg',
    },
    valorant: {
      title: 'Valorant Cheats & Hacks - VSharp Premium Gaming Tools',
      description: 'Advanced Valorant cheats and hacks for competitive advantage. Aimbot, wallhack, ESP, and more. Trusted by thousands of players.',
      keywords: 'Valorant cheats, Valorant hacks, Valorant aimbot, Valorant wallhack, Valorant ESP, Riot Games cheats',
      url: 'https://vsharp.net/games/valorant',
    },
    fortnite: {
      title: 'Fortnite Cheats & Hacks - VSharp Premium Gaming Tools',
      description: 'Premium Fortnite cheats and hacks for battle royale dominance. Aimbot, wallhack, ESP, and more. Instant delivery available.',
      keywords: 'Fortnite cheats, Fortnite hacks, Fortnite aimbot, Fortnite wallhack, Fortnite ESP, Epic Games cheats',
      url: 'https://vsharp.net/games/fortnite',
    },
    apexLegends: {
      title: 'Apex Legends Cheats & Hacks - VSharp Premium Gaming Tools',
      description: 'Advanced Apex Legends cheats and hacks for competitive gaming. Professional tools for serious players.',
      keywords: 'Apex Legends cheats, Apex Legends hacks, Apex Legends aimbot, Apex Legends wallhack, Apex Legends ESP',
      url: 'https://vsharp.net/games/apex-legends',
    },
  },

  // Structured Data Schemas
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "VSharp",
      "alternateName": "VSharp Gaming",
      "description": "Premium game cheats and hacks provider for competitive gaming",
      "url": "https://vsharp.net",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vsharp.net/logo.png",
        "width": 512,
        "height": 512
      },
      "image": "https://vsharp.net/og-image.png",
      "sameAs": ["https://discord.com/invite/SrXes4UgHQ"],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://discord.com/invite/SrXes4UgHQ",
        "availableLanguage": ["English"]
      },
      "foundingDate": "2024",
      "founders": [
        {
          "@type": "Organization",
          "name": "VSharp Team"
        }
      ],
      "knowsAbout": [
        "Game Cheats",
        "Game Hacks",
        "Gaming Software",
        "Competitive Gaming",
        "Esports Enhancement"
      ],
      "serviceArea": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Game Cheats and Hacks",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "SoftwareApplication",
              "name": "PUBG Cheats",
              "applicationCategory": "Game Enhancement",
              "operatingSystem": "Windows"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "SoftwareApplication",
              "name": "Valorant Hacks",
              "applicationCategory": "Game Enhancement",
              "operatingSystem": "Windows"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "SoftwareApplication",
              "name": "Fortnite Cheats",
              "applicationCategory": "Game Enhancement",
              "operatingSystem": "Windows"
            }
          }
        ]
      }
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "VSharp",
      "alternateName": "VSharp Gaming Platform",
      "url": "https://vsharp.net",
      "description": "Premium game cheats and hacks for popular competitive games",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://vsharp.net/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Supported Games",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "PUBG"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Valorant"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Fortnite"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Apex Legends"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Delta Force"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Marvel Rivals"
          }
        ]
      }
    },

    breadcrumbList: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://vsharp.net/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Games",
          "item": "https://vsharp.net/#games"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Features",
          "item": "https://vsharp.net/#features"
        }
      ]
    },

    faqPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What games does VSharp support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "VSharp supports popular games including PUBG, Valorant, Fortnite, Apex Legends, Delta Force, and Marvel Rivals with premium cheats and hacks."
          }
        },
        {
          "@type": "Question",
          "name": "Is VSharp safe to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, VSharp provides secure and regularly updated cheats with 24/7 support and trusted by thousands of gamers worldwide."
          }
        },
        {
          "@type": "Question",
          "name": "How fast is the delivery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "VSharp offers instant delivery of all cheats and hacks immediately after purchase."
          }
        }
      ]
    }
  }
};

// Helper function to get SEO config for a specific page
export const getSEOConfig = (page: keyof typeof SEO_CONFIG.pages) => {
  return SEO_CONFIG.pages[page];
};

// Helper function to get SEO config for a specific game
export const getGameSEOConfig = (game: keyof typeof SEO_CONFIG.games) => {
  return SEO_CONFIG.games[game];
};

// Helper function to get structured data
export const getStructuredData = (type: keyof typeof SEO_CONFIG.structuredData) => {
  return SEO_CONFIG.structuredData[type];
}; 