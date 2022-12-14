import styles from "./string.module.css"
import React, { useState } from "react"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import { Input } from "../ui/input/input"
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { ElementStates } from "../../types/element-states"
import { IString } from "../../types/main"

export const StringComponent: React.FC = () => {
  const [displayArr, setDisplayArr] = React.useState<IString[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setisLoading] = useState(false)

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim()
    setInput(value)
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    handleClick()
  }

  const handleClick = () => {
    let start = 0
    let end = input.length - 1
    let time = 1000
    const outputArr: IString[] = []
    const inputArr = Array.from(input)
    setInput("")
    setisLoading(true)
    inputArr.forEach((el, i) => {
      const object = {
        letter: el,
        state: ElementStates.Default,
      }
      outputArr.push(object)
    })

    setDisplayArr([...outputArr])
    setTimeout(() => {
      while (start <= end) {
        reverse(outputArr, start, end, time)
        start++
        end--
        time += 1000
      }
    }, 1000)

    const reverse = (arr: IString[], i1: number, i2: number, time: number) => {
      setTimeout(() => {
        arr[i1].state = ElementStates.Changing
        arr[i2].state = ElementStates.Changing
        setDisplayArr([...arr])
      }, time)
      setTimeout(() => {
        ;[arr[i1], arr[i2]] = [arr[i2], arr[i1]]
        arr[i1].state = ElementStates.Modified
        arr[i2].state = ElementStates.Modified
        setDisplayArr([...arr])
      }, time + 1000)
      if (i1 + 1 === i2 || i1 === i2) {
        setTimeout(() => {
          setisLoading(false)
        }, time + 1000)
      }
    }
  }

  return (
    <SolutionLayout title="????????????">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          onChange={handleInput}
          maxLength={11}
          isLimitText={true}
          id="string-input"
          data-testid="string input"
          value={input}
        />
        <Button
          data-testid="reverse btn"
          onClick={handleClick}
          text="????????????????????"
          disabled={input.length > 0 ? false : true}
          isLoader={isLoading}
        />
      </form>
      <div className={styles.circles}>
        {displayArr.length > 0 &&
          displayArr.map((el, i) => {
            return <Circle state={el?.state} letter={el?.letter} key={i} />
          })}
      </div>
    </SolutionLayout>
  )
}
