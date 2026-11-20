import Link from 'next/link';
import { ArrowRight, ArrowDown, Phone, MapPin, CalendarDays, Clock } from 'lucide-react';
import { business, dishes, directionsUrl, hours, type Lang } from '@/content/site';
import { href, t } from '@/content/i18n';
import { Scene3D } from './three/Scene3D';
import { Signature } from './three/Signature';
import { MotifBand } from './Motif';
import { PhotoSlot } from './PhotoSlot';
import { ToConfirm } from './ToConfirm';
import { DailyMenu } from './MenuView';
import { Gallery } from './Gallery';
import { RatingBadges, ReviewCards } from './Reviews';
import { MapConsent } from './MapConsent';
import { BookingForm } from './BookingForm';

const c = {
  it: {
    heroEyebrow: 'Ristorante · Pizzeria · Mamoiada',
    heroTitle: <>La Barbagia<br />si racconta <em className="text-bronze">a tavola.</em></>,
    heroSub: 'Nel cuore di Mamoiada, la cucina tradizionale sarda incontra il piacere di stare insieme.',
    scroll: 'Scorri',
    welcomeEyebrow: '02 — Benvenuti al Ritrovo',
    welcomeTitle: <>Una casa sarda,<br /><em>aperta a tutti.</em></>,
    welcomeP1: 'Sul Corso di Mamoiada, Il Ritrovo accoglie come si fa in Barbagia: una sala che gli ospiti descrivono come una tipica casa sarda, calda e curata, e un titolare che passa ai tavoli a consigliare i piatti.',
    welcomeP2: 'Qui si viene per mangiare bene e senza fretta — porzioni generose, prezzi onesti, cucina di casa e pizza, a pranzo e a cena.',
    welcomeFacts: [['4,5', 'su Tripadvisor e Google'], ['6/7', 'giorni aperti, lunedì chiuso'], ['€', 'fascia di prezzo accessibile']],
    flavorsEyebrow: '03 — I sapori della Barbagia',
    flavorsTitle: <>Piatti di casa,<br /><em>ricette di paese.</em></>,
    flavorsIntro: 'I piatti citati più spesso dagli ospiti. Il menu cambia con le stagioni: chiedi in sala cosa c’è oggi.',
    sigEyebrow: '04 — Signature',
    sigTitle: 'Tre piatti che raccontano il Ritrovo',
    menuEyebrow: '05 — Il nostro menu',
    menuTitle: <>Antipasti, primi, secondi,<br /><em>pizza e dolci.</em></>,
    menuCta: 'Vedi il menu completo',
    mamEyebrow: '06 — La tradizione di Mamoiada',
    mamTitle: <>Il paese dei<br /><em>Mamuthones.</em></>,
    mamP: 'Mamoiada, circa 2.500 abitanti nella Barbagia di Ollolai, tra Gennargentu e Supramonte. Ogni 17 gennaio, per Sant’Antonio Abate, i Mamuthones e gli Issohadores escono per la prima volta dell’anno — Sa Prima Essida — danzando attorno ai fuochi accesi in ogni rione.',
    mamCta: 'Scopri Mamoiada',
    mamFacts: [['17 gen', 'Sant’Antonio e Sa Prima Essida'], ['15 km', 'da Nuoro'], ['Museo', 'delle Maschere Mediterranee']],
    wineEyebrow: '07 — Il vino del territorio',
    wineTitle: <>Mamoiada,<br /><em>paese del Cannonau.</em></>,
    wineP: 'Il paese è circondato da circa 350 ettari di vigneti, dove il Cannonau, vitigno autoctono, fa da protagonista. Un vino che racconta il granito, il vento e le mani di chi lo coltiva.',
    wineNote: 'Carta dei vini del Ritrovo: da ricevere dal locale prima della pubblicazione.',
    galEyebrow: '08 — Gallery',
    galTitle: 'Dentro il Ritrovo',
    galCta: 'Apri la gallery',
    revEyebrow: '09 — Le recensioni degli ospiti',
    revTitle: <>Quello che dicono<br /><em>gli ospiti.</em></>,
    bookEyebrow: '10 — Prenota il tuo tavolo',
    bookTitle: <>Ti aspettiamo<br /><em>a tavola.</em></>,
    bookP: 'Il modo più rapido è una telefonata. Puoi anche inviare una richiesta: il ristorante ti ricontatterà per confermare.',
    whereEyebrow: '11 — Dove siamo',
    whereTitle: 'Sul Corso, nel centro di Mamoiada',
    whereP: 'Al numero 101 di Corso Vittorio Emanuele III, la strada principale del paese. A pochi minuti a piedi dal Museo delle Maschere Mediterranee (Piazza Europa).',
    parking: 'Parcheggio: indicazioni da confermare con il titolare.',
  },
  en: {
    heroEyebrow: 'Restaurant · Pizzeria · Mamoiada',
    heroTitle: <>Barbagia tells<br />its story <em className="text-bronze">at the table.</em></>,
    heroSub: 'In the heart of Mamoiada, traditional Sardinian cooking meets the pleasure of being together.',
    scroll: 'Scroll',
    welcomeEyebrow: '02 — Welcome to Il Ritrovo',
    welcomeTitle: <>A Sardinian home,<br /><em>open to everyone.</em></>,
    welcomeP1: 'On Mamoiada’s main street, Il Ritrovo welcomes you the Barbagia way: a dining room guests describe as a typical Sardinian house, warm and well kept, and an owner who comes to the table to suggest dishes.',
    welcomeP2: 'People come here to eat well and unhurried — generous portions, honest prices, home cooking and pizza, for lunch and dinner.',
    welcomeFacts: [['4.5', 'on Tripadvisor and Google'], ['6/7', 'days open, closed Mondays'], ['€', 'affordable price range']],
    flavorsEyebrow: '03 — The flavours of Barbagia',
    flavorsTitle: <>Home cooking,<br /><em>village recipes.</em></>,
    flavorsIntro: 'The dishes guests mention most. The menu follows the seasons: ask what’s on today.',
    sigEyebrow: '04 — Signature',
    sigTitle: 'Three dishes that tell Il Ritrovo',
    menuEyebrow: '05 — Our menu',
    menuTitle: <>Starters, pasta, mains,<br /><em>pizza and desserts.</em></>,
    menuCta: 'See the full menu',
    mamEyebrow: '06 — The tradition of Mamoiada',
    mamTitle: <>The village of<br /><em>the Mamuthones.</em></>,
    mamP: 'Mamoiada, about 2,500 people in the Barbagia of Ollolai, between the Gennargentu and the Supramonte. Every 17 January, for Sant’Antonio Abate, the Mamuthones and Issohadores make their first outing of the year — Sa Prima Essida — dancing around bonfires lit in every district.',
    mamCta: 'Discover Mamoiada',
    mamFacts: [['17 Jan', 'Sant’Antonio & Sa Prima Essida'], ['15 km', 'from Nuoro'], ['Museum', 'of Mediterranean Masks']],
    wineEyebrow: '07 — Wine of the land',
    wineTitle: <>Mamoiada,<br /><em>village of Cannonau.</em></>,
    wineP: 'The village is surrounded by some 350 hectares of vineyards, where native Cannonau takes the lead. A wine that speaks of granite, wind and the hands that tend it.',
    wineNote: 'Il Ritrovo’s wine list: to be received from the restaurant before publication.',
    galEyebrow: '08 — Gallery',
    galTitle: 'Inside Il Ritrovo',
    galCta: 'Open the gallery',
    revEyebrow: '09 — Guest reviews',
    revTitle: <>What our<br /><em>guests say.</em></>,
    bookEyebrow: '10 — Book your table',
    bookTitle: <>We’ll save you<br /><em>a seat.</em></>,
    bookP: 'The quickest way is a phone call. You can also send a request: the restaurant will call you back to confirm.',
    whereEyebrow: '11 — Find us',
    whereTitle: 'On the Corso, in the centre of Mamoiada',
    whereP: 'At number 101 Corso Vittorio Emanuele III, the village’s main street. A few minutes’ walk from the Museum of Mediterranean Masks (Piazza Europa).',
    parking: 'Parking: details to be confirmed with the owner.',
  },
};

export function HomePage({ lang }: { lang: Lang }) {
  const x = c[lang];
  const d = t(lang);
  const sig = (['malloreddus', 'seadas', 'tagliere'] as const).map((id, i) => {
    const dish = dishes.find((v) => v.id === id)!;
    return { n: `0${i + 1}`, title: dish.name[lang], sard: dish.sardinian, text: dish.description[lang] };
  });

  return (
    <>
      {/* 01 — HERO */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0"><Scene3D /></div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/10 md:bg-gradient-to-r md:from-charcoal md:via-charcoal/70 md:to-transparent" />
        <div className="grain pointer-events-none absolute inset-0" aria-hidden />
        <div className="wrap relative flex h-full flex-col justify-end pb-28 pt-32 md:justify-center md:pb-0">
          <p className="eyebrow text-bronze" data-reveal>{x.heroEyebrow}</p>
          <h1 className="display mt-5 max-w-3xl text-[3.4rem] sm:text-7xl lg:text-[7.5rem]" data-reveal data-delay=".1">{x.heroTitle}</h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-stone md:text-xl" data-reveal data-delay=".2">{x.heroSub}</p>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal data-delay=".3">
            <Link href={`${href('contact', lang)}#prenota`} className="btn-primary"><CalendarDays size={16} /> {d.book}</Link>
            <Link href={href('kitchen', lang)} className="btn-ghost">{d.discover} <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-10 hidden items-center gap-6 text-sm text-stone/80 md:flex" data-reveal data-delay=".4">
            <span className="flex items-center gap-2"><MapPin size={14} /> {business.street}</span>
            <span className="flex items-center gap-2"><Clock size={14} /> {d.closedMonday}</span>
          </div>
        </div>
        <a href="#benvenuti" className="absolute bottom-8 right-6 hidden flex-col items-center gap-2 text-[10px] uppercase tracking-widest2 text-stone/70 md:flex md:right-12">
          {x.scroll}<ArrowDown size={16} className="animate-bounce" />
        </a>
      </section>

      {/* 02 — BENVENUTI */}
      <section id="benvenuti" className="relative py-24 md:py-36">
        <div className="wrap grid items-center gap-14 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <div data-parallax="70"><PhotoSlot lang={lang} label={lang === 'it' ? 'La sala del Ritrovo' : 'The dining room'} tone="terracotta" className="aspect-[4/5] rounded-[2rem]" /></div>
            <div className="absolute -bottom-8 -right-4 hidden w-40 rotate-3 md:block" data-parallax="-40">
              <PhotoSlot lang={lang} label="Seadas" tone="bronze" className="aspect-square rounded-2xl shadow-2xl" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-terracotta" data-reveal>{x.welcomeEyebrow}</p>
            <h2 className="display mt-5 text-5xl md:text-7xl" data-reveal>{x.welcomeTitle}</h2>
            <p className="mt-8 text-lg leading-relaxed text-charcoal/80" data-reveal>{x.welcomeP1}</p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal/80" data-reveal>{x.welcomeP2}</p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-charcoal/15 pt-8">
              {x.welcomeFacts.map(([a, b], i) => (
                <div key={b} data-reveal data-delay={i * 0.1}><dt className="display text-4xl text-cannonau md:text-5xl">{a}</dt><dd className="mt-1 text-xs leading-snug text-charcoal/60">{b}</dd></div>
              ))}
            </dl>
            <Link href={href('about', lang)} className="link-u mt-8 inline-flex items-center gap-2 text-sm font-semibold">{d.nav.about} <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* 03 — SAPORI */}
      <section className="bg-stone/40 py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <div>
              <p className="eyebrow text-terracotta" data-reveal>{x.flavorsEyebrow}</p>
              <h2 className="display mt-5 text-5xl md:text-7xl" data-reveal>{x.flavorsTitle}</h2>
            </div>
            <p className="max-w-md text-lg text-charcoal/70 md:justify-self-end" data-reveal>{x.flavorsIntro}</p>
          </div>
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish, i) => (
              <li key={dish.id} data-reveal data-delay={(i % 3) * 0.1} className="group overflow-hidden rounded-2xl bg-cream">
                <PhotoSlot lang={lang} label={dish.name[lang]} tone={dish.tone} className="aspect-[4/3] transition duration-700 group-hover:scale-[1.03]" />
                <div className="p-6">
                  <h3 className="display text-3xl">{dish.name[lang]}<ToConfirm lang={lang} show={!dish.verified} /></h3>
                  <p className="mt-3 leading-relaxed text-charcoal/75">{dish.description[lang]}</p>
                  <p className="mt-4 text-xs uppercase tracking-wider text-olive">{dish.ingredients[lang]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — SIGNATURE 3D */}
      <Signature lang={lang} panels={sig} eyebrow={x.sigEyebrow} heading={x.sigTitle} />

      {/* 05 — MENU */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-terracotta" data-reveal>{x.menuEyebrow}</p>
            <h2 className="display mt-5 text-5xl md:text-6xl" data-reveal>{x.menuTitle}</h2>
            <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
              {['Antipasti', lang === 'it' ? 'Primi' : 'Pasta', lang === 'it' ? 'Secondi' : 'Mains', 'Pizza', lang === 'it' ? 'Dolci' : 'Desserts', lang === 'it' ? 'Vini' : 'Wine'].map((k) => (
                <li key={k} className="rounded-full border border-charcoal/15 px-4 py-2 text-sm">{k}</li>
              ))}
            </ul>
            <Link href={href('menu', lang)} className="btn-dark mt-10" data-reveal>{x.menuCta} <ArrowRight size={16} /></Link>
          </div>
          <div className="md:col-span-6 md:col-start-7" data-reveal><DailyMenu lang={lang} /></div>
        </div>
      </section>

      {/* 06 — MAMOIADA */}
      <section className="relative overflow-hidden bg-cannonau py-24 text-cream md:py-36">
        <div className="grain absolute inset-0" aria-hidden />
        <MaskMark className="pointer-events-none absolute -right-20 top-10 h-[34rem] w-[34rem] text-cream/[0.06] md:right-10" />
        <div className="wrap relative grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-stone" data-reveal>{x.mamEyebrow}</p>
            <h2 className="display mt-5 text-5xl md:text-8xl" data-reveal>{x.mamTitle}</h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/85" data-reveal>{x.mamP}</p>
            <Link href={href('mamoiada', lang)} className="btn-ghost mt-10" data-reveal>{x.mamCta} <ArrowRight size={16} /></Link>
          </div>
          <dl className="grid content-end gap-6 md:col-span-4 md:col-start-9">
            {x.mamFacts.map(([a, b], i) => (
              <div key={b} className="border-t border-cream/20 pt-4" data-reveal data-delay={i * 0.1}><dt className="display text-5xl text-stone">{a}</dt><dd className="mt-1 text-sm text-cream/70">{b}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* 07 — VINO */}
      <section className="py-24 md:py-36">
        <div className="wrap grid items-center gap-14 md:grid-cols-2">
          <div className="relative order-2 md:order-1" data-reveal>
            <VineyardArt />
          </div>
          <div className="order-1 md:order-2">
            <p className="eyebrow text-terracotta" data-reveal>{x.wineEyebrow}</p>
            <h2 className="display mt-5 text-5xl md:text-7xl" data-reveal>{x.wineTitle}</h2>
            <p className="mt-8 text-lg leading-relaxed text-charcoal/80" data-reveal>{x.wineP}</p>
            <p className="mt-6 text-sm text-charcoal/60" data-reveal>{x.wineNote}<ToConfirm lang={lang} /></p>
          </div>
        </div>
      </section>

      {/* 08 — GALLERY */}
      <section className="bg-charcoal py-24 text-cream md:py-32">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-bronze" data-reveal>{x.galEyebrow}</p>
              <h2 className="display mt-5 text-5xl md:text-7xl" data-reveal>{x.galTitle}</h2>
            </div>
            <Link href={href('gallery', lang)} className="btn-ghost">{x.galCta} <ArrowRight size={16} /></Link>
          </div>
          <Gallery lang={lang} />
        </div>
      </section>

      {/* 09 — RECENSIONI */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="eyebrow text-terracotta" data-reveal>{x.revEyebrow}</p>
              <h2 className="display mt-5 text-5xl md:text-7xl" data-reveal>{x.revTitle}</h2>
            </div>
            <div data-reveal className="md:justify-self-end"><RatingBadges lang={lang} /></div>
          </div>
          <div className="mt-14"><ReviewCards lang={lang} limit={3} /></div>
          <Link href={href('reviews', lang)} className="link-u mt-6 inline-flex items-center gap-2 text-sm font-semibold">{d.allReviews} <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* 10 — PRENOTA */}
      <section id="prenota-home" className="relative overflow-hidden bg-terracotta py-24 text-cream md:py-32">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="wrap relative grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-stone" data-reveal>{x.bookEyebrow}</p>
            <h2 className="display mt-5 text-5xl md:text-7xl" data-reveal>{x.bookTitle}</h2>
            <p className="mt-6 max-w-sm text-lg text-cream/85" data-reveal>{x.bookP}</p>
            <div className="mt-10 flex flex-col gap-3 sm:max-w-xs" data-reveal>
              <a href={business.phoneHref} className="btn bg-cream text-charcoal hover:bg-ink hover:text-cream"><Phone size={16} /> {d.call}</a>
              <a href={directionsUrl} target="_blank" rel="noopener" className="btn-ghost"><MapPin size={16} /> {d.viewMap}</a>
            </div>
          </div>
          <div className="rounded-[2rem] bg-cream p-6 text-charcoal shadow-2xl md:col-span-7 md:p-10" data-reveal>
            <p className="display mb-6 text-3xl">{d.requestBooking}</p>
            <BookingForm lang={lang} />
          </div>
        </div>
      </section>

      {/* 11 — DOVE SIAMO */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-terracotta" data-reveal>{x.whereEyebrow}</p>
            <h2 className="display mt-5 text-5xl md:text-6xl" data-reveal>{x.whereTitle}</h2>
            <p className="mt-6 leading-relaxed text-charcoal/75" data-reveal>{x.whereP}</p>
            <dl className="mt-10 space-y-6 text-sm">
              <div><dt className="eyebrow text-olive">{d.address}</dt><dd className="mt-2 text-base">{business.street}<br />{business.postalCode} {business.city} ({business.province})</dd></div>
              <div><dt className="eyebrow text-olive">{d.phone}</dt><dd className="mt-2 text-base"><a className="link-u" href={business.phoneHref}>{business.phoneDisplay}</a></dd></div>
              <div>
                <dt className="eyebrow text-olive">{d.hours}<ToConfirm lang={lang} show={!hours.verified} /></dt>
                <dd className="mt-2 space-y-1 text-base">{hours.rows.map((r) => <p key={r.day.it}><span className="text-charcoal/60">{r.day[lang]}:</span> {r.value[lang]}</p>)}</dd>
              </div>
              <div><dt className="eyebrow text-olive">Parking</dt><dd className="mt-2 text-charcoal/70">{x.parking}<ToConfirm lang={lang} /></dd></div>
            </dl>
            <a href={directionsUrl} target="_blank" rel="noopener" className="btn-dark mt-10"><MapPin size={16} /> {d.directions}</a>
          </div>
          <div className="md:col-span-7" data-reveal><MapConsent lang={lang} /></div>
        </div>
      </section>
      <MotifBand className="text-terracotta/40" />
    </>
  );
}

/** Segno grafico astratto ispirato alla maschera lignea (non riproduce una maschera reale). */
function MaskMark({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 260" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M100 10 C 160 10 185 70 180 130 C 175 200 140 250 100 250 C 60 250 25 200 20 130 C 15 70 40 10 100 10 Z" />
      <path d="M55 105 Q 75 90 92 108" /><path d="M108 108 Q 125 90 145 105" />
      <ellipse cx="73" cy="115" rx="12" ry="7" /><ellipse cx="127" cy="115" rx="12" ry="7" />
      <path d="M100 120 L 92 170 Q 100 178 108 170 Z" />
      <path d="M70 200 Q 100 215 130 200" />
      {Array.from({ length: 9 }).map((_, i) => <circle key={i} cx={40 + i * 15} cy={262} r="6" />)}
    </svg>
  );
}

function VineyardArt() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#e7c79a] via-[#c58b5c] to-[#692d35]">
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
        <circle cx="290" cy="150" r="56" fill="#f7f0e3" opacity=".75" />
        <path d="M0 230 C 90 190 170 210 250 185 S 360 170 400 180 L400 500 L0 500 Z" fill="#8c6a4c" opacity=".55" />
        <path d="M0 270 C 120 240 220 265 400 235 L400 500 L0 500 Z" fill="#626448" />
        {Array.from({ length: 9 }).map((_, row) => (
          <g key={row}>
            {Array.from({ length: 14 }).map((_, col) => {
              const y = 300 + row * row * 3.4 + row * 10;
              const spread = 1 + row * 0.22;
              const x = 200 + (col - 6.5) * 30 * spread;
              const s = 2 + row * 0.9;
              return <circle key={col} cx={x} cy={y} r={s} fill="#3f4130" />;
            })}
          </g>
        ))}
      </svg>
      <div className="grain absolute inset-0" />
      <p className="absolute bottom-6 left-6 font-serif text-2xl italic text-cream">Cannonau · Mamoiada</p>
    </div>
  );
}
