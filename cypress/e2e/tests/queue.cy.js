describe("Queue page tests", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('[href="/queue"] > .main-page_card__ZylSn').click()
  })
  it("buttons disabled on empty input", () => {
    cy.get("#input").should("be.empty")
    cy.contains("button", "Добавить").should("be.disabled")
    cy.contains("button", "Удалить").should("be.disabled")
    cy.contains("button", "Очистить").should("be.disabled")
  })
  it("add to queue", () => {
    const defaultColor = "rgb(0, 50, 255)"
    const changingColor = "rgb(210, 82, 225)"

    cy.clock()
    cy.get("#input").should("be.empty").type(1)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.get('div[data-testid="circle div"]')
      .eq(0)
      .should("have.text", 1)
      .and("have.css", "border-color", changingColor)
      .parent()
      .should("contain", "head")
      .and("contain", "tail")
    cy.tick(500)

    cy.get('div[data-testid="circle div"]').eq(0).should("have.css", "border-color", defaultColor)
    cy.get("#input").should("be.empty").type(2)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.get('div[data-testid="circle div"]')
      .eq(1)
      .should("have.text", 2)
      .and("have.css", "border-color", changingColor)
      .parent()
      .should("contain", "tail")
      .and("not.contain", "head")
    cy.tick(500)
    cy.get('div[data-testid="circle div"]').eq(1).should("have.css", "border-color", defaultColor)
  })
  it("delete from queue", () => {
    const defaultColor = "rgb(0, 50, 255)"
    const changingColor = "rgb(210, 82, 225)"

    cy.clock()
    cy.get("#input").should("be.empty").type(1)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(1000)

    cy.get("#input").should("be.empty").type(2)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(1000)

    cy.contains("button", "Удалить").should("not.be.disabled").click()
    cy.get('div[data-testid="circle div"]')
      .eq(0)
      .should("have.text", "")
      .and("have.css", "border-color", changingColor)
      .parent()
      .should("not.contain", "head")
      .and("not.contain", "tail")
    cy.tick(500)
    cy.get('div[data-testid="circle div"]').eq(0).should("have.css", "border-color", defaultColor)
    cy.get('div[data-testid="circle div"]')
      .eq(1)
      .parent()
      .should("contain", "head")
      .and("contain", "tail")
  })

  it("clear queue", () => {
    cy.clock()
    cy.get("#input").should("be.empty").type(1)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(1000)

    cy.get("#input").should("be.empty").type(2)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(1000)

    cy.get("#input").should("be.empty").type(3)
    cy.contains("button", "Добавить").should("not.be.disabled").click()
    cy.tick(1000)

    cy.contains("button", "Очистить").should("not.be.disabled").click()
    cy.get('div[data-testid="circle div"]').each(($div) => {
      expect($div).to.have.text("")
    })
  })
})
