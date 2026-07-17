import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://unndebatesociety.xyz/sitemap.xml', // Explicitly links your generated sitemap
  };
}