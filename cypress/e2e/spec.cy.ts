export {};
describe("basic tests", () => {
  it("clicking Open Discorda navigates to /login", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Open Discorda").click();
    cy.url().should("include", "/login");
  });
  it("should appear an incorrect password toast for an incorrect user infos", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#username").type("aysam5236");
    cy.get("#password").type("Anhar2014");
    cy.contains("Login").click();
    cy.contains("incorrect");
  });
  it("should log the user", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#username").type("aysam5236");
    cy.get("#password").type("Anhar2014@");
    cy.contains("Login").click();
  });
  it("should go to the profile page of the user", () => {
    cy.visit("http://localhost:3000/profile");
  });
});
