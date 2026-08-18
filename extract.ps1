$filePath = 'C:\Users\Mr Duong\Downloads\03 CHUONG TRINH BH Q3 2026 Sua lai (1).doc'
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open($filePath)
$text = $doc.Content.Text
Set-Content -Path 'd:\webbaogia\doc_text.txt' -Value $text -Encoding UTF8

# Also save tables as html if possible
$htmlPath = 'd:\webbaogia\doc_html.html'
$doc.SaveAs([ref]$htmlPath, [ref]8) # 8 = wdFormatHTML

$doc.Close()
$word.Quit()
Write-Output "Done extracting Word doc"
