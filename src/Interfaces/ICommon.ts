import { ChangeEvent, ReactNode } from "react";
import { SetterOrUpdater } from "recoil";

export interface IHeader {
  title: string;
  debounceSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IBackdrop {
  opacity: number;
  onClick: () => void;
  customStyle?: React.CSSProperties;
}
export interface ZAccordionProps {
  style: React.CSSProperties | undefined;
  panels: { header: string; body: ReactNode | ReactNode[] }[];
  showCount: boolean;
  defaultActiveKey?: string[];
  onChange?: (key: string | string[]) => void;
}
export interface ColorPaletteProps {
  colorIndex: number;
  setColorIndex: SetterOrUpdater<number>;
}

export interface ISubHeaderProps {
  title: string;
  leftNav: () => void;
  rightNav: () => void;
  showLeftNav: boolean;
  showRightNav: boolean;
}

export interface IconProps {
  title: string;
  active?: boolean;
  c1?: string;
  c2?: string;
}
