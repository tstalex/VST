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

  def findVal(el, name)
    puts name
    vn= XPath.first(el, "./field[@name='%s']" %name)
    vn.text.to_s
  end

  def setupVessel(el)
    v= Vessel.new
    v.name=findVal(el, "name").capitalize
    v.beam=findVal el, "beam"
    v.calls=findVal el, "callsign"
    v.cap1 =findVal el, "cap1"
    v.contact_info=findVal el, "communic"
    v.draft=findVal el, "draft"
    v.dw=findVal el, "dw"
    v.flag=findVal el, "flag"
    v.gross_tonnage=findVal el, "gt"
    v.loa=findVal el, "loa"
    #v.max_draft=findVal el,"max_draft"
    v.net_tonnage=findVal el, "nt"
    v.paxcap=findVal el, "paxcap"
    v.owner_id=findVal el, "owner"
    v.vesel_type=findVal el, "type"
    v.save
    #<row><field name="id">905</field><field name="del">A</field><field name="name">DELPHIN</field><field name="flag">16</field><field name="owner">8512</field><field name="loa">157</field><field name="length">141.8</field><field name="beam">21.8</field><field name="dw">2860</field><field name="draft">6.2</field><field name="gt">16214</field><field name="nt">5865</field><field name="cap1">0</field><field name="paxcap">0</field><field name="icecl"></field><field name="callsign">9HVI4</field><field name="communic">+31703434543</field><field name="type">8</field><field name="depth">13.7</field><field name="fwa">0</field><field name="sbt">0</field><field name="not1"></field><field name="not2"></field><field name="cert">Nassau 91110</field><field name="incin">0</field><field name="imo">7347536</field></row>

  end

  def setupPort (el)
    port = Port.new
    #<row><field name="id">1</field><field name="del">A</field><field name="name"></field><field name="country">1</field><field name="code"></field><field name="flag">0</field><field name="tips"></field><field name="descr"></field><field name="pict"><![CDATA[System.Byte[]]]></field></row>
    port.name =findVal(el, "name").capitalize
    port.code=findVal(el, "code")
    port.country=Country.find(findVal(el, "country")).id
    port.description=findVal(el, "descr")
    port.flag=findVal(el, "flag")
    port.tips=findVal(el, "tips")
    port.save
  end


  def setuplight (element)
    td=Array.new
    tarifs= Array.new
    tds= XPath.each (element){|tdel|
      td.push tdel
    }
    diap= td[0].text.strip
    tarifs.push td[1].text.gsub(" ","")  #light
    tarifs.push td[2].text.gsub(" ","") #navi

    if diap.index("ule").nil?
      arr= diap.split("-")
      gt_f=(arr[0]=="") ? 0 : arr[0].strip.gsub(" ","").to_i
      gt_t=arr[1].strip.gsub(" ","").to_i
    else
      arr= diap.split("ule ")
      gt_f=arr[1].strip.gsub(" ","").to_i
      gt_t=99999999
    end



      pc= LightNaviTarif.new
      pc.gt_from=gt_f
      pc.gt_to=gt_t
      pc.lighthouse= tarifs[0].to_d
      pc.navi= tarifs[1].to_d     
      pc.save

  end


  def setupDiapason(el)
    td=Array.new
    tarifs= Array.new
    tds= XPath.each (el){ |tdel|
      td.push tdel
    }
    diap= td[0].text.strip
    tarifs.push td[1].text.strip
    tarifs.push td[2].text.strip
    tarifs.push td[3].text.strip
    tarifs.push td[4].text.strip
    tarifs.push td[5].text.strip
    tarifs.push td[6].text.strip

    if diap.index("ule").nil?
      arr= diap.split("kuni ")
      gt_f=(arr[0]=="") ? 0 : arr[0].to_i
      gt_t=arr[1].to_i
    else
      arr= diap.split("ule ")
      gt_f=arr[1].to_i
      gt_t=99999999
    end

    for i in 0..tarifs.length-1
      pc= PilotageCharge.new
      pc.diapason_id=i+1
      pc.gt_from=gt_f
      pc.gt_to=gt_t
      pc.tarif= tarifs[i]
      pc.save
    end

  end

  def import
    PilotageCharge.delete_all
    file= File.new("c:/Users/denis/Desktop/lightandnavi.xml")
    xm1=Document.new file
    rr="Done"
    XPath.each(xm1, "//tr") {
            |element|
      setuplight(element)
    }
    response :html => rr
  end
end
