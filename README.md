# VozCiudadana

**VozCiudadana** es una aplicación web mini para registrar propuestas legislativas ciudadanas, recolectar firmas de apoyo, agregar comentarios y recursos, congelar expedientes al alcanzar el límite de demostración y derivarlos a una comisión desde el Panel Congreso.

Este ZIP corresponde al quinto avance y cierre del proyecto:

```txt
Commit 05: docs: documentar proyecto final VozCiudadana
```

## Contenido final del proyecto

- Backend funcional con Express, TypeScript y MongoDB.
- Frontend funcional con React y Vite.
- Registro de propuestas desde la interfaz.
- Aviso con check y redirección a Propuestas luego del registro exitoso.
- Lista de propuestas sin botón adicional de nueva propuesta.
- Detalle de propuesta con recuadro compacto y formularios debajo.
- Registro de firmas, comentarios y recursos desde el frontend.
- Límite de demostración de 3 firmas.
- Congelamiento automático al alcanzar el límite.
- Hash criptográfico del expediente congelado.
- Panel Congreso con vista de tarjetas y vista de lista resumida.
- Visualización del detalle de la ley propuesta desde el Panel Congreso.
- Selección de comisión mediante desplegable.
- Asignación de comisión.
- Patrones creacionales: Factory Method, Builder y Singleton.
- Patrones estructurales: Facade, Adapter, Proxy y Composite.
- Documentación final en Markdown.
- Colección Postman final para probar el backend.

## Estructura general

```txt
VozCiudadana/
├── backend/
├── frontend/
├── docs/
├── postman/
└── README.md
```

## Documentación incluida

La carpeta `docs/` contiene únicamente los documentos necesarios para la entrega:

```txt
docs/
├── arquitectura.md
├── requisitos.md
├── casos_uso.md
├── casos_prueba.md
├── patrones_creacionales.md
└── patrones_estructurales.md
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

### 1. Ejecutar MongoDB

Verificar que MongoDB esté activo localmente. La base de datos usada por el sistema es:

```txt
vozciudadana
```

### 2. Ejecutar backend

```bash
cd backend
npm install
npm run dev
```

El backend queda disponible en:

```txt
http://localhost:4000
```

### 3. Ejecutar frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en:

```txt
http://localhost:5173
```

## Flujo de prueba recomendado

1. Entrar a la pantalla **Registrar propuesta**.
2. Completar el formulario y registrar la propuesta.
3. Confirmar que aparece el aviso de registro correcto.
4. Verificar que la app redirige a **Propuestas**.
5. Abrir el detalle de la propuesta.
6. Registrar tres firmas válidas con DNI distintos.
7. Confirmar que la propuesta llega a `3/3 firmas` y se congela.
8. Revisar el hash criptográfico generado.
9. Entrar al **Panel Congreso**.
10. Cambiar entre vista de tarjetas y vista de lista.
11. Ver el detalle de la propuesta desde el panel.
12. Seleccionar una comisión desde el desplegable.
13. Asignar la comisión y verificar que la propuesta queda derivada.

## Consideraciones de demostración

- En un caso real, una iniciativa legislativa ciudadana requiere 25 000 firmas válidas.
- Para la exposición académica, el límite se redujo a **3 firmas**.
- La validación de identidad es simulada.
- No se conecta con RENIEC ni con sistemas oficiales.
- El token del Panel Congreso es de demostración.
- Los archivos `.env` se incluyen para facilitar la ejecución local del proyecto académico.

## Capturas sugeridas para este commit

Para documentar el avance del commit 05, tomar solo dos capturas:

| Captura | Nombre sugerido |
|---|---|
| Proyecto final ejecutándose o carpeta `docs/` con los 6 documentos finales | `commit_05_resultado_documentacion_final` |
| Terminal con el commit y `git log --oneline -1` | `commit_05_terminal_commit` |

## Commit sugerido

```bash
git add .
git commit -m "docs: documentar proyecto final VozCiudadana"
git log --oneline -1
```
