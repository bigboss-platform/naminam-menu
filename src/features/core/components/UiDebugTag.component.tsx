import { IS_UI_DEBUG } from '../config/uiDebug.config';

type UiDebugTagProps = {
  /** Short code we use to name the element during UI/UX audits, e.g. "W4·1". */
  code: string;
  /** Corner of the (positioned) parent where the tag sits — pick one that no other tag uses. */
  corner?: 'top-left' | 'top-right' | 'bottom-right';
};

/** Red code tag on top of an element — only rendered when NEXT_PUBLIC_UI_DEBUG=true. */
export function UiDebugTag({ code, corner = 'top-left' }: UiDebugTagProps) {
  if (!IS_UI_DEBUG) return null;
  return (
    <span className={`ui-debug-tag ui-debug-tag--${corner}`} aria-hidden="true">
      {code}
    </span>
  );
}
