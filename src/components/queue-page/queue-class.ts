import { ElementStates } from "../../types/element-states";
import { IQueue, IQueueElement } from "../../types/main";

export default class Queue<T> implements IQueue<T> {
  private _container: IQueueElement[];
  oldestIndex: number;
  newestIndex: number;

  constructor() {
    this.oldestIndex = 0;
    this.newestIndex = 0;
    this._container = [];
  }

  changeState = (i: number, state: ElementStates) => {
    this._container[i].state = state;
  };

  setContainer = (data: IQueueElement[]) => {
    this._container = [...data];
  };

  enqueue = (data: string) => {
    this._container[this.newestIndex].value = data;
    this.newestIndex++;
  };

  getElements = () => {
    const arr = [];
    for (let i = 0; i < this._container.length; i++) {
      arr.push(this._container[i]);
    }
    return arr;
  };

  dequeue = () => {
    var oldestIndex = this.oldestIndex,
      newestIndex = this.newestIndex,
      deletedData;

    if (oldestIndex !== newestIndex) {
      deletedData = this._container[oldestIndex];
      this._container[oldestIndex] = { value: "", state: ElementStates.Default };
      this.oldestIndex++;

      return deletedData;
    }
  };

  clear = () => {
    this._container = [];
    this.newestIndex = 0;
    this.oldestIndex = 0;
  };
}
