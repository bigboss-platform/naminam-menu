import { BrandAnimation } from '@/features/core/components/BrandAnimation.component';

/** Shown while a version 1 page loads: the detailed mascot. */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" style={{ minHeight: '50vh', display: 'grid', placeItems: 'center', alignContent: 'center', gap: 16 }}>
      <div style={{ width: 160 }}>
        <BrandAnimation label="Preparando tus antojitos…" />
      </div>
      <p className="font-display" style={{ fontWeight: 700, fontSize: 18 }}>
        Preparando tus antojitos…
      </p>
    </div>
  );
}
