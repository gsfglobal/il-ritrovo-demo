import Link from 'next/link';
import { Phone, CalendarDays } from 'lucide-react';
import { business, type Lang } from '@/content/site';
import { href, t } from '@/content/i18n';

/** Barra fissa su mobile: la CTA prenotazione è sempre a portata di pollice. */
export function MobileBookBar({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-charcoal/10 bg-cream/95 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <a href={business.phoneHref} className="btn-dark !py-3"><Phone size={16} /> {lang === 'it' ? 'Chiama' : 'Call'}</a>
      <Link href={`${href('contact', lang)}#prenota`} className="btn-primary !py-3"><CalendarDays size={16} /> {d.bookShort}</Link>
    </div>
  );
}
