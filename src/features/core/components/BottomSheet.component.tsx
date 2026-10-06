'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useSlideSheet } from '../hooks/useSlideSheet.hook';
import styles from './BottomSheet.module.css';

/** Sheet slides in over 250ms; content fades in 10ms after it lands (UI-UX-RULES "sheet content reveal"). */
const CONTENT_REVEAL_DELAY_MS = 260;

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

/** iOS-style bottom drawer: backdrop tap or Escape closes it. */
export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const { mounted, entered, closing } = useSlideSheet(open);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!entered) return;
    const timer = setTimeout(() => setIsRevealed(true), CONTENT_REVEAL_DELAY_MS);
    return () => {
      clearTimeout(timer);
      setIsRevealed(false);
    };
  }, [entered]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`${styles.backdrop} ${entered ? styles.backdropVisible : ''}`}
      onClick={closing ? undefined : onClose}
    >
      <div
        className={`${styles.sheet} ${entered ? styles.sheetOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <span className={styles.grabber} aria-hidden="true" />
        <div className={`${styles.content} ${isRevealed ? styles.contentRevealed : ''}`}>{children}</div>
      </div>
    </div>
  );
}
