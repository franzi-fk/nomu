describe("Basics", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("views initial home page state with all its content", () => {
    cy.get('[data-cy="nomu-logo"]');
    cy.get('[data-cy="btn-open-sidebar"]')
      .should("be.visible")
      .and("be.enabled");
    cy.get('[data-cy="art-set-timer"]').within(() => {
      cy.get('[data-cy="inp-set-timer"]').should("be.visible");
      cy.get('[data-cy="btn-start-timer"]')
        .should("be.visible")
        .and("be.enabled");
    });
    cy.get('[data-cy="legal-link"]');
  });

  it("opens and closes customization sidebar", () => {
    cy.get('[data-cy="btn-open-sidebar"]').click();
    cy.get('[data-cy="customization-sidebar"]')
      .should("be.visible")
      .within(() => {
        cy.contains("Notification Sound");
        cy.contains("Color Theme");
        cy.contains("Background Image");
      });
    cy.get('[data-cy="btn-close-sidebar"]')
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get('[data-cy="customization-sidebar"]').should("not.exist");
  });

  it("updates the browser tab title with the timer while running", () => {
    cy.get('[data-cy="inp-set-timer"]').clear().type(0.09);
    cy.get('[data-cy="btn-start-timer"]').click();

    // tab title should include timer
    cy.title().should("match", /\d{1,2}:\d{2}/);
  });

  it("clears the browser tab title when the timer is stopped", () => {
    // visit page and start timer
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="inp-set-timer"]').clear().type(0.09);
    cy.get('[data-cy="btn-start-timer"]').click();
    cy.wait(200);
    // stop the timer
    cy.get('[data-cy="btn-stop-timer"]').click();

    // tab title should reset to default
    cy.title().should("eq", "nomu");
  });
});
