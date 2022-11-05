/// <reference types = 'cypress'/>
import { colors } from "../../../src/utils/consts"

describe("Queue page tests", () => {
  const testingArray = [1, 2, 3, 4, 5, 6, 7]
  const { defaultColor, changingColor } = colors
  beforeEach(() => {
    cy.visit("/queue")
    cy.get("#input").should("be.empty").as("input")
    cy.contains("button", "Добавить").as("addBtn")
    cy.contains("button", "Удалить").as("deleteBtn")
    cy.contains("button", "Очистить").as("clearBtn")
  })
  it("buttons disabled on empty input", () => {
    cy.get("@input").should("be.empty")
    cy.get("@addBtn").should("be.disabled")
    cy.get("@deleteBtn").should("be.disabled")
    cy.get("@clearBtn").should("be.disabled")
  })
  it("add to queue", () => {
    cy.clock()

    for (let i = 0; i < testingArray.length; i++) {
      cy.get("@input").should("be.empty").type(testingArray[i])
      cy.get("@addBtn").should("not.be.disabled").click()

      cy.get('div[data-testid="circle div"]')
        .eq(i)
        .should("have.text", testingArray[i])
        .and("have.css", "border-color", changingColor)
        .parent()
        .should("contain", "tail")
      cy.tick(500)
      cy.get('div[data-testid="circle div"]').eq(i).should("have.css", "border-color", defaultColor)
    }
  })
  it("delete from queue", () => {
    cy.clock()

    for (let i = 0; i < testingArray.length; i++) {
      cy.get("@input").should("be.empty").type(testingArray[i])
      cy.get("@addBtn").should("not.be.disabled").click()
      cy.tick(1000)
    }

    for (let j = 0; j < testingArray.length; j++) {
      cy.get('div[data-testid="circle div"]').eq(j).parent().should("contain", "head")
      cy.get("@deleteBtn").click()
      cy.get('div[data-testid="circle div"]')
        .eq(j)
        .should("have.text", "")
        .and("have.css", "border-color", changingColor)
      cy.tick(500)
      cy.get('div[data-testid="circle div"]')
        .eq(j)
        .should("have.css", "border-color", defaultColor)
        .parent()
        .should("not.contain", "head")
    }
  })

  it("clear queue", () => {
    cy.clock()

    for (let i = 0; i < testingArray.length; i++) {
      cy.get("@input").should("be.empty").type(testingArray[i])
      cy.get("@addBtn").should("not.be.disabled").click()
      cy.tick(1000)
    }

    cy.get("@clearBtn").should("not.be.disabled").click()
    cy.get('div[data-testid="circle div"]').each(($div) => {
      expect($div).to.have.text("")
    })
  })
})
