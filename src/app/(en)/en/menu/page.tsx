import { Shell } from '@/components/Shell';
import { MenuPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('menu', 'en', 'Menu — Restaurant & pizza in Mamoiada | Il Ritrovo', 'Il Ritrovo’s menu in Mamoiada: starters, Sardinian pasta, mains, pizza, desserts and wine.');

export default function Page() {
  return (
    <Shell lang="en" current="menu" >
      <MenuPage lang="en" />
    </Shell>
  );
}
