# 🚀 Guía Completa del Sistema de Facturación

## 📋 **Resumen Ejecutivo**

Este documento explica **TODO** lo que se implementó en el sistema de facturación, incluyendo:

- ✅ **Sistema de Impuestos de Productos** - Gestión automática de impuestos por producto
- ✅ **Sistema de Descuentos Mejorado** - Cálculo automático de descuentos y precios
- ✅ **Sistema de Cálculo Automático de Facturas** - El backend calcula todo automáticamente
- ✅ **Nuevos Endpoints** - APIs para crear y gestionar facturas inteligentemente
- ✅ **Validaciones Inteligentes** - Solo se validan datos básicos, NO cálculos

---

## 🎯 **Principio Fundamental del Sistema**

> **"El backend calcula, no valida cálculos que él mismo hace"**

### **❌ Sistema Anterior (Ineficiente)**
```
Frontend → Envía factura completa → Backend valida → Backend guarda
```

### **✅ Sistema Nuevo (Inteligente)**
```
Frontend → Envía solo datos básicos → Backend calcula → Backend guarda
```

---

## 🔧 **Componentes Implementados**

### **1. CalculoFacturaService** (`src/servicios/calculoFacturaService.js`)
Servicio principal que calcula automáticamente todos los campos de facturas:

```javascript
class CalculoFacturaService {
  // Cálculo completo de factura
  static async calcularFacturaCompleta(datosBasicos)
  
  // Cálculos individuales
  static calcularTotalesDesdeDetalles(detalles)
  static calcularImpuestosTotales(baseImponible, configuracion)
  static calcularImporteTotal(baseImponible, totalImpuestos, propina)
  static generarPagosAutomaticos(importeTotal, formaPago)
  
  // Funciones especializadas
  static async calcularFacturaDesdeProductos(productos, configuracion)
  static validarDatosBasicos(datosBasicos)
  static generarResumenFactura(factura)
}
```

### **2. ProductoImpuestoService** (`src/servicios/productoImpuestoService.js`)
Gestiona impuestos específicos por producto:

```javascript
class ProductoImpuestoService {
  static async obtenerImpuestosProducto(productoId)
  static async configurarImpuestoPorDefecto(productoId)
  static async agregarImpuesto(productoId, impuesto)
  static async actualizarImpuesto(productoId, impuestoId, datos)
  static async desactivarImpuesto(productoId, impuestoId)
  static async calcularImpuestos(producto, cantidad, descuento)
}
```

### **3. Esquemas de Validación** (`src/esquemas/`)
- **`facturaCreacionSchema.js`** - Solo valida datos básicos
- **`productoSchema.js`** - Validación de productos con descuentos
- **`facturaSchema.js`** - Esquema principal de facturas

### **4. Controladores Actualizados**
- **`facturaController.js`** - Nuevos métodos de creación automática
- **`productoController.js`** - Gestión de productos con impuestos y descuentos
- **`productoImpuestoController.js`** - Gestión de impuestos por producto

---

## 🌐 **Nuevos Endpoints Implementados**

### **📋 Endpoints de Facturas**

#### **1. Crear Factura con Cálculo Automático**
```http
POST /facturas
Content-Type: application/json
```

**Body de Ejemplo:**
```json
{
  "ambiente": "Pruebas",
  "tipoEmision": "EmisionNormal",
  "razonSocial": "Mi Empresa S.A.",
  "ruc": "1234567890123",
  "codDoc": "Factura",
  "estab": "001",
  "ptoEmi": "001",
  "dirMatriz": "Av. Principal 123",
  "dirEstablecimiento": "Av. Principal 123",
  "obligadoContabilidad": "SI",
  "tipoIdentificacionComprador": "RUC",
  "razonSocialComprador": "Cliente Ejemplo S.A.",
  "identificacionComprador": "1234567890123",
  "direccionComprador": "Av. Cliente 456",
  "detalles": [
    {
      "codigoPrincipal": "LAP-001",
      "descripcion": "Laptop Gaming Pro",
      "cantidad": 2,
      "precioUnitario": 1200.00,
      "descuento": 100.00
    },
    {
      "codigoPrincipal": "MOUSE-001",
      "descripcion": "Mouse Gaming RGB",
      "cantidad": 1,
      "precioUnitario": 80.00,
      "descuento": 0
    }
  ],
  "formaPago": "Efectivo",
  "propina": 0
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Factura creada exitosamente",
  "data": {
    "factura": {
      "numeroFactura": "FAC-1734528000000-123",
      "totalSinImpuestos": 2480.00,        // ✅ Calculado automáticamente
      "totalDescuento": 100.00,            // ✅ Calculado automáticamente
      "totalConImpuestos": [
        {
          "codigo": "IVA",
          "codigoPorcentaje": "12%",
          "tarifa": 12.0,
          "baseImponible": 2380.00,        // ✅ Calculado automáticamente
          "valor": 285.60                  // ✅ Calculado automáticamente
        }
      ],
      "importeTotal": 2665.60,             // ✅ Calculado automáticamente
      "pagos": [
        {
          "formaPago": "Efectivo",
          "total": 2665.60                 // ✅ Calculado automáticamente
        }
      ],
      "_calculado": {
        "timestamp": "2025-01-11T...",
        "version": "1.0",
        "camposCalculados": [
          "totalSinImpuestos",
          "totalDescuento",
          "totalConImpuestos",
          "importeTotal",
          "pagos"
        ]
      }
    },
    "resumen": {
      "totalItems": 2,
      "totalSinImpuestos": 2480.00,
      "totalDescuento": 100.00,
      "baseImponible": 2380.00,
      "totalImpuestos": 285.60,
      "importeTotal": 2665.60,
      "formaPago": "Efectivo"
    }
  }
}
```

#### **2. Crear Factura desde Productos Existentes**
```http
POST /facturas/desde-productos
Content-Type: application/json
```

**Body de Ejemplo:**
```json
{
  "productos": [
    {
      "producto": {
        "codigo": "LAP-001",
        "nombre": "Laptop Gaming Pro",
        "precio": 1200.00,
        "impuestos": [
          {
            "codigo": "IVA",
            "codigoPorcentaje": "12%",
            "tarifa": 12.0
          }
        ]
      },
      "cantidad": 1,
      "descuento": 50.00
    }
  ],
  "configuracion": {
    "ambiente": "Pruebas",
    "razonSocial": "Mi Empresa S.A.",
    "ruc": "1234567890123",
    "codDoc": "Factura",
    "estab": "001",
    "ptoEmi": "001",
    "dirMatriz": "Av. Principal 123",
    "dirEstablecimiento": "Av. Principal 123",
    "obligadoContabilidad": "SI",
    "tipoIdentificacionComprador": "RUC",
    "razonSocialComprador": "Cliente Ejemplo S.A.",
    "identificacionComprador": "1234567890123",
    "direccionComprador": "Av. Cliente 456",
    "formaPago": "Efectivo"
  }
}
```

### **🛍️ Endpoints de Productos**

#### **3. Crear Producto Completo**
```http
POST /productos/completo
Content-Type: application/json
```

**Body de Ejemplo:**
```json
{
  "codigo": "LAP-001",
  "nombre": "Laptop Gaming Pro",
  "descripcion": "Laptop de alto rendimiento para gaming",
  "precio": 1200.00,
  "descuento": 10.0,
  "descuentoValor": 120.00,
  "categoria": "Electrónicos",
  "stock": 50,
  "impuestos": [
    {
      "codigo": "IVA",
      "codigoPorcentaje": "12%",
      "tarifa": 12.0,
      "activo": true
    }
  ]
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": "prod_123",
    "codigo": "LAP-001",
    "nombre": "Laptop Gaming Pro",
    "precio": 1200.00,
    "descuento": {
      "porcentaje": 10.0,
      "valor": 120.00,
      "precioConDescuento": 1080.00
    },
    "descuentoValorCalculado": 120.00,
    "baseImponible": 1080.00,
    "impuestos": [
      {
        "id": "imp_456",
        "codigo": "IVA",
        "codigoPorcentaje": "12%",
        "tarifa": 12.0,
        "nombreLegible": "IVA",
        "porcentajeLegible": "12%",
        "activo": true
      }
    ]
  }
}
```

#### **4. Buscar Productos con Impuestos**
```http
GET /productos?incluirImpuestos=true
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_123",
      "codigo": "LAP-001",
      "nombre": "Laptop Gaming Pro",
      "precio": 1200.00,
      "descuento": {
        "porcentaje": 10.0,
        "valor": 120.00,
        "precioConDescuento": 1080.00
      },
      "impuestos": [
        {
          "id": "imp_456",
          "codigo": "IVA",
          "codigoPorcentaje": "12%",
          "tarifa": 12.0,
          "nombreLegible": "IVA",
          "porcentajeLegible": "12%",
          "activo": true
        }
      ]
    }
  ]
}
```

### **💰 Endpoints de Impuestos de Productos**

#### **5. Obtener Impuestos de un Producto**
```http
GET /producto-impuesto/producto/{productoId}
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "imp_456",
      "codigo": "IVA",
      "codigoPorcentaje": "12%",
      "tarifa": 12.0,
      "nombreLegible": "IVA",
      "porcentajeLegible": "12%",
      "activo": true,
      "fechaCreacion": "2025-01-11T..."
    }
  ]
}
```

#### **6. Agregar Impuesto a Producto**
```http
POST /producto-impuesto/producto/{productoId}
Content-Type: application/json
```

**Body:**
```json
{
  "codigo": "ICE",
  "codigoPorcentaje": "5%",
  "tarifa": 5.0
}
```

#### **7. Configurar Impuesto por Defecto**
```http
POST /producto-impuesto/producto/{productoId}/configurar-por-defecto
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Impuesto IVA 12% configurado por defecto",
  "data": {
    "impuesto": {
      "codigo": "IVA",
      "codigoPorcentaje": "12%",
      "tarifa": 12.0,
      "nombreLegible": "IVA",
      "porcentajeLegible": "12%"
    }
  }
}
```

#### **8. Obtener Tipos de Impuestos Disponibles**
```http
GET /producto-impuesto/tipos-disponibles
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "codigo": "IVA",
      "nombre": "IVA",
      "descripcion": "Impuesto al Valor Agregado"
    },
    {
      "codigo": "ICE",
      "nombre": "ICE",
      "descripcion": "Impuesto a los Consumos Especiales"
    }
  ]
}
```

#### **9. Obtener Porcentajes de IVA Disponibles**
```http
GET /producto-impuesto/porcentajes-iva
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "codigo": "0%",
      "porcentaje": 0.0,
      "descripcion": "Exento de IVA"
    },
    {
      "codigo": "12%",
      "porcentaje": 12.0,
      "descripcion": "IVA estándar"
    }
  ]
}
```

---

## 🧮 **Fórmulas de Cálculo Automático**

### **1. Cálculo de Totales desde Detalles**
```javascript
// Para cada detalle:
subtotal = cantidad × precioUnitario
precioTotalSinImpuesto = subtotal - descuento

// Totales de la factura:
totalSinImpuestos = Σ(subtotal)
totalDescuento = Σ(descuento)
baseImponible = totalSinImpuestos - totalDescuento
```

### **2. Cálculo de Impuestos**
```javascript
// Para cada impuesto:
valorImpuesto = baseImponible × (tarifa / 100)

// Total de impuestos:
totalImpuestos = Σ(valorImpuesto)
```

### **3. Cálculo del Importe Total**
```javascript
importeTotal = baseImponible + totalImpuestos + propina
```

### **4. Cálculo de Descuentos en Productos**
```javascript
// Si se proporciona porcentaje:
descuentoValor = precio × (descuento / 100)

// Si se proporciona valor:
descuento = (descuentoValor / precio) × 100

// Precio con descuento:
precioConDescuento = precio - descuentoValor
```

---

## 🔍 **Validaciones Implementadas**

### **Validaciones de Datos Básicos:**
- ✅ Detalles obligatorios y válidos
- ✅ Cliente identificado correctamente
- ✅ Empresa configurada correctamente
- ✅ Formato de RUC válido (13 dígitos)
- ✅ Establecimiento y punto de emisión válidos

### **Validaciones de Negocio:**
- ✅ Descuento no mayor al subtotal
- ✅ Cantidades y precios positivos
- ✅ Impuestos con tarifas válidas (0-100%)
- ✅ Formas de pago válidas

### **NO se Validan (se calculan automáticamente):**
- ❌ `totalSinImpuestos` (se calcula)
- ❌ `totalDescuento` (se calcula)
- ❌ `baseImponible` (se calcula)
- ❌ `importeTotal` (se calcula)
- ❌ `pagos.total` (se calcula)

---

## 📊 **Ejemplos Prácticos de Uso**

### **Ejemplo 1: Crear Factura Simple**

**Paso 1: Preparar datos básicos**
```json
{
  "ambiente": "Pruebas",
  "tipoEmision": "EmisionNormal",
  "razonSocial": "Mi Tienda",
  "ruc": "1234567890123",
  "codDoc": "Factura",
  "estab": "001",
  "ptoEmi": "001",
  "dirMatriz": "Av. Principal 123",
  "dirEstablecimiento": "Av. Principal 123",
  "obligadoContabilidad": "SI",
  "tipoIdentificacionComprador": "RUC",
  "razonSocialComprador": "Cliente Ejemplo",
  "identificacionComprador": "1234567890123",
  "direccionComprador": "Av. Cliente 456",
  "detalles": [
    {
      "codigoPrincipal": "PROD-001",
      "descripcion": "Producto de Ejemplo",
      "cantidad": 3,
      "precioUnitario": 100.00,
      "descuento": 15.00
    }
  ],
  "formaPago": "Efectivo"
}
```

**Paso 2: Enviar a la API**
```bash
curl -X POST http://localhost:8000/facturas \
  -H "Content-Type: application/json" \
  -d @factura-simple.json
```

**Paso 3: El backend calcula automáticamente:**
- `totalSinImpuestos`: 300.00 (3 × 100)
- `totalDescuento`: 15.00
- `baseImponible`: 285.00 (300 - 15)
- `totalConImpuestos`: IVA 12% = 34.20
- `importeTotal`: 319.20 (285 + 34.20)
- `pagos`: Efectivo $319.20

### **Ejemplo 2: Crear Producto con Impuestos**

**Paso 1: Crear producto**
```json
{
  "codigo": "MOUSE-001",
  "nombre": "Mouse Gaming RGB",
  "precio": 80.00,
  "descuento": 5.0,
  "categoria": "Periféricos",
  "stock": 100
}
```

**Paso 2: Agregar impuestos**
```bash
# Agregar IVA 12%
curl -X POST http://localhost:8000/producto-impuesto/producto/{productoId} \
  -H "Content-Type: application/json" \
  -d '{"codigo": "IVA", "codigoPorcentaje": "12%", "tarifa": 12.0}'
```

**Paso 3: El sistema calcula automáticamente:**
- `descuentoValor`: 4.00 (80 × 5%)
- `precioConDescuento`: 76.00 (80 - 4)
- `baseImponible`: 76.00
- `impuestos`: IVA 12% = 9.12

### **Ejemplo 3: Crear Factura desde Productos Existentes**

**Paso 1: Seleccionar productos del catálogo**
```json
{
  "productos": [
    {
      "producto": {
        "codigo": "LAP-001",
        "nombre": "Laptop Gaming",
        "precio": 1200.00,
        "impuestos": [{"codigo": "IVA", "tarifa": 12.0}]
      },
      "cantidad": 1,
      "descuento": 100.00
    }
  ],
  "configuracion": {
    "ambiente": "Pruebas",
    "razonSocial": "Mi Empresa",
    "ruc": "1234567890123",
    "codDoc": "Factura",
    "estab": "001",
    "ptoEmi": "001",
    "dirMatriz": "Dirección",
    "dirEstablecimiento": "Dirección",
    "obligadoContabilidad": "SI",
    "tipoIdentificacionComprador": "RUC",
    "razonSocialComprador": "Cliente",
    "identificacionComprador": "1234567890123",
    "direccionComprador": "Dirección Cliente",
    "formaPago": "Efectivo"
  }
}
```

**Paso 2: Enviar a la API**
```bash
curl -X POST http://localhost:8000/facturas/desde-productos \
  -H "Content-Type: application/json" \
  -d @factura-productos.json
```

**Paso 3: El backend calcula automáticamente:**
- `totalSinImpuestos`: 1200.00
- `totalDescuento`: 100.00
- `baseImponible`: 1100.00
- `totalConImpuestos`: IVA 12% = 132.00
- `importeTotal`: 1232.00
- `pagos`: Efectivo $1232.00

---

## 🧪 **Pruebas del Sistema**

### **Ejecutar Todas las Pruebas:**
```bash
# Pruebas de cálculo automático
node tests/test-calculo-automatico-facturas.js

# Pruebas de descuentos
node tests/test-descuentos-productos.js

# Pruebas de impuestos
node tests/test-impuestos-simple.js
```

### **Tipos de Pruebas Incluidas:**
1. **Cálculo de Totales** - Verifica suma correcta de detalles
2. **Cálculo de Impuestos** - Verifica IVA y otros impuestos
3. **Cálculo de Descuentos** - Verifica descuentos y precios finales
4. **Cálculo de Importe Total** - Verifica total final
5. **Generación de Pagos** - Verifica pagos automáticos
6. **Cálculo Completo** - Verifica factura completa
7. **Validación Básica** - Verifica datos de entrada
8. **Desde Productos** - Verifica creación desde productos existentes

---

## 🔧 **Configuración del Sistema**

### **Variables de Entorno:**
```bash
# Puerto del servidor
PORT=8000

# Base de datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/facturacion"

# Logging
LOG_LEVEL=info
```

### **Configuración de Impuestos por Defecto:**
```javascript
// Si no se especifica configuración de impuestos, se usa:
const impuestosPorDefecto = [
  {
    codigo: 'IVA',
    codigoPorcentaje: '12%',
    tarifa: 12.0
  }
];
```

### **Formas de Pago Disponibles:**
```javascript
const formasPago = [
  'Efectivo', 'Cheque', 'Transferencia', 'TarjetaCredito',
  'TarjetaDebito', 'CompensacionDeudas', 'TarjetaPrepago', 'Otros'
];
```

---

## 📈 **Casos de Uso Comunes**

### **1. Frontend Simple**
- Usuario ingresa solo productos y cantidades
- El backend calcula automáticamente todos los totales
- Sin validaciones complejas en el frontend

### **2. Integración con Otros Sistemas**
- Sistemas externos envían solo datos básicos
- El backend garantiza cálculos correctos
- Sin dependencia de cálculos externos

### **3. Generación Masiva de Facturas**
- Lote de productos → Lote de facturas calculadas
- Consistencia garantizada en todas las facturas
- Sin errores de cálculo en lotes grandes

### **4. Facturas desde Productos Existentes**
- Selección de productos del catálogo
- Cálculo automático de precios e impuestos
- Integración con sistema de productos

### **5. Gestión de Impuestos por Producto**
- Configuración individual de impuestos
- Impuestos por defecto automáticos
- Nombres legibles para la UI

---

## 🚨 **Manejo de Errores**

### **Errores Comunes y Soluciones:**

#### **Error 1: Datos Básicos Inválidos**
```json
{
  "success": false,
  "error": "Datos básicos inválidos",
  "details": {
    "errores": [
      "Los detalles son obligatorios",
      "La identificación del comprador es obligatoria"
    ]
  }
}
```

**Solución:** Verificar que todos los campos obligatorios estén presentes.

#### **Error 2: Descuento Mayor al Subtotal**
```json
{
  "success": false,
  "error": "Detalle 0: el descuento no puede ser mayor al subtotal"
}
```

**Solución:** El descuento debe ser menor o igual al precio × cantidad.

#### **Error 3: RUC Inválido**
```json
{
  "success": false,
  "error": "El RUC debe tener 13 dígitos"
}
```

**Solución:** Verificar que el RUC tenga exactamente 13 dígitos numéricos.

---

## 🔮 **Futuras Mejoras**

### **Próximas Funcionalidades:**
1. **Múltiples Monedas** - Soporte para diferentes divisas
2. **Impuestos Compuestos** - Cálculo de impuestos anidados
3. **Descuentos por Volumen** - Descuentos automáticos por cantidad
4. **Configuración por Empresa** - Impuestos y reglas personalizadas
5. **Cálculo en Tiempo Real** - Actualización automática de totales
6. **Plantillas de Factura** - Diferentes formatos y estilos
7. **Exportación a PDF** - Generación automática de PDFs
8. **Integración con SRI** - Envío automático al SRI

---

## 📚 **Archivos del Sistema**

### **Servicios:**
- `src/servicios/calculoFacturaService.js` - Cálculo automático de facturas
- `src/servicios/productoImpuestoService.js` - Gestión de impuestos por producto
- `src/servicios/validacionFacturaService.js` - Validaciones de facturas

### **Controladores:**
- `src/controladores/facturaController.js` - Controlador de facturas
- `src/controladores/productoController.js` - Controlador de productos
- `src/controladores/productoImpuestoController.js` - Controlador de impuestos

### **Esquemas:**
- `src/esquemas/facturaCreacionSchema.js` - Validación de creación de facturas
- `src/esquemas/productoSchema.js` - Validación de productos
- `src/esquemas/facturaSchema.js` - Esquema principal de facturas

### **Rutas:**
- `src/rutas/facturaRoutes.js` - Rutas de facturas
- `src/rutas/productoRoutes.js` - Rutas de productos
- `src/rutas/productoImpuestoRoutes.js` - Rutas de impuestos

### **Pruebas:**
- `tests/test-calculo-automatico-facturas.js` - Pruebas de cálculo automático
- `tests/test-descuentos-productos.js` - Pruebas de descuentos
- `tests/test-impuestos-simple.js` - Pruebas de impuestos

### **Documentación:**
- `docs/SISTEMA_CALCULO_AUTOMATICO_FACTURAS.md` - Sistema de cálculo automático
- `docs/SISTEMA_IMPUESTOS_PRODUCTOS.md` - Sistema de impuestos
- `docs/SISTEMA_DESCUENTOS_PRODUCTOS.md` - Sistema de descuentos

---

## 🎯 **Resumen de Beneficios**

### **✅ Ventajas del Sistema:**
1. **Sin Errores de Cálculo** - El backend siempre calcula correctamente
2. **Sin Validaciones Redundantes** - No validas tu propio trabajo
3. **Más Eficiente** - Menos procesamiento innecesario
4. **Más Confiable** - Cálculos consistentes y centralizados
5. **Más Simple** - API más intuitiva y fácil de usar
6. **Integración Completa** - Productos, impuestos y facturas unificados

### **🎉 Resultado Final:**
Un sistema más **inteligente**, **eficiente** y **confiable** que:
- **Previene errores** en lugar de detectarlos después
- **Calcula automáticamente** todos los campos críticos
- **Valida solo datos básicos** sin redundancias
- **Integra completamente** productos, impuestos y facturas
- **Proporciona APIs claras** y fáciles de usar

---

## 📞 **Soporte y Contacto**

Para dudas o problemas con el sistema:

1. **Revisar logs** del servidor para errores específicos
2. **Ejecutar pruebas** para verificar funcionalidad
3. **Consultar documentación** de cada componente
4. **Verificar base de datos** para inconsistencias

---

**¡El sistema está listo para usar! 🚀**

Con esta implementación, tienes un sistema de facturación completo, inteligente y confiable que elimina la lógica redundante y calcula automáticamente todo lo necesario.
