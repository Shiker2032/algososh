import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "./button"

describe("Button ui component tests", () => {
  test("button with text", () => {
    render(<Button text="test" />)
    expect(screen.getByRole("button")).toHaveTextContent("test")
  })

  test("button no text", () => {
    render(<Button />)
    expect(screen.getByRole("button")).not.toHaveTextContent("test")
  })

  test("button enabled", () => {
    render(<Button />)
    expect(screen.getByRole("button")).toBeEnabled()
  })

  test("button disabled", () => {
    render(<Button disabled={true} />)
    expect(screen.getByRole("button")).not.toBeEnabled()
  })

  test("button loader", () => {
    render(<Button isLoader={true} />)
    expect(screen.getByRole("button")).toHaveClass("loader")
    expect(screen.getByRole("img")).toBeInTheDocument()
  })

  test("button callback on click", () => {
    const mockFunc = jest.fn()
    render(<Button onClick={mockFunc} />)
    fireEvent.click(screen.getByRole("button"))
    expect(mockFunc).toBeCalledTimes(1)
  })
})
