class Currency < ActiveRecord::Base
include ApplicationHelper

def convertTo(amount,curr)

	price_in_def_curr=amount * rate
	ret= price_in_def_curr / curr.rate
	ret
end


end