describe("Страница конструктора", () => {
  describe("Модальное окно ингредиента", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("должно открываться при клике на ингредиент", () => {
      cy.get('[class*="BurgerIngredientsItem_link"]').first().click();
      cy.get('[data-testid="modal-window"]').should("be.visible");
    });

    it("должно отображать данные ингредиента", () => {
      cy.get('[class*="BurgerIngredientsItem_link"]').first().click();

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
      cy.get('[class*="BurgerIngredientsItem_link"]').first().click();
      cy.get('[data-testid="modal-window"]').should("be.visible");

      cy.get('[data-testid="modal-window-btn-close"]').click();

      cy.get('[data-testid="modal-window"]').should("not.exist");
    });
  });

  describe("Конструктор заказа", () => {
    const login = {
      email: "unusualemerald@tiffincrane.com",
      password: "1234567",
    };

    before(() => {
      cy.visit("http://localhost:3000/login");
      cy.get("[name=email]").type(login.email);
      cy.get("[name=password]").type(login.password);
      cy.contains("button", "Войти").click();
    });

    it("должен показать перетаскиваемые ингредиенты в конструкторе и открывать модальное окно при заказе", () => {
      cy.get('[class*="BurgerIngredientsItem_link"]').first().as("bun");

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
