import React, { useState } from "react"
import { sleep } from "../../utils/utils"
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { Input } from "../ui/input/input"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"

import styles from "./fibonacci-page.module.css"
export const FibonacciPage: React.FC = () => {
  const [sequenceArr, setSequenceArr] = React.useState<number[]>([])
  const [disableBtn, setDisableBtn] = useState(true)
  const [value, setValue] = React.useState<number | string | undefined>("")
  const [isLoading, setisLoading] = useState(false)
  const [disableInput, setDisableInput] = useState(false)

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim()

    if (value && !isNaN(value as unknown as number)) {
      setDisableBtn(false)
      if (Number(value) < 20) {
        setValue(Number(value))
      }
    } else {
      if (value === "") {
        setValue(value)
      }
      setDisableBtn(true)
    }
  }

  const getFibonacciNumbers = async (n: number) => {
    let arr = [1, 1]
    let time = 500
    setisLoading(true)
    setDisableInput(true)
    setValue("")

    for (let i = 2; i <= n; i++) {
      arr.push(arr[i - 2] + arr[i - 1])
      setSequenceArr([...arr])
      if (i === n) {
        setisLoading(false)
        setDisableInput(false)
      }
      await sleep(time)
    }
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    getFibonacciNumbers(Number(value))
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          onInput={handleInput}
          max={19}
          min={1}
          type={"number"}
          id="string-input"
          value={value}
          placeholder="Введите число"
          isLimitText={true}
          disabled={disableInput}
        />

        <Button
          onClick={() => getFibonacciNumbers(Number(value))}
          text="Рассчитать"
          disabled={disableBtn}
          isLoader={isLoading}
        />
      </form>

      <div className={styles.circles}>
        {sequenceArr.length > 0 &&
          sequenceArr.map((el, i) => {
            return <Circle letter={"" + el} key={i} index={i} />
          })}
      </div>
    </SolutionLayout>
  )
}
