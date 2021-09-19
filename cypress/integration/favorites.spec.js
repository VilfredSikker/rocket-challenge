/// <reference types="cypress" />

context("Favorites", () => {
  beforeEach(() => {
    cy.visit("/")
    cy.reload()
  })

  it("Localstorage initiates with empty launches and launchpads", () => {
    const storage = localStorage.getItem("favorites")

    expect(storage).to.eq('{"launches":{},"launchPads":{}}')
  })

  it("localStorage.setItem success", () => {
    localStorage.setItem("test", JSON.stringify({ test: "test" }))

    cy.expect(JSON.parse(localStorage.getItem("test"))).to.deep.equal({
      test: "test",
    })
  })

  it("Click launch star will not navigate", () => {
    cy.visit("/launches")

    cy.location("pathname").should("eq", "/launches")

    cy.get("[data-cy=launch-star]")
      .first()
      .click()
      .should(() => {
        cy.location("pathname").should("eq", "/launches")
      })
  })

  it("Click launch star will add to localstorage", () => {
    cy.visit("/launches")

    cy.location("pathname").should("eq", "/launches")

    cy.get("[data-cy=launch-star]")
      .first()
      .click()
      .should(() => {
        const storage = JSON.parse(localStorage.getItem("favorites"))
        const launches = Object.values(storage.launches)

        cy.expect(launches.length).to.equal(1)
      })
  })

  it("Click a favorite will remove it", () => {
    cy.visit("/launches")

    cy.location("pathname").should("eq", "/launches")

    cy.get("[data-cy=launch-star]")
      .first()
      .click()
      .should(() => {
        const storage = JSON.parse(localStorage.getItem("favorites"))
        const launches = Object.values(storage.launches)

        cy.expect(launches.length).to.equal(1)
      })

    cy.get("[data-cy=launch-star]")
      .first()
      .click()
      .should(() => {
        const storage = JSON.parse(localStorage.getItem("favorites"))
        const launches = Object.values(storage.launches)

        cy.expect(launches.length).to.equal(0)
      })
  })
})
