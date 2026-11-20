import { Shell } from '@/components/Shell';
import { LegalPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('privacy', 'it', 'Privacy — Il Ritrovo Mamoiada', 'Informativa sul trattamento dei dati personali.');

export default function Page() {
  return (
    <Shell lang="it" current="privacy" >
      <LegalPage lang="it" kind="privacy" />
    </Shell>
  );
}
