# 📋 Instrucciones para Configurar Variables de Entorno

## ❓ ¿Por qué necesitas un archivo `.env.local`?

El sistema usa variables de entorno para configurar la URL del backend. Esto permite:
- ✅ Cambiar fácilmente entre desarrollo y producción
- ✅ Mantener configuraciones seguras fuera del código
- ✅ Diferentes configuraciones para cada desarrollador

## 🔧 Pasos para Configurar

### 1. Crear el archivo `.env.local`

En la **raíz del proyecto** (mismo nivel que `package.json`), crea un archivo llamado `.env.local`

### 2. Agregar la configuración

Copia y pega lo siguiente en el archivo `.env.local`:

```env
# URL del Backend (API)
NEXT_PUBLIC_URL_BACK=http://localhost:8000
```

### 3. Ajustar según tu entorno

**Desarrollo Local:**
```env
NEXT_PUBLIC_URL_BACK=http://localhost:8000
```

**Backend en otro puerto:**
```env
NEXT_PUBLIC_URL_BACK=http://localhost:3001
```

**Backend en otra máquina de la red:**
```env
NEXT_PUBLIC_URL_BACK=http://192.168.1.100:8000
```

**Producción:**
```env
NEXT_PUBLIC_URL_BACK=https://api.tudominio.com
```

### 4. Reiniciar el servidor

Después de crear o modificar `.env.local`, **debes reiniciar el servidor de Next.js**:

1. Detén el servidor (Ctrl + C)
2. Ejecuta de nuevo: `npm run dev`

## ⚠️ Importante

- ✅ El archivo `.env.local` **YA está en `.gitignore`** - no se subirá al repositorio
- ✅ **NUNCA** subas archivos `.env` al repositorio - contienen información sensible
- ✅ Las variables que empiezan con `NEXT_PUBLIC_` son accesibles desde el navegador
- ✅ Solo usa `NEXT_PUBLIC_` para variables que necesitas en el cliente

## 🔍 Verificar que funciona

1. Crea el archivo `.env.local` con `NEXT_PUBLIC_URL_BACK=http://localhost:8000`
2. Reinicia el servidor
3. Abre la consola del navegador y escribe:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_URL_BACK)
   ```
4. Deberías ver: `http://localhost:8000`

## 📝 Variables Opcionales

Si en el futuro necesitas otras variables, puedes agregarlas:

```env
# URL del Backend
NEXT_PUBLIC_URL_BACK=http://localhost:8000

# Clave de encriptación para datos de usuario en localStorage
# ⚠️ IMPORTANTE: Genera una clave segura y única para producción
# Puedes usar: openssl rand -base64 32  (en Linux/Mac)
# O cualquier generador de claves aleatorias
NEXT_PUBLIC_KEY_CRYPTO=clave-secreta-super-segura-cambiar-en-produccion-2024

# URL del Frontend (para redirects)
NEXT_PUBLIC_URL_FRONT=http://localhost:3000

# Firebase (si implementas FCM)
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
```

## 🆘 Solución de Problemas

**Problema:** Las variables no se cargan
- ✅ Asegúrate de que el archivo se llama exactamente `.env.local`
- ✅ Reinicia el servidor después de crear el archivo
- ✅ Verifica que no hay espacios antes o después del `=`

**Problema:** El backend no responde
- ✅ Verifica que el backend esté corriendo
- ✅ Comprueba que la URL y puerto sean correctos
- ✅ Prueba la URL directamente en el navegador: `http://localhost:8000/health`

