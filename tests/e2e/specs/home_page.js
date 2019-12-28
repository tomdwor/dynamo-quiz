// https://docs.cypress.io/api/introduction/api.html

describe("Home page header test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "My Quizzes List");
  });
});
