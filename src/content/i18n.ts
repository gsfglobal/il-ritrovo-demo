import type { Lang } from './site';

export const routes = {
  home: { it: '/', en: '/en/' },
  about: { it: '/chi-siamo/', en: '/en/about/' },
  kitchen: { it: '/la-nostra-cucina/', en: '/en/our-kitchen/' },
  menu: { it: '/menu/', en: '/en/menu/' },
  mamoiada: { it: '/mamoiada/', en: '/en/mamoiada/' },
  gallery: { it: '/gallery/', en: '/en/gallery/' },
  reviews: { it: '/recensioni/', en: '/en/reviews/' },
  contact: { it: '/contatti/', en: '/en/contact/' },
  privacy: { it: '/privacy/', en: '/en/privacy/' },
  cookie: { it: '/cookie/', en: '/en/cookies/' },
} as const;

export type RouteKey = keyof typeof routes;

export const nav: RouteKey[] = ['about', 'kitchen', 'menu', 'mamoiada', 'gallery', 'reviews', 'contact'];

const dict = {
  it: {
    nav: {
      home: 'Home', about: 'Chi siamo', kitchen: 'La cucina', menu: 'Menu', mamoiada: 'Mamoiada',
      gallery: 'Gallery', reviews: 'Recensioni', contact: 'Contatti', privacy: 'Privacy', cookie: 'Cookie',
    },
    book: 'Prenota il tuo tavolo',
    bookShort: 'Prenota',
    call: 'Chiama il ristorante',
    discover: 'Scopri la nostra cucina',
    directions: 'Indicazioni stradali',
    viewMap: 'Visualizza la posizione',
    requestBooking: 'Richiedi una prenotazione',
    toConfirm: 'da confermare',
    photoSoon: 'Foto reale da shooting autorizzato',
    demoBanner: 'Proposta demo — sito non ufficiale. Le voci "da confermare" attendono verifica del titolare.',
    closedMonday: 'Lunedì chiuso',
    hours: 'Orari',
    address: 'Indirizzo',
    phone: 'Telefono',
    email: 'Email',
    readOn: 'Leggi su',
    allReviews: 'Tutte le recensioni',
    reviewsNote: 'Sintesi fedeli di recensioni pubbliche. Il testo originale è sul profilo indicato.',
    langSwitch: 'English',
    skip: 'Vai al contenuto',
  },
  en: {
    nav: {
      home: 'Home', about: 'About', kitchen: 'Our kitchen', menu: 'Menu', mamoiada: 'Mamoiada',
      gallery: 'Gallery', reviews: 'Reviews', contact: 'Contact', privacy: 'Privacy', cookie: 'Cookies',
    },
    book: 'Book your table',
    bookShort: 'Book',
    call: 'Call the restaurant',
    discover: 'Discover our cooking',
    directions: 'Get directions',
    viewMap: 'View on the map',
    requestBooking: 'Request a booking',
    toConfirm: 'to be confirmed',
    photoSoon: 'Real photo from an authorised shoot',
    demoBanner: 'Demo proposal — not the official website. Items marked "to be confirmed" await the owner’s review.',
    closedMonday: 'Closed on Mondays',
    hours: 'Opening hours',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    readOn: 'Read on',
    allReviews: 'All reviews',
    reviewsNote: 'Faithful summaries of public reviews. The original text is on the linked profile.',
    langSwitch: 'Italiano',
    skip: 'Skip to content',
  },
};

export const t = (lang: Lang) => dict[lang];
export const href = (key: RouteKey, lang: Lang) => routes[key][lang];
