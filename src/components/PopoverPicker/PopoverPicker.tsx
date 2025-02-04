import {Button} from "@/components/Button";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {HexColorPicker} from "react-colorful";
import styles from "./PopoverPicker.module.css";

// Improved version of https://usehooks.com/useOnClickOutside/
function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: (event: Event) => void) {
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
  onConfirm: (newColor: string) => void;
}
export function PopoverPicker({color, onChange, onConfirm}: PopoverPickerProps) {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const previousColor = useRef(color);

  useClickOutside(popover, handleCancel);

  const closeSVG = <Image src="/close.svg" alt="Edit icon" width={16} height={16} />;
  const checkSVG = <Image src="/check.svg" alt="Edit icon" width={16} height={16} />;

  function handleOpen() {
    previousColor.current = color;
    toggle(true);
  }

  function handleCancel() {
    toggle(false);
    onChange(previousColor.current);
  }

  function handleConfirmClick() {
    toggle(false);
    onConfirm(color);
  }

  return (
    <div className={styles.picker}>
      <div className={styles.swatch} style={{backgroundColor: color}} onClick={handleOpen} />

      {isOpen && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
          <div className={styles.buttonWrap}>
            <Button iconOnly onClick={handleCancel}>
              {closeSVG}
            </Button>
            <Button buttonStyle="submit" iconOnly onClick={handleConfirmClick}>
              {checkSVG}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
