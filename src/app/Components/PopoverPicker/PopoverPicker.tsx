import {useCallback, useEffect, useRef, useState} from "react";
import {HexColorPicker} from "react-colorful";
import styles from "./PopoverPicker.module.css";

// Improved version of https://usehooks.com/useOnClickOutside/
function useClickOutside(ref: React.RefObject<HTMLElement>, handler: (event: Event) => void) {
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

interface PopoverPickerProps {
  color: string;
  onChange: (newColor: string) => void;
}
export function PopoverPicker({color, onChange}: PopoverPickerProps) {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className={styles.picker}>
      <div className={styles.swatch} style={{backgroundColor: color}} onClick={() => toggle(true)} />

      {isOpen && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
