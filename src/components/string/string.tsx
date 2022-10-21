import styles from "./string.module.css";
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { IString } from "../../types/string";

export const StringComponent: React.FC = () => {
  const [displayArr, setDisplayArr] = React.useState<IString[]>([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [input, setInput] = React.useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();
    if (value) {
      setDisableBtn(false);
      setInput(value);
    } else {
      setDisableBtn(true);
    }
  };

  const handleClick = () => {
    let start = 0;
    let end = input.length - 1;
    let time = 1000;
    const outputArr: IString[] = [];
    const inputArr = Array.from(input);

    setisLoading(true);
    inputArr.forEach((el, i) => {
      const object = {
        letter: el,
        state: ElementStates.Default,
      };
      outputArr.push(object);
    });

    setDisplayArr([...outputArr]);
    setTimeout(() => {
      while (start <= end) {
        reverse(outputArr, start, end, time);
        start++;
        end--;
        time += 1000;
      }
    }, 1000);

    const reverse = (arr: IString[], i1: number, i2: number, time: number) => {
      setTimeout(() => {
        arr[i1].state = ElementStates.Changing;
        arr[i2].state = ElementStates.Changing;
        setDisplayArr([...arr]);
      }, time);
      setTimeout(() => {
        [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
        arr[i1].state = ElementStates.Modified;
        arr[i2].state = ElementStates.Modified;
        setDisplayArr([...arr]);
      }, time + 1000);
      if (i1 + 1 === i2 || i1 === i2) {
        setTimeout(() => {
          setisLoading(false);
        }, time + 1000);
      }
    };
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.input__container}>
        <Input
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleInput(evt)}
          maxLength={11}
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
      <div className={styles.letters__container}>
        {displayArr.length > 0 &&
          displayArr.map((el, i) => {
            return <Circle state={el?.state} letter={el?.letter} key={i} />;
          })}
      </div>
    </SolutionLayout>
  );
};
