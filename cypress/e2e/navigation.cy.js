describe("Routing", () => {
  it("opens the home page", () => {
    verifyHomePage();
  });

  it("opens the legal notice page", () => {
    verifyLegalPage();
  });

  it("redirects to 404 page for unknown urls", () => {
    cy.visit("http://localhost:5173/randomurl");
    cy.contains("404");
    cy.contains("Page not found");
    cy.get('[data-cy="btn-go-home"]').should("be.visible").and("be.enabled");
  });
});

describe("UI Navigation", () => {
  it("navigates from home to legal notice page", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="legal-link"]').should("be.visible").click();
    verifyLegalPage();
  });

  it("navigates from legal notice to home page", () => {
    cy.visit("http://localhost:5173/legal");
    cy.get('[data-cy="btn-go-home"]').should("be.visible").click();
    verifyHomePage();
  });

  it("navigates from 404 to home page", () => {
    cy.visit("http://localhost:5173/randomurl");
    cy.get('[data-cy="btn-go-home"]').click();
    verifyHomePage();
  });
});

function verifyLegalPage() {
  cy.visit("http://localhost:5173/legal");
  cy.contains("Legal Notice");
}

function verifyHomePage() {
  cy.visit("http://localhost:5173");
  cy.get('[data-cy="nomu-logo"]').should("be.visible");
}
