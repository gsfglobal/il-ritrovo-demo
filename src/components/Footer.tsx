import Link from 'next/link';
import { business, directionsUrl, hours, DEMO_MODE, type Lang } from '@/content/site';
import { href, nav, t } from '@/content/i18n';
import { Monogram, MotifBand } from './Motif';
import { ToConfirm } from './ToConfirm';

export function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <footer className="relative bg-ink pb-28 pt-0 text-stone md:pb-10">
      <MotifBand className="text-bronze/40" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 text-cream">
            <Monogram className="h-12 w-12" />
            <span className="display text-4xl">Il Ritrovo</span>
          </div>
          <p className="mt-5 max-w-xs font-serif text-xl italic leading-snug text-stone/80">
            {lang === 'it' ? 'Il cuore della Barbagia. Il sapore della tradizione.' : 'The heart of Barbagia. The taste of tradition.'}
          </p>
          <Link href={`${href('contact', lang)}#prenota`} className="btn-primary mt-8">{d.book}</Link>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="eyebrow mb-4 text-bronze">{lang === 'it' ? 'Esplora' : 'Explore'}</p>
          <ul className="space-y-2.5 text-sm">
            {nav.map((k) => (<li key={k}><Link href={href(k, lang)} className="hover:text-cream">{d.nav[k]}</Link></li>))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-3">
          <p className="eyebrow mb-4 text-bronze">{d.address}</p>
          <p className="text-sm leading-relaxed">{business.street}<br />{business.postalCode} {business.city} ({business.province})<br />{business.region}, Italia</p>
          <a href={directionsUrl} target="_blank" rel="noopener" className="link-u mt-2 inline-block text-sm text-cream">{d.directions}</a>
          <p className="eyebrow mb-2 mt-6 text-bronze">{d.phone}</p>
          <a href={business.phoneHref} className="text-sm text-cream hover:text-bronze">{business.phoneDisplay}</a>
          <p className="eyebrow mb-2 mt-6 text-bronze">{d.email}</p>
          <a href={`mailto:${business.email}`} className="break-all text-sm hover:text-cream">{business.email}</a>
          <ToConfirm lang={lang} show={!business.emailVerified} />
        </address>

        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-bronze">{d.hours}<ToConfirm lang={lang} show={!hours.verified} /></p>
          <dl className="space-y-2 text-sm">
            {hours.rows.map((r) => (
              <div key={r.day.it} className="flex justify-between gap-4 border-b border-stone/10 pb-2">
                <dt>{r.day[lang]}</dt><dd className={r.closed ? 'text-stone/50' : 'text-cream'}>{r.value[lang]}</dd>
              </div>
            ))}
          </dl>
          {business.socials.length === 0 && DEMO_MODE && (
            <p className="mt-6 text-xs text-stone/50">{lang === 'it' ? 'Social ufficiali: da collegare dopo verifica.' : 'Official social profiles: to be linked after verification.'}</p>
          )}
        </div>
      </div>
      <div className="wrap flex flex-col gap-3 border-t border-stone/10 pt-6 text-xs text-stone/50 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Il Ritrovo · Mamoiada (NU) · {lang === 'it' ? 'P.IVA da inserire' : 'VAT no. to be added'}</p>
        <p className="flex gap-5">
          <Link href={href('privacy', lang)} className="hover:text-cream">{d.nav.privacy}</Link>
          <Link href={href('cookie', lang)} className="hover:text-cream">{d.nav.cookie}</Link>
          <Link href={href('home', lang === 'it' ? 'en' : 'it')} className="hover:text-cream">{d.langSwitch}</Link>
        </p>
      </div>
    </footer>
  );
}
