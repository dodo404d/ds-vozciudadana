# Patrones estructurales aplicados en VozCiudadana

## 1. Objetivo

Este documento describe los cuatro patrones estructurales aplicados en el proyecto **VozCiudadana**. Los patrones se implementan en el backend dentro de la carpeta `src/patterns/structural`.

## 2. Facade

| Elemento | Descripción |
|---|---|
| Archivo principal | `patterns/structural/facade/CitizenProposalFacade.ts` |
| Uso | Simplificar el acceso a las operaciones ciudadanas. |
| Coordina | Propuestas, firmas, comentarios y recursos. |

El patrón **Facade** centraliza el flujo principal del ciudadano. Los controladores no necesitan conocer todos los servicios internos, sino que llaman a una fachada que coordina el registro de propuestas, firmas, comentarios, recursos y consulta de detalle.

## 3. Adapter

| Elemento | Descripción |
|---|---|
| Archivo principal | `patterns/structural/adapter/SignatureValidatorAdapter.ts` |
| Uso | Simular la validación de una firma ciudadana. |
| Valida | Nombre, DNI y correo electrónico. |

El patrón **Adapter** se usa para adaptar la validación de firmas al sistema actual. En una versión real, esta capa podría reemplazarse por una integración con RENIEC u otra entidad oficial. En la versión mini, valida formato de DNI y correo.

## 4. Proxy

| Elemento | Descripción |
|---|---|
| Archivo principal | `patterns/structural/proxy/CongressAccessProxy.ts` |
| Uso | Controlar el acceso a operaciones del Panel Congreso. |
| Protege | Listado de expedientes, listado de comisiones y asignación de comisión. |

El patrón **Proxy** se aplica para controlar el acceso a las operaciones congresales. Antes de permitir la consulta o modificación de expedientes, verifica un token simple de demostración enviado por el frontend.

## 5. Composite

| Elemento | Descripción |
|---|---|
| Archivo principal | `patterns/structural/composite/LegislativeFileComposite.ts` |
| Uso | Representar el expediente legislativo como un conjunto de partes. |
| Partes | Propuesta, aportes ciudadanos y datos de congelamiento. |

El patrón **Composite** permite tratar el expediente legislativo como una unidad formada por varios componentes. Esto representa mejor el caso del sistema, porque una propuesta congelada no solo contiene texto, sino también firmas, comentarios, recursos y fecha de congelamiento.

## 6. Relación con el flujo del sistema

```txt
Controlador ciudadano
  ↓ Facade
Servicios de propuesta, firma, comentario y recurso
  ↓ Adapter valida firma
Congelamiento del expediente
  ↓ Composite agrupa partes del expediente
Panel Congreso
  ↓ Proxy controla acceso
```

## 7. Justificación general

Los patrones estructurales ayudan a que el sistema sea más ordenado y defendible. La fachada reduce complejidad en los controladores, el adaptador separa la validación de firmas, el proxy protege el panel administrativo y el composite permite representar correctamente un expediente legislativo compuesto.
