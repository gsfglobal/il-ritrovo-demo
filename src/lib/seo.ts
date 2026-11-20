import type { Metadata } from 'next';

const BP = process.env.NEXT_PUBLIC_BASE_PATH || '';
import { SITE_URL, business, hours, ratings, DEMO_MODE, type Lang } from '@/content/site';
import { routes, type RouteKey } from '@/content/i18n';

export function meta(key: RouteKey, lang: Lang, title: string, description: string): Metadata {
  const path = routes[key][lang];
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,
      languages: { it: routes[key].it, en: routes[key].en, 'x-default': routes[key].it },
    },
    openGraph: {
      type: 'website',
      siteName: 'Il Ritrovo Mamoiada',
      locale: lang === 'it' ? 'it_IT' : 'en_GB',
      url: path,
      title,
      description,
      images: [{ url: `${BP}/og.png`, width: 1200, height: 630, alt: 'Il Ritrovo — Mamoiada' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${BP}/og.png`] },
    // In demo non indicizzare: la proposta non è il sito ufficiale.
    icons: { icon: `${BP}/icon.svg` },
    robots: DEMO_MODE ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function restaurantJsonLd(lang: Lang) {
  const g = ratings.find((r) => r.source === 'Tripadvisor');
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: business.name,
    url: SITE_URL + routes.home[lang],
    telephone: '+393885683057',
    email: business.email,
    priceRange: business.priceRange,
    servesCuisine: ['Sarda', 'Italiana', 'Pizza'],
    acceptsReservations: true,
    hasMenu: SITE_URL + routes.menu[lang],
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      postalCode: business.postalCode,
      addressLocality: business.city,
      addressRegion: business.province,
      addressCountry: business.country,
    },
    openingHoursSpecification: hours.schema.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    ...(g ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: g.value, reviewCount: g.count, bestRating: 5 } } : {}),
    sameAs: [business.tripadvisor],
  };
}
