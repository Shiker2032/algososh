import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { IStack } from "../../types/main";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Stack from "./stackClass";
import styles from "./stake-page.module.css";

export const StackPage = () => {
  const [displayArr, setDisplayArr] = React.useState<string[]>([]);
  const [input, setInput] = useState("");
  const [color, setColor] = React.useState<ElementStates>(ElementStates.Default);
  const time = 500;

  const stack = React.useMemo(() => {
    return new Stack<string>();
  }, []);

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();
    setInput(value);
  };

  //Добавление
  const handleAdd = () => {
    stack.push(input);
    setInput("");
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setDisplayArr([...stack.container]);
      setTimeout(() => {
        setColor(ElementStates.Default);
        setDisplayArr([...stack.container]);
      }, time);
    }, time);
  };

  //Удаление
  const handleDelete = () => {
    setTimeout(() => {
      setColor(ElementStates.Changing);
      setDisplayArr([...stack.container]);
      setTimeout(() => {
        stack.pop();
        setColor(ElementStates.Default);
        setDisplayArr([...stack.container]);
      }, time);
    }, time);
  };
  //Очистка
  const handleClear = () => {
    stack.clear();
    setDisplayArr([]);
  };

  return (
    <SolutionLayout title="Стек">
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

          <Button text="Добавить" onClick={handleAdd} disabled={input.length > 0 ? false : true} />
          <Button
            text="Удалить"
            onClick={handleDelete}
            disabled={displayArr.length > 0 ? false : true}
          />
        </div>
        <Button
          text="Очистить"
          onClick={handleClear}
          disabled={displayArr.length > 0 ? false : true}
        />
      </div>
      <div className={styles.stack_container}>
        {displayArr.length > 0 &&
          displayArr.map((el, i) => {
            return (
              <Circle
                letter={el}
                key={i}
                head={i === displayArr.length - 1 ? "top" : ""}
                state={displayArr.length - 1 === i ? color : ElementStates.Default}
                index={i}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
