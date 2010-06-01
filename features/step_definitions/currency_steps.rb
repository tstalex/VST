Given /^the following currencies:$/ do |currencies|
  Currency.create!(currencies.hashes)
end

When /^I delete the (\d+)(?:st|nd|rd|th) currency$/ do |pos|
  visit currencies_path
  within("table tr:nth-child(#{pos.to_i+1})") do
    click_link "Destroy"
  end
end

Then /^I should see the following currencies:$/ do |expected_currencies_table|
  expected_currencies_table.diff!(tableish('table tr', 'td,th'))
end
