# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
	def default_currency
		Currency.find(2)
	end
	def eur_currency
		Currency.find(1)
	end
end
