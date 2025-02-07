import {useEffect} from "react";

// Improved version of https://usehooks.com/useOnClickOutside/
export function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: (event: Event) => void) {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event: Event) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler(event);
    };

    const validateEventStart = (event: Event) => {
      startedWhenMounted = !!ref.current;
      startedInside = !!ref.current && ref.current.contains(event.target as Node);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

/**
 * Listens for a keyup event from the matching key before calling back.
 *
 * @param keys If any one of the keys matches a callback will be made.
 */
export function useKeyup(keys: string | string[], callBack: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (typeof keys === "string") {
        if (event.key === keys) {
          callBack(event);
        }
      } else if (keys.some((key) => event.key === key)) {
        callBack(event);
      }
    };

    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("keyup", listener);
    };
  }, [callBack, keys]);
}
