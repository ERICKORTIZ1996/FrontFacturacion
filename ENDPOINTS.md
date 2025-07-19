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

### X. `POST /notas-credito`

- **Descripción**: Genera, firma y envía una Nota de Crédito electrónica (total o parcial) asociada a una factura ya emitida, usando la clave de acceso de la factura original.
- **Ruta Completa**: `[BASE_URL]/notas-credito`
- **Body (JSON)**:
  - Para anulación total:
    ```json
    {
      "claveAcceso": "CLAVE_DE_ACCESO_FACTURA",
      "motivo": "Motivo de la nota de crédito"
    }
    ```
  - Para anulación parcial (solo algunos ítems):
    ```json
    {
      "claveAcceso": "CLAVE_DE_ACCESO_FACTURA",
      "motivo": "Motivo de la nota de crédito",
      "detalles": [
        {
          "codigoPrincipal": "P001",
          "descripcion": "Producto 1",
          "cantidad": 1,
          "precioUnitario": 10.00,
          "descuento": 0,
          "precioTotalSinImpuesto": 10.00,
          "impuestos": [
            {
              "codigo": "IVA",
              "codigoPorcentaje": "12%",
              "tarifa": 12,
              "baseImponible": 10.00,
              "valor": 1.20
            }
          ]
        }
      ]
    }
    ```
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "mensaje": "Nota de crédito generada y enviada al SRI",
      "notaCredito": { /* datos de la nota de crédito */ },
      "validacion": { /* respuesta de validación SRI */ },
      "autorizacion": { /* respuesta de autorización SRI */ }
    }
    ```
  - `404 Not Found`:
    ```json
    { "mensaje": "Factura no encontrada" }
    ```
  - `500 Internal Server Error`:
    ```json
    { "mensaje": "Error al crear nota de crédito", "error": "Mensaje de error" }
    ```

---

## Clientes

### `GET /api/clientes`

### WhatsApp: Envío de archivos y QR

#### 1. `GET /whatsapp/qr`
- **Descripción**: Devuelve el código QR para escanear y conectar el bot de WhatsApp.
- **Ruta Completa**: `[BASE_URL]/whatsapp/qr`
- **Respuesta**: Imagen PNG del QR (útil para mostrar en frontend o escanear desde el navegador).

#### 2. `POST /whatsapp/enviar-archivo`
- **Descripción**: Envía un archivo (PDF, XML, imagen, etc.) por WhatsApp al número indicado.
- **Ruta Completa**: `[BASE_URL]/whatsapp/enviar-archivo`
- **Body (JSON)**:
  ```json
  {
    "numero": "593999999999@c.us", // Número de WhatsApp en formato internacional
    "nombreArchivo": "SIMBA_SIMBAÑA_KEVIN_FABIAN_000000003.pdf", // Nombre del archivo
    "tipo": "pdf", // Puede ser "pdf", "xml" o "img"
    "mensaje": "Aquí está su factura" // Mensaje opcional
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    {
      "mensaje": "Archivo enviado por WhatsApp correctamente"
    }
    ```
  - `400 Bad Request`:
    ```json
    {
      "mensaje": "Tipo de archivo no soportado"
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "mensaje": "Error al enviar archivo por WhatsApp",
      "error": "Mensaje de error"
    }
    ```

---

## Endpoints de Notificaciones y Mensajería

### 1. Email (Gmail/Outlook)

#### `POST /email/enviar`
- **Descripción**: Envía un correo electrónico con adjuntos usando Gmail u Outlook.
- **Body (JSON) ejemplo para Gmail:**
  ```json
  {
    "to": "destinatario@gmail.com",
    "subject": "Factura electrónica",
    "text": "Adjunto su factura.",
    "attachments": [
      {
        "filename": "factura.pdf",
        "path": "./PDF/SIMBA_SIMBAÑA_KEVIN_FABIAN_000000003.pdf"
      }
    ],
    "service": "gmail",
    "user": "tuusuario@gmail.com",
    "pass": "tu_contraseña_o_app_password"
  }
  ```
- **Body (JSON) ejemplo para Outlook:**
  ```json
  {
    "to": "destinatario@outlook.com",
    "subject": "Factura electrónica",
    "text": "Adjunto su factura.",
    "attachments": [
      {
        "filename": "factura.pdf",
        "path": "./PDF/SIMBA_SIMBAÑA_KEVIN_FABIAN_000000003.pdf"
      }
    ],
    "service": "outlook",
    "user": "tuusuario@outlook.com",
    "pass": "tu_contraseña"
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    { "mensaje": "Email enviado correctamente" }
    ```
  - `500 Internal Server Error`:
    ```json
    { "mensaje": "Error al enviar email", "error": "Mensaje de error" }
    ```

---

### 2. Telegram

#### `POST /telegram/enviar-mensaje`
- **Descripción**: Envía un mensaje de texto a un chat o grupo de Telegram usando un bot.
- **Body (JSON) ejemplo:**
  ```json
  {
    "token": "TOKEN_DE_TU_BOT",
    "chatId": "123456789",
    "mensaje": "¡Hola! Aquí está su factura."
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    { "mensaje": "Mensaje enviado por Telegram correctamente" }
    ```
  - `500 Internal Server Error`:
    ```json
    { "mensaje": "Error al enviar mensaje por Telegram", "error": "Mensaje de error" }
    ```

#### `POST /telegram/enviar-archivo`
- **Descripción**: Envía un archivo (PDF, XML, imagen, etc.) a un chat o grupo de Telegram usando un bot.
- **Body (JSON) ejemplo:**
  ```json
  {
    "token": "TOKEN_DE_TU_BOT",
    "chatId": "123456789",
    "filePath": "./PDF/SIMBA_SIMBAÑA_KEVIN_FABIAN_000000003.pdf",
    "caption": "Adjunto su factura"
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    { "mensaje": "Archivo enviado por Telegram correctamente" }
    ```
  - `500 Internal Server Error`:
    ```json
    { "mensaje": "Error al enviar archivo por Telegram", "error": "Mensaje de error" }
    ```

---

### 3. FCM (Firebase Cloud Messaging)

#### `POST /fcm/enviar`
- **Descripción**: Envía una notificación push a un dispositivo móvil/web registrado en FCM.
- **Body (JSON) ejemplo:**
  ```json
  {
    "serverKey": "AAAAtuServerKeyDeFirebase",
    "token": "token_dispositivo_destino",
    "titulo": "Factura electrónica",
    "cuerpo": "Su factura ha sido generada.",
    "data": {
      "claveAcceso": "1234567890"
    }
  }
  ```
- **Respuestas**:
  - `200 OK`:
    ```json
    { "mensaje": "Notificación enviada por FCM correctamente", "resultado": {/* respuesta de FCM */} }
    ```
  - `500 Internal Server Error`:
    ```json
    { "mensaje": "Error al enviar notificación por FCM", "error": "Mensaje de error" }
    ```

---

## Endpoints de Reportes Tributarios y ATS

### 1. Reporte Tributario SRI (Formulario 104)

#### `GET /api/reportes/tributario?mes=MM&anio=YYYY[&formato=csv|html]`
- **Descripción**: Devuelve los datos agrupados necesarios para llenar el formulario 104 del SRI (declaración mensual de IVA).
- **Parámetros**:
  - `mes`: Mes en formato 2 dígitos (ej: 01, 02, ..., 12)
  - `anio`: Año en 4 dígitos (ej: 2024)
  - `formato` (opcional): `csv` para descargar como CSV, `html` para tabla HTML, o vacío para JSON.
- **Respuesta ejemplo (JSON)**:
  ```json
  {
    "baseImponible12": 1000.00,
    "baseImponible0": 500.00,
    "ventasExentas": 0.00,
    "ivaGenerado": 120.00,
    "retencionesIVA": 10.00,
    "retencionesRenta": 5.00,
    "numeroFacturas": 25,
    "totalVentas": 1500.00
  }
  ```
- **Respuesta ejemplo (CSV)**:
  - Usa el parámetro `formato=csv` y la respuesta será un archivo CSV descargable.
- **Respuesta ejemplo (HTML)**:
  - Usa el parámetro `formato=html` y la respuesta será una tabla HTML lista para copiar/pegar.

---

### 2. Reporte ATS (Anexo Transaccional Simplificado)

#### `GET /api/reportes/ats?mes=MM&anio=YYYY[&formato=csv|html]`
- **Descripción**: Devuelve un arreglo JSON (o CSV/HTML) con los datos requeridos por factura para el ATS.
- **Parámetros**:
  - `mes`: Mes en formato 2 dígitos (ej: 01, 02, ..., 12)
  - `anio`: Año en 4 dígitos (ej: 2024)
  - `formato` (opcional): `csv` para descargar como CSV, `html` para tabla HTML, o vacío para JSON.
- **Respuesta ejemplo (JSON)**:
  ```json
  {
    "mes": 6,
    "anio": 2025,
    "numeroComprobantes": 13,
    "totales": {
      "baseImponible": 1300,
      "iva": 168,
      "otrosImpuestos": 0,
      "totalImpuestos": 168
    },
    "registros": [
      {
        "tipoComprobante": "01",
        "numeroComprobante": "001-001-000000001",
        "fechaEmision": "28/06/2025",
        "identificacionCliente": "1716368632001",
        "razonSocialCliente": "SIMBA SIMBAÑA KEVIN FABIAN",
        "baseImponible": 100,
        "codigoImpuesto": "2",
        "codigoPorcentaje": "2",
        "valorImpuesto": 12
      }
      // ... más registros ...
    ]
  }
  ```
- **Respuesta ejemplo (CSV)**:
  - Usa el parámetro `formato=csv` y la respuesta será un archivo CSV descargable.
- **Respuesta ejemplo (HTML)**:
  - Usa el parámetro `formato=html` y la respuesta será una tabla HTML lista para copiar/pegar.

### X. `POST /empresas`

- **Descripción**: Crea una nueva empresa en el sistema junto con su sucursal y punto de emisión.
- **Ruta Completa**: `[BASE_URL]/empresas`
- **Body (JSON)**:
  ```json
  {
    "ruc": "1725150500001",
    "razonSocial": "ORTIZ MENDOZA ERICK ALEXANDER",
    "dirMatriz": "PICHINCHA / QUITO / COCHAPAMBA / N54 LT-20 Y N54A",
    "obligadoContabilidad": "NO",
    "sucursal": {
      "estab": "001",
      "nombre": "Sucursal Matriz",
      "dirEstablecimiento": "PICHINCHA / QUITO / COCHAPAMBA / N54 LT-20 Y N54A"
    },
    "puntoEmision": {
      "ptoEmi": "001",
      "secuencialActual": 1
    }
  }
  ```
- **Validaciones**:
  - `ruc`: 13 dígitos numéricos, único.
  - `razonSocial`: texto obligatorio.
  - `dirMatriz`: texto obligatorio.
  - `obligadoContabilidad`: 'SI' o 'NO'.
  - `sucursal.estab`: 3 dígitos, único por empresa.
  - `sucursal.nombre`: texto obligatorio.
  - `sucursal.dirEstablecimiento`: texto obligatorio.
  - `puntoEmision.ptoEmi`: 3 dígitos, único por sucursal.
  - `puntoEmision.secuencialActual`: entero mayor a 0.
- **Respuestas**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "mensaje": "Empresa, sucursal y punto de emisión creados exitosamente",
      "data": {
        "empresa": { /* datos de la empresa */ },
        "sucursal": { /* datos de la sucursal */ },
        "puntoEmision": { /* datos del punto de emisión */ }
      },
      "metadata": {
        "empresaId": "uuid",
        "sucursalId": "uuid",
        "puntoEmisionId": "uuid"
      }
    }
    ```
  - `409 Conflict` (empresa, sucursal o punto de emisión ya existen):
    ```json
    {
      "success": false,
      "mensaje": "Ya existe una empresa con ese RUC"
    }
    // o
    {
      "success": false,
      "mensaje": "Ya existe una sucursal con ese establecimiento para esta empresa"
    }
    // o
    {
      "success": false,
      "mensaje": "Ya existe un punto de emisión con ese código para esta sucursal"
    }
    ```
  - `400 Bad Request` (validación):
    ```json
    {
      "success": false,
      "errores": {
        "ruc": ["El RUC debe tener 13 dígitos"],
        "obligadoContabilidad": ["Debe ser SI o NO"],
        "sucursal.estab": ["El establecimiento debe tener 3 dígitos"]
      },
      "data": { /* datos enviados */ }
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Error al crear empresa, sucursal o punto de emisión"
    }
    ```

### X+1. `POST /sucursales`

- **Descripción**: Crea una nueva sucursal para una empresa usando el RUC como referencia.
- **Ruta Completa**: `[BASE_URL]/sucursales`
- **Body (JSON)**:
  ```json
  {
    "ruc": "1725150500001",
    "estab": "002",
    "nombre": "Sucursal Sur",
    "dirEstablecimiento": "DIRECCION SUCURSAL"
  }
  ```
- **Validaciones**:
  - `ruc`: 13 dígitos numéricos, debe existir en la base de datos.
  - `estab`: 3 dígitos, único por empresa.
  - `nombre`: texto obligatorio.
  - `dirEstablecimiento`: texto obligatorio.
- **Respuestas**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "mensaje": "Sucursal creada exitosamente",
      "data": { /* datos de la sucursal */ },
      "metadata": { "sucursalId": "uuid" }
    }
    ```
  - `404 Not Found`:
    ```json
    {
      "success": false,
      "mensaje": "Empresa no encontrada para el RUC proporcionado"
    }
    ```
  - `409 Conflict`:
    ```json
    {
      "success": false,
      "mensaje": "Ya existe una sucursal con ese establecimiento para esta empresa"
    }
    ```
  - `400 Bad Request` (validación):
    ```json
    {
      "success": false,
      "errores": { /* errores de validación */ },
      "data": { /* datos enviados */ }
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Error al crear sucursal"
    }
    ```

### X+2. `POST /puntos-emision`

- **Descripción**: Crea un nuevo punto de emisión para una sucursal usando el RUC de la empresa y el código de establecimiento.
- **Ruta Completa**: `[BASE_URL]/puntos-emision`
- **Body (JSON)**:
  ```json
  {
    "ruc": "1725150500001",
    "estab": "002",
    "ptoEmi": "003"
    // "secuencialActual": 1 // Opcional, por defecto es 1
  }
  ```
- **Validaciones**:
  - `ruc`: 13 dígitos numéricos, debe existir en la base de datos.
  - `estab`: 3 dígitos, debe existir una sucursal con ese estab para la empresa.
  - `ptoEmi`: 3 dígitos, único por sucursal.
  - `secuencialActual`: entero mayor a 0 (opcional, si no se envía se usará 1 por defecto).
- **Notas**:
  - Si no se envía `secuencialActual`, el sistema lo inicializa automáticamente en 1.
- **Respuestas**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "mensaje": "Punto de emisión creado exitosamente",
      "data": { /* datos del punto de emisión */ },
      "metadata": { "puntoEmisionId": "uuid" }
    }
    ```
  - `404 Not Found`:
    ```json
    {
      "success": false,
      "mensaje": "Empresa no encontrada para el RUC proporcionado"
    }
    // o
    {
      "success": false,
      "mensaje": "Sucursal no encontrada para el establecimiento proporcionado"
    }
    ```
  - `409 Conflict`:
    ```json
    {
      "success": false,
      "mensaje": "Ya existe un punto de emisión con ese código para esta sucursal"
    }
    ```
  - `400 Bad Request` (validación):
    ```json
    {
      "success": false,
      "errores": { /* errores de validación */ },
      "data": { /* datos enviados */ }
    }
    ```
  - `500 Internal Server Error`:
    ```json
    {
      "success": false,
      "mensaje": "Error al crear punto de emisión"
    }
    ```

### X+3. `POST /notas-credito`

- **Descripción**: Crea una nueva nota de crédito electrónica. Los totales se calculan automáticamente en el backend.
- **Ruta Completa**: `[BASE_URL]/notas-credito`
- **Body (JSON)**:
  ```json
  {
    "facturaId": "uuid-de-la-factura-original",
    "motivo": "Devolución de producto",
    "detalles": [
      {
        "codigoPrincipal": "P001",
        "descripcion": "Producto 1",
        "cantidad": 2,
        "precioUnitario": 10.00,
        "descuento": 1.00,
        "impuestos": [
          {
            "codigo": "IVA",
            "codigoPorcentaje": "12",
            "tarifa": 12,
            "baseImponible": 18.00,
            "valor": 2.16
          }
        ]
      }
    ]
  }
  ```
- **Notas Importantes**:
  - **No envíes** los campos `totalSinImpuestos`, `totalDescuento`, `totalConImpuestos` ni `valorModificacion` en el body. El sistema los calcula automáticamente a partir de los detalles e impuestos.
  - Solo necesitas enviar los detalles, cantidades, precios, descuentos e impuestos por ítem.
- **Validaciones**:
  - Los detalles deben tener cantidad, precioUnitario y al menos un impuesto.
  - El motivo es obligatorio.
- **Respuestas**:
  - `201 Created`: Nota de crédito creada exitosamente.
  - `400 Bad Request`: Error de validación de datos.
  - `404 Not Found`: Factura original no encontrada.
  - `500 Internal Server Error`: Error interno al generar la nota de crédito.
