import Link from 'next/link';
import type { ReactNode } from 'react';
import { externalLinkProps, INERT_LINK } from '../utils/whatsapp.util';
import styles from './ActionButton.module.css';

export type ActionButtonVariant = 'primary' | 'soft' | 'outline' | 'whatsapp' | 'dark';

type ActionButtonProps = {
  href: string;
  variant?: ActionButtonVariant;
  children: ReactNode;
  icon?: ReactNode;
  /** Full width on mobile (default); auto width from tablet up. */
  isBlockOnMobile?: boolean;
  isCompact?: boolean;
};

/**
 * Every CTA on the site is a navigation (internal route or WhatsApp/Instagram
 * deep link), so the button is always an anchor. External links open in a new tab.
 */
export function ActionButton({
  href,
  variant = 'primary',
  children,
  icon,
  isBlockOnMobile = true,
  isCompact = false,
}: ActionButtonProps) {
  const isExternal = href.startsWith('http');
  const className = [
    styles.button,
    styles[variant],
    isBlockOnMobile ? styles.block : '',
    isCompact ? styles.compact : '',
  ].join(' ');

  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (isExternal || href === INERT_LINK) {
    return (
      <a {...externalLinkProps(href)} className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
