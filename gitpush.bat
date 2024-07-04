@echo off
setlocal enabledelayedexpansion

:: Obter a data atual no formato YYYY-MM-DD
for /f "tokens=1-3 delims=/- " %%a in ('date /t') do (
    set year=%%c
    set month=%%a
    set day=%%b
)
:: Obter a hora atual no formato HH:MM
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set hour=%%a
    set minute=%%b
)
set currentDateTime=%year%-%month%-%day% %hour%:%minute%

:: Obter o diretório atual
set "currentDir=%cd%"

:: Procurar por arquivos maiores que 50MB e adicioná-los ao .gitignore
echo Procurando por arquivos maiores que 50MB...
(for /r %%I in (*) do (
    set "size=%%~zI"
    if !size! gtr 52428800 (
        set "relativePath=%%I"
        set "relativePath=!relativePath:%currentDir%\=!"
        :: Verificar se o caminho não contém .git
        echo !relativePath! | findstr /v /i ".git" >nul
        if !errorlevel! equ 0 (
            echo !relativePath!>>.gitignore
        )
    )
)) >nul

:: Remover duplicatas e ordenar .gitignore usando PowerShell
powershell -command "Get-Content .gitignore | Sort-Object | Get-Unique | Set-Content .gitignore"

:: Commit e Push do GitIgnore
git add .gitignore
git commit -m "GitIgnore %currentDateTime%"
git push

:: Adicionar todas as mudanças
git add .

:: Fazer o commit com a mensagem de data e hora atual
git commit -m "%currentDateTime%"

:: Empurrar as mudanças para o repositório remoto
git push

pause