param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('valid', 'drift', 'replay')]
    [string]$Scenario,
    [switch]$Reset
)

$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot
$target = Join-Path $root 'target.txt'
$receipts = Join-Path $root 'receipts.jsonl'
$usedReleases = Join-Path $root '.used_releases.json'

function Get-NowIso {
    return [DateTimeOffset]::UtcNow.ToString('o')
}

function Get-TargetHash {
    $fileHash = Get-FileHash -Path $target -Algorithm SHA256
    if (-not $fileHash -or -not $fileHash.Hash) {
        throw "Could not compute target hash."
    }
    return [string]$fileHash.Hash
}

function Reset-Demo {
    Set-Content -Path $target -Value "base-state`n" -NoNewline
    if (Test-Path $receipts) { Remove-Item -LiteralPath $receipts -Force }
    if (Test-Path $usedReleases) { Remove-Item -LiteralPath $usedReleases -Force }
}

function Read-UsedReleases {
    if (-not (Test-Path $usedReleases)) { return @() }
    $raw = Get-Content -LiteralPath $usedReleases -Raw
    if ([string]::IsNullOrWhiteSpace($raw)) { return @() }
    $items = $raw | ConvertFrom-Json
    if ($null -eq $items) { return @() }
    return @($items)
}

function Write-UsedReleases([string[]]$items) {
    $arr = @($items | Sort-Object -Unique)
    $arr | ConvertTo-Json | Set-Content -LiteralPath $usedReleases
}

function New-Release([string]$releaseId, [string]$scopePath) {
    return @{
        release_id = $releaseId
        approved_at = Get-NowIso
        approved_target_hash = Get-TargetHash
        scope_path = $scopePath
        operation = 'append_line'
    }
}

function Recompute-Legitimacy($release, [string[]]$used) {
    if ($used -contains $release.release_id) {
        return @('DENY', 'replay')
    }

    $requestedPath = [System.IO.Path]::GetFullPath((Join-Path $root $release.scope_path))
    $allowedPath = [System.IO.Path]::GetFullPath($target)
    if ($requestedPath -ne $allowedPath) {
        return @('DENY', 'scope_escalation_or_path_violation')
    }

    $currentHash = Get-TargetHash
    if ($currentHash -ne $release.approved_target_hash) {
        return @('DENY', 'repository_drift')
    }

    return @('ALLOW', 'current_state_matches_approval')
}

function Append-Receipt($release, [string]$decision, [string]$reason) {
    $receipt = @{
        ts = Get-NowIso
        release_id = $release.release_id
        decision = $decision
        reason = $reason
    }
    Add-Content -LiteralPath $receipts -Value ($receipt | ConvertTo-Json -Compress)
}

function Execute-Release($release, [string[]]$used) {
    $result = Recompute-Legitimacy -release $release -used $used
    $decision = $result[0]
    $reason = $result[1]

    if ($decision -eq 'ALLOW') {
        Add-Content -LiteralPath $target -Value 'mutation-applied'
        $updated = @($used + $release.release_id)
        Write-UsedReleases -items $updated
    }

    Append-Receipt -release $release -decision $decision -reason $reason
    return @($decision, $reason)
}

if ($Reset) {
    Reset-Demo
}

if (-not (Test-Path $target)) {
    Set-Content -Path $target -Value "base-state`n" -NoNewline
}

switch ($Scenario) {
    'valid' {
        $used = Read-UsedReleases
        $release = New-Release -releaseId 'release-valid-001' -scopePath 'target.txt'
        $result = Execute-Release -release $release -used $used
        Write-Output ("valid: {0} ({1})" -f $result[0], $result[1])
    }
    'drift' {
        $used = Read-UsedReleases
        $release = New-Release -releaseId 'release-drift-001' -scopePath 'target.txt'
        Add-Content -LiteralPath $target -Value 'external-change'
        $result = Execute-Release -release $release -used $used
        Write-Output ("drift: {0} ({1})" -f $result[0], $result[1])
    }
    'replay' {
        $used = Read-UsedReleases
        $release = New-Release -releaseId 'release-replay-001' -scopePath 'target.txt'

        $first = Execute-Release -release $release -used $used
        $secondUsed = Read-UsedReleases
        $second = Execute-Release -release $release -used $secondUsed

        Write-Output ("replay-first: {0} ({1})" -f $first[0], $first[1])
        Write-Output ("replay-second: {0} ({1})" -f $second[0], $second[1])
    }
}
