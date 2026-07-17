import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://unndebatesociety.xyz'; // Swap to your staging URL (e.g., Vercel) while testing if needed

  // 1. Your static routes
  const routes = [
    '',          // Home page (https://unds.org)
    '/about',    // About page
    '/contact',  // Contact page
    '/events',   // Events or Tournaments
    '/gallery',  // Gallery page
    '/testimonials', // Testimonials page
    // Add more static routes as needed
  ];

  const staticSitemaps = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8, // Home page gets highest priority
  }));

  return [
    ...staticSitemaps,
    // If you have dynamic routes later (like blog posts or debate tournament records),
    // you can fetch them here and map them out similarly!
  ];
}