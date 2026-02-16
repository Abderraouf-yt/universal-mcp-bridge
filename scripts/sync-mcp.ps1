# MCP Bidirectional Sync Script v1.2 (Created by Gemini CLI)
$masterPath = 'C:\Users	oumi\.mcp_master.json'
$paths = @(
    'C:\Users	oumi\.gemini\settings.json',
    'C:\Users	oumi\.gemini\antigravity\mcp_config.json',
    'C:\Users	oumi\AppData\Roaming\Antigravity\User\globalStorageooveterinaryinc.roo-cline\settings\mcp_settings.json'
)

# Initialize master object
if (Test-Path -LiteralPath $masterPath) {
    $allServers = (Get-Content -LiteralPath $masterPath | ConvertFrom-Json).mcpServers
} else {
    $allServers = @{}
}

Write-Host "🔍 Scanning for new MCP servers..." -ForegroundColor Cyan
foreach ($path in $paths) {
    if (Test-Path -LiteralPath $path) {
        try {
            $content = Get-Content -LiteralPath $path | ConvertFrom-Json
            $servers = $content.mcpServers
            if ($null -ne $servers) {
                foreach ($name in $servers.PSObject.Properties.Name) {
                    if (-not $allServers.PSObject.Properties.Name.Contains($name)) {
                        Write-Host "✨ Found new server '$name' in $path" -ForegroundColor Yellow
                        $allServers | Add-Member -NotePropertyName $name -NotePropertyValue $servers.$name
                    }
                }
            }
        } catch {
            Write-Host "⚠️ Warning: Could not parse $path" -ForegroundColor Gray
        }
    }
}

# 1. Update Master File
$finalConfig = [PSCustomObject]@{ mcpServers = $allServers }
$finalConfig | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $masterPath
Write-Host "✅ Master configuration updated." -ForegroundColor Green

# 2. Distribute to all tools
foreach ($path in $paths) {
    if (Test-Path -LiteralPath $path) {
        $toolContent = Get-Content -LiteralPath $path | ConvertFrom-Json
        $toolContent.mcpServers = $allServers
        $toolContent | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $path
        Write-Host "🚀 Pushed to $path" -ForegroundColor Gray
    }
}

# 3. Status Check (Ping Local Servers)
Write-Host "`n📊 System Health Check:" -ForegroundColor Cyan
foreach ($name in $allServers.PSObject.Properties.Name) {
    $server = $allServers.$name
    if ($server.command -eq "node" -and $server.args[0] -like "*index.js") {
        $path = $server.args[0]
        if (Test-Path -LiteralPath $path) {
            Write-Host "🟢 $name (Ready: $path)" -ForegroundColor Green
        } else {
            Write-Host "🔴 $name (Missing Path: $path)" -ForegroundColor Red
        }
    } else {
        Write-Host "⚪ $name (External/Npx Tool)" -ForegroundColor Gray
    }
}

Write-Host "`nSynchronization complete! Restart your tools to apply changes." -ForegroundColor Green
