//@ts-nocheck
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const input = document.getElementById("string-input");
  const [stringArr, setStringArr] = useState([null]);

  const [disableBtn, setDisableBtn] = useState(true);
  const handleInput = () => {
    setDisableBtn(false);
  };
  const handleClick = () => {
    const string = input?.value;
    const arr = string.split("");
    setStringArr(arr);
    bubbleSort(arr);
  };

  const bubbleSort = (arr: number[]): number[] => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.input__container}>
        <Input
          onInput={(evt) => handleInput(evt)}
          maxLength={11}
          type={"text"}
          isLimitText={true}
          extraClass={styles.string_input}
          id="string-input"
        />
        <Button onClick={handleClick} text="Развернуть" disabled={disableBtn} />
      </div>
      <div className={styles.letters__container}>
        {stringArr.length > 1 &&
          stringArr.map((stringEl, i) => {
            return <Circle state={ElementStates.Changing} key={i} letter={stringEl} />;
          })}
      </div>
    </SolutionLayout>
  );
};
