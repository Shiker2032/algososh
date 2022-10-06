//@ts-nocheck

import { reverse } from "dns/promises";
import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [data, setData] = useState([1, 5, 54, 30, 10, 3]);
  let time = 1000;

  // const bubbleSortAsc = (arr) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = 0; j < arr.length; j++) {
  //       if (arr[i] < arr[j]) {
  //         time += 1000;
  //         setTimeout(() => {
  //           [arr[i], arr[j]] = [arr[j], arr[i]];
  //           setData([...arr]);
  //         }, time);
  //       }
  //     }
  //   }
  // };

  // const bubbleSortDesc = (arr) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = 0; j < arr.length; j++) {
  //       if (arr[i] > arr[j]) {
  //         time += 1000;
  //         setTimeout(() => {
  //           [arr[i], arr[j]] = [arr[j], arr[i]];
  //           setData([...arr]);
  //         }, time);
  //       }
  //     }
  //   }
  // };

  const selectionSortAsc = (arr: number[]): number[] => {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[minIdx] > arr[j]) {
          time += 1000;
          setTimeout(() => {
            minIdx = j;
            [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]];
            setData([...arr]);
          }, time);
        }
      }
    }
    return arr;
  };

  const selectionSortDesc = (arr: number[]): number[] => {
    for (let i = 0; i < arr.length - 1; i++) {
      time += 500;
      selectionSort(arr, i);
    }

    function selectionSort(arr, i) {
      setTimeout(() => {
        let maxIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[maxIdx] < arr[j]) {
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
        <Button text="По убыванию" onClick={() => selectionSortDesc(data)} />
        <Button text="По возрастанию" onClick={() => selectionSortAsc(data)} />
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
