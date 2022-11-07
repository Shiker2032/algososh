/// <reference types = 'cypress'/>

describe("Fibonacci page test", () => {
  beforeEach(() => {
    cy.visit("/fibonacci")
    cy.get("#string-input").as("input")
    cy.contains("button", "Рассчитать").as("submitBtn")
  })
  it("button disabled on open", () => {
    cy.get("@input").should("have.text", "")
    cy.get("@submitBtn").should("be.disabled")
  })
  it("number generation", { defaultCommandTimeout: 10000 }, () => {
    const n = 10
    const fibRef = [
      1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765,
    ]

    cy.get("@input").type(n)
    cy.get("@submitBtn").click()

    cy.get('div[data-testid="circle div"]')
      .should("have.length", n === 1 ? 1 : n + 1)
      .should(($circle) => {
        for (let i = 0; i < $circle.length; i++) {
          expect($circle.eq(i)).to.have.text(fibRef[i])
        }
      })
  })
})
