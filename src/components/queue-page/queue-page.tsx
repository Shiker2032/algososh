import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { IQueueElement } from "../../types/main";
import { sleep } from "../../utils/utils";
import styles from "./queue-page.module.css";
import Queue from "./queue-class";

export const QueuePage = () => {
  const [data, setData] = React.useState<IQueueElement[]>([]);
  const [input, setInput] = useState("");
  const [deleteDisabled, setDeleteDisabled] = useState(true);

  const initialData: IQueueElement[] = [
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
    { value: "", state: ElementStates.Default },
  ];

  const checkEmpty = () => {
    const arr = data.filter((el) => el.value !== "");

    if (arr.length > 0) {
      return false;
    } else {
      return true;
    }
  };

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
    queue.changeState(queue.newestIndex - 1, ElementStates.Changing);
    setData([...queue.getElements()]);
    await sleep(500);
    queue.changeState(queue.newestIndex - 1, ElementStates.Default);
    setData([...queue.getElements()]);
  };

  //Удаление
  const handleDelete = async () => {
    queue.dequeue();
    queue.changeState(queue.oldestIndex - 1, ElementStates.Changing);
    setData([...queue.getElements()]);
    await sleep(500);
    queue.changeState(queue.oldestIndex - 1, ElementStates.Default);
    setData([...queue.getElements()]);
  };

  //Очистка
  const handleClear = () => {
    queue.clear();
    queue.setContainer(initialData);
    setData([...queue.getElements()]);
  };

  useEffect(() => {
    queue.setContainer(initialData);
    setData([...queue.getElements()]);
  }, []);

  useEffect(() => {
    setDeleteDisabled(checkEmpty());
  }, [data]);

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.inputs}>
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
      <div className={styles.circles}>
        {queue.getElements() &&
          queue.getElements().map((el, i) => {
            return (
              <Circle
                letter={el.value as string}
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
