# VozCiudadana

**VozCiudadana** es una aplicación web mini para registrar propuestas legislativas ciudadanas, recolectar firmas de apoyo, recibir comentarios y recursos, y generar un expediente congelado para revisión del Congreso.

Este ZIP corresponde al segundo avance del proyecto:

```txt
Commit 02: feat: implementar backend de propuestas ciudadanas
```

## Estado del proyecto en este avance

En este segundo avance ya se implementa el backend principal:

- Registro de propuestas legislativas.
- Listado y detalle de propuestas.
- Registro de firmas ciudadanas.
- Validación básica de firma.
- Bloqueo de firmas duplicadas por DNI.
- Registro de comentarios.
- Registro de recursos de apoyo.
- Congelamiento automático al llegar a 3 firmas.
- Hash criptográfico del expediente.
- Consulta de expedientes congelados para Congreso.
- Asignación básica de comisión desde backend.

El frontend todavía se mantiene como base inicial. En el siguiente avance se desarrollará el flujo ciudadano visual.

## Tecnologías

```txt
Backend: Express + TypeScript + MongoDB
Frontend: React + Vite
Base de datos: MongoDB local
```

## Base de datos

La base de datos configurada es:

```txt
vozciudadana
```

La conexión local está en:

```env
MONGO_URI=mongodb://localhost:27017/vozciudadana
```

## Límite de firmas de demostración

El caso real indica 25 000 firmas válidas. Para la demostración académica se usa un límite reducido:

```env
SIGNATURE_LIMIT=3
```

Así se puede probar el congelamiento del expediente con solo tres firmas válidas.

## Ejecutar backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```txt
http://localhost:4000
```

Health check:

```txt
http://localhost:4000/api/health
```

## Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

## Variables de entorno incluidas

Este proyecto incluye `.env` y `.env.example` porque es una versión académica local sin secretos reales.

Backend:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/vozciudadana
SIGNATURE_LIMIT=3
CONGRESS_ADMIN_USER=admin
CONGRESS_ADMIN_PASSWORD=admin123
JWT_SECRET=vozciudadana_demo_secret
```

Frontend:

```env
VITE_API_URL=http://localhost:4000/api
```

## Capturas sugeridas para este avance

Para la documentación global de commits:

```txt
commit_02_resultado_backend
commit_02_terminal_commit
```

## Mensaje de commit recomendado

```bash
git add .
git commit -m "feat: implementar backend de propuestas ciudadanas"
git log --oneline -1
```
