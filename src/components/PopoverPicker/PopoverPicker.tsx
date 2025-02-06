import {Button} from "@/components/Button";
import {useClickOutside} from "@/customHooks";
import Image from "next/image";
import {useRef, useState} from "react";
import {HexColorPicker} from "react-colorful";
import styles from "./PopoverPicker.module.css";

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
