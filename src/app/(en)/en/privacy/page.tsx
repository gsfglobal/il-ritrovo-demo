import { Shell } from '@/components/Shell';
import { LegalPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('privacy', 'en', 'Privacy — Il Ritrovo Mamoiada', 'Privacy policy.');

export default function Page() {
  return (
    <Shell lang="en" current="privacy" >
      <LegalPage lang="en" kind="privacy" />
    </Shell>
  );
}
