import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { StringComponent } from "./string"
import userEvent from "@testing-library/user-event"

jest.setTimeout(999999)
describe("String Component tests", () => {
  test("with even amount of symbols", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("string input")
    const btn = screen.getByTestId("reverse btn")
    const testString = "TEST"

    userEvent.type(input, testString)
    userEvent.click(btn)
    await waitFor(
      () => {
        const elements = screen.getAllByTestId("letter p").map((el) => el.textContent)
        expect(elements.join("")).toBe(Array(testString).reverse().join(""))
      },
      {
        timeout: 10000,
      }
    )
  })

  test("with uneven amount of symbols", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("string input")
    const btn = screen.getByTestId("reverse btn")
    const testString = "HELLO"

    userEvent.type(input, testString)
    userEvent.click(btn)
    await waitFor(
      () => {
        const elements = screen.getAllByTestId("letter p").map((el) => el.textContent)
        expect(elements.join("")).toBe(Array(testString).reverse().join(""))
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
    const testString = "A"

    userEvent.type(input, testString)
    userEvent.click(btn)
    await waitFor(
      () => {
        const elements = screen.getAllByTestId("letter p").map((el) => el.textContent)
        expect(elements.join("")).toBe(testString)
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
