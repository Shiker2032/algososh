/// <reference types = 'cypress'/>
import { colors } from "../../../src/utils/consts"

describe("List page tests", () => {
  const initialArrayRef = [0, 34, 8, 1]
  const { defaultColor, changingColor, modifiedColor } = colors
  beforeEach(() => {
    cy.visit("/list")
    cy.get("#input").as("stringInput")
    cy.get("#inputIndex").as("indexInput")
    cy.contains("button", "Добавить в head").as("addToHeadBtn")
    cy.contains("button", "Добавить в tail").as("addToTailBtn")
    cy.contains("button", "Добавить по индексу").as("addByIndexBtn")
    cy.contains("button", "Удалить по индексу").as("deleteByIndexBtn")
    cy.contains("button", "Удалить из head").as("deleteFromHeadBtn")
    cy.contains("button", "Удалить из tail").as("deleteFromTailBtn")
  })
  it("initial state of page", () => {
    cy.get("@stringInput").should("be.empty")
    cy.get("@indexInput").should("be.empty")
    cy.get("@addToHeadBtn").should("be.disabled")
    cy.get("@addToTailBtn").should("be.disabled")
    cy.get("@addByIndexBtn").should("be.disabled")
    cy.get("@deleteByIndexBtn").should("be.disabled")
    cy.get("@deleteFromHeadBtn").should("not.be.disabled")
    cy.get("@deleteFromTailBtn").should("not.be.disabled")
    cy.get('div[data-testid="circle div"]').should("have.length.above", 0)
  })
  it("render initial array", () => {
    cy.get('div[data-testid="circle div"]').as("circles")
    cy.get("@circles").should("have.length.above", 0)
    for (let i = 0; i < initialArrayRef.length - 1; i++) {
      cy.get("@circles")
        .eq(i)
        .should("have.text", initialArrayRef[i])
        .and("have.css", "border-color", defaultColor)
    }
    cy.get("@circles").eq(0).parent().should("contain", "head")
    cy.get("@circles")
      .eq(initialArrayRef.length - 1)
      .parent()
      .should("contain", "tail")
  })
  it("add to head", () => {
    const input = "A"

    cy.clock()
    cy.get("@stringInput").should("be.empty").type(input)
    cy.get("@addToHeadBtn").should("not.be.disabled").click()
    cy.get("[class*=circle_small]").as("circleSmall").should("have.text", input)
    cy.get('div[data-testid="circle div"]')
      .as("circles")
      .eq(1)
      .should("have.text", initialArrayRef[0])
      .and("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get("@circleSmall").should("not.exist")
    cy.get("@circles")
      .eq(0)
      .should("have.text", input)
      .and("have.css", "border-color", defaultColor)
      .parent()
      .should("contain", "head")
      .and("contain", "0")
  })
  it("add to tail", () => {
    const input = "A"
    cy.clock()
    cy.get("@stringInput").should("be.empty").type(input)
    cy.get("@addToTailBtn").should("not.be.disabled").click()
    cy.get("[class*=circle_small]")
      .as("circleSmall")
      .should("have.text", input)
      .and("have.css", "border-color", changingColor)
    cy.get('div[data-testid="circle div"]')
      .as("circles")
      .eq(initialArrayRef.length - 1)
    cy.tick(1000)
    cy.get("@circleSmall").should("not.exist")
    cy.get("@circles")
      .eq(initialArrayRef.length)
      .should("have.text", input)
      .and("have.css", "border-color", modifiedColor)
      .parent()
      .should("contain", "tail")
    cy.tick(1000)

    cy.get("@circles").eq(initialArrayRef.length).should("have.css", "border-color", defaultColor)
  })

  it("add by index", () => {
    const input = "A"
    cy.clock()

    cy.get("@stringInput").should("be.empty").type(input)
    cy.get("@indexInput").should("be.empty").type(2)
    cy.get("@addByIndexBtn").should("not.be.disabled").click()

    cy.get('div[data-testid="circle div"]')
      .as("circles")
      .eq(1)
      .should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get("@circles").eq(2).should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.tick(1000)
    cy.get("@circles")
      .eq(2)
      .should("have.css", "border-color", modifiedColor)
      .and("have.text", input)
    cy.tick(1000)
    cy.get("@circles").eq(2).should("have.css", "border-color", defaultColor)
  })

  it("delete from tail", () => {
    cy.clock()
    cy.get("@deleteFromTailBtn").should("not.be.disabled").click()
    cy.get('div[data-testid="circle div"]').eq(3).should("have.text", "")
    cy.get("[class*=circle_small]").should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get('div[data-testid="circle div"]')
      .eq(2)
      .should("have.text", "8")
      .parent()
      .should("contain", "tail")
  })

  it("delete from head", () => {
    cy.clock()
    cy.get("@deleteFromHeadBtn").should("not.be.disabled").click()
    cy.get('div[data-testid="circle div"]').eq(0).should("have.text", "")
    cy.get("[class*=circle_small]").should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get('div[data-testid="circle div"]')
      .eq(0)
      .should("have.text", "34")
      .parent()
      .should("contain", "head")
  })

  it("delete by index", () => {
    cy.clock()
    cy.get("@indexInput").should("be.empty").type(2)
    cy.get("@deleteByIndexBtn").should("not.be.disabled").click()
    cy.get('div[data-testid="circle div"]')
      .as("circles")
      .eq(0)
      .should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get("@circles").eq(1).should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get("@circles").eq(2).should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get("@circles").eq(2).should("have.text", "").and("have.css", "border-color", defaultColor)
    cy.get("[class*=circle_small]")
      .should("have.text", "8")
      .and("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get("@circles").should("have.length", 3)
  })
})
