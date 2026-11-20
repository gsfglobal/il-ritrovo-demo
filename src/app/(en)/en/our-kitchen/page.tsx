import { Shell } from '@/components/Shell';
import { KitchenPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('kitchen', 'en', 'Our kitchen — Traditional Barbagia cooking | Il Ritrovo', 'Malloreddus with purpuzza and porcini, culurgiones, cured meat boards, seadas with honey: traditional Sardinian cooking in Mamoiada.');

export default function Page() {
  return (
    <Shell lang="en" current="kitchen" >
      <KitchenPage lang="en" />
    </Shell>
  );
}
