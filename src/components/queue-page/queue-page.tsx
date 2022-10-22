import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { IQueueElement, IQueue } from "../../types/main";
import { sleep } from "../../utils/utils";

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";

class Queue<T> implements IQueue<T> {
  public oldestIndex: number;
  public newestIndex: number;
  public storage: IQueueElement[];
  constructor() {
    this.oldestIndex = 0;
    this.newestIndex = 0;
    this.storage = [];
  }

  enqueue = (data: string) => {
    this.storage[this.newestIndex].value = data;
    this.newestIndex++;
  };

  dequeue = () => {
    var oldestIndex = this.oldestIndex,
      newestIndex = this.newestIndex,
      deletedData;

    if (oldestIndex !== newestIndex) {
      deletedData = this.storage[oldestIndex];
      this.storage[oldestIndex] = { value: "", state: ElementStates.Default };
      this.oldestIndex++;

      return deletedData;
    }
  };
}

export const QueuePage = () => {
  const [data, setData] = React.useState<IQueueElement[]>([]);
  const [input, setInput] = useState("");
  const [deleteDisabled, setDeleteDisabled] = useState(true);

  const initialData = [
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
  ];

  function checkEmpty() {
    const arr = data.filter((el) => el.value !== "");

    if (arr.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  const queue = React.useMemo(() => {
    return new Queue<string>();
  }, []);

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();
    setInput(value);
  };

  //Добавление
  const handleAdd = async () => {
    setInput("");
    queue.enqueue(input);
    queue.storage[queue.newestIndex - 1].state = ElementStates.Changing;
    setData([...queue.storage]);
    await sleep(500);
    queue.storage[queue.newestIndex - 1].state = ElementStates.Default;
    setData([...queue.storage]);
  };

  //Удаление
  const handleDelete = async () => {
    queue.dequeue();
    queue.storage[queue.oldestIndex - 1].state = ElementStates.Changing;
    setData([...queue.storage]);
    await sleep(500);
    queue.storage[queue.oldestIndex - 1].state = ElementStates.Default;
    setData([...queue.storage]);
  };

  //Очистка
  const handleClear = () => {
    queue.storage = [...initialData];
    queue.newestIndex = 0;
    queue.oldestIndex = 0;
    setData([...queue.storage]);
  };

  useEffect(() => {
    queue.storage = [...initialData];
    setData([...queue.storage]);
  }, []);

  useEffect(() => {
    setDeleteDisabled(checkEmpty());
  }, [data]);

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            id="input"
            maxLength={4}
            onInput={(evt: React.ChangeEvent<HTMLInputElement>) => {
              handleInput(evt);
            }}
            value={input}
          />
          <Button text="Добавить" disabled={input.length > 0 ? false : true} onClick={handleAdd} />
          <Button text="Удалить" onClick={handleDelete} disabled={deleteDisabled} />
        </div>
        <Button text="Очистить" onClick={handleClear} disabled={deleteDisabled} />
      </div>
      <div className={styles.stack_container}>
        {data &&
          data.map((el, i) => {
            return (
              <Circle
                letter={el.value}
                key={i}
                head={i === queue.oldestIndex ? "head" : ""}
                tail={i + 1 === queue.newestIndex ? "tail" : ""}
                state={el.state}
                index={i}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
