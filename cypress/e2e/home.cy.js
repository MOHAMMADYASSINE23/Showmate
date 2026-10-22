describe("Showmate smoke test", () => {
  it("loads the app shell and navigation", () => {
    cy.visit("/");
    cy.get("#root").should("not.be.empty");
    cy.get("#root").contains("Showmate").should("be.visible");
    cy.get("#root").contains("Home").should("be.visible");
  });
});
