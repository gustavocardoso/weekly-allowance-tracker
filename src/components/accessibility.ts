import { useEffect } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
  );
}

export function useFocusTrap(isActive: boolean, containerRef: RefObject<HTMLElement>, initialFocusRef?: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return undefined;
    }

    const container = containerRef.current;
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = getFocusableElements(container);
    const initialElement = initialFocusRef?.current ?? focusable[0] ?? container;

    window.requestAnimationFrame(() => {
      initialElement.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const elements = getFocusableElements(container);
      if (elements.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const firstElement = elements[0]!;
      const lastElement = elements[elements.length - 1]!;
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [containerRef, initialFocusRef, isActive]);
}

export function isActivationKey(event: ReactKeyboardEvent) {
  return event.key === 'Enter' || event.key === ' ';
}
