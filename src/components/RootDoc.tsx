import type { ReactNode } from 'react';
import { DEMO_MODE, type Lang } from '@/content/site';

export function RootDoc({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} style={{ ['--demo-h' as string]: DEMO_MODE ? '34px' : '0px' }} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
