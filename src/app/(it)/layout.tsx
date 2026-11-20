import type { ReactNode } from 'react';
import '@/app/globals.css';
import { RootDoc } from '@/components/RootDoc';
export const viewport = { themeColor: '#221E19' };

export default function Layout({ children }: { children: ReactNode }) {
  return <RootDoc lang="it">{children}</RootDoc>;
}
