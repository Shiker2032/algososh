import { ElementStates } from "./element-states";

export interface IString {
  letter: string;
  state: ElementStates;
}

export interface IQueueElement {
  value: number | string;
  state: ElementStates;
}

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  getElements: () => (T | null)[];
  clear: () => void;
}

export interface IQueue<T> {
  enqueue: (data: string) => void;
  dequeue: () => void;
  clear: () => void;
  changeState: (i: number, state: ElementStates) => void;
}

export interface IList<T> {
  setContainer: (data: IListElement[]) => void;
  getElements: () => IListElement[];
  changeElement: (i: number, data: IListElement) => void;
  addByIndex: (index: number, input: string | number) => void;
  deleteByIndex: (index: number) => void;
  prepend: (input: string | number) => void;
  append: (input: IListElement) => void;
  deleteTail: () => void;
  deleteHead: () => void;
}

export interface IListElement {
  value?: string | number;
  state?: ElementStates;
  circle?: null | {
    value?: string | number;
    state?: ElementStates;
  };
  circleBottom?: boolean;
}
