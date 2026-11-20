'use client';
import { useMemo, useState, type FormEvent } from 'react';
import { CheckCircle2, Info, Phone } from 'lucide-react';
import { BOOKING_ENDPOINT, DEMO_MODE, business, type Lang } from '@/content/site';

const copy = {
  it: {
    name: 'Nome e cognome', phone: 'Telefono', email: 'Email', date: 'Data', time: 'Ora', people: 'Persone', notes: 'Note (intolleranze, seggiolone, occasioni…)',
    consent: 'Acconsento al trattamento dei dati per gestire la richiesta, come da informativa privacy.',
    submit: 'Invia la richiesta', sending: 'Invio…',
    demoTitle: 'Modalità demo: nessuna richiesta è stata inviata.',
    demoText: 'Ecco come apparirebbe la richiesta al ristorante. Nel sito pubblicato arriverà via email e il locale ricontatterà il cliente per confermare.',
    okTitle: 'Richiesta ricevuta', okText: 'Non è ancora una conferma: il ristorante ti ricontatterà per confermare la disponibilità.',
    errText: 'Invio non riuscito. Chiama direttamente il ristorante.',
    monday: 'Il lunedì il ristorante è chiuso.', past: 'Scegli una data da oggi in poi.', big: 'Per gruppi oltre 12 persone è meglio telefonare.',
    lunch: 'Pranzo', dinner: 'Cena', note: 'La prenotazione è confermata solo dopo il ricontatto del ristorante.', again: 'Nuova richiesta', required: 'Campo obbligatorio',
  },
  en: {
    name: 'Full name', phone: 'Phone', email: 'Email', date: 'Date', time: 'Time', people: 'Guests', notes: 'Notes (allergies, high chair, occasions…)',
    consent: 'I consent to the processing of my data to handle this request, as described in the privacy policy.',
    submit: 'Send request', sending: 'Sending…',
    demoTitle: 'Demo mode: no request has been sent.',
    demoText: 'This is how the request would reach the restaurant. On the live site it arrives by email and the restaurant calls the guest back to confirm.',
    okTitle: 'Request received', okText: 'This is not yet a confirmation: the restaurant will contact you to confirm availability.',
    errText: 'Sending failed. Please call the restaurant directly.',
    monday: 'The restaurant is closed on Mondays.', past: 'Please choose today or a later date.', big: 'For groups larger than 12, please call.',
    lunch: 'Lunch', dinner: 'Dinner', note: 'A booking is confirmed only once the restaurant contacts you.', again: 'New request', required: 'Required field',
  },
};

const SLOTS = { lunch: ['12:00', '12:30', '13:00', '13:30', '14:00'], dinner: ['19:30', '20:00', '20:30', '21:00', '21:30', '22:00'] };

type Data = Record<'name' | 'phone' | 'email' | 'date' | 'time' | 'people' | 'notes', string>;

export function BookingForm({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [d, setD] = useState<Data>({ name: '', phone: '', email: '', date: '', time: '', people: '2', notes: '' });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'demo' | 'ok' | 'error'>('idle');

  const set = (k: keyof Data) => (e: { target: { value: string } }) => setD((p) => ({ ...p, [k]: e.target.value }));
  const weekday = d.date ? new Date(`${d.date}T12:00:00`).getDay() : -1;
  const warnings = [
    weekday === 1 && c.monday,
    d.date && d.date < today && c.past,
    Number(d.people) > 12 && c.big,
  ].filter(Boolean) as string[];
  const blocking = weekday === 1 || (d.date !== '' && d.date < today);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (blocking) return;
    if (DEMO_MODE || !BOOKING_ENDPOINT) { setState('demo'); return; }
    setState('sending');
    try {
      const res = await fetch(BOOKING_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, consent, lang, source: 'sito web' }) });
      setState(res.ok ? 'ok' : 'error');
    } catch { setState('error'); }
  }

  if (state === 'demo' || state === 'ok') {
    return (
      <div role="status" className="rounded-2xl border border-charcoal/10 bg-white/60 p-6 md:p-8">
        <div className="flex items-start gap-3">
          {state === 'demo' ? <Info className="mt-1 shrink-0 text-bronze" /> : <CheckCircle2 className="mt-1 shrink-0 text-olive" />}
          <div>
            <p className="display text-3xl">{state === 'demo' ? c.demoTitle : c.okTitle}</p>
            <p className="mt-2 text-charcoal/70">{state === 'demo' ? c.demoText : c.okText}</p>
          </div>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl bg-cream p-5 text-sm">
          <dt className="text-charcoal/60">{c.name}</dt><dd>{d.name}</dd>
          <dt className="text-charcoal/60">{c.date}</dt><dd>{d.date} · {d.time}</dd>
          <dt className="text-charcoal/60">{c.people}</dt><dd>{d.people}</dd>
          <dt className="text-charcoal/60">{c.phone}</dt><dd>{d.phone}</dd>
          {d.notes && (<><dt className="text-charcoal/60">Note</dt><dd>{d.notes}</dd></>)}
        </dl>
        <button type="button" className="btn-dark mt-6" onClick={() => setState('idle')}>{c.again}</button>
      </div>
    );
  }

  const field = 'mt-1.5 w-full rounded-xl border border-charcoal/15 bg-white/70 px-4 py-3 text-base outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20';
  const label = 'text-xs font-semibold uppercase tracking-wider text-charcoal/70';

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <label className="sm:col-span-2"><span className={label}>{c.name} *</span>
        <input required autoComplete="name" className={field} value={d.name} onChange={set('name')} /></label>
      <label><span className={label}>{c.phone} *</span>
        <input required type="tel" autoComplete="tel" inputMode="tel" pattern="[+0-9 ]{6,}" className={field} value={d.phone} onChange={set('phone')} /></label>
      <label><span className={label}>{c.email}</span>
        <input type="email" autoComplete="email" className={field} value={d.email} onChange={set('email')} /></label>
      <label><span className={label}>{c.date} *</span>
        <input required type="date" min={today} className={field} value={d.date} onChange={set('date')} /></label>
      <label><span className={label}>{c.time} *</span>
        <select required className={field} value={d.time} onChange={set('time')}>
          <option value="">—</option>
          <optgroup label={c.lunch}>{SLOTS.lunch.map((s) => <option key={s}>{s}</option>)}</optgroup>
          <optgroup label={c.dinner}>{SLOTS.dinner.map((s) => <option key={s}>{s}</option>)}</optgroup>
        </select></label>
      <label><span className={label}>{c.people} *</span>
        <select required className={field} value={d.people} onChange={set('people')}>
          {Array.from({ length: 20 }, (_, i) => String(i + 1)).map((n) => <option key={n}>{n}</option>)}
        </select></label>
      <label className="sm:col-span-2"><span className={label}>{c.notes}</span>
        <textarea rows={3} className={field} value={d.notes} onChange={set('notes')} /></label>

      {warnings.length > 0 && (
        <ul className="sm:col-span-2 space-y-1 rounded-xl bg-terracotta/10 p-4 text-sm text-cannonau" aria-live="polite">
          {warnings.map((w) => <li key={w}>{w}</li>)}
          {Number(d.people) > 12 && <li><a className="link-u font-semibold" href={business.phoneHref}>{business.phoneDisplay}</a></li>}
        </ul>
      )}

      <label className="flex items-start gap-3 text-sm text-charcoal/80 sm:col-span-2">
        <input required type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 accent-terracotta" />
        <span>{c.consent}</span>
      </label>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={state === 'sending' || blocking} className="btn-primary disabled:opacity-50">{state === 'sending' ? c.sending : c.submit}</button>
        <a href={business.phoneHref} className="btn border border-charcoal/20"><Phone size={16} /> {business.phoneDisplay}</a>
      </div>
      {state === 'error' && <p role="alert" className="text-sm text-cannonau sm:col-span-2">{c.errText}</p>}
      <p className="text-xs text-charcoal/60 sm:col-span-2">{c.note}</p>
    </form>
  );
}
