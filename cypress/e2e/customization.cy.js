context("Customization", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="btn-open-sidebar"]').click();
  });

  context("Notification Sounds", () => {
    it("shows default sound selected", () => {
      // Check that "handpan" is selected
      cy.get('input[name="selectedSound"]:checked')
        .invoke("attr", "data-name")
        .should("eq", "handpan");
    });

    it("plays a sound preview for all available sounds", () => {
      cy.window().then((win) => {
        cy.spy(win.Audio.prototype, "play").as("audioPlay");
      });

      // loop over all sound play buttons
      cy.get('[data-cy="btn-play-sound"]').each(($btn) => {
        cy.wrap($btn).click();
        cy.get("@audioPlay").should("have.been.called");
        // reset the spy call count for the next button
        cy.get("@audioPlay").invoke("resetHistory");
      });
    });

    it("allows selecting all sound options", () => {
      cy.get('input[name="selectedSound"]').each(($input) => {
        // select the sound
        cy.wrap($input).check({ force: true });
        // verify
        cy.wrap($input).should("be.checked");
      });
    });

    it("plays the selected sound for all sound options while timer is running", () => {
      const soundNames = ["handpan", "chime", "droplet", "strings"];

      // start timer
      cy.get('[data-cy="inp-set-timer"]').clear().type("0.05");
      cy.get('[data-cy="btn-start-timer"]').click();

      // spy on audio
      cy.window().then((win) => {
        cy.spy(win.Audio.prototype, "play").as("audioPlay");
      });

      // loop over each sound
      soundNames.forEach((name) => {
        cy.get('[data-cy="btn-open-sidebar"]').click();
        // select sound
        cy.get(`input[name="selectedSound"][data-name="${name}"]`).check({
          force: true,
        });

        // close sidebar to keep timer display visible
        cy.get('[data-cy="btn-close-sidebar"]').click();

        cy.contains("00:00").should("exist");

        // verify audio was played
        cy.get("@audioPlay").should("have.been.called");

        // reset spy for next sound
        cy.get("@audioPlay").invoke("resetHistory");
      });
      cy.wait(700);
    });
  });

  context("Color Themes", () => {
    const themes = [
      "light-neutral",
      "light-rose",
      "light-blue",
      "light-cyan",
      "light-orange",
      "dark-neutral",
      "dark-rose",
      "dark-blue",
      "dark-cyan",
      "dark-orange",
    ];

    it("shows default theme selected", () => {
      // light-rose is default
      cy.get('[data-cy="theme-item-light-rose"] input[type="radio"]').should(
        "be.checked"
      );
    });

    it("allows selecting all theme options", () => {
      themes.forEach((theme) => {
        const currentTheme = `[data-cy="theme-item-${theme}"] input[type="radio"]`;

        // select theme
        cy.get(currentTheme).check({ force: true });

        // verify it is checked
        cy.get(currentTheme).should("be.checked");

        // verify all other theme inputs are not checked
        themes
          .filter((t) => t !== theme)
          .forEach((t) => {
            cy.get(`[data-cy="theme-item-${t}"] input[type="radio"]`).should(
              "not.be.checked"
            );
          });
      });
    });

    it("applies the selected theme immediately", () => {
      themes.forEach((theme) => {
        // click the theme radio input
        cy.get(`[data-cy="theme-item-${theme}"] input[type="radio"]`).check({
          force: true,
        });

        // verify the DOM reflects the selected theme
        cy.document()
          .its("documentElement")
          .should("have.attr", "data-theme", theme);
      });
    });
  });

  context("Background Images", () => {
    const backgrounds = [
      {
        name: "no",
        file: null,
      },
      {
        name: "1",
        file: "bg-1.jpg",
        credits: {
          author: "Kristin Charleton",
          authorUrl:
            "https://unsplash.com/de/@kristincharleton?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
          photoUrl:
            "https://unsplash.com/de/fotos/ein-verschwommenes-foto-einer-welle-im-ozean-gTE8_d8mnLE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
        },
      },
      {
        name: "2",
        file: "bg-2.jpg",
        credits: {
          author: "Steve Johnson",
          authorUrl:
            "https://unsplash.com/de/@steve_j?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
          photoUrl:
            "https://unsplash.com/de/fotos/ein-verschwommenes-bild-einer-rosa-weissen-vase-Ynv62BMTaWg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
        },
      },
      {
        name: "3",
        file: "bg-3.jpg",
        credits: {
          author: "Dave Hoefler",
          authorUrl:
            "https://unsplash.com/@iamthedave?utm_source=unsplash&utm_medium=referral",
          photoUrl:
            "https://unsplash.com/photos/1CwHEUauuFA?utm_source=unsplash&utm_medium=referral",
        },
      },
      {
        name: "4",
        file: "bg-4.jpg",
        credits: {
          author: "Andrew Ruiz",
          authorUrl:
            "https://unsplash.com/de/@andrewruiz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
          photoUrl:
            "https://unsplash.com/de/fotos/blauer-und-weisser-himmel-tagsuber-XqHOx_3vcTc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
        },
      },
    ];

    it("shows default background selected", () => {
      // default is 1
      cy.get('[data-cy="background-item-1"] input[type="radio"]').should(
        "be.checked"
      );
    });

    it("allows selecting all background image options", () => {
      backgrounds.forEach((bg) => {
        const currentBg = `[data-cy="background-item-${bg.name}"] input[type="radio"]`;

        // select background
        cy.get(currentBg).check({ force: true });

        // verify it is checked
        cy.get(currentBg).should("be.checked");

        // verify all others are not checked
        backgrounds
          .filter((b) => b.name !== bg.name)
          .forEach((b) => {
            cy.get(
              `[data-cy="background-item-${b.name}"] input[type="radio"]`
            ).should("not.be.checked");
          });
      });
    });

    it("applies the selected background immediately", () => {
      backgrounds.forEach((bg) => {
        const currentBg = `[data-cy="background-item-${bg.name}"] input[type="radio"]`;

        cy.get(currentBg).check({ force: true });

        if (bg.file) {
          cy.get("#bg-layer")
            .should("have.attr", "style")
            .and("include", bg.file);
        } else {
          // "no" bg selected
          cy.get("#bg-layer")
            .should("have.attr", "style")
            .and("not.include", "background-image");
        }
      });
    });

    it("updates credits for each background image", () => {
      backgrounds.forEach((bg) => {
        const currentBg = `[data-cy="background-item-${bg.name}"] input[type="radio"]`;

        cy.get(currentBg).check({ force: true });

        if (bg.credits) {
          cy.get('[data-cy="photo-credits"]').should(
            "contain.text",
            bg.credits.author
          );

          cy.get('[data-cy="photo-credits"] a')
            .first()
            .should("have.attr", "href", bg.credits.authorUrl);

          cy.get('[data-cy="photo-credits"] a')
            .last()
            .should("have.attr", "href", bg.credits.photoUrl);
        } else {
          cy.get('[data-cy="photo-credits"]').should("not.exist");
        }
      });
    });
  });
});
