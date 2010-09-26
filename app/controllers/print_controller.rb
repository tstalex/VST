class PrintController < ApplicationController
  include OdtHelper
  require 'serenity'
  include Serenity::Generator

   def auth
	
	end
  def pdf
	gen
	file= gen_file_name
	render_odt 'lib/proforma_template/Proforma.odt',file
	send_file(file)
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
	@tarifs=[]
	@total=0
	@proforma.prof_tarif_calcs.each do|item|
		tval={"tarif"=>item.tarif.name, "val"=>item.getCalculatedValue} 
		@tarifs.push tval
		@total+=tval["val"][0]
	end
	logger.info "dDDDDDDDDDDDDDDDDD"
	@tarifs.each do|item|
			logger.info item["tarif"]
	
	end
		
	@proforma
  end
  def xml
	response.headers["Content-Type"]="application/vnd.ms-excel; charset=UTF-8"
	response.headers["Content-Disposition"]="inline; filename=proforma.xml"
	gen
  end

end
