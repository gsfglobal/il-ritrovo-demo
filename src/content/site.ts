/**
 * ============================================================
 *  CONTENUTI DEL SITO — modifica qui dati, orari, menu, recensioni.
 *  Ogni voce con `verified: false` mostra il badge "da confermare"
 *  quando la modalità demo è attiva.
 * ============================================================
 */

export type Lang = 'it' | 'en';
export type L = { it: string; en: string };

/** Modalità demo commerciale: banner, badge "da confermare", nessun invio reale. */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';

/** Endpoint reale per le richieste di prenotazione (es. Formspree). Vuoto = nessun invio. */
export const BOOKING_ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? '';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ilritrovomamoiada.it') + (process.env.NEXT_PUBLIC_BASE_PATH || '');

export const business = {
  name: 'Il Ritrovo',
  fullName: 'Il Ritrovo — Ristorante Pizzeria, Mamoiada',
  street: 'Corso Vittorio Emanuele III, 101',
  postalCode: '08024',
  city: 'Mamoiada',
  province: 'NU',
  region: 'Sardegna',
  country: 'IT',
  phoneDisplay: '+39 388 568 3057',
  phoneHref: 'tel:+393885683057',
  email: 'ilritrovomamoiada@yahoo.it',
  emailVerified: false,
  geo: { lat: 40.2156, lng: 9.2802 },
  mapsQuery: 'Il Ritrovo, Corso Vittorio Emanuele III 101, 08024 Mamoiada NU',
  priceRange: '€',
  tripadvisor:
    'https://www.tripadvisor.it/Restaurant_Review-g1986877-d4939137-Reviews-Il_Ritrovo-Mamoiada_Province_of_Nuoro_Sardinia.html',
  googleReviews: 'https://www.google.com/maps/search/?api=1&query=Il+Ritrovo+Corso+Vittorio+Emanuele+III+101+Mamoiada',
  socials: [] as { label: string; href: string }[], // nessun social ufficiale verificato
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapsQuery)}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.mapsQuery)}`;

/** Orari: fonte Tripadvisor. Wanderlog/Google riportano orari diversi → da confermare. */
export const hours = {
  verified: false,
  rows: [
    { day: { it: 'Lunedì', en: 'Monday' }, value: { it: 'Chiuso', en: 'Closed' }, closed: true },
    { day: { it: 'Martedì – Domenica', en: 'Tuesday – Sunday' }, value: { it: '11:30 – 15:00 · 19:00 – 23:00', en: '11:30 – 15:00 · 19:00 – 23:00' }, closed: false },
  ],
  schema: [
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '11:30', closes: '15:00' },
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '19:00', closes: '23:00' },
  ],
};

export const ratings = [
  { source: 'Tripadvisor', value: 4.5, count: 186, href: business.tripadvisor, note: { it: 'n. 4 di 12 a Mamoiada', en: '#4 of 12 in Mamoiada' } },
  { source: 'Google', value: 4.5, count: 313, href: business.googleReviews, note: { it: 'dato rilevato via Wanderlog', en: 'figure via Wanderlog' } },
];

/* ---------------- PIATTI (storytelling) ---------------- */

export type Dish = {
  id: string;
  name: L;
  sardinian?: string;
  description: L;
  ingredients: L;
  verified: boolean;
  source: string;
  tone: 'terracotta' | 'cannonau' | 'olive' | 'bronze';
};

export const dishes: Dish[] = [
  {
    id: 'malloreddus',
    name: { it: 'Malloreddus con purpuzza e porcini', en: 'Malloreddus with purpuzza and porcini' },
    sardinian: 'Malloreddus',
    description: {
      it: 'Gli gnocchetti rigati di semola, la pasta sarda per eccellenza, con la purpuzza — impasto di salsiccia non insaccato — e funghi porcini. Il piatto che il titolare consiglia a chi arriva per la prima volta.',
      en: 'Ridged semolina gnocchetti, the quintessential Sardinian pasta, with purpuzza — loose, uncased sausage meat — and porcini mushrooms. The dish the owner recommends to first-time guests.',
    },
    ingredients: { it: 'Semola di grano duro, purpuzza, funghi porcini', en: 'Durum wheat semolina, purpuzza, porcini' },
    verified: true,
    source: 'Recensione ospite (Wanderlog)',
    tone: 'terracotta',
  },
  {
    id: 'culurgiones',
    name: { it: 'Culurgiones', en: 'Culurgiones' },
    sardinian: 'Culurgiones',
    description: {
      it: 'I ravioli della tradizione, chiusi a mano con la caratteristica spiga. Citati dagli ospiti tra i piatti della casa.',
      en: 'Traditional filled pasta, hand-closed with the signature wheat-ear pleat. Mentioned by guests among the house dishes.',
    },
    ingredients: { it: 'Ripieno e condimento da confermare con la cucina', en: 'Filling and sauce to be confirmed with the kitchen' },
    verified: false,
    source: 'Recensioni Tripadvisor',
    tone: 'bronze',
  },
  {
    id: 'tagliere',
    name: { it: 'Tagliere di salumi e formaggi', en: 'Cured meats & cheese board' },
    description: {
      it: 'Salumi e formaggi del territorio, per iniziare come si fa in Barbagia: insieme, al centro della tavola.',
      en: 'Local cured meats and cheeses, to start the way they do in Barbagia: shared, in the middle of the table.',
    },
    ingredients: { it: 'Selezione e produttori da confermare', en: 'Selection and producers to be confirmed' },
    verified: true,
    source: 'Recensioni Tripadvisor',
    tone: 'olive',
  },
  {
    id: 'catalana',
    name: { it: 'Maiale alla catalana', en: 'Pork “alla catalana”' },
    description: {
      it: 'Uno dei piatti più lodati nelle recensioni recenti degli ospiti.',
      en: 'One of the most praised dishes in recent guest reviews.',
    },
    ingredients: { it: 'Ricetta da descrivere con la cucina', en: 'Recipe details to come from the kitchen' },
    verified: true,
    source: 'Recensione Tripadvisor, nov 2026',
    tone: 'cannonau',
  },
  {
    id: 'carni',
    name: { it: 'Carni alla griglia e costata', en: 'Grilled meats & rib steak' },
    description: {
      it: 'Indicate nel brief iniziale ma non ancora trovate nelle fonti pubbliche consultate.',
      en: 'Listed in the initial brief but not yet found in the public sources reviewed.',
    },
    ingredients: { it: 'Da confermare', en: 'To be confirmed' },
    verified: false,
    source: 'Brief — non verificato',
    tone: 'terracotta',
  },
  {
    id: 'seadas',
    name: { it: 'Seadas al miele', en: 'Seadas with honey' },
    sardinian: 'Seadas',
    description: {
      it: 'Il dolce sardo per eccellenza: sfoglia fritta ripiena di formaggio, servita con il miele. Ricordata dagli ospiti.',
      en: 'The great Sardinian dessert: fried pastry filled with cheese, finished with honey. Remembered by guests.',
    },
    ingredients: { it: 'Sfoglia, formaggio, miele', en: 'Pastry, cheese, honey' },
    verified: true,
    source: 'Recensioni Tripadvisor',
    tone: 'bronze',
  },
];

/* ---------------- MENU (modificabile) ---------------- */

export type MenuItem = { name: L; note?: L; price?: string; verified: boolean };
export type MenuCategory = { id: string; title: L; items: MenuItem[] };

/** Prezzi volutamente vuoti: nessun prezzo pubblico verificato. */
export const menu: MenuCategory[] = [
  {
    id: 'antipasti',
    title: { it: 'Antipasti', en: 'Starters' },
    items: [
      { name: { it: 'Tagliere di salumi e formaggi', en: 'Cured meats & cheese board' }, verified: true },
      { name: { it: 'Zucchine fritte', en: 'Fried courgettes' }, verified: true },
    ],
  },
  {
    id: 'primi',
    title: { it: 'Primi piatti', en: 'First courses' },
    items: [
      { name: { it: 'Malloreddus con purpuzza e funghi porcini', en: 'Malloreddus with purpuzza & porcini' }, verified: true },
      { name: { it: 'Culurgiones', en: 'Culurgiones' }, verified: true },
      { name: { it: 'Pasta con crema di broccoli', en: 'Pasta with broccoli cream' }, verified: true },
      { name: { it: 'Ravioli', en: 'Ravioli' }, verified: false },
    ],
  },
  {
    id: 'secondi',
    title: { it: 'Secondi', en: 'Main courses' },
    items: [
      { name: { it: 'Maiale alla catalana', en: 'Pork “alla catalana”' }, verified: true },
      { name: { it: 'Trippa', en: 'Tripe' }, verified: true },
      { name: { it: 'Carni alla griglia', en: 'Grilled meats' }, verified: false },
      { name: { it: 'Costata', en: 'Rib steak' }, verified: false },
    ],
  },
  {
    id: 'pizza',
    title: { it: 'Pizza', en: 'Pizza' },
    items: [{ name: { it: 'Pizze — carta da ricevere dal locale', en: 'Pizzas — list to come from the restaurant' }, verified: false }],
  },
  {
    id: 'dolci',
    title: { it: 'Dolci', en: 'Desserts' },
    items: [
      { name: { it: 'Seadas al miele', en: 'Seadas with honey' }, verified: true },
      { name: { it: 'Tiramisù', en: 'Tiramisù' }, verified: true },
    ],
  },
  {
    id: 'vini',
    title: { it: 'Vini e bevande', en: 'Wine & drinks' },
    items: [{ name: { it: 'Carta dei vini da ricevere dal locale', en: 'Wine list to come from the restaurant' }, verified: false }],
  },
];

/** Menu del giorno — il punto debole segnalato in una recensione. Aggiornare qui. */
export const dailyMenu = {
  enabled: true,
  date: '',
  items: [] as { name: L; price?: string }[],
};

/* ---------------- RECENSIONI (sintesi, non testi integrali) ---------------- */

export type Review = { author: string; date: L; rating: number; summary: L; source: 'Tripadvisor' | 'Google'; href: string };

export const reviews: Review[] = [
  {
    author: 'Coastal51391210889',
    date: { it: 'Novembre 2026', en: 'November 2026' },
    rating: 5,
    summary: {
      it: 'Maiale alla catalana squisito, ottimi salumi e dolci, prezzi onesti. Consiglia di prenotare.',
      en: 'Excellent pork “alla catalana”, great cured meats and desserts, fair prices. Recommends booking.',
    },
    source: 'Tripadvisor',
    href: business.tripadvisor,
  },
  {
    author: 'Dream04245863884',
    date: { it: 'Marzo 2026', en: 'March 2026' },
    rating: 5,
    summary: {
      it: 'Personale gentile, cibo buono — seadas compresa — e accoglienza anche per il cane.',
      en: 'Kind staff, good food — seadas included — and a warm welcome for the dog too.',
    },
    source: 'Tripadvisor',
    href: business.tripadvisor,
  },
  {
    author: 'Francesca D',
    date: { it: 'Gennaio 2026', en: 'January 2026' },
    rating: 5,
    summary: {
      it: 'Ottima esperienza durante la festa di Sant’Antonio: porzioni abbondanti e prezzo onesto.',
      en: 'Great experience during the Sant’Antonio festival: generous portions, honest price.',
    },
    source: 'Tripadvisor',
    href: business.tripadvisor,
  },
  {
    author: 'Flavio Floris',
    date: { it: 'Gennaio 2026', en: 'January 2026' },
    rating: 5,
    summary: {
      it: 'Prenotazione dell’ultimo minuto accolta con gentilezza; cibo abbondante, buon rapporto qualità-prezzo.',
      en: 'Last-minute booking welcomed kindly; plentiful food and good value.',
    },
    source: 'Tripadvisor',
    href: business.tripadvisor,
  },
  {
    author: 'Giuseppe F',
    date: { it: 'Gennaio 2026', en: 'January 2026' },
    rating: 5,
    summary: {
      it: 'Servizio professionale e cucina tradizionale rielaborata con gusto.',
      en: 'Professional service and traditional cooking reworked with taste.',
    },
    source: 'Tripadvisor',
    href: business.tripadvisor,
  },
  {
    author: 'mimma R',
    date: { it: 'Agosto 2025', en: 'August 2025' },
    rating: 5,
    summary: { it: 'Cibo ottimo, locale pulito e cordiale.', en: 'Excellent food, clean and friendly place.' },
    source: 'Tripadvisor',
    href: business.tripadvisor,
  },
];

/* ---------------- GALLERY (segnaposto: nessuna foto autorizzata) ---------------- */

export const gallery = [
  { id: 'g1', label: { it: 'La sala', en: 'The dining room' }, tone: 'charcoal', span: 'tall' },
  { id: 'g2', label: { it: 'Malloreddus', en: 'Malloreddus' }, tone: 'terracotta', span: 'wide' },
  { id: 'g3', label: { it: 'Il tagliere', en: 'The board' }, tone: 'olive', span: 'square' },
  { id: 'g4', label: { it: 'Seadas al miele', en: 'Seadas with honey' }, tone: 'bronze', span: 'square' },
  { id: 'g5', label: { it: 'La pizza', en: 'Pizza' }, tone: 'cannonau', span: 'tall' },
  { id: 'g6', label: { it: 'L’ingresso sul Corso', en: 'The entrance on the Corso' }, tone: 'stone', span: 'wide' },
  { id: 'g7', label: { it: 'Dettagli della sala', en: 'Room details' }, tone: 'terracotta', span: 'square' },
  { id: 'g8', label: { it: 'A tavola insieme', en: 'Together at the table' }, tone: 'olive', span: 'square' },
] as const;
