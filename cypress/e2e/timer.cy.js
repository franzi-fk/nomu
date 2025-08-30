describe("Looped timer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  context("Set timer", () => {
    context("Timer input validation", () => {
      it("does not allow non-numeric characters in the input", () => {
        cy.get('[data-cy="inp-set-timer"]').clear().type("aA*-_5").blur();
        cy.get('[data-cy="inp-set-timer"]').should("have.value", "5");
      });

      it("autocorrects tiny durations to 0.09 as minimum duration", () => {
        cy.get('[data-cy="inp-set-timer"]').clear().type("0.02").blur();
        cy.get('[data-cy="inp-set-timer"]').should("have.value", "0.09");
        cy.get('[data-cy="inp-set-timer"]').clear().type("0").blur();
        cy.get('[data-cy="inp-set-timer"]').should("have.value", "0.09");
      });

      it("autocorrects larger numbers to 120 minutes as maximum duration", () => {
        cy.get('[data-cy="inp-set-timer"]').clear().type("500");
        cy.get('[data-cy="inp-set-timer"]').should("have.value", "120");
      });

      it("lets user set a decimal number duration", () => {
        cy.get('[data-cy="inp-set-timer"]').clear().type("3.45").blur();
        cy.get('[data-cy="inp-set-timer"]').should("have.value", "3.45");
      });

      it("removes excessive leading zeros before valid numbers", () => {
        cy.get('[data-cy="inp-set-timer"]').clear().type("001.5").blur();
        cy.get('[data-cy="inp-set-timer"]').should("have.value", "1.5");
        cy.get('[data-cy="inp-set-timer"]')
          .clear()
          .type("00000000000.5")
          .blur();
        cy.get('[data-cy="inp-set-timer"]').should("have.value", "0.5");
      });
    });

    it("has default duration and lets user set a duration", () => {
      cy.get('[data-cy="inp-set-timer"]').should("have.value", "5"); // default
      cy.get('[data-cy="inp-set-timer"]').clear().type("10").blur();
      cy.get('[data-cy="inp-set-timer"]').should("have.value", "10");
    });

    it("starts the timer with the duration defined by the user", () => {
      cy.get('[data-cy="inp-set-timer"]').clear().type("3");
      cy.get('[data-cy="btn-start-timer"]').click();
      cy.contains("3 minutes").should("be.visible");
      cy.get('[data-cy="btn-stop-timer"]').should("be.visible");
    });

    it("handles large fractional durations without input overflow", () => {
      const largeDuration = "100.55";

      cy.get('[data-cy="inp-set-timer"]').clear().type(largeDuration).blur();
      cy.get('[data-cy="inp-set-timer"]').should("have.value", largeDuration);

      // check for overflow
      cy.get('[data-cy="inp-set-timer"]').then(($input) => {
        const el = $input[0];
        expect(el.scrollWidth).to.be.lte(el.clientWidth);
      });
    });
  });

  context("Run timer", () => {
    const duration = "3.5";

    beforeEach(() => {
      cy.visit("http://localhost:5173/");
      cy.get('[data-cy="inp-set-timer"]').clear().type(duration);
      cy.get('[data-cy="btn-start-timer"]').click();
    });

    it("shows timer duration", () => {
      cy.contains(`${duration} minutes`).should("be.visible");
    });

    it("runs the timer", () => {
      cy.get('[data-cy="looped-timer"]').should("be.visible");
      cy.contains("3:28");
    });

    it("stops the timer when the user clicks stop", () => {
      // test code here
    });
  });

  context("Loop timer", () => {
    const duration = "0.05";

    beforeEach(() => {
      cy.visit("http://localhost:5173/");
      cy.get('[data-cy="inp-set-timer"]').clear().type(duration);
      cy.get('[data-cy="btn-start-timer"]').click();
    });

    it("restarts and loops the timer", () => {
      cy.contains("0:01");
      cy.contains("0:03");
    });

    it("plays sound when timer hits zero", () => {
      // spy on the audio prototype play method
      cy.window().then((win) => {
        cy.spy(win.Audio.prototype, "play").as("audioPlay");
      });
      cy.contains("00:00").should("be.visible");
      cy.get("@audioPlay").should("have.been.calledOnce");
    });
  });
});
