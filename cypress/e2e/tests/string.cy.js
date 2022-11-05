/// <reference types = 'cypress'/>

describe("String page test", () => {
  beforeEach(() => {
    cy.visit("/recursion")
    cy.get('[data-testid="string input"]').as("input")
    cy.get('[data-testid="reverse btn"]').as("reverseBtn")
  })
  it("button disabled on initial open", () => {
    cy.get("@reverseBtn").should("be.disabled")
  })
  it("reverse string", async () => {
    cy.clock()
    cy.get("@input").type("WORD")
    cy.get("@input").should("have.value", "WORD")
    cy.get("@reverseBtn").click()
    cy.get('div[data-testid="circle div"]').as("circles")

    cy.tick(1000)

    cy.get("@circles").should(($circle) => {
      expect($circle.eq(0)).to.have.text("W").and.css("border-color", defaultColor)
      expect($circle.eq(1)).to.have.text("O").and.css("border-color", defaultColor)
      expect($circle.eq(2)).to.have.text("R").and.css("border-color", defaultColor)
      expect($circle.eq(3)).to.have.text("D").and.css("border-color", defaultColor)
    })
    cy.tick(1000)
    cy.get("@circles").should(($circle) => {
      expect($circle.eq(0)).to.have.text("W").and.css("border-color", changingColor)
      expect($circle.eq(1)).to.have.text("O").and.css("border-color", defaultColor)
      expect($circle.eq(2)).to.have.text("R").and.css("border-color", defaultColor)
      expect($circle.eq(3)).to.have.text("D").and.css("border-color", changingColor)
    })
    cy.tick(1000)
    cy.get("@circles").should(($circle) => {
      expect($circle.eq(0)).to.have.text("D").and.css("border-color", modifiedColor)
      expect($circle.eq(1)).to.have.text("O").and.css("border-color", changingColor)
      expect($circle.eq(2)).to.have.text("R").and.css("border-color", changingColor)
      expect($circle.eq(3)).to.have.text("W").and.css("border-color", modifiedColor)
    })
    cy.tick(1000)
    cy.get("@circles").should(($circle) => {
      expect($circle.eq(0)).to.have.text("D").and.css("border-color", modifiedColor)
      expect($circle.eq(1)).to.have.text("R").and.css("border-color", modifiedColor)
      expect($circle.eq(2)).to.have.text("O").and.css("border-color", modifiedColor)
      expect($circle.eq(3)).to.have.text("W").and.css("border-color", modifiedColor)
    })
  })
})
