# Arquitectura del proyecto VozCiudadana

## 1. Descripción general

**VozCiudadana** es una aplicación web mini orientada a la gestión de propuestas legislativas ciudadanas. El sistema permite registrar propuestas, recolectar firmas de apoyo, agregar comentarios, registrar recursos de apoyo y preparar propuestas congeladas para revisión del Congreso.

La aplicación se plantea como una versión académica y demostrativa. En el caso real, una iniciativa legislativa ciudadana requiere 25 000 firmas válidas; para efectos de prueba, el sistema usa un límite reducido de **3 firmas**.

## 2. Arquitectura general

El proyecto se organiza bajo una arquitectura web cliente-servidor:

```txt
Usuario
  ↓
Frontend React + Vite
  ↓ HTTP / API REST
Backend Express + TypeScript
  ↓
MongoDB
```

## 3. Componentes principales

| Componente | Responsabilidad |
|---|---|
| Frontend | Presentar las pantallas de la aplicación y permitir la interacción del usuario. |
| Backend | Procesar reglas de negocio, validar datos, gestionar propuestas, firmas, comentarios y recursos. |
| MongoDB | Almacenar propuestas, firmas, comentarios, recursos y expedientes legislativos. |
| Documentación | Sustentar requisitos, casos de uso, casos de prueba y patrones aplicados. |
| Postman | Probar los endpoints principales del backend. |

## 4. Estructura base del proyecto

```txt
VozCiudadana/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── patterns/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── docs/
├── postman/
└── README.md
```

## 5. Backend

El backend usa **Express** con **TypeScript**. Su estructura separa responsabilidades para que el sistema sea más fácil de mantener.

| Carpeta | Función |
|---|---|
| `controllers/` | Recibe las peticiones HTTP y devuelve respuestas. |
| `routes/` | Define las rutas de la API. |
| `services/` | Contiene la lógica principal del negocio. |
| `repositories/` | Encapsula el acceso a MongoDB. |
| `models/` | Define las entidades guardadas en la base de datos. |
| `patterns/` | Contendrá los patrones creacionales y estructurales aplicados. |
| `utils/` | Contiene funciones auxiliares como generación de hash o manejo de fechas. |

## 6. Backend implementado hasta el segundo avance

En el segundo avance se implementó la base funcional del backend. Este avance permite registrar propuestas legislativas, listar propuestas, consultar una propuesta por identificador, registrar firmas ciudadanas, evitar firmas duplicadas, agregar comentarios, registrar recursos de apoyo y congelar una propuesta cuando alcanza el límite de demostración de **3 firmas**.

| Módulo backend | Estado |
|---|---|
| Propuestas legislativas | Implementado |
| Firmas ciudadanas | Implementado |
| Validación de firma duplicada | Implementado |
| Comentarios | Implementado |
| Recursos de apoyo | Implementado |
| Congelamiento por 3 firmas | Implementado |
| Generación de hash criptográfico | Implementado |
| Endpoints base del Congreso | Implementado de forma inicial |

## 7. Frontend implementado en el tercer avance

En el tercer avance se implementó el flujo ciudadano del frontend. La interfaz permite navegar entre las pantallas principales, registrar propuestas, listar las propuestas existentes, abrir el detalle de una propuesta, firmar, comentar y agregar recursos de apoyo.

| Pantalla | Estado en commit 03 |
|---|---|
| Inicio | Implementada |
| Registrar propuesta | Implementada con placeholders orientativos |
| Lista de propuestas | Implementada sin botón adicional de nueva propuesta |
| Detalle de propuesta | Implementado con recuadro ancho y formularios debajo |
| Firmar propuesta | Implementado en el detalle |
| Comentar | Implementado en el detalle |
| Agregar recurso | Implementado en el detalle |
| Panel Congreso | Pendiente para commit 04 |

## 8. Base de datos

La base de datos oficial del proyecto debe llamarse:

```txt
vozciudadana
```

Colecciones principales:

| Colección | Uso |
|---|---|
| `proposals` | Guarda las propuestas legislativas. |
| `signatures` | Guarda las firmas ciudadanas. |
| `comments` | Guarda comentarios sobre propuestas. |
| `resources` | Guarda recursos de apoyo. |
| `legislativefiles` | Guarda expedientes congelados. |

## 9. Flujo ciudadano implementado

```txt
Inicio
  ↓
Registrar propuesta
  ↓
Aviso de registro correcto
  ↓
Redirección a Propuestas
  ↓
Lista de propuestas
  ↓
Ver detalle
  ↓
Firmar / comentar / agregar recurso
  ↓
Al llegar a 3 firmas, congelar expediente
```

## 10. Consideraciones de demostración

- La app usa 3 firmas como límite para facilitar la exposición.
- La validación de firmas es simulada.
- El sistema no se conecta con RENIEC ni con servicios oficiales.
- El Panel Congreso completo y los patrones de diseño se incorporarán en el cuarto avance.
- El objetivo principal es demostrar arquitectura, flujo funcional y patrones de diseño.
