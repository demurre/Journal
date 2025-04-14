/* eslint-disable no-undef */
describe("User tests", () => {
  it("Test add user", () => {
    cy.visit("/");
    cy.getDataTest("left-panel").get("#add-user").type("User1");
    cy.getDataTest("left-panel").get("#add-user-button").click();
    cy.getDataTest("left-panel").find("select").contains(/User1/i);
    cy.getDataTest("left-panel").get("#add-user").type("User2");
    cy.getDataTest("left-panel").get("#add-user-button").click();
    cy.getDataTest("left-panel").find("select").contains(/User2/i);
    cy.getDataTest("left-panel").find("select").select("User1");
    cy.getDataTest("left-panel").find("select").contains(/User1/i);
  });
});
