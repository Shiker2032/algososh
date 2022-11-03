describe("Fibonacci page test", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('[href="/fibonacci"] > .main-page_card__ZylSn').click()
  })
  it("button disabled on open", () => {
    cy.get("#string-input").should("have.text", "")
    cy.contains("button", "Рассчитать").should("be.disabled")
  })
  it("button activates on input", () => {
    cy.get("#string-input").should("have.text", "")
    cy.get("#string-input").type("2")
    cy.contains("button", "Рассчитать").should("not.be.disabled")
  })
  it("number generation", { defaultCommandTimeout: 10000 }, () => {
    const n = 10
    const fibRef = [
      1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765,
    ]

    cy.get("#string-input").type(n)
    cy.contains("button", "Рассчитать").click()

    cy.get('div[data-testid="circle div"]')
      .should("have.length", n === 1 ? 1 : n + 1)
      .should(($div) => {
        for (let i = 0; i < $div.length; i++) {
          expect($div.eq(i)).to.have.text(fibRef[i])
        }
      })
  })
})
