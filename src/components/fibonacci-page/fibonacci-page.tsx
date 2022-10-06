//@ts-nocheck

import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./fibonacci-page.module.css";
export const FibonacciPage: React.FC = () => {
  const [stringArr, setStringArr] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleInput = (evt) => {
    setValue(evt.target.value);
  };

  const handleClick = () => {
    let start = 0;
    let end = value;
    let time = 500;
    const arr = [];
    setStringArr([]);
    setTimeout(() => {
      while (start <= end) {
        arr.push(fib(start + 1));
        start++;
        time += 500;
      }
    }, 500);

    const fib = (n) => {
      let arr = [0, 1];
      for (let i = 2; i < n + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
      }
      setTimeout(() => {
        setStringArr([...arr.splice(1)]);
      }, time);
    };
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input__container}>
        <Input
          onInput={(evt) => handleInput(evt)}
          maxLength={2}
          type={"text"}
          isLimitText={true}
          extraClass={styles.string_input}
          id="string-input"
        />
        <Button
          onClick={handleClick}
          text="Развернуть"
          disabled={disableBtn}
          isLoader={isLoading}
        />
      </div>
      <div className={styles.circles__container}>
        {stringArr.length > 0 &&
          stringArr.map((el, i) => {
            return <Circle letter={"" + el} key={i} index={i} />;
          })}
      </div>
    </SolutionLayout>
  );
};
