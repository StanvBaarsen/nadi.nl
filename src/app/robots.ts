import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/_next/',
        '/.netlify/functions/',
        '/favicon.ico',
        '/site.webmanifest'
      ],
    },
  };
}
