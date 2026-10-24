/** SVG icons exactly as drawn in the client's mockup. They inherit currentColor. */

type IconProps = { size?: number; className?: string };

export function V2WhatsAppIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.04.69C5.77.69.67 5.78.67 12.05c0 2 .52 3.96 1.52 5.69L.57 23.63l6.02-1.58a11.33 11.33 0 0 0 5.44 1.39h.01c6.26 0 11.36-5.1 11.36-11.37 0-3.04-1.18-5.89-3.32-8.04z" />
    </svg>
  );
}

export function V2MarketplaceIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M3 9l2-5h14l2 5v1a3 3 0 01-3 3 3 3 0 01-3-3v-1H9v1a3 3 0 01-3 3 3 3 0 01-3-3V9z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 13v7a1 1 0 001 1h14a1 1 0 001-1v-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function V2InstagramIcon({ size = 24, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/** Multicolor "maps" badge from the mockup. */
export function V2MapsIcon({ size = 28, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M44,24c0-1.8-0.2-3.5-0.7-5.1H24v9.6h11.3c-0.5,2.6-2,4.8-4.2,6.2l6.8,5.3C41.8,36.4,44,30.6,44,24z" fill="#4caf50" />
      <path d="M8.7,28.8l-5.6,4.3C5.9,38.6,14.4,44,24,44c6.2,0,11.8-2.1,16.1-5.7l-6.8-5.3c-2.2,1.5-5.1,2.4-9.3,2.4C18.1,35.4,13.1,32.7,8.7,28.8z" fill="#2196f3" />
      <path d="M24,9.6c3.4,0,6.5,1.2,8.9,3.4l6.7-6.7C35.8,2.7,30.2,0,24,0,14.4,0,5.9,5.4,3.1,13.3l6.9,5.3C12,13.1,17.5,9.6,24,9.6z" fill="#fbc02d" />
      <path d="M24,20c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S26.2,20,24,20z" fill="#e53935" />
    </svg>
  );
}

export function V2FacebookIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function V2PinIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
    </svg>
  );
}

export function V2BookIcon({ size = 32, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
