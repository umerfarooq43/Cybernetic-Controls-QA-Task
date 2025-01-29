Feature: ReqRes Login API call Testing

Scenario: Successful register
    Given The API endpoint "POST /api/register" is available
    When I send a POST request to "api/register" with the following data:
      | email             | password |
      | eve.holt@reqres.in | cityslicka |
    Then The response status should be 200
    And The response should contain a "token"

Scenario: Unsuccessful register with missing password
    Given The API endpoint "POST /api/register" is available
    When I send a POST request to "api/register" with missing password
        | email             |
        | eve.holt@reqres.in|
    Then The response status should be 400
    And The response should contain an error message for password

Scenario: Unsuccessful register with empty password string
    Given The API endpoint "POST /api/register" is available
    When I send a POST request to "api/register" with empty password string
        | email             | password |
        | eve.holt@reqres.in | "" |
    Then The response status should be 400
    And The response should contain an error message for password

Scenario: Unsuccessful register with missing email
    Given The API endpoint "POST /api/register" is available
    When I send a POST request to "api/register" with missing email
        | password |
        | cityslicka |
    Then The response status should be 400
    And The response should contain an error message for email

Scenario: Unsuccessful register with empty email string
    Given The API endpoint "POST /api/register" is available
    When I send a POST request to "api/register" with empty email string
        | email             | password |
        | "" | cityslicka |
    Then The response status should be 400
    And The response should contain an error message for email

Scenario: Unsuccessful register with empty json object
    Given The API endpoint "POST /api/register" is available
    When I send a POST request to "api/register" with empty json object
    Then The response status should be 400
    And The response should contain an error message for email

