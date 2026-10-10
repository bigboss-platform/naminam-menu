const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

/**
 * Tweens a number from `from` to `to` (ease-out), calling `onFrame` every animation frame.
 * Returns a cancel function. With prefers-reduced-motion it jumps straight to `to`.
 */
export function animateNumber(from: number, to: number, durationMs: number, onFrame: (value: number) => void): () => void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || from === to) {
    onFrame(to);
    return () => {};
  }
  const startTime = performance.now();
  let frame = 0;
  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / durationMs);
    onFrame(from + (to - from) * easeOutCubic(progress));
    if (progress < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}
