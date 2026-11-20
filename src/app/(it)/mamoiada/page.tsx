import { Shell } from '@/components/Shell';
import { MamoiadaPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('mamoiada', 'it', 'Mamoiada: Mamuthones, Museo delle Maschere e Cannonau | Il Ritrovo', 'Cosa vedere a Mamoiada: Mamuthones e Issohadores, Sant’Antonio, il Museo delle Maschere Mediterranee e il Cannonau. Dove mangiare dopo la visita.');

export default function Page() {
  return (
    <Shell lang="it" current="mamoiada" >
      <MamoiadaPage lang="it" />
    </Shell>
  );
}
