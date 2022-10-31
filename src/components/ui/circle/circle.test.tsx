import { render, screen } from "@testing-library/react"
import { ElementStates } from "../../../types/element-states"
import { Circle } from "./circle"

describe("Circle ui component tests", () => {
  test("circle no letter", () => {
    render(<Circle />)
    expect(screen.getByTestId("letter p")).toHaveTextContent("")
  })

  test("circle with letter", () => {
    render(<Circle letter={"test"} />)
    expect(screen.getByTestId("letter p")).toMatchSnapshot()
  })

  test("circle with head", () => {
    render(<Circle head={"test"} />)
    expect(screen.getByTestId("head div")).toMatchSnapshot()
  })

  test("circle with react element in head", () => {
    render(<Circle head={<Circle letter={"test"} />} />)
    const element = screen.getAllByTestId("head div").find((el) => el.textContent === "test")
    expect(element).toHaveClass("head")
  })

  test("circle with tail", () => {
    render(<Circle tail={"test"} />)
    expect(screen.getByTestId("tail div")).toHaveTextContent("test")
  })

  test("circle with react element in tail", () => {
    render(<Circle tail={<Circle letter={"test"} />} />)
    const element = screen.getAllByTestId("tail div").find((el) => el.textContent === "test")
    expect(element).toHaveClass("tail30")
  })

  test("circle with index", () => {
    render(<Circle index={1} />)
    expect(screen.getByTestId("index p")).toHaveTextContent("1")
  })

  test("circle with isSmall prop", () => {
    render(<Circle isSmall={true} />)
    expect(screen.getByTestId("circle div")).toHaveClass("small")
  })

  test("circle in default state", () => {
    render(<Circle />)
    expect(screen.getByTestId("circle div")).toHaveClass("default")
  })

  test("circle in changing state", () => {
    render(<Circle state={ElementStates.Changing} />)
    expect(screen.getByTestId("circle div")).toHaveClass("changing")
  })

  test("circle in modified state", () => {
    render(<Circle state={ElementStates.Modified} />)
    expect(screen.getByTestId("circle div")).toHaveClass("modified")
  })
})
