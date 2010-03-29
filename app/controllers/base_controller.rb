require 'rexml/document'
include REXML
class BaseController < ApplicationController
  def show
  end

  def setupvt(element)
    vt= VesselType.new
    vt.name=element.children[2].text.to_s.capitalize
    vt.code=element.children[3].text
    vt.save
  end

  def findVal(el,name)
    puts name
     vn= XPath.first(el,"./field[@name='%s']" %name)
    vn.text.to_s
  end

  def setupVessel(el)
    v= Vessel.new
    v.name=findVal(el,"name").capitalize
    v.beam=findVal el,"beam"
    v.calls=findVal el,"callsign"
    v.cap1 =findVal el,"cap1"
    v.contact_info=findVal el,"communic"
    v.draft=findVal el,"draft"
    v.dw=findVal el,"dw"
    v.flag=findVal el,"flag"
    v.gross_tonnage=findVal el,"gt"
    v.loa=findVal el,"loa"
    #v.max_draft=findVal el,"max_draft"
    v.net_tonnage=findVal el,"nt"
    v.paxcap=findVal el,"paxcap"
    v.owner_id=findVal el,"owner"
    v.vesel_type=findVal el,"type"
    v.save
    #<row><field name="id">905</field><field name="del">A</field><field name="name">DELPHIN</field><field name="flag">16</field><field name="owner">8512</field><field name="loa">157</field><field name="length">141.8</field><field name="beam">21.8</field><field name="dw">2860</field><field name="draft">6.2</field><field name="gt">16214</field><field name="nt">5865</field><field name="cap1">0</field><field name="paxcap">0</field><field name="icecl"></field><field name="callsign">9HVI4</field><field name="communic">+31703434543</field><field name="type">8</field><field name="depth">13.7</field><field name="fwa">0</field><field name="sbt">0</field><field name="not1"></field><field name="not2"></field><field name="cert">Nassau 91110</field><field name="incin">0</field><field name="imo">7347536</field></row>

  end

  def setupPort (el)
    port = Port.new
    #<row><field name="id">1</field><field name="del">A</field><field name="name"></field><field name="country">1</field><field name="code"></field><field name="flag">0</field><field name="tips"></field><field name="descr"></field><field name="pict"><![CDATA[System.Byte[]]]></field></row>
    port.name =findVal(el,"name").capitalize
    port.code=findVal(el,"code")
    port.country=Country.find(findVal(el,"country")).id
    port.description=findVal(el,"descr")
    port.flag=findVal(el,"flag")
    port.tips=findVal(el,"tips")
    port.save
  end

  def import
    file= File.new("c:/Users/denis/Desktop/port.xml")
    xm1=Document.new file
    rr="Done"
    XPath.each( xm1, "//row") {
            |element|
      setupPort element
    }
    response :text=> rr
  end
end
