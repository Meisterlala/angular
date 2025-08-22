#!/usr/bin/env pwsh

# Docker Build and Push Script for Angular Portfolio
# Simple script with multi-architecture build support

param(
    [string]$Tag = "latest",
    [string]$Platforms = "linux/amd64,linux/arm64"
)

$REGISTRY = "registry.meisterlala.dev"
$IMAGE_NAME = "angular-portfolio"
$FULL_IMAGE_NAME = "$REGISTRY/${IMAGE_NAME}:$Tag"

Write-Host "Building and pushing: $FULL_IMAGE_NAME" -ForegroundColor Cyan

Write-Host "Building for architectures ($Platforms)..." -ForegroundColor Yellow

# Create and use buildx builder if it doesn't exist
docker buildx create --name multiarch --use --driver docker-container --bootstrap 2>$null

# Build and push for multiple architectures
docker buildx build --platform $Platforms -t $FULL_IMAGE_NAME --push .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Successfully built and pushed: $FULL_IMAGE_NAME" -ForegroundColor Green
