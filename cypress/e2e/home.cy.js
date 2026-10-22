describe("Showmate smoke test", () => {
  it("loads the app shell and navigation", () => {
    cy.visit("/");
    cy.contains("Showmate").should("be.visible");
    cy.contains("Home").should("be.visible");
  });
});
