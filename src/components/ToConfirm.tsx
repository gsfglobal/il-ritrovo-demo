import { DEMO_MODE, type Lang } from '@/content/site';
import { t } from '@/content/i18n';

export function ToConfirm({ lang, show = true, className = '' }: { lang: Lang; show?: boolean; className?: string }) {
  if (!DEMO_MODE || !show) return null;
  return (
    <span className={`ml-2 inline-flex items-center rounded-full border border-dashed border-terracotta/70 px-2 py-0.5 align-middle font-sans text-[10px] font-semibold uppercase tracking-wider text-terracotta ${className}`}>
      {t(lang).toConfirm}
    </span>
  );
}
