/* eslint-disable no-undef */
describe("Note tests", () => {
  it("Test add and delete note", () => {
    cy.visit("/");
    cy.getDataTest("left-panel").get("#add-note-button").click();
    cy.getDataTest("left-panel").contains(/Create first note/i);
    cy.getDataTest("body").get("#title").type("Title test");
    cy.getDataTest("body").get("#date").type("2025-01-01");
    cy.getDataTest("body").get("#tag").type("Mark test");
    cy.getDataTest("body").find("textarea").type("Note test");
    cy.getDataTest("body").find("button").click();
    cy.getDataTest("left-panel").contains(/Title test/i);
    cy.getDataTest("left-panel").contains("1/1/2025");
    cy.getDataTest("left-panel").contains(/Note test/i);
    cy.getDataTest("left-panel").get("#note-button").click();
    cy.getDataTest("body").get("#delete-button").click();
    cy.getDataTest("left-panel").contains(/Create first note/i);
  });
  it.only("Test note errors", () => {
    cy.visit("/");
    cy.getDataTest("left-panel").get("#add-note-button").click();
    cy.getDataTest("left-panel").contains(/Create first note/i);
    cy.getDataTest("body").find("button").click();
    cy.getDataTest("body")
      .get("#title")
      .should("have.css", "border", "1px solid rgb(179, 38, 30)");
    cy.getDataTest("body")
      .get("#date")
      .should("have.css", "border", "1px solid rgb(179, 38, 30)");
    cy.getDataTest("body")
      .find("textarea")
      .should("have.css", "border", "1px solid rgb(179, 38, 30)");
  });
});
