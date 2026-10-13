param([int]$Port = 3000)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$taskRuntime = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
if (Test-Path -LiteralPath $taskRuntime) { $taskNode = $taskRuntime } else { $taskNode = (Get-Command node -ErrorAction Stop).Source }
$taskNext = Join-Path $PSScriptRoot 'node_modules/next/dist/bin/next'
if (-not (Test-Path -LiteralPath $taskNext)) { throw 'Instala las dependencias con npm install antes de iniciar.' }
& $taskNode $taskNext dev --webpack --hostname 127.0.0.1 --port $Port
exit $LASTEXITCODE
