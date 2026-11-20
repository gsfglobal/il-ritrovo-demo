import { DEMO_MODE, type Lang } from '@/content/site';
import { t } from '@/content/i18n';

export function DemoBanner({ lang }: { lang: Lang }) {
  if (!DEMO_MODE) return null;
  return (
    <div role="note" className="fixed inset-x-0 top-0 z-50 flex h-[var(--demo-h)] items-center justify-center bg-ink px-4 text-center text-[11px] font-medium leading-tight text-stone">
      <span className="mr-2 rounded-sm bg-bronze px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink">Demo</span>
      {t(lang).demoBanner}
    </div>
  );
}
