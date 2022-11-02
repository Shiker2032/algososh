describe("Launch application test", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("string page open", () => {
    cy.get('[href="/recursion"] > .main-page_card__ZylSn').click()
    cy.get("h3").should("have.text", "Строка")
  })
  it("fibonacci page open", () => {
    cy.get('[href="/fibonacci"] > .main-page_card__ZylSn').click()
    cy.get("h3").should("have.text", "Последовательность Фибоначчи")
  })
  it("sorting page open", () => {
    cy.get('[href="/sorting"] > .main-page_card__ZylSn').click()
    cy.get("h3").should("have.text", "Сортировка массива")
  })
  it("sorting page open", () => {
    cy.get('[href="/stack"] > .main-page_card__ZylSn').click()
    cy.get("h3").should("have.text", "Стек")
  })
  it("sorting page open", () => {
    cy.get('[href="/stack"] > .main-page_card__ZylSn').click()
    cy.get("h3").should("have.text", "Стек")
  })
  it("queue page open", () => {
    cy.get('[href="/queue"] > .main-page_card__ZylSn').click()
    cy.get("h3").should("have.text", "Очередь")
  })
  it("list page open", () => {
    cy.get('[href="/list"] > .main-page_card__ZylSn').click()
    cy.get("h3").should("have.text", "Связный список")
  })
})
