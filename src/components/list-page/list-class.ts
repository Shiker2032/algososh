import { ElementStates } from "../../types/element-states";
import { IList, IListElement } from "../../types/main";

export default class LinkedListNode<T> implements IList<T> {
  _container: IListElement[];

  constructor(initialData?: IListElement[]) {
    if (initialData) {
      this._container = [...initialData];
    } else {
      this._container = [];
    }
  }

  setContainer = (data: IListElement[]) => {
    this._container = [...data];
  };

  getElements = () => {
    const arr = [];
    for (let i = 0; i < this._container.length; i++) {
      arr.push(this._container[i]);
    }
    return arr;
  };

  changeElement = (i: number, data: IListElement) => {
    this._container[i] = { ...this._container[i], ...data };
  };

  addByIndex = async (index: number, input: string | number) => {
    const arr = this._container;
    arr.splice(index, 0, {
      ...arr[index],
      value: input,
    });
    arr.forEach((el) => (el.state = ElementStates.Default));
    this._container = [...arr];
  };

  deleteByIndex = async (index: number) => {
    const arr = this._container;
    arr.splice(index, 1);
    arr.forEach((el) => (el.state = ElementStates.Default));
    this._container = [...arr];
  };

  prepend = async (input: string | number) => {
    const arr = this._container;
    arr.unshift({
      value: input,
      state: ElementStates.Default,
      circle: null,
      circleBottom: false,
    });
    this._container = [...arr];
  };
  append = (input: IListElement) => {
    this._container.push(input);
  };

  deleteTail = () => {
    const arr = this._container;
    arr.splice(arr.length - 1, 1);
    this._container = [...arr];
  };

  deleteHead = () => {
    const arr = this._container;
    arr.splice(0, 1);
    this._container = [...arr];
  };
}
