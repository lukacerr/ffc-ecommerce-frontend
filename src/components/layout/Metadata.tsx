import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface IMetadataProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export default function Metadata({
  title,
  description = '',
  keywords = '',
  canonicalUrl = '',
  ogImage = '',
  ogType = 'website',
  twitterCard = 'summary_large_image',
}: React.PropsWithoutRef<IMetadataProps>) {
  return (
    <Helmet>
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

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
}
