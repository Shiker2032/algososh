//@ts-nocheck

import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stake-page.module.css";

class Stack<T> implements IStack<T> {
  private container: T[] = [];

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

export const StackPage = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [color, setColor] = useState(false);
  const stack = React.useMemo(() => {
    return new Stack<string>();
  }, []);

  const handleInput = (evt) => {
    setInput(evt.target.value);
  };

  //Добавление
  const handleAdd = () => {
    stack.push(input);
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setData([...stack.container]);
      setTimeout(() => {
        setColor(ElementStates.Default);
        setData([...stack.container]);
      }, 500);
    }, 500);
  };

  //Удаление
  const handleDelete = () => {
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setData([...stack.container]);
      setTimeout(() => {
        stack.pop();
        setColor(ElementStates.Default);
        setData([...stack.container]);
      }, 500);
    }, 500);
  };

  //Очистка
  const handleClear = () => {
    stack.clear();
    setData([]);
  };

  return (
    <SolutionLayout title="Стек">
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
        {data.length > 0 &&
          data.map((el, i) => {
            return (
              <Circle
                letter={el}
                key={i}
                head={i === data.length - 1 ? "top" : ""}
                state={data.length - 1 === i ? color : ElementStates.Default}
                index={i}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
