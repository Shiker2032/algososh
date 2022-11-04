/// <reference types = 'cypress'/>

describe("List page tests", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.get('[href="/list"] > .main-page_card__ZylSn').click()
  })
  it("initial state of page", () => {
    cy.get("#input").should("be.empty")
    cy.get("#inputIndex").should("be.empty")
    cy.contains("button", "Добавить в head").should("be.disabled")
    cy.contains("button", "Добавить в tail").should("be.disabled")
    cy.contains("button", "Добавить по индексу").should("be.disabled")
    cy.contains("button", "Удалить по индексу").should("be.disabled")
    cy.contains("button", "Удалить из head").should("not.be.disabled")
    cy.contains("button", "Удалить из tail").should("not.be.disabled")
    cy.get('div[data-testid="circle div"]').should("have.length.above", 0)
  })
  it("render initial array", () => {
    const initialArrayRef = [0, 34, 8, 1]
    const defaultColor = "rgb(0, 50, 255)"

    cy.get('div[data-testid="circle div"]').should("have.length.above", 0)
    for (let i = 0; i < initialArrayRef.length - 1; i++) {
      cy.get('div[data-testid="circle div"]')
        .eq(i)
        .should("have.text", initialArrayRef[i])
        .and("have.css", "border-color", defaultColor)
    }
    cy.get('div[data-testid="circle div"]').eq(0).parent().should("contain", "head")
    cy.get('div[data-testid="circle div"]')
      .eq(initialArrayRef.length - 1)
      .parent()
      .should("contain", "tail")
  })
  it("add to head", () => {
    const initialArrayRef = [0, 34, 8, 1]
    const changingColor = "rgb(210, 82, 225)"
    const defaultColor = "rgb(0, 50, 255)"

    cy.clock()
    cy.get("#input").should("be.empty").type("A")
    cy.contains("button", "Добавить в head").should("not.be.disabled").click()
    cy.get("[class*=circle_small]").should("have.text", "A")
    cy.get('div[data-testid="circle div"]')
      .eq(1)
      .should("have.text", initialArrayRef[0])
      .and("have.css", "border-color", changingColor)
    cy.tick(1000)

    cy.get("[class*=circle_small]").should("not.exist")
    cy.get('div[data-testid="circle div"]')
      .eq(0)
      .should("have.text", "A")
      .and("have.css", "border-color", defaultColor)
      .parent()
      .should("contain", "head")
      .and("contain", "0")
  })
  it("add to tail", () => {
    const initialArrayRef = [0, 34, 8, 1]
    const changingColor = "rgb(210, 82, 225)"
    const modifiedColor = "rgb(127, 224, 81)"
    const defaultColor = "rgb(0, 50, 255)"
    cy.clock()
    cy.get("#input").should("be.empty").type("A")
    cy.contains("button", "Добавить в tail").should("not.be.disabled").click()
    cy.get("[class*=circle_small]")
      .should("have.text", "A")
      .and("have.css", "border-color", changingColor)
    cy.get('div[data-testid="circle div"]').eq(initialArrayRef.length - 1)
    cy.tick(1000)

    cy.get("[class*=circle_small]").should("not.exist")
    cy.get('div[data-testid="circle div"]')
      .eq(initialArrayRef.length)
      .should("have.text", "A")
      .and("have.css", "border-color", modifiedColor)
      .parent()
      .should("contain", "tail")
    cy.tick(1000)

    cy.get('div[data-testid="circle div"]')
      .eq(initialArrayRef.length)
      .should("have.css", "border-color", defaultColor)
  })

  it("add by index", () => {
    const initialArrayRef = [0, 34, 8, 1]
    const changingColor = "rgb(210, 82, 225)"
    const modifiedColor = "rgb(127, 224, 81)"
    const defaultColor = "rgb(0, 50, 255)"
    cy.clock()
    cy.get("#input").should("be.empty").type("A")
    cy.get("#inputIndex").should("be.empty").type(2)
    cy.contains("button", "Добавить по индексу").should("not.be.disabled").click()

    cy.get('div[data-testid="circle div"]').eq(1).should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get('div[data-testid="circle div"]').eq(2).should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.tick(1000)
    cy.get('div[data-testid="circle div"]')
      .eq(2)
      .should("have.css", "border-color", modifiedColor)
      .and("have.text", "A")
    cy.tick(1000)
    cy.get('div[data-testid="circle div"]').eq(2).should("have.css", "border-color", defaultColor)
  })

  it("delete from tail", () => {
    const initialArrayRef = [0, 34, 8, 1]
    const changingColor = "rgb(210, 82, 225)"
    const modifiedColor = "rgb(127, 224, 81)"
    const defaultColor = "rgb(0, 50, 255)"

    cy.clock()
    cy.contains("button", "Удалить из tail").should("not.be.disabled").click()
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
    const initialArrayRef = [0, 34, 8, 1]
    const changingColor = "rgb(210, 82, 225)"
    const modifiedColor = "rgb(127, 224, 81)"
    const defaultColor = "rgb(0, 50, 255)"

    cy.clock()
    cy.contains("button", "Удалить из head").should("not.be.disabled").click()
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
    const initialArrayRef = [0, 34, 8, 1]
    const changingColor = "rgb(210, 82, 225)"
    const modifiedColor = "rgb(127, 224, 81)"
    const defaultColor = "rgb(0, 50, 255)"

    cy.clock()
    cy.get("#inputIndex").should("be.empty").type(2)
    cy.contains("button", "Удалить по индексу").should("not.be.disabled").click()
    cy.get('div[data-testid="circle div"]').eq(0).should("have.css", "border-color", changingColor)
    cy.tick(1000)

    cy.get('div[data-testid="circle div"]').eq(1).should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get('div[data-testid="circle div"]').eq(2).should("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get('div[data-testid="circle div"]')
      .eq(2)
      .should("have.text", "")
      .and("have.css", "border-color", defaultColor)
    cy.get("[class*=circle_small]")
      .should("have.text", "8")
      .and("have.css", "border-color", changingColor)
    cy.tick(1000)
    cy.get('div[data-testid="circle div"]').should("have.length", 3)
  })
})
