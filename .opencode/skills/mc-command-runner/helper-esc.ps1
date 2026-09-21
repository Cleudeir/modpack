$ws = New-Object -ComObject WScript.Shell
$ws.AppActivate('Minecraft')
Start-Sleep -Milliseconds 300
$ws.SendKeys('{ESC}')
Start-Sleep -Milliseconds 500
$ws.SendKeys('{ESC}')
Write-Output "SENT_ESC x2 via WScript.Shell"
