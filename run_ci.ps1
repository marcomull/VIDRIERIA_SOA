$ErrorActionPreference = "Stop"

$CollectionFile = "Vidrieria_Tests_Final.json"
$TimeoutSeconds = 180

Write-Host 'INICIANDO PIPELINE DE INTEGRACIÓN CONTINUA (CI)'

Write-Host '1 Limpiando el entorno anterior'
docker-compose down

Write-Host '2 Reconstruyendo imágenes (Incluyendo código Java actualizado)'
docker-compose build

Write-Host '3 Levantando la arquitectura y esperando a que los servicios inicien'
docker-compose up -d --wait --timeout $TimeoutSeconds


Write-Host "4. Ejecutando Pruebas Automatizadas con Newman..."

# 300 segundos para asegurar que Eureka y Gateway se sincronicen
Write-Host "Esperando 300 segundos para la inicialización completa de Spring Boot y Eureka..."
Start-Sleep -Seconds 300

# Ejecutar Newman
newman run $CollectionFile -e ci_env.json --reporters cli --insecure --timeout-request 15000 


if ($LASTEXITCODE -ne 0) {
    Write-Host 'FALLO DE CI: Una o mas pruebas de Newman fallaron. Revisa el reporte'
    exit 1
}

Write-Host '--------------------------------------------------------'
Write-Host 'Arquitectura esta funcionando y las pruebas pasaron'
Write-Host '--------------------------------------------------------'
