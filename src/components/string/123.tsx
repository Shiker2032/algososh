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
  const [value, setValue] = useState("");
  const [index, setIndex] = useState({ start: -1, end: 99, buffer: false });
  const handleInput = () => {
    setDisableBtn(false);
  };

  const handleSubmit = () => {
    setValue(input.value);
    setIndex({ ...index, start: -1, end: 99, buffer: true });
    let start = 0;
    let end = input.value.length - 1;
    let time = 1000;
    const arr = [...input.value];
    setStringArr(arr);
    arr.forEach((el, i) => {
      arr[i] = {
        letter: el,
        state: ElementStates.Default,
      };
    });

    while (start <= end) {
      swap(arr, start, end, time);
      start++;
      end--;
      time += 1000;
    }
  };

  const swap = (arr, i1, i2, time) => {
    setTimeout(() => {
      arr[i1].state = ElementStates.Changing;
      arr[i2].state = ElementStates.Changing;

      setTimeout(() => {
        const temp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = temp;
        setIndex({
          ...index,
          start: i1 + 1,
          end: i2 - 1,
          buffer: true,
        });
        if (i1 + 1 === i2 || i1 === i2) {
          setIndex({ ...index, start: -1, end: 99, buffer: false });
          setValue("");
        }
        arr[i1].state = ElementStates.Modified;
        arr[i2].state = ElementStates.Modified;
      }, time);
    }, time);
  };

  // const handleClick = () => {
  //   const string = input?.value;
  //   const arr = string.split("");
  //   arr.forEach((letter, i) => {
  //     arr[i] = {
  //       letter: letter,
  //       state: ElementStates.Default,
  //     };
  //   });
  //   setStringArr(arr);
  //   bubbleSort(arr);
  // };

  // const bubbleSort = (arr) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = i + 1; j < arr.length; j++) {
  //       setTimeout(() => {
  //         arr[i].state = ElementStates.Modified;
  //         arr[j].state = ElementStates.Modified;
  //         setStringArr(arr);
  //       }, 1000);

  //       // const temp = arr[i].letter;
  //       // arr[i].letter = arr[j].letter;
  //       // arr[j].letter = temp;
  //     }
  //   }
  // };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.input__container}>
        <Input
          onChange={(evt) => handleInput(evt)}
          maxLength={11}
          type={"text"}
          isLimitText={true}
          extraClass={styles.string_input}
          id="string-input"
        />
        <Button onClick={handleSubmit} text="Развернуть" disabled={disableBtn} />
      </div>
      <div className={styles.letters__container}>
        {stringArr.length > 1 &&
          stringArr.map((el, i) => {
            return <Circle state={el.state} letter={el.letter} key={i} />;
          })}
      </div>
    </SolutionLayout>
  );
};
