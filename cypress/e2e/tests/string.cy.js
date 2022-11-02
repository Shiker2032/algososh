describe("String page test", () => {
  beforeEach(() => cy.visit("/"))
  it("button disabled on initial open", () => {
    cy.get('[href="/recursion"] > .main-page_card__ZylSn').click()
    cy.get('[data-testid="reverse btn"]').should("be.disabled")
  })
  it("button active on input", () => {
    cy.get('[href="/recursion"] > .main-page_card__ZylSn').click()
    cy.get('[data-testid="string input"]').type("TE")
    cy.get('[data-testid="reverse btn"]').should("not.be.disabled")
  })
  it("reverse string", async () => {
    const defaultColor = "rgb(0, 50, 255)"
    const changingColor = "rgb(210, 82, 225)"
    const modifiedColor = "rgb(127, 224, 81)"
    cy.clock()
    cy.get('[href="/recursion"] > .main-page_card__ZylSn').click()
    expect(cy.get('div[data-testid="circle div"]').should("not.exist"))
    cy.get('[data-testid="string input"]').type("TEST")
    cy.get('[data-testid="string input"]').should("have.value", "TEST")
    cy.get('[data-testid="reverse btn"]').click()

    cy.tick(1000)
    cy.get('div[data-testid="circle div').should(($div) => {
      expect($div.eq(0)).to.have.text("T").and.css("border-color", defaultColor)
      expect($div.eq(1)).to.have.text("E").and.css("border-color", defaultColor)
      expect($div.eq(2)).to.have.text("S").and.css("border-color", defaultColor)
      expect($div.eq(3)).to.have.text("T").and.css("border-color", defaultColor)
    })
    cy.tick(1000)
    cy.get('div[data-testid="circle div').should(($div) => {
      expect($div.eq(0)).to.have.text("T").and.css("border-color", changingColor)
      expect($div.eq(1)).to.have.text("E").and.css("border-color", defaultColor)
      expect($div.eq(2)).to.have.text("S").and.css("border-color", defaultColor)
      expect($div.eq(3)).to.have.text("T").and.css("border-color", changingColor)
    })
    cy.tick(1000)
    cy.get('div[data-testid="circle div').should(($div) => {
      expect($div.eq(0)).to.have.text("T").and.css("border-color", modifiedColor)
      expect($div.eq(1)).to.have.text("E").and.css("border-color", changingColor)
      expect($div.eq(2)).to.have.text("S").and.css("border-color", changingColor)
      expect($div.eq(3)).to.have.text("T").and.css("border-color", modifiedColor)
    })
    cy.tick(1000)
    cy.get('div[data-testid="circle div').should(($div) => {
      expect($div.eq(0)).to.have.text("T").and.css("border-color", modifiedColor)
      expect($div.eq(1)).to.have.text("S").and.css("border-color", modifiedColor)
      expect($div.eq(2)).to.have.text("E").and.css("border-color", modifiedColor)
      expect($div.eq(3)).to.have.text("T").and.css("border-color", modifiedColor)
    })
  })
})
