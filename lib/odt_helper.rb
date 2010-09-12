module OdtHelper
require 'tempfile'
require 'zip/zip'
require 'find'
require "rexml/document"
require "cgi"
include ApplicationHelper 
include REXML

	def get_file(proforma)
		@dir=Time.now.to_i
		@tmp_dir=("#{Rails.root}/tmp/%s" % @dir)
		@proforma_file=("#{Rails.root}/tmp/%s/Proforma/content.xml" % @dir)
		@content=""
		
		copy_to_tmp
		read_content_file
		replace_data
		write_data
		zip
		cleanup
		@zipfile
	end

	def copy_to_tmp
	  # creates a temporary file in tmp/
	  FileUtils.mkdir @tmp_dir
	  from_dir="#{Rails.root}/lib/proforma_template/Proforma/"
	  FileUtils.cp_r from_dir, @tmp_dir
	end
	
	def read_content_file
		File.open(@proforma_file, "r") do |infile|
			 while (line = infile.gets)
				@content << line
			end
		end
	end
	
	def replace_data
		@content= @content.sub("{vessel}",@proforma.vessel.name.to_xs)
		@content=@content.sub("{port}",@proforma.port.name.to_xs)
		@content=@content.sub("{flag}",@proforma.vessel.vessel_flag.text.to_xs)
		@content=@content.sub("{reg_date}",@proforma.registration_date.strftime('%d.%m.%Y').to_xs)
		@content=@content.sub("{estimated_date}",@proforma.estimated_arrive.strftime('%d.%m.%Y').to_xs)
		@content=@content.sub("{arrived_date}",@proforma.arrived.strftime('%d.%m.%Y %H:%M').to_xs)
		@content=@content.sub("{sailed_date}",@proforma.sailed.strftime('%d.%m.%Y %H:%M').to_xs)
		@content=@content.sub("{currency}",@proforma.currency.curr.to_xs)
		@content=@content.sub("{default_currency}",default_currency.curr.to_xs)
		@content=@content.sub("{rate}",sprintf('%.4f', @proforma.currency.rate/default_currency.rate))
		@content=@content.sub("{gw}",@proforma.gw.to_s.to_xs)
		@content=@content.sub("{calls}",@proforma.calls.to_s.to_xs)
		txt="<!--sample_row-->"
		lindex= @content.index(txt)+txt.length
		rindex= @content.rindex(txt)
		length=rindex-lindex
		row=@content[lindex,length]
		rows=""
		row1=""
		@proforma.prof_tarif_calcs.each{|calc|
			logger.warn calc.tarif.name
			row1=row
			row1=row1.sub("{tarif_name}",calc.tarif.name.to_xs)
			#row1=row1.sub("{remark}", "11").
			row1=row1.sub("{tarif}",sprintf('%.2f',calc.tarif.currency.convertTo(calc.val,@proforma.currency)))
			rows << row1
		}
		@content=@content.insert(lindex,rows)
		@content=@content.sub row,''
		
	end
	
	def write_data
		File.open(@proforma_file, 'w') {|f| f.write(@content) }
		path=("#{Rails.root}/tmp")
		FileUtils.rm path+"/content.xml",:force => true
		FileUtils.cp @proforma_file,path
	end
	def zip
		path=("#{Rails.root}/tmp/%s/Proforma" % @dir)
		gem 'rubyzip'
		require 'zip/zip'
		require 'zip/zipfilesystem'
		path.sub!(%r[/$],'')
		@zipfile = File.join(path,File.basename(("#{Rails.root}/tmp/%s.ods" % @dir)))
		FileUtils.rm @zipfile, :force=>true

		Zip::ZipFile.open(@zipfile, 'w') do |zipfile|
			Dir["#{path}/**/**"].reject{|f|f==@zipfile}.each do |file|
			  zipfile.add(file.sub(path+'/',''),file)
			end
		end
  end

	def cleanup
		
	end
end