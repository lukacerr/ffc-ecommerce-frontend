import theme from '@/theme';
import { Helmet } from 'react-helmet-async';

export interface IMetadataProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  ogVideo?: string;
  twitterCard?: string;
  favicon?: string;
  themeColor?: string;
  author?: string;
  robots?: string;
  lang?: string;
  additionalMetaTags?: React.ReactNode;
}

import logoPng from '@/assets/logo.png';

export default function Metadata({
  title,
  description = '',
  keywords = '',
  canonicalUrl = location.origin,
  ogImage = logoPng,
  ogType = 'website',
  ogVideo = '',
  twitterCard = 'summary_large_image',
  favicon = logoPng,
  themeColor = theme.palette.primary.main,
  author = 'Fútbol Fan Club',
  robots = 'index,follow',
  lang = 'es',
  additionalMetaTags,
}: IMetadataProps) {
  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Title and basic SEO */}
      <title>{title} | FFC E-Commerce</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Meta Tags for Social Sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogVideo && <meta property="og:video" content={ogVideo} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Favicon */}
      <link rel="icon" href={favicon} />

      {/* Theme Color for Mobile Browsers */}
      <meta name="theme-color" content={themeColor} />

      {/* Robots and Author Meta Tags */}
      <meta name="robots" content={robots} />
      <meta name="author" content={author} />

      {/* Additional Meta Tags */}
      {additionalMetaTags}
    </Helmet>
  );
}
