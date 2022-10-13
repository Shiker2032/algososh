//@ts-nocheck

import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [renderArray, setRenderArray] = useState([]);
  let time = 100;

  useEffect(() => {
    setRenderArray([...generateArray()]);
  }, []);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function generateArray() {
    let length = getRandomNumber(3, 19);
    let array = Array.from({ length }, () => getRandomNumber(1, 100));
    array.map((el, i) => {
      array[i] = {
        value: el,
        state: ElementStates.Default,
      };
    });
    return array;
  }

  function handleSort(data, type) {
    if (selectedSort === "bubble") {
      bubbleSort(data, type);
    } else {
      selectionSortAsync(data, type);
    }
  }

  async function bubbleSort(arr, sortingType) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setRenderArray([...arr]);
        await sleep(time);
        if (
          sortingType === "asc" ? arr[j].value > arr[j + 1].value : arr[j].value < arr[j + 1].value
        ) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setRenderArray([...arr]);
          await sleep(time);
        }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setRenderArray([...arr]);
        await sleep(time);
      }
      arr[arr.length - 1 - i].state = ElementStates.Modified;
      setRenderArray([...arr]);
    }
    arr[0].state = ElementStates.Modified;
    arr[arr.length - 1].state = ElementStates.Modified;
    setRenderArray([...arr]);
  }

  async function selectionSortAsync(arr, sortingType) {
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      arr[i].state = ElementStates.Changing;
      setRenderArray([...arr]);
      for (let j = i + 1; j < arr.length; j++) {
        if (
          sortingType === "asc"
            ? arr[minIdx].value > arr[j].value
            : arr[minIdx].value < arr[j].value
        ) {
          minIdx = j;
        }
        arr[j].state = ElementStates.Changing;
        setRenderArray([...arr]);
        await sleep(time);
        arr[j].state = ElementStates.Default;
      }
      arr[i].state = ElementStates.Default;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      arr[i].state = ElementStates.Modified;
      setRenderArray([...arr]);
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form>
        <div className={styles.input__container}>
          <RadioInput
            name="rb"
            onChange={(evt) => {
              setSelectedSort("bubble");
            }}
            label="Пузырьком"
          />
          <RadioInput
            name="rb"
            onChange={() => {
              setSelectedSort("selection");
            }}
            label="Выбором"
          />
          <Button
            text="По возрастанию"
            onClick={() => {
              handleSort(renderArray, "asc");
            }}
          />
          <Button
            text="По убыванию"
            onClick={() => {
              handleSort(renderArray, "desc");
            }}
          />
          <Button
            onClick={() => {
              setRenderArray([...generateArray()]);
            }}
            text="Новый массив"
          />
        </div>
        <div className={styles.columns__container}>
          {renderArray.length > 1 &&
            renderArray.map((el, i) => {
              return <Column index={el.value} state={el.state} key={i} />;
            })}
        </div>
      </form>
    </SolutionLayout>
  );
};
