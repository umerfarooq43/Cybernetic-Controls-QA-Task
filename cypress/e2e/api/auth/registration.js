import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("The API endpoint {string} is available", (endpoint)=> {
    cy.wrap(endpoint).as("endpoint");
})

When("I send a POST request to {string} with the following data:", (url) => {
    const data =  { email: "eve.holt@reqres.in", password: "cityslicka" };
    cy.request({ method: "POST", url: `https://reqres.in/${url}`, body: data, failOnStatusCode: false }).as("response");
  });

  Then("The response status should be {int}", (statusCode) => {
    cy.get("@response").its("status").should("eq", statusCode);
  });

  Then("The response should contain a {string}", (token) => {
    cy.get("@response").its("body").should("be.an", "object");
    cy.get("@response").its("body").should("have.property", token);
  })

  When("I send a POST request to {string} with missing password", (url) => {
    const data = { email: "eve.holt@reqres.in" };
    cy.request({ method: "POST", url: `https://reqres.in/${url}`, body: data, failOnStatusCode: false }).as("response");
  });

  When("I send a POST request to {string} with empty password string", (url) => {
    const data = { email: "eve.holt@reqres.in", password: "" };
    cy.request({ method: "POST", url: `https://reqres.in/${url}`, body: data, failOnStatusCode: false }).as("response");
  });
  
  Then("The response should contain an error message for password", () => {
    cy.get("@response").its("body").should("have.property", "error");
    cy.get("@response").its("body.error").should("include", "Missing password");
  });

  When("I send a POST request to {string} with missing email", (url) => {
    const data = { password: "cityslicka" };
    cy.request({ method: "POST", url: `https://reqres.in/${url}`, body: data, failOnStatusCode: false }).as("response");
  });

  When("I send a POST request to {string} with empty email string", (url) => {
    const data =  { email: "", password: "cityslicka" };
    cy.request({ method: "POST", url: `https://reqres.in/${url}`, body: data, failOnStatusCode: false }).as("response");
  });

  When("I send a POST request to {string} with empty json object", (url) => {
    const data = {};
    cy.request({ method: "POST", url: `https://reqres.in/${url}`, body: data, failOnStatusCode: false }).as("response");
  });
  
  Then("The response should contain an error message for email", () => {
    cy.get("@response").its("body").should("have.property", "error");
    cy.get("@response").its("body.error").should("include", "Missing email or username");
  });
