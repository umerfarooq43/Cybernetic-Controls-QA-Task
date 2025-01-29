Feature: ReqRes Users API Testing

Scenario: Retrieve a list of users
    Given The API endpoint "GET /api/users?page=2" is available
    When I send a GET request to "api/users?page=2"
    Then The response status should be 200
    And The response should contain a list of users
    And Each user should have an "id", "email", "first_name", and "last_name"

Scenario: Retrieve a single user
    Given The API endpoint "GET /api/users/2" is available
    When I send a GET request to "api/users/2"
    Then The response status should be 200
    And The response should contain user details
    And The user should have an "id" of 2

Scenario: Retrieve a non-existent user
    Given The API endpoint "GET /api/users/23" is available
    When I send a GET request to a non-existent user "api/users/23"
    Then The response status should be 404

Scenario: Create a new user
    Given The API endpoint "POST /api/users" is available
    When I send a POST request to "api/users" with the following data:
      | name  | job       |
      | John  | Engineer  |
    Then The response status should be 201
    And The response should contain the created user's "id" and "createdAt"

Scenario: Update an existing user with PUT requests
    Given The API endpoint "PUT /api/users/2" is available
    When I send a PUT request to "api/users/2" with the following data:
      | name  | job      |
      | Jane  | Manager  |
    Then The response status should be 200
    And The response should contain the updated "name", "job" and "updatedAt"

Scenario: Update an existing user with Patch requests
    Given The API endpoint "PATCH /api/users/2" is available
    When I send a PATCH request to "api/users/2" with the following data:
      | name  | job      |
      | Jane  | Manager  |
    Then The response status should be 200
    And The response should contain the updated "name", "job" and "updatedAt"

Scenario: Delete a user
    Given The API endpoint "DELETE /api/users/2" is available
    When I send a DELETE request to "api/users/2"
    Then The response status should be 204