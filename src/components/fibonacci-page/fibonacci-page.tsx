import React, { useState } from "react";
import { sleep } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./fibonacci-page.module.css";
export const FibonacciPage: React.FC = () => {
  const [sequenceArr, setSequenceArr] = React.useState<number[]>([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [value, setValue] = React.useState<number | undefined>();
  const [isLoading, setisLoading] = useState(false);

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim();

    if (value && !isNaN(value as unknown as number)) {
      setDisableBtn(false);
      setValue(Number(value));
    } else {
      setDisableBtn(true);
    }
  };

  const fibSequence = async (n: number) => {
    let arr = [1, 1];
    let time = 500;
    setisLoading(true);

    for (let i = 2; i <= n; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
      setSequenceArr([...arr]);
      if (i === n) {
        setisLoading(false);
      }
      await sleep(time);
    }
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input__container}>
        <Input
          onInput={(evt: React.ChangeEvent<HTMLInputElement>) => handleInput(evt)}
          maxLength={2}
          type={"text"}
          isLimitText={true}
          extraClass={styles.string_input}
          id="string-input"
        />
        <Button
          onClick={() => fibSequence(Number(value))}
          text="Рассчитать"
          disabled={disableBtn}
          isLoader={isLoading}
        />
      </div>
      <div className={styles.circles__container}>
        {sequenceArr.length > 0 &&
          sequenceArr.map((el, i) => {
            return <Circle letter={"" + el} key={i} index={i} />;
          })}
      </div>
    </SolutionLayout>
  );
};
