# Arquitectura del proyecto VozCiudadana

## 1. Descripción general

**VozCiudadana** es una aplicación web mini orientada a la gestión de propuestas legislativas ciudadanas. El sistema permite registrar propuestas, recolectar firmas de apoyo, agregar comentarios, registrar recursos de apoyo y derivar propuestas congeladas a una comisión desde el Panel Congreso.

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
| `repositories/` | Encapsula el acceso a MongoDB. |
| `models/` | Define las entidades guardadas en la base de datos. |
| `patterns/` | Contendrá los patrones creacionales y estructurales aplicados. |
| `utils/` | Contiene funciones auxiliares como generación de hash o manejo de fechas. |

## 6. Backend implementado en el segundo avance

En el segundo avance del proyecto se implementó la base funcional del backend. Este avance permite registrar propuestas legislativas, listar propuestas, consultar una propuesta por identificador, registrar firmas ciudadanas, evitar firmas duplicadas, agregar comentarios, registrar recursos de apoyo y congelar una propuesta cuando alcanza el límite de demostración de **3 firmas**.

La arquitectura backend mantiene la separación por capas:

| Capa | Responsabilidad en el avance 02 |
|---|---|
| Controllers | Reciben las peticiones HTTP y devuelven respuestas al cliente. |
| Routes | Organizan los endpoints de propuestas, firmas, comentarios, recursos y Congreso. |
| Services | Ejecutan la lógica de negocio, como validar firmas y congelar expedientes. |
| Repositories | Centralizan las operaciones de consulta y guardado en MongoDB. |
| Models | Representan propuestas, firmas, comentarios, recursos y expedientes legislativos. |
| Utils | Apoyan tareas internas como generación de hash criptográfico. |

## 7. Estado de módulos en el segundo avance

| Módulo backend | Estado en commit 02 |
|---|---|
| Propuestas legislativas | Implementado |
| Firmas ciudadanas | Implementado |
| Validación de firma duplicada | Implementado |
| Comentarios | Implementado |
| Recursos de apoyo | Implementado |
| Congelamiento por 3 firmas | Implementado |
| Generación de hash criptográfico | Implementado |
| Endpoints base del Congreso | Implementado de forma inicial |
| Panel Congreso completo | Pendiente para commit 04 |
| Patrones de diseño | Pendiente para commit 04 |

## 8. Frontend

El frontend usa **React + Vite**. La interfaz se divide en páginas y componentes reutilizables.

| Carpeta | Función |
|---|---|
| `pages/` | Pantallas principales: inicio, registro, propuestas, detalle y panel Congreso. |
| `components/` | Elementos reutilizables como tarjetas, formularios y secciones. |
| `services/` | Comunicación con la API del backend. |
| `types/` | Tipos de datos usados por el frontend. |
| `styles/` | Estilos globales de la aplicación. |

En el segundo avance, el frontend se mantiene como base inicial. El flujo ciudadano completo será desarrollado en el tercer avance.

## 9. Base de datos

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

## 10. Flujo principal del sistema

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

## 11. Flujo implementado hasta el segundo avance

```txt
Registrar propuesta por API
  ↓
Listar propuestas por API
  ↓
Consultar propuesta por API
  ↓
Registrar firma por API
  ↓
Validar duplicado por DNI
  ↓
Agregar comentario o recurso por API
  ↓
Al llegar a 3 firmas, congelar expediente
  ↓
Generar hash criptográfico
```

## 12. Consideraciones de demostración

- La app usa 3 firmas como límite para facilitar la exposición.
- La validación de firmas es simulada.
- El panel Congreso usa acceso simple de demostración.
- El sistema no se conecta con RENIEC ni con servicios oficiales.
- El objetivo principal es demostrar arquitectura, flujo funcional y patrones de diseño.
- Los patrones creacionales y estructurales se documentarán cuando sean incorporados en el avance correspondiente.