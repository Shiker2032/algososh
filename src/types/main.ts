import { ElementStates } from "./element-states";

export interface IString {
  letter: string;
  state: ElementStates;
}

export interface ISort {
  value: number;
  state: ElementStates;
}

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  elements: () => (T | null)[];
  clear: () => void;
}
