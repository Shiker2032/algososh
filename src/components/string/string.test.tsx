import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { StringComponent } from "./string"
import userEvent from "@testing-library/user-event"

jest.setTimeout(100000)
describe("String Component tests", () => {
  test("with even input", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("string input")
    const btn = screen.getByTestId("reverse btn")
    const testWord = "TEST"
    userEvent.type(input, testWord)
    userEvent.click(btn)
    await waitFor(
      () => {
        const elements = screen.getAllByTestId("letter p").map((el) => el.textContent)
        expect(elements.join("")).toBe("TSET")
      },
      {
        timeout: 10000,
      }
    )
  })

  test("with uneven input", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("string input")
    const btn = screen.getByTestId("reverse btn")
    const testWord = "HELLO"
    userEvent.type(input, testWord)
    userEvent.click(btn)
    await waitFor(
      () => {
        const elements = screen.getAllByTestId("letter p").map((el) => el.textContent)
        expect(elements.join("")).toBe("OLLEH")
      },
      {
        timeout: 10000,
      }
    )
  })

  test("with one symbol in input", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("string input")
    const btn = screen.getByTestId("reverse btn")
    const testWord = "A"
    userEvent.type(input, testWord)
    userEvent.click(btn)
    await waitFor(
      () => {
        const elements = screen.getAllByTestId("letter p").map((el) => el.textContent)
        expect(elements.join("")).toBe("A")
      },
      {
        timeout: 10000,
      }
    )
  })

  test("with empty input", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("string input")
    const btn = screen.getByTestId("reverse btn")
    userEvent.type(input, " ")
    expect(btn).toBeDisabled()
  })
})
