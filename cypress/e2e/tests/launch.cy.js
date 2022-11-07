describe("Launch application test", () => {
  it("string page open", () => {
    cy.visit("/recursion")
    cy.get("h3").should("have.text", "Строка")
  })
  it("fibonacci page open", () => {
    cy.visit("/fibonacci")
    cy.get("h3").should("have.text", "Последовательность Фибоначчи")
  })
  it("sorting page open", () => {
    cy.visit("/sorting")
    cy.get("h3").should("have.text", "Сортировка массива")
  })
  it("stack page open", () => {
    cy.visit("/stack")
    cy.get("h3").should("have.text", "Стек")
  })
  it("queue page open", () => {
    cy.visit("/queue")
    cy.get("h3").should("have.text", "Очередь")
  })
  it("list page open", () => {
    cy.visit("/list")
    cy.get("h3").should("have.text", "Связный список")
  })
})
