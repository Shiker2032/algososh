//@ts-nocheck

import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";

class Queue<T> implements IQueue<T> {
  constructor() {
    this._oldestIndex = 0;
    this._newestIndex = 0;
    this._storage = [
      { value: "", state: ElementStates.Default },
      { value: "", state: ElementStates.Default },
      { value: "", state: ElementStates.Default },
      { value: "", state: ElementStates.Default },
      { value: "", state: ElementStates.Default },
      { value: "", state: ElementStates.Default },
      { value: "", state: ElementStates.Default },
    ];
  }

  size = () => {
    return this._newestIndex - this._oldestIndex;
  };

  enqueue = (data) => {
    this._storage[this._newestIndex].value = data;
    this._newestIndex++;
  };

  dequeue = () => {
    var oldestIndex = this._oldestIndex,
      newestIndex = this._newestIndex,
      deletedData;

    if (oldestIndex !== newestIndex) {
      deletedData = this._storage[oldestIndex];
      this._storage[oldestIndex] = { value: "", state: ElementStates.Default };
      this._oldestIndex++;

      return deletedData;
    }
  };
}

export const QueuePage = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [color, setColor] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const queue = React.useMemo(() => {
    return new Queue<string>();
  }, []);

  const handleInput = (evt) => {
    setInput(evt.target.value);
  };

  //Добавление
  const handleAdd = async () => {
    queue.enqueue(input);
    queue._storage[queue._newestIndex - 1].state = ElementStates.Changing;
    setData([...queue._storage]);
    await sleep(500);
    queue._storage[queue._newestIndex - 1].state = ElementStates.Default;
    setData([...queue._storage]);
  };

  //Удаление
  const handleDelete = async () => {
    queue.dequeue();
    queue._storage[queue._oldestIndex - 1].state = ElementStates.Changing;
    setData([...queue._storage]);
    await sleep(500);
    queue._storage[queue._oldestIndex - 1].state = ElementStates.Default;
    setData([...queue._storage]);
  };

  //Очистка
  const handleClear = () => {
    setData([]);
  };

  useEffect(() => {
    setData([...queue._storage]);
  }, []);

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            id="input"
            maxLength={4}
            onInput={(evt) => {
              handleInput(evt);
            }}
          />

          <Button text="Добавить" onClick={handleAdd} />
          <Button text="Удалить" onClick={handleDelete} />
        </div>
        <Button text="Очистить" onClick={handleClear} />
      </div>
      <div className={styles.stack_container}>
        {data &&
          data.map((el, i) => {
            return (
              <Circle
                letter={el.value}
                key={i}
                head={i === queue._oldestIndex ? "head" : ""}
                tail={i + 1 === queue._newestIndex ? "tail" : ""}
                state={el.state}
                index={i}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
