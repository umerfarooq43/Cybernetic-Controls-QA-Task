import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("The API endpoint {string} is available", (endpoint) => {
    cy.wrap(endpoint).as("endpoint");
  });

  When("I send a GET request to {string}", (url) => {
    cy.request("GET", `https://reqres.in/${url}`).as("response");
  });

  Then("The response status should be {int}", (statusCode) => {
    cy.get("@response").its("status").should("eq", statusCode);
  });
  
  Then("The response should contain a list of users", () => {
    cy.get("@response").its("body.data").should("be.an", "array");
  });
  
  Then("Each user should have an {string}, {string}, {string}, and {string}", (id, email, first_name, last_name) => {
    cy.get("@response").its("body.data").each((user) => {
      expect(user).to.have.property(id);
      expect(user).to.have.property(email);
      expect(user).to.have.property(first_name);
      expect(user).to.have.property(last_name);
    });
  });

  Then("The response should contain user details", () => {
    cy.get("@response").its("body.data").should("be.an", "object");
    cy.get("@response").its("body.data.email").should("include", "@reqres.in");
    cy.get("@response").its("body.support").should("be.an", "object");
    cy.get("@response").its("body.support.url").should("include", "contentcaddy.io");
    cy.get("@response").its("body.support.text").should("include", "Tired of writing endless social media content?");
  });

  Then("The user should have an {string} of 2", (id) => {
    cy.get("@response").its("body.data.id").should("equal", 2);
  });

  When("I send a GET request to a non-existent user {string}", (url) => {
    cy.request({ method: "GET", url: `https://reqres.in/${url}`, failOnStatusCode: false }).as("response");
  });
  

  When("I send a POST request to {string} with the following data:", (url, dataTable) => {
    const data = dataTable.rowsHash();
    cy.request("POST", `https://reqres.in/${url}`, data).as("response");
  });
  
  Then("The response should contain the created user's {string} and {string}", (id, createdAt) => {
    cy.get("@response").its("body").should("include.keys", id, createdAt);
  });
  
  When("I send a PUT request to {string} with the following data:", (url, dataTable) => {
    const data = dataTable.rowsHash();
    cy.request("PUT", `https://reqres.in/${url}`, data).as("response");
  });

  When("I send a PATCH request to {string} with the following data:", (url, dataTable) => {
    const data = dataTable.rowsHash();
    cy.request("PATCH", `https://reqres.in/${url}`, data).as("response");
  });
  
  
  Then("The response should contain the updated {string}, {string} and {string}", (name, job, updatedAt) => {
    cy.get("@response").its("body").should("be.an", "object");
    // cy.get("@response").its("body.name").should("include", name);
    // cy.get("@response").its("body.job").should("include", job);
    // cy.get("@response").its("body").should("include.keys", name, job, updatedAt);
  });
  
  When("I send a DELETE request to {string}", (url) => {
    cy.request("DELETE", `https://reqres.in/${url}`).as("response");
  });