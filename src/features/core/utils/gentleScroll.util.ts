/**
 * Slow, soft programmatic scrolling (the browser's native smooth scroll / scroll-snap
 * felt too fast and abrupt — its speed can't be configured).
 */

/** Duration grows with the distance, kept within a calm range. */
const MIN_DURATION_MS = 550;
const MAX_DURATION_MS = 1100;
const MS_PER_PIXEL = 0.9;

const easeInOutCubic = (progress: number) =>
  progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;

/** Area between the sticky top bar and the bottom tab bar (or screen edges). */
export function getVisibleArea(): { top: number; bottom: number } {
  const topBar = document.querySelector('header');
  const bottomNav = document.querySelector('nav[aria-label="Secciones"]');
  const top = topBar?.getBoundingClientRect().bottom ?? 0;
  const bottomNavTop = bottomNav?.getBoundingClientRect().top ?? window.innerHeight;
  return { top: Math.max(0, top), bottom: Math.min(window.innerHeight, bottomNavTop) };
}

/** scrollY that puts the element's center in the middle of the visible area. */
export function getCenteredScrollY(element: Element): number {
  const { top, bottom } = getVisibleArea();
  const rect = element.getBoundingClientRect();
  const elementCenter = rect.top + rect.height / 2;
  return window.scrollY + elementCenter - (top + bottom) / 2;
}

/**
 * Glides the window to `targetY`. Returns a cancel function (call it when the user
 * touches the screen again). `onDone` runs when the glide finishes on its own.
 */
export function gentleScrollTo(targetY: number, onDone: () => void = () => {}): () => void {
  const startY = window.scrollY;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const distance = Math.min(Math.max(targetY, 0), maxY) - startY;
  if (Math.abs(distance) < 2) {
    onDone();
    return () => {};
  }

  const duration = Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, Math.abs(distance) * MS_PER_PIXEL));
  const startTime = performance.now();
  let frame = 0;

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      frame = requestAnimationFrame(step);
    } else {
      onDone();
    }
  };
  frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}
