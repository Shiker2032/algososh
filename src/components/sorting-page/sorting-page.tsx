import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { ISort } from "../../types/main";
import { generateRandomArray, getRandomNumber, sleep } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState("selection");
  const [renderArray, setRenderArray] = React.useState<ISort[]>([]);

  const [ascLoading, setAscLoading] = useState(false);
  const [descDisabled, setDescDisabled] = useState(false);
  const [descLoading, setDescLoading] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const time = 1000;

  useEffect(() => {
    setRenderArray([...prepareArray(1, 100)]);
  }, []);

  function prepareArray(min: number, max: number) {
    const array = generateRandomArray(min, max);
    const generatedArray: ISort[] = [];

    array.map((el, i) => {
      const object = {
        value: el,
        state: ElementStates.Default,
      };
      generatedArray.push(object);
    });
    return generatedArray;
  }

  function handleSort(arr: ISort[], type: string) {
    if (selectedSort === "bubble") {
      bubbleSort(arr, type);
    } else {
      selectionSortAsync(arr, type);
    }
  }

  async function bubbleSort(arr: ISort[], sortingType: string) {
    setInputDisabled(true);
    if (sortingType === "asc") {
      setAscLoading(true);
    } else {
      setDescLoading(true);
    }
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
      if (i + 1 === arr.length - 1) {
        setInputDisabled(false);
        setAscLoading(false);
        setDescLoading(false);
      }
    }
    arr[0].state = ElementStates.Modified;
    arr[arr.length - 1].state = ElementStates.Modified;
    setRenderArray([...arr]);
  }

  async function selectionSortAsync(arr: ISort[], sortingType: string) {
    setInputDisabled(true);
    if (sortingType === "asc") {
      setAscLoading(true);
    } else {
      setDescLoading(true);
    }

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
      if (i === arr.length - 1) {
        setInputDisabled(false);
        setAscLoading(false);
        setDescLoading(false);
      }
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form_container}>
        <div className={styles.input__container}>
          <div className={styles.input_radios}>
            <RadioInput
              name="rb"
              onChange={() => setSelectedSort("selection")}
              label="Выбором"
              value="selection"
              disabled={inputDisabled}
              checked={selectedSort === "selection" ? true : false}
            />
            <RadioInput
              name="rb"
              value="bubble"
              onChange={() => setSelectedSort("bubble")}
              label="Пузырьком"
              disabled={inputDisabled}
            />
          </div>
          <Button
            text="По возрастанию"
            onClick={() => {
              handleSort(renderArray as ISort[], "asc");
            }}
            isLoader={ascLoading}
            disabled={inputDisabled}
          />
          <Button
            text="По убыванию"
            onClick={() => {
              handleSort(renderArray as ISort[], "desc");
            }}
            isLoader={descLoading}
            disabled={inputDisabled}
          />
          <div className={styles.input_generator}>
            <Button
              onClick={() => {
                setRenderArray([...prepareArray(1, 100)]);
              }}
              text="Новый массив"
              disabled={inputDisabled}
            />
          </div>
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
