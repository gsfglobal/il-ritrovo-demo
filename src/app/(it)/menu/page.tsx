import { Shell } from '@/components/Shell';
import { MenuPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('menu', 'it', 'Menu — Ristorante e pizza a Mamoiada | Il Ritrovo', 'Il menu del Ritrovo di Mamoiada: antipasti, primi sardi, secondi, pizza, dolci e vini. Menu del giorno aggiornato.');

export default function Page() {
  return (
    <Shell lang="it" current="menu" >
      <MenuPage lang="it" />
    </Shell>
  );
}
