Cypress.Commands.add("login", (userData) => {
  cy.get('[data-testid="email-login"]').type(userData.email);
  cy.get('[data-testid="password-login"]').type(userData.password);
});

describe("Страница конструктора", () => {
  describe("Модальное окно ингредиента", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("должно открываться при клике на ингредиент", () => {
      cy.get('[data-testid="burger-ingredient-item"]').first().click();
      cy.get('[data-testid="modal-window"]').should("be.visible");
    });

    it("должно отображать данные ингредиента", () => {
      cy.get('[data-testid="burger-ingredient-item"]').first().click();

      cy.get('[data-testid="modal-window"]').should("be.visible");

      cy.get('[data-testid="ingredient-details-image"]').should("be.visible");
      cy.get('[data-testid="ingredient-details-name"]').should("be.visible");
      cy.get('[data-testid="ingredient-details-calories"]').should(
        "be.visible"
      );
      cy.get('[data-testid="ingredient-details-proteins"]').should(
        "be.visible"
      );
      cy.get('[data-testid="ingredient-details-fat"]').should("be.visible");
      cy.get('[data-testid="ingredient-details-carbohydrates"]').should(
        "be.visible"
      );
    });

    it("должно закрываться при клике на кнопку закрытия", () => {
      cy.get('[data-testid="burger-ingredient-item"]').first().click();
      cy.get('[data-testid="modal-window"]').should("be.visible");

      cy.get('[data-testid="modal-window-btn-close"]').click();

      cy.get('[data-testid="modal-window"]').should("not.exist");
    });
  });

  describe("Конструктор заказа", () => {
    const userData = {
      email: "unusualemerald@tiffincrane.com",
      password: "1234567",
    };

    before(() => {
      cy.visit("login");
      cy.login(userData);
      cy.get('[data-testid="button-login"]').click();
    });

    it("должен показать перетаскиваемые ингредиенты в конструкторе и открывать модальное окно при заказе", () => {
      cy.get('[data-testid="burger-ingredient-item"]').first().as("bun");

      cy.get('[data-testid="burger-constuctor-bun-top"]')
        .first()
        .as("bunTarget");

      cy.get("@bun").trigger("dragstart");
      cy.get("@bunTarget").trigger("drop");

      cy.get('[data-testid="burger-constuctor-bun-top"]').should(
        "contain.text",
        "(верх)"
      );
      cy.get('[data-testid="burger-constuctor-bun-bottom"]').should(
        "contain.text",
        "(низ)"
      );

      cy.get('[data-testid="burger-constructor-order"]').click();
      cy.wait(20000);
      cy.get('[data-testid="modal-window"]').should("be.visible");
    });
  });
});
