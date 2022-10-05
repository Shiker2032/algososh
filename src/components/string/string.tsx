//@ts-nocheck
import styles from "./string.module.css";
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
export const StringComponent: React.FC = () => {
  const [stringArr, setStringArr] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [value, setValue] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleInput = (evt) => {
    setValue(evt.target.value);
    if (value > 0) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };
  const handleClick = () => {
    let start = 0;
    let end = value.length - 1;
    let time = 1000;

    const arr = [...value];
    setStringArr(arr);
    setisLoading(true);

    arr.forEach((el, i) => {
      arr[i] = {
        letter: el,
        state: ElementStates.Default,
      };
    });

    setTimeout(() => {
      while (start <= end) {
        reverse(arr, start, end, time);
        start++;
        end--;
        time += 1000;
      }
    }, 1000);
    const reverse = (arr, i1, i2, time) => {
      setTimeout(() => {
        arr[i1].state = ElementStates.Changing;
        arr[i2].state = ElementStates.Changing;
        setStringArr([...arr]);
      }, time);
      setTimeout(() => {
        [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
        arr[i1].state = ElementStates.Modified;
        arr[i2].state = ElementStates.Modified;
        setStringArr([...arr]);

        if (i1 === i2 - 1) {
          setisLoading(false);
        }
      }, time + 1000);
    };
  };

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
        <Button
          onClick={handleClick}
          text="Развернуть"
          disabled={disableBtn}
          isLoader={isLoading}
        />
      </div>
      <div className={styles.letters__container}>
        {stringArr.length > 0 &&
          stringArr.map((el, i) => {
            return <Circle state={el.state} letter={el.letter} key={i} />;
          })}
      </div>
    </SolutionLayout>
  );
};
