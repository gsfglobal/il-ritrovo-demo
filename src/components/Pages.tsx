import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { business, dishes, directionsUrl, hours, menu, type Lang } from '@/content/site';
import { href, t } from '@/content/i18n';
import { PageHero } from './Shell';
import { PhotoSlot } from './PhotoSlot';
import { ToConfirm } from './ToConfirm';
import { DailyMenu, MenuView } from './MenuView';
import { Gallery } from './Gallery';
import { RatingBadges, ReviewCards } from './Reviews';
import { BookingForm } from './BookingForm';
import { MapConsent } from './MapConsent';

const it = (lang: Lang) => lang === 'it';

function CtaBand({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <section className="bg-charcoal py-20 text-cream">
      <div className="wrap flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="display text-4xl md:text-6xl">{it(lang) ? <>Ti aspettiamo <em className="text-bronze">a Mamoiada.</em></> : <>See you <em className="text-bronze">in Mamoiada.</em></>}</h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`${href('contact', lang)}#prenota`} className="btn-primary">{d.book}</Link>
          <a href={business.phoneHref} className="btn-ghost"><Phone size={16} /> {business.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CHI SIAMO ---------------- */
export function AboutPage({ lang }: { lang: Lang }) {
  const values = it(lang)
    ? [
        ['Ospitalità', 'Gli ospiti ricordano la gentilezza del personale, anche con le prenotazioni dell’ultimo minuto e con gli amici a quattro zampe.'],
        ['Abbondanza', 'Porzioni generose e prezzi onesti: è la frase che torna più spesso nelle recensioni.'],
        ['Tradizione', 'Cucina sarda di casa — malloreddus, culurgiones, seadas — insieme alla pizza, per tutta la famiglia.'],
      ]
    : [
        ['Hospitality', 'Guests remember the staff’s kindness, even for last-minute bookings and four-legged friends.'],
        ['Generosity', 'Generous portions and honest prices: the phrase that recurs most in reviews.'],
        ['Tradition', 'Sardinian home cooking — malloreddus, culurgiones, seadas — alongside pizza, for the whole family.'],
      ];
  return (
    <>
      <PageHero
        eyebrow={t(lang).nav.about}
        title={it(lang) ? <>Il luogo dove <em className="text-bronze">ritrovarsi.</em></> : <>The place to <em className="text-bronze">meet again.</em></>}
        intro={it(lang) ? 'Il Ritrovo è un ristorante e pizzeria sul Corso di Mamoiada. Una sala che ricorda una casa sarda, una cucina della tradizione, un titolare che consiglia i piatti al tavolo.' : 'Il Ritrovo is a restaurant and pizzeria on Mamoiada’s main street. A room that feels like a Sardinian home, traditional cooking, an owner who recommends dishes at the table.'}
      />
      <section className="py-24">
        <div className="wrap grid gap-14 md:grid-cols-2">
          <PhotoSlot lang={lang} label={it(lang) ? 'Il titolare in sala' : 'The owner in the dining room'} tone="olive" className="aspect-[4/5] rounded-[2rem]" />
          <div className="self-center">
            <h2 className="display text-5xl" data-reveal>{it(lang) ? 'La nostra storia' : 'Our story'}<ToConfirm lang={lang} /></h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/80" data-reveal>
              {it(lang)
                ? 'Anno di apertura, famiglia, persone in cucina e in sala: questa parte verrà scritta insieme al titolare. Non inventiamo una storia che non conosciamo — la raccontiamo con le sue parole.'
                : 'Opening year, family, the people in the kitchen and dining room: this part will be written with the owner. We don’t invent a story we don’t know — we’ll tell it in his words.'}
            </p>
            <ul className="mt-10 space-y-8">
              {values.map(([h, p], i) => (
                <li key={h} className="border-t border-charcoal/15 pt-6" data-reveal data-delay={i * 0.1}>
                  <h3 className="display text-3xl text-cannonau">{h}</h3>
                  <p className="mt-2 text-charcoal/75">{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-stone/40 py-20"><div className="wrap"><RatingBadges lang={lang} /></div></section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- LA NOSTRA CUCINA ---------------- */
export function KitchenPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero
        eyebrow={t(lang).nav.kitchen}
        title={it(lang) ? <>La cucina di casa, <em className="text-bronze">in Barbagia.</em></> : <>Home cooking, <em className="text-bronze">in Barbagia.</em></>}
        intro={it(lang) ? 'Pasta fatta come una volta, salumi e formaggi del territorio, dolci della tradizione. E la pizza, per chi la desidera.' : 'Pasta made the old way, local cured meats and cheeses, traditional desserts. And pizza, for those who want it.'}
      />
      <section className="py-24">
        <div className="wrap space-y-24">
          {dishes.map((dish, i) => (
            <article key={dish.id} className="grid items-center gap-10 md:grid-cols-2">
              <div className={i % 2 ? 'md:order-2' : ''} data-reveal>
                <PhotoSlot lang={lang} label={dish.name[lang]} tone={dish.tone} className="aspect-[5/4] rounded-[2rem]" />
              </div>
              <div>
                {dish.sardinian && <p className="eyebrow text-terracotta" data-reveal>{dish.sardinian}</p>}
                <h2 className="display mt-3 text-5xl md:text-6xl" data-reveal>{dish.name[lang]}<ToConfirm lang={lang} show={!dish.verified} /></h2>
                <p className="mt-6 text-lg leading-relaxed text-charcoal/80" data-reveal>{dish.description[lang]}</p>
                <dl className="mt-8 grid gap-4 border-t border-charcoal/15 pt-6 text-sm sm:grid-cols-2" data-reveal>
                  <div><dt className="eyebrow text-olive">{it(lang) ? 'Ingredienti' : 'Ingredients'}</dt><dd className="mt-2">{dish.ingredients[lang]}</dd></div>
                  <div><dt className="eyebrow text-olive">{it(lang) ? 'Disponibilità' : 'Availability'}</dt><dd className="mt-2">{it(lang) ? 'Secondo stagione — chiedi in sala' : 'Seasonal — ask in the dining room'}</dd></div>
                </dl>
                <p className="mt-4 text-xs text-charcoal/50">{it(lang) ? 'Fonte' : 'Source'}: {dish.source}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- MENU ---------------- */
export function MenuPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero
        eyebrow="Menu"
        title={it(lang) ? <>Il nostro <em className="text-bronze">menu.</em></> : <>Our <em className="text-bronze">menu.</em></>}
        intro={it(lang) ? 'Le voci sono quelle citate dagli ospiti. Prezzi e carta completa verranno inseriti dal ristorante: nessun prezzo è stato inventato.' : 'Items are those mentioned by guests. Prices and the full list will be added by the restaurant: no price has been made up.'}
      />
      <section className="py-20">
        <div className="wrap">
          <nav aria-label="Categorie" className="sticky top-[calc(var(--demo-h,0px)+4rem)] z-20 -mx-5 mb-14 flex gap-2 overflow-x-auto bg-cream/95 px-5 py-3 backdrop-blur lg:top-[calc(var(--demo-h,0px)+5rem)]">
            {menu.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="shrink-0 rounded-full border border-charcoal/15 px-4 py-2 text-sm hover:border-terracotta">{cat.title[lang]}</a>
            ))}
          </nav>
          <div className="mb-16"><DailyMenu lang={lang} /></div>
          <MenuView lang={lang} />
          <p className="mt-16 max-w-2xl text-sm text-charcoal/60">
            {it(lang) ? 'Allergeni: informazioni disponibili in sala su richiesta (Reg. UE 1169/2011). Comunica eventuali intolleranze al momento della prenotazione.' : 'Allergens: information available on request (EU Reg. 1169/2011). Please mention any intolerances when booking.'}
          </p>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- MAMOIADA ---------------- */
export function MamoiadaPage({ lang }: { lang: Lang }) {
  const blocks = it(lang)
    ? [
        ['Mamoiada', 'Circa 2.500 abitanti nel cuore della Barbagia di Ollolai, al confine tra Gennargentu e Supramonte, a circa 15 km da Nuoro.'],
        ['Mamuthones e Issohadores', 'Sono le maschere tradizionali del paese. I Mamuthones, con pelli scure, campanacci e volto coperto da una maschera lignea nera, avanzano lenti su due file; gli Issohadores, in corpetto rosso e maschera bianca, guidano il corteo con la "soha", il laccio.'],
        ['Sant’Antonio e il Carnevale', 'Ogni 17 gennaio, per Sant’Antonio Abate, si celebra Sa Prima Essida, la prima uscita dell’anno delle maschere, che danzano intorno ai fuochi accesi nei rioni. Poi il Carnevale, uno dei più affascinanti d’Italia.'],
        ['Museo delle Maschere Mediterranee', 'In Piazza Europa 15, mette a confronto le maschere di Mamoiada con quelle di altri paesi del Mediterraneo. Una visita perfetta prima di pranzo.'],
        ['La cultura del vino', 'Circa 350 ettari di vigneti circondano il paese, con il Cannonau protagonista. Mamoiada è, a buon diritto, un paese del vino.'],
        ['Dolci di festa', 'Tra i dolci tipici legati alle ricorrenze ci sono le orulettas e s’aranzada.'],
      ]
    : [
        ['Mamoiada', 'About 2,500 people in the heart of the Barbagia of Ollolai, between the Gennargentu and the Supramonte, some 15 km from Nuoro.'],
        ['Mamuthones & Issohadores', 'The village’s traditional masks. The Mamuthones, in dark fleeces with cowbells and black wooden masks, move slowly in two rows; the Issohadores, in red jackets and white masks, lead the procession with the "soha", a lasso.'],
        ['Sant’Antonio & Carnival', 'Every 17 January, for Sant’Antonio Abate, Sa Prima Essida marks the masks’ first outing of the year, dancing around bonfires in each district. Then comes Carnival, one of Italy’s most captivating.'],
        ['Museum of Mediterranean Masks', 'At Piazza Europa 15, it compares Mamoiada’s masks with those of other Mediterranean countries. A perfect visit before lunch.'],
        ['Wine culture', 'Some 350 hectares of vineyards surround the village, with Cannonau in the lead. Mamoiada is, rightly, a wine village.'],
        ['Festive sweets', 'Typical festive sweets include orulettas and s’aranzada.'],
      ];
  return (
    <>
      <PageHero
        eyebrow={it(lang) ? 'Il territorio' : 'The land'}
        title={it(lang) ? <>Mamoiada, <em className="text-bronze">cuore della Barbagia.</em></> : <>Mamoiada, <em className="text-bronze">heart of Barbagia.</em></>}
        intro={it(lang) ? 'Un paese di tradizioni antiche, di maschere e di vigne. Ecco cosa scoprire prima — o dopo — un pranzo al Ritrovo.' : 'A village of ancient traditions, masks and vineyards. What to discover before — or after — lunch at Il Ritrovo.'}
      />
      <section className="py-24">
        <div className="wrap grid gap-x-16 gap-y-16 md:grid-cols-2">
          {blocks.map(([h, p], i) => (
            <article key={h} className="border-t border-charcoal/15 pt-8" data-reveal data-delay={(i % 2) * 0.1}>
              <p className="font-serif text-5xl italic text-terracotta/70">0{i + 1}</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">{h}</h2>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/75">{p}</p>
            </article>
          ))}
        </div>
        <div className="wrap mt-20 rounded-[2rem] bg-stone/50 p-8 text-sm text-charcoal/70 md:p-10">
          <p className="eyebrow mb-3 text-olive">{it(lang) ? 'Fonti' : 'Sources'}</p>
          <ul className="space-y-1">
            <li><a className="link-u" href="https://www.italia.it/it/sardegna/nuoro/mamoiada" target="_blank" rel="noopener">italia.it — Mamoiada</a></li>
            <li><a className="link-u" href="https://www.sardegnaturismo.it/it/esplora/museo-delle-maschere-del-mediterraneo" target="_blank" rel="noopener">Sardegna Turismo — Museo delle Maschere del Mediterraneo</a></li>
            <li><a className="link-u" href="https://museionline.info/musei/museo-delle-maschere-mediterranee" target="_blank" rel="noopener">MuseiOnline — Museo delle Maschere Mediterranee</a></li>
            <li><a className="link-u" href="https://www.gamberorosso.it/?p=118005" target="_blank" rel="noopener">Gambero Rosso — Mamoiada, paese del vino</a></li>
          </ul>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- GALLERY ---------------- */
export function GalleryPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero eyebrow="Gallery" title={it(lang) ? <>Dentro <em className="text-bronze">il Ritrovo.</em></> : <>Inside <em className="text-bronze">Il Ritrovo.</em></>}
        intro={it(lang) ? 'Le immagini definitive arriveranno da uno shooting autorizzato nel locale. Nessuna foto di altri ristoranti è attribuita al Ritrovo.' : 'Final images will come from an authorised shoot on site. No photo of other restaurants is attributed to Il Ritrovo.'} />
      <section className="py-20"><div className="wrap"><Gallery lang={lang} /></div></section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- RECENSIONI ---------------- */
export function ReviewsPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero eyebrow={t(lang).nav.reviews} title={it(lang) ? <>La parola <em className="text-bronze">agli ospiti.</em></> : <>Over to <em className="text-bronze">our guests.</em></>}
        intro={<RatingBadges lang={lang} dark />} />
      <section className="py-20">
        <div className="wrap">
          <ReviewCards lang={lang} />
          <div className="mt-14 flex flex-wrap gap-3">
            <a href={business.tripadvisor} target="_blank" rel="noopener" className="btn-dark">{it(lang) ? 'Tutte le recensioni su Tripadvisor' : 'All reviews on Tripadvisor'}</a>
            <a href={business.googleReviews} target="_blank" rel="noopener" className="btn border border-charcoal/20">{it(lang) ? 'Recensioni Google' : 'Google reviews'}</a>
          </div>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- CONTATTI ---------------- */
export function ContactPage({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <>
      <PageHero eyebrow={d.nav.contact} title={it(lang) ? <>Prenota <em className="text-bronze">il tuo tavolo.</em></> : <>Book <em className="text-bronze">your table.</em></>}
        intro={it(lang) ? 'Chiama il ristorante oppure invia una richiesta: verrai ricontattato per la conferma.' : 'Call the restaurant or send a request: you’ll be contacted to confirm.'} />
      <section id="prenota" className="scroll-mt-28 py-20">
        <div className="wrap grid gap-14 md:grid-cols-12">
          <div className="space-y-8 md:col-span-4">
            <a href={business.phoneHref} className="flex items-center gap-4 rounded-2xl bg-terracotta p-6 text-cream transition hover:bg-cannonau">
              <Phone /><span><span className="eyebrow block text-stone">{d.call}</span><span className="display text-3xl">{business.phoneDisplay}</span></span>
            </a>
            <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-terracotta" /><p>{business.street}<br />{business.postalCode} {business.city} ({business.province})<br /><a className="link-u text-sm font-semibold" href={directionsUrl} target="_blank" rel="noopener">{d.directions}</a></p></div>
            <div className="flex gap-4"><Mail className="mt-1 shrink-0 text-terracotta" /><p><a className="link-u break-all" href={`mailto:${business.email}`}>{business.email}</a><ToConfirm lang={lang} show={!business.emailVerified} /></p></div>
            <div className="flex gap-4"><Clock className="mt-1 shrink-0 text-terracotta" />
              <div>{hours.rows.map((r) => <p key={r.day.it}><span className="text-charcoal/60">{r.day[lang]}:</span> {r.value[lang]}</p>)}<ToConfirm lang={lang} show={!hours.verified} className="!ml-0 mt-2" /></div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-charcoal/10 bg-white/40 p-6 md:col-span-8 md:p-10">
            <h2 className="display mb-8 text-4xl">{d.requestBooking}</h2>
            <BookingForm lang={lang} />
          </div>
        </div>
      </section>
      <section className="pb-24"><div className="wrap h-[440px]"><MapConsent lang={lang} /></div></section>
    </>
  );
}

/* ---------------- LEGALI ---------------- */
export function LegalPage({ lang, kind }: { lang: Lang; kind: 'privacy' | 'cookie' }) {
  const isPrivacy = kind === 'privacy';
  return (
    <>
      <PageHero eyebrow={isPrivacy ? 'Privacy' : 'Cookie'} title={isPrivacy ? (it(lang) ? 'Informativa privacy' : 'Privacy policy') : (it(lang) ? 'Cookie policy' : 'Cookie policy')} />
      <section className="py-20">
        <div className="wrap max-w-3xl space-y-6 text-lg leading-relaxed text-charcoal/80">
          <p className="rounded-xl bg-terracotta/10 p-4 text-sm text-cannonau">
            {it(lang) ? 'Bozza da completare con i dati del titolare (ragione sociale, P.IVA, referente) e da far validare da un consulente prima della pubblicazione.' : 'Draft to be completed with the owner’s details and validated by a consultant before publication.'}
          </p>
          {isPrivacy ? (
            it(lang) ? (
              <>
                <p><strong>Titolare del trattamento:</strong> Il Ritrovo — {business.street}, {business.postalCode} {business.city} ({business.province}). Dati societari da inserire.</p>
                <p><strong>Dati trattati:</strong> nome, telefono, email, data e numero di persone, note facoltative inviate con il modulo di richiesta prenotazione.</p>
                <p><strong>Finalità e base giuridica:</strong> gestire la richiesta di prenotazione e ricontattarti (art. 6.1.b GDPR). I dati non sono usati per marketing.</p>
                <p><strong>Conservazione:</strong> per il tempo necessario a gestire la prenotazione e comunque non oltre 12 mesi.</p>
                <p><strong>Diritti:</strong> accesso, rettifica, cancellazione, limitazione, opposizione, portabilità e reclamo al Garante Privacy, scrivendo a {business.email}.</p>
              </>
            ) : (
              <>
                <p><strong>Controller:</strong> Il Ritrovo — {business.street}, {business.postalCode} {business.city} ({business.province}). Company details to be added.</p>
                <p><strong>Data processed:</strong> name, phone, email, date, party size and optional notes sent through the booking request form.</p>
                <p><strong>Purpose and legal basis:</strong> handling your booking request and contacting you (Art. 6.1.b GDPR). Not used for marketing.</p>
                <p><strong>Retention:</strong> as long as needed to handle the booking, no longer than 12 months.</p>
                <p><strong>Your rights:</strong> access, rectification, erasure, restriction, objection, portability and complaint to the Italian DPA, by writing to {business.email}.</p>
              </>
            )
          ) : it(lang) ? (
            <>
              <p>Questo sito usa solo cookie tecnici necessari al funzionamento. Non usa cookie di profilazione né strumenti di analisi.</p>
              <p>La mappa Google viene caricata solo se clicchi &quot;Carica la mappa&quot;: in quel caso Google può impostare cookie propri, secondo la sua informativa.</p>
            </>
          ) : (
            <>
              <p>This site only uses technical cookies required for it to work. No profiling cookies or analytics.</p>
              <p>The Google map loads only if you click &quot;Load Google map&quot;: Google may then set its own cookies, according to its policy.</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
