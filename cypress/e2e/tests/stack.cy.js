/// <reference types = 'cypress'/>

describe("Stack page tests", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('[href="/stack"] > .main-page_card__ZylSn').click()
  })
  it("buttons disabled on empty input", () => {
    cy.get("#input").should("be.empty")
    cy.contains("button", "Добавить").should("be.disabled")
    cy.contains("button", "Удалить").should("be.disabled")
    cy.contains("button", "Очистить").should("be.disabled")
  })
  it("add to stack", async () => {
    const defaultColor = "rgb(0, 50, 255)"
    const changingColor = "rgb(210, 82, 225)"

    cy.clock()
    cy.get("#input").should("be.empty").type(1)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(500)

    cy.contains("button", "Добавить").should("be.disabled")
    cy.get('[data-testid="circle div"]')
      .eq(0)
      .should("exist")
      .and("have.text", "1")
      .and("have.css", "border-color", changingColor)
      .parent()
      .should("contain", "top")
      .should("contain", "0")
    cy.tick(500)

    cy.get('[data-testid="circle div"]').eq(0).should("have.css", "border-color", defaultColor)
    cy.get("#input").should("be.empty").type(2)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(500)

    cy.get('[data-testid="circle div"]')
      .eq(1)
      .should("exist")
      .and("have.text", "2")
      .and("have.css", "border-color", changingColor)
      .parent()
      .should("contain", "top")
      .should("contain", "1")
    cy.tick(500)
    cy.get('[data-testid="circle div"]').eq(1).should("have.css", "border-color", defaultColor)
  })
  it("delete from stack", () => {
    const changingColor = "rgb(210, 82, 225)"

    cy.clock()
    cy.get("#input").should("be.empty").type(1)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(1000)

    cy.get("#input").should("be.empty").type(2)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(1000)

    cy.contains("button", "Удалить").should("not.be.disabled").click()
    cy.tick(500)

    cy.get('[data-testid="circle div"]').eq(1).should("have.css", "border-color", changingColor)
    cy.tick(500)

    cy.get('[data-testid="circle div"]').eq(1).should("not.exist")
    cy.contains("button", "Удалить").should("not.be.disabled").click()
    cy.tick(500)

    cy.get('[data-testid="circle div"]').eq(0).should("have.css", "border-color", changingColor)
    cy.tick(500)

    cy.get('[data-testid="circle div"]').should("have.length", 0)
  })
  it("clear stack", () => {
    cy.clock()
    cy.get("#input").should("be.empty").type(1)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(1000)

    cy.get("#input").should("be.empty").type(2)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(1000)

    cy.contains("button", "Очистить").should("not.be.disabled").click()
    cy.tick(500)

    cy.get('[data-testid="circle div"]').should("have.length", 0)
  })
})
