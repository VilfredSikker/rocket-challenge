context("Navigation", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("cy.reload() - reloads the page", () => {
    cy.reload()

    cy.reload(true)
  })

  it("Navigataes to launches from url", () => {
    cy.visit("/launches")

    cy.location("pathname").should("eq", "/launches")
  })

  it("Navigataes to launchpads from url", () => {
    cy.visit("/launch-pads")

    cy.location("pathname").should("eq", "/launch-pads")
  })

  it("Navigates from home page to a launch site", () => {
    cy.get("[data-cy=launches]").click()

    cy.get("[data-cy=launch-item").first().click()

    cy.location("pathname").should("include", "launches")
  })

  it("Navigates from home page to a launch pad site", () => {
    cy.get("[data-cy=launch-pads]").click()

    cy.get("[data-cy=launch-pad-item").first().click()

    cy.location("pathname").should("include", "launch-pads")
  })

  it("Click first breadcrumb from launch site navigates to home", () => {
    cy.get("[data-cy=launches]").click()

    cy.get("[data-cy=launch-item").first().click()

    cy.get("[data-cy=breadcrumb").first().click()

    cy.location("pathname").should("eq", "/")
  })
})
