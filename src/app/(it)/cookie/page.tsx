import { Shell } from '@/components/Shell';
import { LegalPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('cookie', 'it', 'Cookie — Il Ritrovo Mamoiada', 'Informativa sui cookie.');

export default function Page() {
  return (
    <Shell lang="it" current="cookie" >
      <LegalPage lang="it" kind="cookie" />
    </Shell>
  );
}
