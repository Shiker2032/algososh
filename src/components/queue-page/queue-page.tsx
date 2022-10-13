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
    this._storage = ["", "", "", "", "", ""];
  }

  size = () => {
    return this._newestIndex - this._oldestIndex;
  };

  enqueue = (data) => {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
  };

  dequeue = () => {
    var oldestIndex = this._oldestIndex,
      newestIndex = this._newestIndex,
      deletedData;

    if (oldestIndex !== newestIndex) {
      deletedData = this._storage[oldestIndex];
      delete this._storage[oldestIndex];
      this._oldestIndex++;

      return deletedData;
    }
  };
}

export const QueuePage = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [color, setColor] = useState(false);

  const queue = React.useMemo(() => {
    return new Queue<string>();
  }, []);

  const handleInput = (evt) => {
    setInput(evt.target.value);
  };

  //Добавление
  const handleAdd = () => {
    queue.enqueue(input);
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setData([...queue._storage]);
      setTimeout(() => {
        setColor(ElementStates.Default);
        setData([...queue._storage]);
      }, 500);
    }, 500);
  };

  //Удаление
  const handleDelete = () => {
    queue.dequeue();
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setData([...queue._storage]);
      setTimeout(() => {
        setColor(ElementStates.Default);
        setData([...queue._storage]);
      }, 500);
    }, 500);
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
                letter={el}
                key={i}
                head={i === queue._oldestIndex ? "head" : ""}
                tail={i + 1 === queue._newestIndex ? "tail" : ""}
                state={
                  (i + 1 === queue._newestIndex ? color : ElementStates.Default) ||
                  (i === queue._oldestIndex ? color : ElementStates.Default)
                }
                index={i}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
