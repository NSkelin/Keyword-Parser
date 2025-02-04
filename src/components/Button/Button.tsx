import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import styles from "./Button.module.scss";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  /**
   * Determines the buttons styling.
   * @default "default"
   */
  buttonStyle?: "default" | "submit" | "delete" | "create";
  /**
   * True makes the padding on all sides equal, results in a square button instead of a rectangular button.
   * @default false
   */
  iconOnly?: boolean;
  /**
   * Should the button stretch to it fill its container.
   * @default "none"
   */
  stretch?: "none" | "width" | "height" | "both";
  children?: React.ReactNode;
}

/**
 * A generic button component to keep unified styling across all buttons.
 */
export function Button({
  buttonStyle = "default",
  iconOnly = false,
  stretch = "none",
  className,
  children,
  ...props
}: ButtonProps) {
  const iconStyle = iconOnly ? "icon" : "";
  const stretchedStyle = `${stretch}Stretched`;

  // space after each line is required to work.
  const classNames = `
  ${styles[buttonStyle]} 
  ${styles[iconStyle]} 
  ${styles[stretchedStyle]} 
  ${className} 
  `;
  return (
    <>
      <button className={classNames} {...props}>
        {children}
      </button>
    </>
  );
}
