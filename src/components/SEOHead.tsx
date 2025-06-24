import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  siteName?: string;
  twitterHandle?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: object;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'VSharp - Premium Game Cheats & Hacks | Unleash Your Gaming Potential',
  description = "Discover VSharp's premium game cheats and hacks for PUBG, Valorant, Fortnite, Apex Legends & more. Instant delivery, 24/7 support, trusted by thousands of gamers worldwide.",
  keywords = 'game cheats, game hacks, PUBG cheats, Valorant hacks, Fortnite cheats, Apex Legends hacks, gaming mods, VSharp, premium cheats, instant delivery, aimbot, wallhack, ESP, gaming enhancement, competitive gaming',
  image = 'https://vsharp.net/og-image.png',
  url = 'https://vsharp.net/',
  type = 'website',
  author = 'VSharp Team',
  publishedTime,
  modifiedTime,
  section = 'Gaming',
  tags = ['gaming', 'cheats', 'hacks', 'competitive'],
  locale = 'en_US',
  siteName = 'VSharp',
  twitterHandle = '@VSharpOfficial',
  noIndex = false,
  noFollow = false,
  structuredData,
  googleAnalyticsId,
  googleTagManagerId,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Robots meta tag
    const robotsContent = [];
    if (noIndex) robotsContent.push('noindex');
    else robotsContent.push('index');
    if (noFollow) robotsContent.push('nofollow');
    else robotsContent.push('follow');
    robotsContent.push('max-image-preview:large', 'max-snippet:-1', 'max-video-preview:-1');

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', robotsContent.join(', '));
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '7 days');
    updateMetaTag('rating', 'general');
    updateMetaTag('distribution', 'global');
    updateMetaTag('coverage', 'worldwide');
    updateMetaTag('target', 'all');
    updateMetaTag('audience', 'gamers, esports players, competitive gamers');
    updateMetaTag('subject', 'Gaming cheats and hacks for popular video games');
    updateMetaTag('copyright', `${author} ${new Date().getFullYear()}`);
    updateMetaTag('category', 'Gaming, Software, Entertainment');

    // Enhanced search engine meta tags
    updateMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:alt', `${siteName} - Premium Game Cheats and Hacks Platform`, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', locale, true);
    updateMetaTag('og:image:secure_url', image, true);
    updateMetaTag('og:image:type', 'image/png', true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);

    if (publishedTime) {
      updateMetaTag('article:published_time', publishedTime, true);
    }
    if (modifiedTime) {
      updateMetaTag('article:modified_time', modifiedTime, true);
      updateMetaTag('og:updated_time', modifiedTime, true);
    }
    if (section) {
      updateMetaTag('article:section', section, true);
    }
    if (tags.length > 0) {
      tags.forEach((tag) => {
        const tagMeta = document.createElement('meta');
        tagMeta.setAttribute('property', 'article:tag');
        tagMeta.setAttribute('content', tag);
        document.head.appendChild(tagMeta);
      });
    }

    updateMetaTag('article:author', author, true);
    updateMetaTag('article:publisher', url, true);

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', twitterHandle);
    updateMetaTag('twitter:creator', twitterHandle);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', `${siteName} - Premium Game Cheats and Hacks Platform`);
    updateMetaTag('twitter:url', url);

    // Enhanced Twitter meta tags
    updateMetaTag('twitter:app:name:iphone', siteName);
    updateMetaTag('twitter:app:name:ipad', siteName);
    updateMetaTag('twitter:app:name:googleplay', siteName);

    // Additional meta tags for better SEO
    updateMetaTag('theme-color', '#ad43f3');
    updateMetaTag('msapplication-TileColor', '#ad43f3');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Add hreflang links
    const hreflangEn = document.querySelector('link[hreflang="en"]') as HTMLLinkElement;
    if (!hreflangEn) {
      const hrefLang = document.createElement('link');
      hrefLang.setAttribute('rel', 'alternate');
      hrefLang.setAttribute('hreflang', 'en');
      hrefLang.setAttribute('href', url);
      document.head.appendChild(hrefLang);
    }

    // Add Google Analytics if provided
    if (googleAnalyticsId) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(gaScript);

      const gaConfig = document.createElement('script');
      gaConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `;
      document.head.appendChild(gaConfig);
    }

    // Add Google Tag Manager if provided
    if (googleTagManagerId) {
      const gtmScript = document.createElement('script');
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${googleTagManagerId}');
      `;
      document.head.appendChild(gtmScript);

      const gtmNoscript = document.createElement('noscript');
      gtmNoscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.appendChild(gtmNoscript);
    }

    // Add structured data if provided
    if (structuredData) {
      const existingScript = document.querySelector('script[data-seo-structured]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-structured', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function to remove dynamically added tags
    return () => {
      // Remove article tags
      const articleTags = document.querySelectorAll('meta[property="article:tag"]');
      articleTags.forEach((tag) => tag.remove());

      // Remove structured data
      const structuredScript = document.querySelector('script[data-seo-structured]');
      if (structuredScript) {
        structuredScript.remove();
      }

      // Remove analytics scripts
      const gaScripts = document.querySelectorAll('script[src*="googletagmanager"]');
      gaScripts.forEach((script) => script.remove());

      const gtmNoscript = document.querySelector('noscript iframe[src*="googletagmanager"]');
      if (gtmNoscript?.parentElement) {
        gtmNoscript.parentElement.remove();
      }
    };
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
    locale,
    siteName,
    twitterHandle,
    noIndex,
    noFollow,
    structuredData,
    googleAnalyticsId,
    googleTagManagerId,
  ]);

  return null;
};

export default SEOHead;
