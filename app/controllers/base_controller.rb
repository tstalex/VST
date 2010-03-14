require 'rexml/document'
include REXML
class BaseController < ApplicationController
  def show
  end

  def setupPort (element)
    port = Country.new
    #<row><field name="id">1</field><field name="del">A</field><field name="name"></field><field name="country">1</field><field name="code"></field><field name="flag">0</field><field name="tips"></field><field name="descr"></field><field name="pict"><![CDATA[System.Byte[]]]></field></row>
    port.text=element.children[2].text
    port.code=element.children[3].text
    port.is_euro=element.children[5].text
    port.save
  end

  def import
    file= File.new("c:/Users/denis/Desktop/country.xml")
    xm1=Document.new file
    rr=""
    XPath.each( xm1, "//row") {
            |element|
      setupPort element
    }
    response :html=> rr
  end
end
