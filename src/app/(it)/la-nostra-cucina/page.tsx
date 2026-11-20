import { Shell } from '@/components/Shell';
import { KitchenPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('kitchen', 'it', 'La nostra cucina — Cucina tradizionale della Barbagia | Il Ritrovo', 'Malloreddus con purpuzza e porcini, culurgiones, taglieri di salumi e formaggi, seadas al miele: la cucina tradizionale sarda a Mamoiada.');

export default function Page() {
  return (
    <Shell lang="it" current="kitchen" >
      <KitchenPage lang="it" />
    </Shell>
  );
}
