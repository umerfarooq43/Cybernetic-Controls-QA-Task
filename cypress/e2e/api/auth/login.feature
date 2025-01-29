Feature: ReqRes Login API call Testing

Scenario: Successful login
    Given The API endpoint "POST /api/login" is available
    When I send a POST request to "api/login" with the following data:
      | email             | password |
      | eve.holt@reqres.in | cityslicka |
    Then The response status should be 200
    And The response should contain a "token"

Scenario: Unsuccessful login with missing password
    Given The API endpoint "POST /api/login" is available
    When I send a POST request to "api/login" with missing password
        | email             |
        | eve.holt@reqres.in|
    Then The response status should be 400
    And The response should contain an error message for password

Scenario: Unsuccessful login with empty password string
    Given The API endpoint "POST /api/login" is available
    When I send a POST request to "api/login" with empty password string
        | email             | password |
        | eve.holt@reqres.in | "" |
    Then The response status should be 400
    And The response should contain an error message for password

Scenario: Unsuccessful login with missing email
    Given The API endpoint "POST /api/login" is available
    When I send a POST request to "api/login" with missing email
        | password |
        | cityslicka |
    Then The response status should be 400
    And The response should contain an error message for email

Scenario: Unsuccessful login with empty email string
    Given The API endpoint "POST /api/login" is available
    When I send a POST request to "api/login" with empty email string
        | email             | password |
        | "" | cityslicka |
    Then The response status should be 400
    And The response should contain an error message for email

Scenario: Unsuccessful login with empty json object
    Given The API endpoint "POST /api/login" is available
    When I send a POST request to "api/login" with empty json object
    Then The response status should be 400
    And The response should contain an error message for email

