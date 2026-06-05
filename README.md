# VozCiudadana

**VozCiudadana** es una aplicación web mini para registrar propuestas legislativas ciudadanas, recolectar firmas de apoyo, agregar comentarios y recursos, y preparar expedientes congelados para revisión del Congreso.

Este ZIP corresponde al tercer avance del proyecto:

```txt
Commit 03: feat: implementar frontend ciudadano
```

## Contenido de este avance

- Backend funcional con Express, TypeScript y MongoDB.
- Frontend ciudadano funcional con React y Vite.
- Registro de propuestas desde la interfaz.
- Redirección a Propuestas luego del registro exitoso.
- Lista de propuestas sin botón adicional de nueva propuesta.
- Detalle de propuesta con recuadro compacto y formularios debajo.
- Registro de firmas, comentarios y recursos desde el frontend.
- Límite de demostración de 3 firmas.
- Congelamiento automático al alcanzar el límite.
- Documentación base limpia en Markdown.

## Estructura

```txt
VozCiudadana/
├── backend/
├── frontend/
├── docs/
├── postman/
└── README.md
```

## Variables de entorno

### Backend

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/vozciudadana
SIGNATURE_LIMIT=3
CONGRESS_ADMIN_USER=admin
CONGRESS_ADMIN_PASSWORD=admin123
JWT_SECRET=vozciudadana_demo_secret
```

### Frontend

```env
VITE_API_URL=http://localhost:4000/api
```

## Ejecución local

### Backend

```bash
cd backend
npm install
npm run dev
```

El backend queda disponible en:

```txt
http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en:

```txt
http://localhost:5173
```

## Capturas sugeridas para este commit

Para documentar el avance del commit 03, tomar solo dos capturas:

| Captura | Nombre sugerido |
|---|---|
| Frontend ciudadano ejecutándose con lista o detalle de propuesta | `commit_03_resultado_frontend_ciudadano` |
| Terminal con el commit y `git log --oneline -1` | `commit_03_terminal_commit` |

## Commit sugerido

```bash
git add .
git commit -m "feat: implementar frontend ciudadano"
git log --oneline -1
```
