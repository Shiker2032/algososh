import { IStack } from "../../types/main";

export default class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  elements = () => {
    const arr = [];
    for (let i of this.container) arr.push(i);
    return arr;
  };

  clear = () => {
    this.container = [];
  };
}
