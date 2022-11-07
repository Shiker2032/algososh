import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { SortingPage } from "./sorting-page"

//========================================================
jest.setTimeout(60000)
const delay = 30000
describe("Sorting with empty array", () => {
  test("selection sort with empty array", async () => {
    render(
      <BrowserRouter>
        <SortingPage initialArray={[]} />
      </BrowserRouter>
    )
    const ascBtn = screen.getByTestId("asc-btn")
    const descBtn = screen.getByTestId("desc-btn")
    const selectionRadio = screen.getByTestId("selection-radio")

    userEvent.click(selectionRadio)
    userEvent.click(ascBtn)
    userEvent.click(descBtn)
    await waitFor(() => expect(screen.getByTestId("column-div").textContent).toBe(""), {
      timeout: delay / 10,
    })
  })

  test("bubble sort with empty array", async () => {
    render(
      <BrowserRouter>
        <SortingPage initialArray={[]} />
      </BrowserRouter>
    )
    const ascBtn = screen.getByTestId("asc-btn")
    const descBtn = screen.getByTestId("desc-btn")
    const bubbleRadio = screen.getByTestId("bubble-radio")

    userEvent.click(bubbleRadio)
    userEvent.click(ascBtn)
    userEvent.click(descBtn)
    await waitFor(() => expect(screen.getByTestId("column-div").textContent).toBe(""), {
      timeout: delay / 10,
    })
  })
})
//========================================================
describe("Sorting with one array element", () => {
  test("ascending selection sort with one array element", async () => {
    render(
      <BrowserRouter>
        <SortingPage initialArray={[1]} />
      </BrowserRouter>
    )
    const ascBtn = screen.getByTestId("asc-btn")
    const selectionRadio = screen.getByTestId("selection-radio")

    userEvent.click(selectionRadio)
    userEvent.click(ascBtn)
    await waitFor(() => expect(screen.getByTestId("column-div").textContent).toBe("1"), {
      timeout: delay / 10,
    })
  })

  test("descending selection sort with one array element", async () => {
    render(
      <BrowserRouter>
        <SortingPage initialArray={[1]} />
      </BrowserRouter>
    )
    const descBtn = screen.getByTestId("desc-btn")
    const selectionRadio = screen.getByTestId("selection-radio")

    userEvent.click(selectionRadio)
    userEvent.click(descBtn)
    await waitFor(() => expect(screen.getByTestId("column-div").textContent).toBe("1"), {
      timeout: delay / 10,
    })
  })

  test("ascending bubble sort with one array element", async () => {
    render(
      <BrowserRouter>
        <SortingPage initialArray={[1]} />
      </BrowserRouter>
    )
    const ascBtn = screen.getByTestId("asc-btn")
    const bubbleRadio = screen.getByTestId("bubble-radio")

    userEvent.click(bubbleRadio)
    userEvent.click(ascBtn)

    await waitFor(() => expect(screen.getByTestId("column-div").textContent).toBe("1"), {
      timeout: delay / 10,
    })
  })

  test("descending bubble sort with one array element", async () => {
    render(
      <BrowserRouter>
        <SortingPage initialArray={[1]} />
      </BrowserRouter>
    )
    const descBtn = screen.getByTestId("desc-btn")
    const bubbleRadio = screen.getByTestId("bubble-radio")

    userEvent.click(bubbleRadio)
    userEvent.click(descBtn)
    await waitFor(() => expect(screen.getByTestId("column-div").textContent).toBe("1"), {
      timeout: delay / 10,
    })
  })
})
//========================================================
describe("Sorting with multiple elements", () => {
  test("ascending selection with multiple elements", async () => {
    const testingArray = [2, 0, 3, 9]
    render(
      <BrowserRouter>
        <SortingPage initialArray={testingArray} />
      </BrowserRouter>
    )
    const selectionRadio = screen.getByTestId("selection-radio")
    const ascBtn = screen.getByTestId("asc-btn")

    userEvent.click(selectionRadio)
    userEvent.click(ascBtn)
    await waitFor(() => expect(screen.getByTestId("column-div").textContent).toBe("0239"), {
      timeout: delay,
    })
  })

  test("descending selection with multiple elements", async () => {
    const testingArray = [2, 0, 3, 9]
    render(
      <BrowserRouter>
        <SortingPage initialArray={testingArray} />
      </BrowserRouter>
    )
    const selectionRadio = screen.getByTestId("selection-radio")
    const descBtn = screen.getByTestId("desc-btn")

    userEvent.click(selectionRadio)
    userEvent.click(descBtn)
    await waitFor(() => expect(screen.getByTestId("column-div").textContent).toBe("9320"), {
      timeout: delay,
    })
  })

  test("ascending bubble sort", async () => {
    const testingArray = [2, 0, 3, 9]
    render(
      <BrowserRouter>
        <SortingPage initialArray={testingArray} />
      </BrowserRouter>
    )
    const bubbleRadio = screen.getByTestId("bubble-radio")
    const ascBtn = screen.getByTestId("asc-btn")

    userEvent.click(bubbleRadio)
    userEvent.click(ascBtn)
    await waitFor(() => expect(screen.getByTestId("column-div").textContent).toBe("0239"), {
      timeout: delay,
    })
  })

  test("Descending bubble sort", async () => {
    const testingArray = [2, 0, 3, 9]
    render(
      <BrowserRouter>
        <SortingPage initialArray={testingArray} />
      </BrowserRouter>
    )
    const bubbleRadio = screen.getByTestId("bubble-radio")
    const descBtn = screen.getByTestId("desc-btn")

    userEvent.click(bubbleRadio)
    userEvent.click(descBtn)
    await waitFor(
      () => {
        expect(screen.getByTestId("column-div").textContent).toBe("9320")
      },
      { timeout: delay }
    )
  })
})
