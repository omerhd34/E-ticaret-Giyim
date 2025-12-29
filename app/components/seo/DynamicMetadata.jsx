"use client";
import { useEffect } from "react";

export default function DynamicMetadata({ title, description, keywords, ogImage, canonical }) {
 useEffect(() => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');

  // Title
  if (title) {
   const fullTitle = title.includes('|') ? title : `${title} | Yazıcı Ticaret`;
   document.title = fullTitle;

   // Meta title
   let titleMeta = document.querySelector('meta[property="og:title"]');
   if (!titleMeta) {
    titleMeta = document.createElement('meta');
    titleMeta.setAttribute('property', 'og:title');
    document.head.appendChild(titleMeta);
   }
   titleMeta.setAttribute('content', fullTitle);
  }

  // Description
  if (description) {
   let descMeta = document.querySelector('meta[name="description"]');
   if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
   }
   descMeta.setAttribute('content', description);

   // OG Description
   let ogDescMeta = document.querySelector('meta[property="og:description"]');
   if (!ogDescMeta) {
    ogDescMeta = document.createElement('meta');
    ogDescMeta.setAttribute('property', 'og:description');
    document.head.appendChild(ogDescMeta);
   }
   ogDescMeta.setAttribute('content', description);
  }

  // Keywords
  if (keywords && keywords.length > 0) {
   let keywordsMeta = document.querySelector('meta[name="keywords"]');
   if (!keywordsMeta) {
    keywordsMeta = document.createElement('meta');
    keywordsMeta.setAttribute('name', 'keywords');
    document.head.appendChild(keywordsMeta);
   }
   keywordsMeta.setAttribute('content', Array.isArray(keywords) ? keywords.join(', ') : keywords);
  }

  // OG Image
  if (ogImage) {
   const imageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
   let ogImageMeta = document.querySelector('meta[property="og:image"]');
   if (!ogImageMeta) {
    ogImageMeta = document.createElement('meta');
    ogImageMeta.setAttribute('property', 'og:image');
    document.head.appendChild(ogImageMeta);
   }
   ogImageMeta.setAttribute('content', imageUrl);
  }

  // Canonical
  if (canonical) {
   const canonicalUrl = canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`;
   let canonicalLink = document.querySelector('link[rel="canonical"]');
   if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
   }
   canonicalLink.setAttribute('href', canonicalUrl);
  }

  return () => {
   // Cleanup yapılabilir, ama genellikle gerekli değil
  };
 }, [title, description, keywords, ogImage, canonical]);

 return null;
}

