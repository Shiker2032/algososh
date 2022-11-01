import React, { useEffect, useState } from "react"
import { ElementStates } from "../../types/element-states"
import { IQueueElement } from "../../types/main"
import { generateRandomArray, sleep } from "../../utils/utils"
import { Button } from "../ui/button/button"
import { Column } from "../ui/column/column"
import { RadioInput } from "../ui/radio-input/radio-input"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import styles from "./sorting-page.module.css"

export const SortingPage: React.FC<{ initialArray?: Array<string | number> }> = ({
  initialArray,
}) => {
  const [selectedSort, setSelectedSort] = useState("selection")
  const [renderArray, setRenderArray] = React.useState<IQueueElement[]>([])
  const [ascLoading, setAscLoading] = useState(false)
  const [descLoading, setDescLoading] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(false)
  const time = 750

  useEffect(() => {
    if (initialArray) {
      const preparedArray: any = []
      initialArray.forEach((el, i) => {
        preparedArray.push({ value: el, state: ElementStates.Default })
      })
      setRenderArray(preparedArray)
    } else {
      setRenderArray([...prepareArray(1, 100)])
    }
  }, [])

  const prepareArray = (min: number, max: number) => {
    const array = generateRandomArray(min, max)
    const generatedArray: IQueueElement[] = []

    array.map((el, i) => {
      const object = {
        value: el,
        state: ElementStates.Default,
      }
      generatedArray.push(object)
    })
    return generatedArray
  }

  const handleSort = (arr: IQueueElement[], type: string) => {
    if (selectedSort === "bubble") {
      bubbleSort(arr, type)
    } else {
      selectionSort(arr, type)
    }
  }

  const bubbleSort = async (arr: IQueueElement[], sortingType: string) => {
    if (renderArray.length < 2) return
    setInputDisabled(true)
    if (sortingType === "asc") {
      setAscLoading(true)
    } else {
      setDescLoading(true)
    }
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing
        arr[j + 1].state = ElementStates.Changing
        setRenderArray([...arr])
        await sleep(time)
        if (
          sortingType === "asc" ? arr[j].value > arr[j + 1].value : arr[j].value < arr[j + 1].value
        ) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setRenderArray([...arr])
          await sleep(time)
        }
        arr[j].state = ElementStates.Default
        arr[j + 1].state = ElementStates.Default
        setRenderArray([...arr])
        await sleep(time)
      }
      arr[arr.length - 1 - i].state = ElementStates.Modified
      setRenderArray([...arr])
      if (i + 1 === arr.length - 1) {
        setInputDisabled(false)
        setAscLoading(false)
        setDescLoading(false)
      }
    }
    arr[0].state = ElementStates.Modified
    arr[arr.length - 1].state = ElementStates.Modified
    setRenderArray([...arr])
  }

  const selectionSort = async (arr: IQueueElement[], sortingType: string) => {
    if (renderArray.length < 2) return
    setInputDisabled(true)
    if (sortingType === "asc") {
      setAscLoading(true)
    } else {
      setDescLoading(true)
    }

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i
      arr[i].state = ElementStates.Changing
      setRenderArray([...arr])
      for (let j = i + 1; j < arr.length; j++) {
        if (
          sortingType === "asc"
            ? arr[minIdx].value > arr[j].value
            : arr[minIdx].value < arr[j].value
        ) {
          minIdx = j
        }
        arr[j].state = ElementStates.Changing
        setRenderArray([...arr])
        await sleep(time)
        arr[j].state = ElementStates.Default
      }
      arr[i].state = ElementStates.Default
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      arr[i].state = ElementStates.Modified
      setRenderArray([...arr])
      if (i === arr.length - 1) {
        setInputDisabled(false)
        setAscLoading(false)
        setDescLoading(false)
      }
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.inputs}>
          <div className={styles.radios}>
            <RadioInput
              data-testid="selection-radio"
              name="rb"
              onChange={() => setSelectedSort("selection")}
              label="Выбором"
              value="selection"
              disabled={inputDisabled}
              checked={selectedSort === "selection" ? true : false}
            />
            <RadioInput
              data-testid="bubble-radio"
              name="rb"
              value="bubble"
              onChange={() => setSelectedSort("bubble")}
              label="Пузырьком"
              disabled={inputDisabled}
            />
          </div>
          <Button
            data-testid="asc-btn"
            text="По возрастанию"
            onClick={() => {
              handleSort(renderArray as IQueueElement[], "asc")
            }}
            isLoader={ascLoading}
            disabled={inputDisabled}
          />
          <Button
            data-testid="desc-btn"
            text="По убыванию"
            onClick={() => {
              handleSort(renderArray as IQueueElement[], "desc")
            }}
            isLoader={descLoading}
            disabled={inputDisabled}
          />
          <div className={styles.generator}>
            <Button
              data-testid="generate-btn"
              onClick={() => {
                setRenderArray([...prepareArray(1, 100)])
              }}
              text="Новый массив"
              disabled={inputDisabled}
            />
          </div>
        </div>
        <div data-testid="column-div" className={styles.columns}>
          {renderArray.length > 0 &&
            renderArray.map((el, i) => {
              return <Column index={el.value as number} state={el.state} key={i} />
            })}
        </div>
      </form>
    </SolutionLayout>
  )
}
