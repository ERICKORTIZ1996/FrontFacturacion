# Documentación de la API de Facturación

Este proyecto implementa una API para la gestión de facturas electrónicas, incluyendo la creación, firmado, validación y verificación de documentos XML, así como la generación de PDFs y la consulta de datos de clientes.

## Endpoints

### 1. `POST /crearXML`

*   **Descripción**: Crea un documento XML de factura a partir de los datos proporcionados.
*   **Ruta Completa**: `[BASE_URL]/crearXML`
*   **Body (JSON)**:
    ```json
    {
        "infoTributaria": {
            "ambiente": "1", // 1: Pruebas, 2: Producción
            "tipoEmision": "1", // 1: Emisión normal
            "razonSocial": "NOMBRE DE LA EMPRESA",
            "nombreComercial": "NOMBRE COMERCIAL",
            "ruc": "1234567890123",
            "claveAcceso": "AUTO_GENERADA_O_PROPORCIONADA",
            "codDoc": "01", // 01: Factura
            "estab": "001",
            "ptoEmi": "001",
            "secuencial": "000000001",
            "dirMatriz": "Dirección Matriz"
        },
        "infoFactura": {
            "fechaEmision": "DD/MM/YYYY",
            "dirEstablecimiento": "Dirección Sucursal",
            "obligadoContabilidad": "NO",
            "tipoIdentificacionComprador": "05", // 04: RUC, 05: Cédula, 06: Pasaporte, 07: Consumidor Final, 08: Identificación del exterior
            "razonSocialComprador": "NOMBRE DEL CLIENTE",
            "identificacionComprador": "1234567890",
            "totalSinImpuestos": 0.00,
            "totalDescuento": 0.00,
            "propina": 0.00,
            "importeTotal": 0.00,
            "moneda": "DOLAR",
            "pagos": {
                "pago": {
                    "formaPago": "01", // 01: Sin utilización del sistema financiero
                    "total": 0.00,
                    "plazo": "0",
                    "unidadTiempo": "dias"
                }
            }
        },
        "detalles": {
            "detalle": [
                {
                    "codigoPrincipal": "001",
                    "descripcion": "Descripción del producto",
                    "cantidad": 1.00,
                    "precioUnitario": 10.00,
                    "descuento": 0.00,
                    "precioTotalSinImpuesto": 10.00,
                    "impuestos": {
                        "impuesto": {
                            "codigo": "2", // 2: IVA
                            "codigoPorcentaje": "0", // 0: 0%, 2: 12%, 3: 14%, 6: No Objeto IVA, 7: Exento IVA
                            "tarifa": 0.00,
                            "baseImponible": 10.00,
                            "valor": 0.00
                        }
                    }
                }
            ]
        }
    }
    ```
*   **Respuestas**:
    *   `200 OK`:
        ```json
        {
            "success": true,
            "mensaje": "XML creado exitosamente",
            "resultado": { /* Datos del XML creado */ }
        }
        ```
    *   `500 Internal Server Error`:
        ```json
        {
            "success": false,
            "mensaje": "Mensaje de error"
        }
        ```

### 2. `POST /firmarXML2`

*   **Descripción**: Firma un documento XML existente utilizando un método de firmado específico (versión 2).
*   **Ruta Completa**: `[BASE_URL]/firmarXML2`
*   **Body (JSON)**:
    ```json
    {
        "nombreArchivo": "nombre_del_archivo_xml",
        "password": "su_password_pfx"
    }
    ```
*   **Respuestas**:
    *   `200 OK`:
        ```json
        {
            "success": true,
            "mensaje": "XML firmado exitosamente",
            "rutaArchivoFirmado": "/ruta/al/archivo_firmado.xml",
            "requestId": "uuid-del-request"
        }
        ```
    *   `500 Internal Server Error`:
        ```json
        {
            "success": false,
            "mensaje": "Mensaje de error"
        }
        ```

### 3. `POST /firmarXML3`

*   **Descripción**: Firma un documento XML existente utilizando otro método de firmado (versión 3).
*   **Ruta Completa**: `[BASE_URL]/firmarXML3`
*   **Body (JSON)**:
    ```json
    {
        "nombreArchivo": "nombre_del_archivo_xml",
        "password": "su_password_pfx"
    }
    ```
*   **Respuestas**:
    *   `200 OK`:
        ```json
        {
            "success": true,
            "mensaje": "XML firmado exitosamente",
            // ... otros datos del resultado
            "requestId": "uuid-del-request"
        }
        ```
    *   `500 Internal Server Error`:
        ```json
        {
            "success": false,
            "mensaje": "Mensaje de error"
        }
        ```

### 4. `POST /ruc`

*   **Descripción**: Consulta los datos de un cliente (razón social, dirección, etc.) a partir de su número de RUC.
*   **Ruta Completa**: `[BASE_URL]/ruc`
*   **Body (JSON)**:
    ```json
    {
        "ruc": "1234567890123" // RUC de 13 dígitos
    }
    ```
*   **Respuestas**:
    *   `200 OK`:
        ```json
        {
            "success": true,
            "datos": { /* Datos del cliente */ },
            "requestId": "uuid-del-request"
        }
        ```
    *   `400 Bad Request`:
        ```json
        {
            "success": false,
            "mensaje": "RUC inválido",
            "requestId": "uuid-del-request"
        }
        ```
    *   `500 Internal Server Error`:
        ```json
        {
            "success": false,
            "mensaje": "Mensaje de error"
        }
        ```

### 5. `POST /validar`

*   **Descripción**: Valida la estructura y el contenido de un archivo XML de factura.
*   **Ruta Completa**: `[BASE_URL]/validar`
*   **Body (JSON)**:
    ```json
    {
        "nombreArchivo": "nombre_del_archivo_xml"
    }
    ```
*   **Respuestas**:
    *   `200 OK`:
        ```json
        {
            // ... resultado de la validación
            "requestId": "uuid-del-request"
        }
        ```
    *   `500 Internal Server Error`:
        ```json
        {
            "success": false,
            "mensaje": "Mensaje de error"
        }
        ```

### 6. `POST /verificarFactura`

*   **Descripción**: Verifica el estado de una factura utilizando su clave de acceso.
*   **Ruta Completa**: `[BASE_URL]/verificarFactura`
*   **Body (JSON)**:
    ```json
    {
        "claveAccesoComprobante": "1234567890123456789012345678901234567890123456789" // Clave de acceso de 49 dígitos
    }
    ```
*   **Respuestas**:
    *   `200 OK`:
        ```json
        {
            "success": true,
            // ... resultado de la verificación
            "requestId": "uuid-del-request"
        }
        ```
    *   `400 Bad Request`:
        ```json
        {
            "success": false,
            "mensaje": "La clave de acceso debe tener 49 dígitos",
            "requestId": "uuid-del-request"
        }
        ```
    *   `500 Internal Server Error`:
        ```json
        {
            "success": false,
            "mensaje": "Mensaje de error",
            "requestId": "uuid-del-request"
        }
        ```

### 7. `GET /generar/:nombreArchivo`

*   **Descripción**: Genera un documento PDF a partir de un archivo XML de factura previamente firmado.
*   **Ruta Completa**: `[BASE_URL]/generar/nombre_del_archivo_xml`
*   **Parámetros de Ruta**:
    *   `nombreArchivo`: El nombre del archivo XML firmado (sin la extensión `.xml`).
*   **Respuestas**:
    *   `200 OK`: Retorna el PDF como `application/pdf`.
    *   `500 Internal Server Error`:
        ```json
        {
            "success": false,
            "error": "Mensaje de error al generar PDF"
        }
        ```

### 8. `GET /health`

*   **Descripción**: Endpoint para verificar el estado de salud de la API.
*   **Ruta Completa**: `[BASE_URL]/health`
*   **Respuestas**:
    *   `200 OK`:
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

*   **Descripción**: Obtiene la información de la versión de la aplicación y del entorno de Node.js.
*   **Ruta Completa**: `[BASE_URL]/version`
*   **Respuestas**:
    *   `200 OK`:
        ```json
        {
            "success": true,
            "version": "Versión del paquete npm (ej. 1.0.0)",
            "node": "Versión de Node.js",
            "environment": "Entorno (ej. development, production)",
            "requestId": "uuid-del-request"
        }
        ``` 