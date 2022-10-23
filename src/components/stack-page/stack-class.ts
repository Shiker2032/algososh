import { IStack } from "../../types/main";

export default class Stack<T> implements IStack<T> {
  private _container: T[] = [];

  push = (item: T): void => {
    this._container.push(item);
  };

  pop = (): void => {
    if (this._container.length !== 0) {
      this._container.pop();
    }
  };

  getElements = (): T[] => {
    const arr = [];
    for (let i = 0; i < this._container.length; i++) {
      arr.push(this._container[i]);
    }
    return arr;
  };

  clear = () => {
    this._container = [];
  };
}
