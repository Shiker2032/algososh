//@ts-nocheck

import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage = () => {
  const [data, setData] = useState([
    {
      value: 0,
      state: ElementStates.Default,
      hasCircle: false,
      circle: null,
      circleBottom: false,
    },
    {
      value: 34,
      state: ElementStates.Default,
      hasCircle: false,
      circle: null,
      circleBottom: false,
    },
    { value: 8, state: ElementStates.Default, hasCircle: false, circle: null, circleBottom: false },
    { value: 1, state: ElementStates.Default, hasCircle: false, circle: null, circleBottom: false },
  ]);
  const [input, setInput] = useState("");
  const [inputIndex, setInputIndex] = useState(0);
  const [showHead, setShowHead] = useState(true);
  const [showTail, setShowTail] = useState(true);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleAddByIndex = async (index, input) => {
    const arr = data;
    const indexInput = Number(index);

    for (let j = 0; j < arr.length; j++) {
      if (indexInput !== j) {
        arr[j] = {
          ...arr[j],
          state: ElementStates.Changing,
          hasCircle: true,
          circle: { value: input, state: ElementStates.Default },
        };
        setData([...arr]);
        setShowHead(false);
        await sleep(1000);
        arr[j] = {
          ...arr[j],
          hasCircle: false,
          circle: null,
        };
        setData([...arr]);
      } else {
        arr[indexInput] = {
          ...arr[indexInput],
          hasCircle: true,
          circle: { value: input, state: ElementStates.Changing },
        };
        setData([...arr]);

        await sleep(1000);
        arr[indexInput] = {
          ...arr[indexInput],
          hasCircle: false,
          circle: null,
        };
        arr.splice(indexInput, 0, {
          ...arr[indexInput],
          value: input,
        });
        arr.forEach((el) => (el.state = ElementStates.Default));
        arr[j].state = ElementStates.Modified;
        setData([...arr]);
        setShowHead(true);
        await sleep(1000);
        arr[j].state = ElementStates.Default;
        setData([...arr]);
        return;
      }
    }
  };

  const handleDeleteIndex = async (index) => {
    const arr = data;
    const inputIndex = Number(index);
    for (let j = 0; j < arr.length; j++) {
      if (j !== inputIndex) {
        arr[j].state = ElementStates.Changing;
        setData([...arr]);
        await sleep(1000);
      } else {
        arr[j].state = ElementStates.Changing;
        setData([...arr]);

        await sleep(1000);
        arr[j].state = ElementStates.Default;
        arr[j] = {
          ...arr[j],
          value: "",
          hasCircle: true,
          circle: { value: arr[j].value, state: ElementStates.Changing },
          circleBottom: true,
        };
        setData([...arr]);
        setShowTail(false);
        await sleep(1000);
        arr.splice(j, 1);
        arr.forEach((el) => (el.state = ElementStates.Default));
        setData([...arr]);
        setShowTail(true);
        return;
      }
    }

    arr.splice(i, 1);
    setData([...arr]);
  };

  const handleAddHead = async (input) => {
    const arr = data;
    arr[0] = {
      ...arr[0],
      hasCircle: true,
      circle: { value: input, state: ElementStates.Default },
      circleBottom: false,
    };
    arr[0].state = ElementStates.Changing;
    setData([...arr]);
    setShowHead(false);
    await sleep(1000);
    arr[0] = {
      ...arr[0],
      hasCircle: false,
      circle: null,
      state: ElementStates.Default,
    };
    arr.unshift({ value: input, state: ElementStates.Default });
    arr[0].state = ElementStates.Modified;
    setData([...arr]);
    setShowHead(true);
    await sleep(1000);
    arr[0].state = ElementStates.Default;
    setData([...arr]);
  };

  const handleAddTail = async (input) => {
    const arr = data;
    let step = arr.length - 1;
    arr[step] = {
      ...arr[step],
      hasCircle: true,
      circle: { value: input, state: ElementStates.Changing },
      circleBottom: false,
    };
    setData([...arr]);
    await sleep(1000);
    arr[step] = {
      ...arr[step],
      hasCircle: false,
      circle: null,
    };
    arr.push({ value: input, state: ElementStates.Modified });
    setData([...arr]);
    await sleep(1000);
    arr[step + 1].state = ElementStates.Default;
    setData([...arr]);
  };

  const handleDeleteTail = async () => {
    const arr = data;
    const temp = arr[arr.length - 1];

    arr[arr.length - 1] = {
      ...arr[0],
      value: "",
      hasCircle: true,
      circle: { value: temp.value, state: ElementStates.Changing },
      circleBottom: true,
    };
    setData([...arr]);
    setShowTail(false);
    await sleep(1000);
    arr.splice(arr.length - 1, 1);
    setData([...arr]);
    setShowTail(true);
  };

  const handleDeleteHead = async () => {
    const arr = data;
    const temp = arr[0];

    arr[0] = {
      ...arr[0],
      value: "",
      hasCircle: true,
      circle: { value: temp.value, state: ElementStates.Changing },
      circleBottom: true,
    };

    setData([...arr]);
    await sleep(1000);
    arr.splice(0, 1);
    setData([...arr]);
  };

  const handleInput = (evt) => {
    setInput(evt.target.value);
  };

  const handleInputIndex = (evt) => {
    setInputIndex(evt.target.value);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            id="input"
            maxLength={4}
            onInput={(evt) => {
              handleInput(evt);
            }}
          />
          <Button text="Добавить в head" onClick={() => handleAddHead(input)} />
          <Button text="Добавить в tail" onClick={() => handleAddTail(input)} />
          <Button text="Удалить из head" onClick={handleDeleteHead} />
          <Button text="Удалить из tail" onClick={handleDeleteTail} />
        </div>
        <div className={styles.input}>
          <Input
            id="inputIndex"
            maxLength={4}
            onInput={(evt) => {
              handleInputIndex(evt);
            }}
          />
          <Button text="Добавить по индексу" onClick={() => handleAddByIndex(inputIndex, input)} />
          <Button text="Удалить по индексу" onClick={() => handleDeleteIndex(inputIndex)} />
        </div>
      </div>
      <div className={styles.stack_container}>
        {data &&
          data.map((el, i) => {
            return (
              <div key={Math.round(Math.random() * 1000000)} className={styles.circles__container}>
                <div className={styles.stack_top}>
                  {el.hasCircle && el.circleBottom === false && (
                    <Circle letter={el.circle.value} state={el.circle?.state} isSmall />
                  )}
                </div>
                <Circle
                  letter={el.value}
                  key={Math.round(Math.random() * i)}
                  state={el.state}
                  head={i === 0 && showHead ? "head" : ""}
                  tail={data.length - 1 === i && showTail ? "tail" : ""}
                  index={i}
                />

                <div className={styles.stack_bottom}>
                  {el.hasCircle && el.circleBottom && (
                    <Circle letter={el.circle.value} state={el.circle?.state} isSmall />
                  )}
                </div>
                {data.length - 1 !== i && <ArrowIcon />}
              </div>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
