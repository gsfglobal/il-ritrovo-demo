import { DEMO_MODE, dailyMenu, menu, type Lang } from '@/content/site';
import { ToConfirm } from './ToConfirm';

export function DailyMenu({ lang }: { lang: Lang }) {
  if (!dailyMenu.enabled) return null;
  const empty = dailyMenu.items.length === 0;
  return (
    <aside className="relative overflow-hidden rounded-2xl bg-olive p-7 text-cream md:p-10" aria-labelledby="daily">
      <p className="eyebrow text-stone">{lang === 'it' ? 'Oggi in cucina' : 'Today in the kitchen'}</p>
      <h3 id="daily" className="display mt-3 text-4xl">{lang === 'it' ? 'Il menu del giorno' : 'Today’s menu'}</h3>
      {empty ? (
        <p className="mt-4 max-w-xl leading-relaxed text-cream/85">
          {lang === 'it'
            ? 'I piatti del giorno cambiano con la stagione e il mercato. Qui verranno pubblicati ogni giorno, con i prezzi, così sai sempre cosa ordini e quanto spendi.'
            : 'Daily dishes change with the season and the market. They will be published here every day, with prices, so you always know what you order and what you spend.'}
          {DEMO_MODE && <span className="mt-3 block text-sm text-stone">{lang === 'it' ? '→ Sezione aggiornabile dal titolare in 1 minuto (file content/site.ts o pannello CMS).' : '→ Owner-editable in one minute.'}</span>}
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-cream/15">
          {dailyMenu.items.map((it) => (
            <li key={it.name.it} className="flex justify-between gap-4 py-3"><span>{it.name[lang]}</span>{it.price && <span>€ {it.price}</span>}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export function MenuView({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
      {menu.map((cat) => (
        <section key={cat.id} id={cat.id} className="scroll-mt-40" aria-labelledby={`h-${cat.id}`} data-reveal>
          <h3 id={`h-${cat.id}`} className="display flex items-baseline gap-4 border-b border-charcoal/15 pb-3 text-4xl">
            {cat.title[lang]}
          </h3>
          <ul className="mt-2">
            {cat.items.map((it) => (
              <li key={it.name.it} className="flex items-baseline gap-3 border-b border-dashed border-charcoal/10 py-4">
                <span className="text-lg">{it.name[lang]}<ToConfirm lang={lang} show={!it.verified} /></span>
                <span aria-hidden className="flex-1" />
                <span className="text-sm text-charcoal/50">{it.price ? `€ ${it.price}` : DEMO_MODE ? (lang === 'it' ? 'prezzo da inserire' : 'price tbc') : ''}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
