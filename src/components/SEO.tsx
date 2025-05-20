import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Centro - Service Solutions",
  description = "Centro is a global provider of Telecommunications and IT engineering services for project delivery, management of network operations, business support...",
  image = "https://www.centroservices.com/assets/logo/centro-logo.jpg",
  url = "https://www.centroservices.com/"
}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Twitter Card data */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      
      {/* Open Graph data */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Preload resources */}
      <link rel="preload" as="font" href="/assets/fonts/open-iconic.woff" type="font/woff" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="/assets/fonts/open-iconic.otf" type="font/otf" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="/assets/fonts/open-sans-regular.woff" type="font/woff" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="/assets/fonts/open-sans-regular.woff2" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="/assets/fonts/open-sans-bold.woff" type="font/woff" crossOrigin="anonymous" />
      <link rel="preload" as="font" href="/assets/fonts/open-sans-bold.woff2" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="style" href="https://www.centroservices.com/css/sitev1_2.css" />
      <link rel="preload" as="script" href="https://www.centroservices.com/js/site.js" />
      <link rel="preload" as="script" href="https://www.centroservices.com/js/jquery.mobile.custom.min.js" />
      
      {/* Canonical link */}
      <link rel="canonical" href={url} />
      
      {/* Favicon and App Icons */}
      <link rel="icon" href="/assets/icon/favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/icon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/icon/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/icon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/assets/icon/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/assets/icon/android-chrome-512x512.png" />
      
      {/* Web Manifest */}
      <link rel="manifest" href="/assets/icon/site.webmanifest" />
      
      {/* Theme Colors from webmanifest */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      
      {/* Google site verification */}
      <meta name="google-site-verification" content="xxMHWVhBDDcrhtnT3ctfVEPLUmymr-tY-VH0lrvusOg" />
      
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-CN4CQ2JYBN"></script>
      <script>
        {`
        window.dataLayer = window.dataLayer || []; 
        function gtag(){dataLayer.push(arguments);} 
        gtag('js', new Date()); 
        gtag('config', 'G-CN4CQ2JYBN');
        `}
      </script>
    </Helmet>
  );
};

export default SEO;