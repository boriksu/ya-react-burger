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
});
