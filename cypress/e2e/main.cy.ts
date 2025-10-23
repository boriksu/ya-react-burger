describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
  it("should be available on localhost:3001", function () {
    cy.visit("http://localhost:3001");
  });
});
