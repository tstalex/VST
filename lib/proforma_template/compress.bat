set cmd= "C:\Program Files\7-Zip\7z.exe" 
rm %~dp0\Proforma.odt
%cmd% a -tzip %~dp0\Proforma.odt %~dp0\Proforma\*.* -r