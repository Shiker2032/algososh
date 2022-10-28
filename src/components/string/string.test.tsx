import { render, screen, fireEvent } from "@testing-library/react"
import { Circle } from "../ui/circle/circle"
import { StringComponent } from "./string"

import React from "react"
import ReactDom from "react-dom"

import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import { sleep } from "../../utils/utils"
import { act } from "react-dom/test-utils"
import { reverseString } from "./string"
describe("Reverse string", () => {
  test("even argument", () => {
    expect(reverseString("test")).toBe("tset")
  })
  test("uneven argument", () => {
    expect(reverseString("ABC")).toBe("CBA")
  })
  test("one argument", () => {
    expect(reverseString("A")).toBe("A")
  })
  test("empty argument", () => {
    expect(reverseString("")).toBe("")
  })
})
