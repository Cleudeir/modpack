@echo off
setlocal

REM Configurar o repositório remoto e o branch
set REPO_URL=https://github.com/cliffpk3/modpack
set BRANCH=main

REM Diretório do repositório local (diretório onde este script está localizado)
set LOCAL_REPO_DIR=%~dp0

REM Arquivos a serem ignorados no pull (adicione mais arquivos separados por espaço)
set IGNORED_FILES=options.txt optionsshaders.txt %~nx0

REM Ir para o diretório do repositório local
cd /d %LOCAL_REPO_DIR%

REM Verificar se é um repositório Git
if not exist ".git" (
    echo Este não é um repositório Git. Inicializando um novo repositório.
    git init
    git remote add origin %REPO_URL%
    git fetch origin
    git checkout -t origin/%BRANCH%
) else (
    REM Fazer stash das mudanças locais
    git stash -u

    REM Fazer pull do repositório remoto
    git pull %REPO_URL% %BRANCH%

    REM Recuperar as mudanças do stash
    git stash pop

    REM Restaurar os arquivos ignorados
    for %%f in (%IGNORED_FILES%) do (
        REM Verificar se o arquivo estava no stash e restaurá-lo
        git checkout stash@{0} -- %%f
    )
)

echo Processo completo, exceto arquivos ignorados.

endlocal
pause