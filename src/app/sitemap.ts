import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';
import { routes } from '@/content/i18n';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(routes).flatMap((r) =>
    (['it', 'en'] as const).map((l) => ({
      url: SITE_URL + r[l],
      changeFrequency: 'monthly' as const,
      priority: r.it === '/' ? 1 : 0.7,
      alternates: { languages: { it: SITE_URL + r.it, en: SITE_URL + r.en } },
    })),
  );
}
