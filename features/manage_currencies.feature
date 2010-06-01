Feature: Manage currencies
  In order to [goal]
  [stakeholder]
  wants [behaviour]
  
  Scenario: Register new currency
    Given I am on the new currency page
    When I fill in "Curr" with "curr 1"
    And I press "Create"
    Then I should see "curr 1"

  Scenario: Delete currency
    Given the following currencies:
      |curr|
      |curr 1|
      |curr 2|
      |curr 3|
      |curr 4|
    When I delete the 3rd currency
    Then I should see the following currencies:
      |Curr|
      |curr 1|
      |curr 2|
      |curr 4|
