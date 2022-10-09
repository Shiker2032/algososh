//@ts-nocheck

import { reverse } from "dns/promises";
import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [data, setData] = useState([1, 5, 54, 30, 10, 3, 33, 20, 11, 13, 6]);
  let time = 1000;

  const bubbleSort = (arr, type) => {
    for (let i = 0; i < arr.length; i++) {
      time += 1000;
      for (let j = 0; j < arr.length; j++) {
        setTimeout(() => {
          bubbleSwap(arr, i, j, type);
        }, time);
      }
    }
  };

  function bubbleSwap(arr, i, j, type) {
    setTimeout(() => {
      if (type === "asc" ? arr[i] < arr[j] : arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setData([...arr]);
      }
    }, time);
  }
  //Функция универсальная
  const selectionSort = (arr: number[], sortingType): number[] => {
    for (let i = 0; i < arr.length - 1; i++) {
      time += 500;
      selectionSwap(arr, i, sortingType);
    }

    function selectionSwap(arr, i, sortingType) {
      setTimeout(() => {
        let maxIdx = i;

        for (let j = i + 1; j < arr.length; j++) {
          if (sortingType === "asc" ? arr[maxIdx] > arr[j] : arr[maxIdx] < arr[j]) {
            maxIdx = j;
          }
        }
        [arr[maxIdx], arr[i]] = [arr[i], arr[maxIdx]];
        setData([...arr]);
      }, time);
    }
    return arr;
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.input__container}>
        <RadioInput label="Пузырьком" />
        <RadioInput label="Выбором" />
        <Button
          text="По возрастанию"
          onClick={() => {
            bubbleSort(data, "asc");
          }}
        />
        <Button
          text="По убыванию"
          onClick={() => {
            bubbleSort(data, "desc");
          }}
        />
        <Button text="Новый массив" />
      </div>
      <div className={styles.columns__container}>
        {data.length > 1 &&
          data.map((el, i) => {
            return <Column index={el} key={i} />;
          })}
      </div>
    </SolutionLayout>
  );
};
