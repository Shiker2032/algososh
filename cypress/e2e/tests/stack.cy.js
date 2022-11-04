/// <reference types = 'cypress'/>

describe("Stack page tests", () => {
  const defaultColor = "rgb(0, 50, 255)"
  const changingColor = "rgb(210, 82, 225)"
  const testingArray = [1, 2, 3, 4]

  beforeEach(() => {
    cy.visit("/")
    cy.get('[href="/stack"] > .main-page_card__ZylSn').click()
    cy.get("#input").as("input")
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
  it("add to stack", async () => {
    for (let i = 0; i < testingArray.length; i++) {
      cy.clock()
      cy.get("@input").should("be.empty").type(testingArray[i])
      cy.get("@addBtn").should("not.be.disabled").click()
      cy.get('[data-testid="circle div"]').as("circles")
      cy.tick(500)

      cy.get("@circles")
        .eq(i)
        .should("have.text", testingArray[i])
        .and("have.css", "border-color", changingColor)
        .parent()
        .should("contain", "top")
      cy.tick(500)
      cy.get("@circles").eq(i).should("have.css", "border-color", defaultColor)
    }
  })
  it("delete from stack", () => {
    cy.clock()
    for (let i = 0; i < testingArray.length; i++) {
      cy.get("@input").should("be.empty").type(testingArray[i])
      cy.get("@addBtn").should("not.be.disabled").click()
      cy.tick(1000)
    }
    cy.get('[data-testid="circle div"]').as("circles")
    for (let j = 0; j <= testingArray.length; j++) {
      cy.get("@deleteBtn").click()
      cy.tick(500)
      cy.get("body").then(($body) => {
        if ($body.text().includes("@circles")) {
          cy.get("@circles")
            .eq(testingArray.length - 1 - j)
            .should("have.css", "border-color", changingColor)
        }
      })
    }
  })
  it("clear stack", () => {
    cy.clock()
    for (let i = 0; i < testingArray.length; i++) {
      cy.get("@input").should("be.empty").type(testingArray[i])
      cy.get("@addBtn").should("not.be.disabled").click()
      cy.tick(1000)
    }
    cy.get("@clearBtn").should("not.be.disabled").click()
    cy.tick(500)

    cy.get('[data-testid="circle div"]').should("not.exist")
  })
})
