import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title, 
  description = "Filmer SB - Turning Moments into Cinematic Stories. Freelance video editor specializing in weddings, reels, and cinematic edits.",
  image = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?q=80&w=1200&auto=format&fit=crop",
  url = "https://filmersb.com"
}: SEOProps) {
  const siteTitle = `${title} | Filmer SB`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Filmer SB" />
      <meta name="owner" content="Filmer SB" />
      <meta name="developer" content="conceptualcode" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
