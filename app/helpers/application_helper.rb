# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  include ActionView::Helpers::NumberHelper
	def default_currency
		Currency.find(2)
	end
	def eur_currency
		Currency.find(1)
	end
	
	def money(number)
		("%.2f" % number).gsub(".",",")
	end
	
end
