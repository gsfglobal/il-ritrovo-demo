import { Shell } from '@/components/Shell';
import { MamoiadaPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('mamoiada', 'en', 'Mamoiada: Mamuthones, Mask Museum & Cannonau | Il Ritrovo', 'What to see in Mamoiada: Mamuthones and Issohadores, Sant’Antonio, the Museum of Mediterranean Masks and Cannonau wine.');

export default function Page() {
  return (
    <Shell lang="en" current="mamoiada" >
      <MamoiadaPage lang="en" />
    </Shell>
  );
}
