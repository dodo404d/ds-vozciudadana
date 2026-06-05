# Arquitectura del proyecto VozCiudadana

## 1. Descripción general

**VozCiudadana** es una aplicación web mini orientada a la gestión de propuestas legislativas ciudadanas. El sistema permite registrar propuestas, recolectar firmas de apoyo, agregar comentarios, registrar recursos de apoyo, congelar expedientes al alcanzar el límite de demostración y derivar propuestas a una comisión desde el Panel Congreso.

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
| Backend | Procesar reglas de negocio, validar datos, gestionar propuestas, firmas, comentarios, recursos y expedientes. |
| MongoDB | Almacenar propuestas, firmas, comentarios, recursos y expedientes legislativos. |
| Patrones de diseño | Organizar la creación de objetos, validaciones, acceso al panel y construcción del expediente. |
| Documentación | Sustentar requisitos, casos de uso, casos de prueba y patrones aplicados. |
| Postman | Probar los endpoints principales del backend. |

## 4. Estructura del proyecto

```txt
VozCiudadana/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── patterns/
│   │   │   ├── creational/
│   │   │   │   ├── builder/
│   │   │   │   ├── factory/
│   │   │   │   └── singleton/
│   │   │   └── structural/
│   │   │       ├── adapter/
│   │   │       ├── composite/
│   │   │       ├── facade/
│   │   │       └── proxy/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
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

## 5. Arquitectura del backend

El backend usa **Express** con **TypeScript**. Su estructura separa responsabilidades para que el sistema sea más fácil de mantener.

| Carpeta | Función |
|---|---|
| `config/` | Configura la conexión con MongoDB. |
| `controllers/` | Recibe las peticiones HTTP y devuelve respuestas. |
| `routes/` | Define las rutas de la API. |
| `services/` | Contiene la lógica principal del negocio. |
| `repositories/` | Encapsula el acceso a MongoDB. |
| `models/` | Define las entidades guardadas en la base de datos. |
| `patterns/` | Contiene los patrones creacionales y estructurales aplicados. |
| `utils/` | Contiene funciones auxiliares como generación de hash y configuración. |

## 6. Módulos backend implementados

| Módulo backend | Estado final |
|---|---|
| Propuestas legislativas | Implementado |
| Firmas ciudadanas | Implementado |
| Validación de firma duplicada | Implementado |
| Comentarios | Implementado |
| Recursos de apoyo | Implementado |
| Congelamiento por 3 firmas | Implementado |
| Generación de hash criptográfico | Implementado |
| Endpoints del Panel Congreso | Implementado |
| Asignación de comisión | Implementado |
| Patrones creacionales | Implementados |
| Patrones estructurales | Implementados |

## 7. Arquitectura del frontend

El frontend usa **React + Vite**. La interfaz se organiza en páginas principales y una capa de servicios para comunicarse con el backend.

| Carpeta o archivo | Función |
|---|---|
| `pages/` | Pantallas principales: inicio, registro, propuestas, detalle y panel Congreso. |
| `services/` | Comunicación con la API del backend. |
| `styles/` | Estilos globales de la aplicación. |
| `types.ts` | Tipos de datos usados por el frontend. |
| `App.tsx` | Organización principal de navegación. |
| `main.tsx` | Punto de entrada de React. |

## 8. Pantallas principales

| Pantalla | Función |
|---|---|
| Inicio | Presenta el sistema y permite acceder a los módulos principales. |
| Registrar propuesta | Permite registrar una propuesta legislativa con placeholders orientativos. |
| Propuestas | Lista las propuestas registradas sin botón adicional de nueva propuesta. |
| Detalle de propuesta | Muestra la ley propuesta, firmas, comentarios, recursos y formularios de apoyo. |
| Panel Congreso | Permite revisar propuestas congeladas y derivarlas a una comisión. |

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

## 10. Flujo funcional completo

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
  ↓
Generar hash criptográfico
  ↓
Mostrar expediente en Panel Congreso
  ↓
Ver detalle de ley propuesta
  ↓
Seleccionar comisión desde desplegable
  ↓
Asignar comisión
```

## 11. Patrones integrados en la arquitectura

| Tipo | Patrones usados |
|---|---|
| Creacionales | Factory Method, Builder y Singleton. |
| Estructurales | Facade, Adapter, Proxy y Composite. |

Estos patrones se ubican en la carpeta `backend/src/patterns/` y se documentan de forma específica en `patrones_creacionales.md` y `patrones_estructurales.md`.

## 12. Consideraciones de demostración

- La app usa 3 firmas como límite para facilitar la exposición.
- La validación de firmas es simulada.
- El sistema no se conecta con RENIEC ni con servicios oficiales.
- El acceso al Panel Congreso se controla mediante un token simple de demostración.
- El objetivo principal es demostrar arquitectura, flujo funcional y patrones de diseño.
