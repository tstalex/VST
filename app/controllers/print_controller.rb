class PrintController < ApplicationController
  include OdtHelper
   def auth
	
	end
  def pdf
	gen
	fname=get_file(@proforma)
	send_file(fname)
  end

  def xls
	gen
  end

  def mail
	gen
  end
  def gen
	unless params[:data].nil?
		data= params[:data]
		json_obj= ActiveSupport::JSON.decode(data)
		@proforma = Proforma.new(json_obj)
    end
	unless params[:id].nil?
		@proforma = Proforma.find(params[:id])
    end
  end
  def xml
	response.headers["Content-Type"]="application/vnd.ms-excel; charset=UTF-8"
	response.headers["Content-Disposition"]="inline; filename=proforma.xml"
	gen
  end

end
