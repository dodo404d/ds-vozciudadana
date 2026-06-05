# VozCiudadana

**VozCiudadana** es una aplicación web mini para registrar propuestas legislativas ciudadanas, recolectar firmas de apoyo, agregar comentarios y recursos, congelar expedientes al alcanzar el límite de demostración y derivarlos a una comisión desde el Panel Congreso.

Este ZIP corresponde al cuarto avance del proyecto:

```txt
Commit 04: feat: agregar panel Congreso y patrones de diseño
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
- Hash criptográfico del expediente congelado.
- Panel Congreso con vista de tarjetas.
- Panel Congreso con vista de lista resumida.
- Visualización del detalle de la ley propuesta desde el Panel Congreso.
- Selección de comisión mediante desplegable.
- Asignación de comisión.
- Patrones creacionales: Factory Method, Builder y Singleton.
- Patrones estructurales: Facade, Adapter, Proxy y Composite.
- Documentación limpia en Markdown.

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
CONGRESS_ACCESS_TOKEN=demo-congreso
```

### Frontend

```env
VITE_API_URL=http://localhost:4000/api
VITE_CONGRESS_ACCESS_TOKEN=demo-congreso
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

Para documentar el avance del commit 04, tomar solo dos capturas:

| Captura | Nombre sugerido |
|---|---|
| Panel Congreso ejecutándose, mostrando vista tarjetas/lista o selector de comisión | `commit_04_resultado_panel_patrones` |
| Terminal con el commit y `git log --oneline -1` | `commit_04_terminal_commit` |

## Commit sugerido

```bash
git add .
git commit -m "feat: agregar panel Congreso y patrones de diseño"
git log --oneline -1
```
