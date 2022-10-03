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
  const [stringArr, setStringArr] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [value, setValue] = useState("");
  const handleInput = () => {
    setDisableBtn(false);
  };

  const handleSubmit = () => {
    setValue(input.value);

    let time = 1000;
    const arr = [...input.value];

    arr.forEach((el, i) => {
      arr[i] = {
        letter: el,
        state: ElementStates.Default,
      };
    });

    let step = arr.length;

    if (arr.length % 2 === 0) {
      for (let i = 0; i < arr.length / 2; i++) {
        setStringArr([...arr]);
        if (arr.length === 1) {
          arr[i].state = ElementStates.Modified;
          setStringArr([...arr]);
        }
        if (step <= i) {
          console.log("b");
          return;
        } else {
          setTimeout(() => {
            arr[i].state = ElementStates.Changing;
            arr[step - 1].state = ElementStates.Changing;
            setStringArr([...arr]);
          }, time);
          setTimeout(() => {
            const temp = arr[i];
            arr[i] = arr[step - 1];
            arr[step - 1] = temp;
            setStringArr([...arr]);
            step--;
          }, time + 1000);
          setTimeout(() => {
            arr[i].state = ElementStates.Modified;
            arr[step].state = ElementStates.Modified;
            setStringArr([...arr]);
          }, time + 2000);
        }

        time += 1000;
      }
    } else {
      for (let i = 0; i < Math.round(arr.length / 2); i++) {
        setTimeout(() => {
          step--;
          arr[i].state = ElementStates.Changing;
          arr[step].state = ElementStates.Changing;
          setStringArr([...arr]);
        }, time);
        setTimeout(() => {
          const temp = arr[i];
          arr[i] = arr[step];
          arr[step] = temp;
          setStringArr([...arr]);
        }, time + 1000);
        setTimeout(() => {
          arr[i].state = ElementStates.Modified;
          arr[step].state = ElementStates.Modified;
          setStringArr([...arr]);
        }, (time += 2000));
        time += 1000;
      }
    }
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
        <Button onClick={handleSubmit} text="Развернуть" disabled={disableBtn} />
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
