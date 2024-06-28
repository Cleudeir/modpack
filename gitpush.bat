@echo off
:: Obter a data atual no formato YYYY-MM-DD
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (
    set day=%%a
    set month=%%b
    set year=%%c
)
set currentDate=%year%-%month%-%day%

:: Adicionar todas as mudanças
git add .

:: Fazer o commit com a mensagem de data atual
git commit -m "%currentDate%"

:: Empurrar as mudanças para o repositório remoto
git push