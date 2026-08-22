# Installs the Design Lab pre-push gate into the local repo.
# Run once per clone:  pwsh -File scripts/install-hooks.ps1
$ErrorActionPreference = 'Stop'

$repoRoot = (git rev-parse --show-toplevel)
if ($LASTEXITCODE -ne 0) { throw "Not inside a git repository." }

$source = Join-Path $repoRoot 'scripts/hooks/pre-push'
$dest   = Join-Path $repoRoot '.git/hooks/pre-push'

if (-not (Test-Path $source)) { throw "Missing $source" }

Copy-Item -LiteralPath $source -Destination $dest -Force
Write-Host "Installed pre-push hook -> .git/hooks/pre-push"
