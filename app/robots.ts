import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://unds-nigeria.vercel.app/sitemap.xml', // Explicitly links your generated sitemap
  };
}