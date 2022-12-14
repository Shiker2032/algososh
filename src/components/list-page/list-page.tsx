import React, { useEffect, useState } from "react"
import { ElementStates } from "../../types/element-states"
import { IListElement } from "../../types/main"
import { sleep } from "../../utils/utils"
import { Button } from "../ui/button/button"
import { Circle } from "../ui/circle/circle"
import { ArrowIcon } from "../ui/icons/arrow-icon"
import { Input } from "../ui/input/input"
import { SolutionLayout } from "../ui/solution-layout/solution-layout"
import LinkedListNode from "./list-class"
import styles from "./list-page.module.css"

export const ListPage = () => {
  const [displayArray, setDisplayArray] = React.useState<IListElement[]>([])
  const [inputString, setInputString] = React.useState<string | number | undefined>("")
  const [inputIndex, setInputIndex] = React.useState<string | number | undefined>("")
  const [showHead, setShowHead] = useState(true)
  const [showTail, setShowTail] = useState(true)

  const [addHeadLoading, setAddHeadLoading] = useState(false)
  const [addTailLoading, setAddTailLoading] = useState(false)
  const [deleteFromHeadLoading, setDeleteFromHeadLoading] = useState(false)
  const [deleteFromTailLoading, setDeleteFromTailLoading] = useState(false)
  const [addByIndexLoading, setAddByIndexLoading] = useState(false)
  const [deleteByIndexLoading, setDeleteByIndexLoading] = useState(false)
  const [disableAll, setDisableAll] = useState(false)

  const initialData = [
    {
      value: 0,
      state: ElementStates.Default,
      circle: null,
      circleBottom: false,
    },
    {
      value: 34,
      state: ElementStates.Default,
      circle: null,
      circleBottom: false,
    },
    { value: 8, state: ElementStates.Default, circle: null, circleBottom: false },
    { value: 1, state: ElementStates.Default, circle: null, circleBottom: false },
  ]

  const handleAddByIndex = async (index: string | number, input: string | number) => {
    const arr = linkedList.getElements()
    const indexInput = Number(index)

    for (let j = 0; j < arr.length; j++) {
      if (indexInput !== j) {
        let changes = {
          state: ElementStates.Changing,
          circle: { value: input, state: ElementStates.Default },
        }
        linkedList.changeElement(j, changes)
        setDisplayArray([...linkedList.getElements()])
        setShowHead(false)
        await sleep(1000)
        linkedList.changeElement(j, { circle: null })
        setDisplayArray([...linkedList.getElements()])
      } else {
        let changes = { circle: { value: input, state: ElementStates.Changing } }
        linkedList.changeElement(indexInput, changes)
        setDisplayArray([...linkedList.getElements()])
        await sleep(1000)
        linkedList.changeElement(indexInput, { circle: null })
        setDisplayArray([...linkedList.getElements()])
        linkedList.addByIndex(indexInput, input)
        setDisplayArray([...linkedList.getElements()])
        linkedList.changeElement(j, { state: ElementStates.Modified })
        setDisplayArray([...linkedList.getElements()])
        setShowHead(true)
        await sleep(1000)
        linkedList.changeElement(j, { state: ElementStates.Default })
        setDisplayArray([...linkedList.getElements()])
        return
      }
    }
  }

  const handleDeleteByIndex = async (index: number) => {
    const arr = displayArray
    const inputIndex = Number(index)
    for (let j = 0; j < arr.length; j++) {
      let changes = {}
      linkedList.changeElement(j, { state: ElementStates.Changing })
      setDisplayArray([...linkedList.getElements()])
      await sleep(1000)
      if (j === inputIndex) {
        changes = {
          state: ElementStates.Default,
          value: "",
          circle: { value: arr[j].value, state: ElementStates.Changing },
          circleBottom: true,
        }
        linkedList.changeElement(j, changes)
        setDisplayArray([...linkedList.getElements()])
        setShowTail(false)
        await sleep(1000)

        linkedList.deleteByIndex(j)
        setDisplayArray([...linkedList.getElements()])
        setShowTail(true)
        return
      }
    }
    setDisplayArray([...arr])
  }

  const handleAddHead = async (input: string | number) => {
    setAddHeadLoading(true)
    setDisableAll(true)
    let changes = {
      state: ElementStates.Changing,
      circle: { value: input, state: ElementStates.Default },
      circleBottom: false,
    }

    linkedList.changeElement(0, changes)
    setInputString("")
    setDisplayArray([...linkedList.getElements()])
    setShowHead(false)
    await sleep(1000)

    linkedList.changeElement(0, { circle: null, state: ElementStates.Default })
    if (displayArray.length === 0) {
      linkedList.changeElement(0, {
        value: input,
        state: ElementStates.Default,
        circle: null,
        circleBottom: false,
      })
    } else {
      linkedList.prepend(input)
    }

    setDisplayArray([...linkedList.getElements()])
    setShowHead(true)
    await sleep(1000)
    linkedList.changeElement(0, { state: ElementStates.Default })
    setDisplayArray([...linkedList.getElements()])
    setAddHeadLoading(false)
    setDisableAll(false)
  }

  const handleAddTail = async (input: string | number) => {
    setAddTailLoading(true)
    setDisableAll(true)
    const arr = linkedList.getElements()
    let step = arr.length - 1
    let changes = {}
    changes = { circle: { value: input, state: ElementStates.Changing }, circleBottom: false }
    linkedList.changeElement(step, changes)
    setDisplayArray([...linkedList.getElements()])
    await sleep(1000)

    linkedList.changeElement(step, { circle: null })
    linkedList.append({
      value: input,
      state: ElementStates.Modified,
      circle: null,
      circleBottom: false,
    })
    setDisplayArray([...linkedList.getElements()])
    await sleep(1000)

    linkedList.changeElement(step + 1, { state: ElementStates.Default })
    setDisplayArray([...linkedList.getElements()])
    setAddTailLoading(false)
    setDisableAll(false)
  }

  const handleDeleteTail = async () => {
    const arr = linkedList.getElements()
    const temp = arr[arr.length - 1]
    const changes = {
      value: "",
      circle: { value: temp.value, state: ElementStates.Changing },
      circleBottom: true,
    }

    setDeleteFromTailLoading(true)
    setDisableAll(true)
    linkedList.changeElement(arr.length - 1, changes)
    setDisplayArray([...linkedList.getElements()])
    setShowTail(false)
    await sleep(1000)
    linkedList.deleteTail()
    setDisplayArray([...linkedList.getElements()])
    setShowTail(true)
    setDeleteFromTailLoading(false)
    setDisableAll(false)
  }

  const handleDeleteHead = async () => {
    const arr = linkedList.getElements()
    const temp = arr[0]

    setDeleteFromHeadLoading(true)
    setDisableAll(true)
    linkedList.changeElement(0, {
      value: "",
      circle: { value: temp.value, state: ElementStates.Changing },
      circleBottom: true,
    })
    setDisplayArray([...linkedList.getElements()])
    await sleep(1000)
    linkedList.deleteHead()
    setDisplayArray([...linkedList.getElements()])
    setDeleteFromHeadLoading(false)
    setDisableAll(false)
  }

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim()
    setInputString(value)
  }

  const handleInputIndex = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.trim()
    setInputIndex(value)
  }

  const linkedList = React.useMemo(() => {
    return new LinkedListNode<string>(initialData)
  }, [])

  useEffect(() => {
    setDisplayArray([...linkedList.getElements()])
  }, [])

  return (
    <SolutionLayout title="?????????????? ????????????">
      <div className={styles.container}>
        <div className={styles.inputs}>
          <Input id="input" maxLength={4} onInput={handleInput} value={inputString} />
          <Button
            text="???????????????? ?? head"
            disabled={inputString && !disableAll ? false : true}
            onClick={() => handleAddHead(inputString!)}
            isLoader={addHeadLoading}
          />
          <Button
            text="???????????????? ?? tail"
            disabled={inputString && !disableAll ? false : true}
            onClick={() => handleAddTail(inputString!)}
            isLoader={addTailLoading}
          />
          <Button
            text="?????????????? ???? head"
            onClick={handleDeleteHead}
            isLoader={deleteFromHeadLoading}
            disabled={displayArray.length > 0 && !disableAll ? false : true}
          />
          <Button
            text="?????????????? ???? tail"
            onClick={handleDeleteTail}
            isLoader={deleteFromTailLoading}
            disabled={displayArray.length > 0 && !disableAll ? false : true}
          />
        </div>
        <div className={styles.inputs}>
          <Input
            id="inputIndex"
            maxLength={4}
            onInput={handleInputIndex}
            placeholder="?????????????? ????????????"
            value={inputIndex}
          />
          <Button
            text="???????????????? ???? ??????????????"
            onClick={() => handleAddByIndex(inputIndex!, inputString!)}
            disabled={inputIndex && inputIndex ? false : true}
            isLoader={addByIndexLoading}
          />
          <Button
            text="?????????????? ???? ??????????????"
            disabled={inputIndex && inputIndex ? false : true}
            onClick={() => handleDeleteByIndex(inputIndex as number)}
            isLoader={deleteByIndexLoading}
          />
        </div>
      </div>
      <div className={styles.list}>
        {displayArray &&
          displayArray.map((el, i) => {
            return (
              <div key={Math.round(Math.random() * 1000000)} className={styles.circles}>
                <div className={styles.circle_top}>
                  {el.circle && el.circleBottom === false && (
                    <Circle letter={el?.circle?.value} state={el.circle?.state} isSmall />
                  )}
                </div>
                <Circle
                  letter={el.value}
                  key={Math.round(Math.random() * i)}
                  state={el.state}
                  head={i === 0 && showHead ? "head" : ""}
                  tail={displayArray.length - 1 === i && showTail ? "tail" : ""}
                  index={i}
                />

                <div className={styles.circle_bottom}>
                  {el.circle && el.circleBottom && (
                    <Circle letter={el?.circle?.value} state={el.circle?.state} isSmall />
                  )}
                </div>
                {displayArray.length - 1 !== i && <ArrowIcon />}
              </div>
            )
          })}
      </div>
    </SolutionLayout>
  )
}
