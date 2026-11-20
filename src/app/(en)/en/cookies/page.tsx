import { Shell } from '@/components/Shell';
import { LegalPage } from '@/components/Pages';
import { meta } from '@/lib/seo';

export const metadata = meta('cookie', 'en', 'Cookies — Il Ritrovo Mamoiada', 'Cookie policy.');

export default function Page() {
  return (
    <Shell lang="en" current="cookie" >
      <LegalPage lang="en" kind="cookie" />
    </Shell>
  );
}
