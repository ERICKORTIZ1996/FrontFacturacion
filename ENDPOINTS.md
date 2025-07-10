# Documentación de Endpoints

> **Ejemplo de XML firmado:** [Ver archivo base XMLFIRMADO.xml](ejemplos/XMLFIRMADO.xml)

## Endpoints de Facturación Electrónica

### 1. `POST /crearXML`

- **Descripción**: Crea un documento XML de factura a partir de los datos proporcionados.
- **Ruta Completa**: `[BASE_URL]/crearXML`
- **Body (JSON)**:
  ```json
    {
    "ambiente": "Pruebas", // Cambiado a "Pruebas" o "Produccion" según el diccionario CodigoAmbiente
    "tipoEmision": "EmisionNormal", // Cambiado a un valor que coincida con las claves de TipoEmision
    "razonSocial": "ORTIZ MENDOZA ERICK ALEXANDER",
    "ruc": "1725150500001",
    "codDoc": "Factura", // Cambiado a un valor que coincida con las claves de CodigoTipoComprobante
    "estab": "001",
    "ptoEmi": "001",
    //"secuencial": "000000041",
    "dirMatriz": "PICHINCHA / QUITO / COCHAPAMBA / N54 LT-20 Y N54A",
    "dirEstablecimiento": "PICHINCHA / QUITO / COCHAPAMBA / N54 LT-20 Y N54A",
    "obligadoContabilidad": "NO",
    "tipoIdentificacionComprador": "RUC", // Cambiado a un valor que coincida con las claves de TipoIdentificacion
    "razonSocialComprador": "SIMBA SIMBAÑA KEVIN FABIAN",
    "identificacionComprador": "1716368632001",
    "direccionComprador":"PICHINCHA / QUITO / QUITO DISTRITO METROPOLITANO / JORGE PIEDRA OE12-297 Y SN",
    "totalSinImpuestos": 100.00,
    "totalDescuento": 0.00,
    "totalConImpuestos": [
        {
            "codigo": "IVA", // Cambiado a un valor que coincida con las claves de ImpuestosCod
            "codigoPorcentaje": "15%", // Cambiado a un valor que coincida con las claves de TarifaIVA
            "baseImponible": 100.00,
            "tarifa": 15,
            "valor": 15.00,
            "valorDevolucionIva": 0.00
        }
    ],
    "propina": 0.00,
    "importeTotal": 115.00,
    "moneda": "DOLAR",
    "pagos": [
        {
            "formaPago": "Efectivo", // Cambiado a un valor que coincida con las claves de FormasPago
            "total": 115.00
        }
    ],
    "detalles": [
        {
            "codigoPrincipal": "001",
            "descripcion": "Servicios generales",
            "cantidad": 1,
            "precioUnitario": 100.00,
            "descuento": 0.00,
            "precioTotalSinImpuesto": 100.00,
            "impuestos": [
                {
                    "codigo": "IVA", // Cambiado a un valor que coincida con las claves de ImpuestosCod
                    "codigoPorcentaje": "15%", // Cambiado a un valor que coincida con las claves de TarifaIVA
                    "tarifa": 15,
                    "baseImponible": 100.00,
                    "valor": 15.00
                }
            ]
        }
    ]
  }```
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "mensaje": "XML creado exitosamente",
      "resultado": {
        /* Datos del XML creado */
      }
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Mensaje de error"
    }
    ```

### 2. `POST /firmarXML2`

- **Descripción**: Firma un documento XML existente utilizando un método de firmado específico (versión 2).
- **Ruta Completa**: `[BASE_URL]/firmarXML2`
- **Body (JSON)**:
  ```json
  {
    "nombreArchivo": "nombre_del_archivo_xml",
    "password": "su_password_pfx"
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "mensaje": "XML firmado exitosamente",
      "rutaArchivoFirmado": "/ruta/al/archivo_firmado.xml",
      "requestId": "uuid-del-request"
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Mensaje de error"
    }
    ```

### 3. `POST /firmarXML3`

- **Descripción**: Firma un documento XML existente utilizando otro método de firmado (versión 3).
- **Ruta Completa**: `[BASE_URL]/firmarXML3`
- **Body (JSON)**:
  ```json
  {
    "nombreArchivo": "SIMBA_SIMBAÑA_KEVIN_FABIAN_000000041",
    "password": "647435Ss"  
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "mensaje": "XML firmado exitosamente",
      // ... otros datos del resultado
      "requestId": "uuid-del-request"
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Mensaje de error"
    }
    ```

### 4. `POST /ruc`

- **Descripción**: Consulta los datos de un cliente (razón social, dirección, etc.) a partir de su número de RUC.
- **Ruta Completa**: `[BASE_URL]/ruc`
- **Body (JSON)**:
  ```json
  {
    "ruc": "1234567890123" // RUC de 13 dígitos
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "datos": {
        /* Datos del cliente */
      },
      "requestId": "uuid-del-request"
    }
    ```
  - `400 Bad Request`:
    ```json
    {
      "success": false,
      "mensaje": "RUC inválido",
      "requestId": "uuid-del-request"
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Mensaje de error"
    }
    ```

### 5. `POST /validar`

- **Descripción**: Valida la estructura y el contenido de un archivo XML de factura.
- **Ruta Completa**: `[BASE_URL]/validar`
- **Body (JSON)**:
  ```json
  {
    "nombreArchivo": "SIMBA_SIMBAÑA_KEVIN_FABIAN_000000041"
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      // ... resultado de la validación
      "requestId": "uuid-del-request"
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Mensaje de error"
    }
    ```

### 6. `POST /verificarFactura`

- **Descripción**: Verifica el estado de una factura utilizando su clave de acceso.
- **Ruta Completa**: `[BASE_URL]/verificarFactura`
- **Body (JSON)**:
  ```json
  {
    "nombreArchivo": "SIMBA_SIMBAÑA_KEVIN_FABIAN_000000041",
    "claveAccesoComprobante": "0307202501172515050000110010010000000411234567811"
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "success": true,
      // ... resultado de la verificación
      "requestId": "uuid-del-request"
    }
    ```
  - `400 Bad Request`:
    ```json
    {
      "success": false,
      "mensaje": "La clave de acceso debe tener 49 dígitos",
      "requestId": "uuid-del-request"
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Mensaje de error",
      "requestId": "uuid-del-request"
    }
    ```

### 7. `GET /generar/:nombreArchivo}`

- **Descripción**: Genera un documento PDF a partir de un archivo XML de factura previamente firmado.
- **Ruta Completa**: `[BASE_URL]/generar/SIMBA_SIMBAÑA_KEVIN_FABIAN_000000037`
- **Parámetros de Ruta**:
  - `nombreArchivo`: El nombre del archivo XML firmado (sin la extensión `.xml`).
- **Respuestas**:
  - `200 OK`: Retorna el PDF como `application/pdf`.
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "error": "Mensaje de error al generar PDF"
    }
    ```

### 8. `GET /health`

- **Descripción**: Endpoint para verificar el estado de salud de la API.
- **Ruta Completa**: `[BASE_URL]/health`
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "status": "OK",
      "timestamp": "Fecha y hora actual",
      "uptime": "Tiempo de actividad del proceso en segundos",
      "requestId": "uuid-del-request"
    }
    ```

### 9. `GET /version`

- **Descripción**: Obtiene la información de la versión de la aplicación y del entorno de Node.js.
- **Ruta Completa**: `[BASE_URL]/version`
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "version": "Versión del paquete npm (ej. 1.0.0)",
      "node": "Versión de Node.js",
      "environment": "Entorno (ej. development, production)",
      "requestId": "uuid-del-request"
    }
    ```

### 10. `GET /estadisticas`

- **Descripción**: Devuelve estadísticas globales de las facturas electrónicas (total, por estado, por ambiente, suma y promedio de importes).
- **Ruta Completa**: `[BASE_URL]/estadisticas`
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "total": 100,
      "porEstado": {
        "PENDIENTE": 10,
        "FIRMADA": 20,
        "AUTORIZADA": 60,
        "RECHAZADA": 10
      },
      "porAmbiente": {
        "pruebas": 80,
        "produccion": 20
      },
      "totalImporte": 12345.67,
      "promedioImporte": 123.45
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Mensaje de error"
    }
    ```

### 11. `GET /facturas/:nombreArchivo/logs`

- **Descripción**: Devuelve todos los logs asociados a una factura específica, identificada por su `nombreArchivo`.
- **Ruta Completa**: `[BASE_URL]/facturas/:nombreArchivo/logs`
- **Parámetros de Ruta**:
  - `nombreArchivo`: El nombre del archivo XML de la factura (sin extensión).
- **Respuestas**:
  - `200 OK`:
    ```json
    [
      {
        "id": "uuid-log-1",
        "operacion": "CREAR",
        "estado": "EXITOSO",
        "mensaje": "Factura creada",
        "timestamp": "2024-07-01T12:00:00.000Z"
      },
      {
        "id": "uuid-log-2",
        "operacion": "AUTORIZAR",
        "estado": "EXITOSO",
        "mensaje": "Factura autorizada",
        "timestamp": "2024-07-01T12:05:00.000Z"
      }
    ]
    ```
  - `404 Not Found`:
    ```json
    {
      "success": false,
      "mensaje": "Factura no encontrada"
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Mensaje de error"
    }
    ```

---

## Clientes

### `GET /api/clientes`
