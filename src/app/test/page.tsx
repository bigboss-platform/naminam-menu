import type { Metadata } from 'next';
import { RadialTestContainer } from '@/features/radial-selector/containers/RadialTestContainer.container';

/** Playground for components under evaluation — not linked from the navigation. */
export const metadata: Metadata = {
  title: 'Prueba',
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return <RadialTestContainer />;
}
