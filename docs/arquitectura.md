# Arquitectura del proyecto VozCiudadana

## 1. Descripción general

**VozCiudadana** es una aplicación web mini orientada a la gestión de propuestas legislativas ciudadanas. El sistema permite registrar propuestas, recolectar firmas de apoyo, agregar comentarios, registrar recursos de apoyo y derivar propuestas congeladas a una comisión desde el panel del Congreso.

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
│   │   │   ├── creational/
│   │   │   └── structural/
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
│   │   ├── types/
│   │   └── styles/
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
| `repositories/` | Accede a los modelos y base de datos. |
| `models/` | Define las entidades guardadas en MongoDB. |
| `patterns/` | Contiene los patrones creacionales y estructurales aplicados. |
| `utils/` | Funciones auxiliares como generación de hash o manejo de fechas. |

## 6. Frontend

El frontend usa **React + Vite**. La interfaz se divide en páginas y componentes reutilizables.

| Carpeta | Función |
|---|---|
| `pages/` | Pantallas principales: inicio, registro, propuestas, detalle y panel Congreso. |
| `components/` | Elementos reutilizables como tarjetas, formularios y secciones. |
| `services/` | Comunicación con la API del backend. |
| `types/` | Tipos de datos usados por el frontend. |
| `styles/` | Estilos globales de la aplicación. |

## 7. Base de datos

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

## 8. Flujo principal del sistema

```txt
Registrar propuesta
  ↓
Listar propuestas
  ↓
Ver detalle
  ↓
Firmar / comentar / agregar recurso
  ↓
Llegar a 3 firmas en demo
  ↓
Congelar expediente
  ↓
Generar hash criptográfico
  ↓
Mostrar en Panel Congreso
  ↓
Asignar comisión
```

## 9. Consideraciones de demostración

- La app usa 3 firmas como límite para facilitar la exposición.
- La validación de firmas es simulada.
- El panel Congreso usa acceso simple de demostración.
- El sistema no se conecta con RENIEC ni con servicios oficiales.
- El objetivo principal es demostrar arquitectura, flujo funcional y patrones de diseño.
