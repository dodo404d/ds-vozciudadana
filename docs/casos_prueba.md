# Casos de prueba del sistema VozCiudadana

## 1. Objetivo

Definir pruebas funcionales mínimas para comprobar que la aplicación VozCiudadana cumple el flujo principal: registrar propuestas, consultarlas, firmarlas, agregar aportes, congelarlas al llegar al límite de demostración y derivarlas desde el Panel Congreso.

## 2. Consideraciones de prueba

- El límite de firmas para la demo es **3 firmas**.
- La base de datos debe llamarse **vozciudadana**.
- La validación de identidad es simulada.
- Se recomienda iniciar con la base limpia para capturar evidencias ordenadas.
- En el segundo avance, las pruebas se realizan principalmente mediante backend, Postman o solicitudes HTTP.

## 3. Pruebas correspondientes al segundo avance

En el segundo avance se validan principalmente los endpoints del backend. Las pruebas visuales completas desde el frontend se realizarán en los siguientes avances.

| Caso de prueba | Estado en commit 02 |
|---|---|
| CP-01 Registrar propuesta válida | Probable por API |
| CP-03 Listar propuestas | Probable por API |
| CP-05 Registrar firma válida | Probable por API |
| CP-06 Rechazar firma duplicada | Probable por API |
| CP-07 Agregar comentario | Probable por API |
| CP-08 Agregar recurso de apoyo | Probable por API |
| CP-09 Congelar propuesta al llegar a 3 firmas | Probable por API |
| CP-10 Ver propuesta en Panel Congreso | Parcial, mediante endpoint base |
| CP-11 Asignar comisión | Pendiente para avance posterior |
| CP-12 Cambiar vista del Panel Congreso | Pendiente para avance posterior |

## CP-01: Registrar propuesta válida

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que una propuesta se registre correctamente. |
| Datos de entrada | Título, autor, categoría, tipo, resumen y texto normativo completos. |
| Pasos | 1. Entrar a Registrar propuesta o usar el endpoint de creación. 2. Completar los campos. 3. Enviar la solicitud de registro. |
| Resultado esperado | La propuesta se registra correctamente. En el frontend final debe aparecer un aviso con check y luego redirigir a Propuestas. |
| Estado en commit 02 | Probable mediante API. |

## CP-02: Validar campos obligatorios

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el sistema no permita registrar propuestas incompletas. |
| Datos de entrada | Formulario o solicitud con uno o más campos vacíos. |
| Pasos | 1. Intentar registrar una propuesta incompleta. 2. Enviar la solicitud. |
| Resultado esperado | El sistema solicita completar los campos requeridos o rechaza la solicitud. |
| Estado en commit 02 | Probable mediante API, según validaciones implementadas. |

## CP-03: Listar propuestas

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que la propuesta registrada aparezca en la lista. |
| Datos de entrada | Una propuesta previamente registrada. |
| Pasos | 1. Ejecutar la consulta de listado de propuestas. 2. Revisar la respuesta del sistema. |
| Resultado esperado | Se muestra la propuesta creada. En el frontend final también debe aparecer el aviso informativo y el botón Ver detalle. |
| Estado en commit 02 | Probable mediante API. |

## CP-04: Ver detalle de propuesta

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el detalle muestre la información completa de la propuesta. |
| Datos de entrada | Propuesta registrada. |
| Pasos | 1. Consultar una propuesta por su identificador. 2. Revisar la información devuelta. |
| Resultado esperado | Se muestra título, resumen, texto normativo, autor, estado, categoría y cantidad de firmas. En el frontend final, debajo aparecerán Firmar, Comentar y Agregar recurso. |
| Estado en commit 02 | Probable mediante API. |

## CP-05: Registrar firma válida

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que una firma válida aumente el contador. |
| Datos de entrada | Nombre y apellidos, DNI y correo. |
| Pasos | 1. Seleccionar una propuesta activa. 2. Registrar una firma con DNI no repetido. 3. Consultar nuevamente la propuesta. |
| Resultado esperado | La firma se registra y el contador aumenta, por ejemplo de 0/3 a 1/3. |
| Estado en commit 02 | Probable mediante API. |

## CP-06: Rechazar firma duplicada

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que un mismo DNI no pueda firmar dos veces la misma propuesta. |
| Datos de entrada | Mismo DNI usado en una firma anterior. |
| Pasos | 1. Registrar una firma válida. 2. Intentar registrar otra firma con el mismo DNI en la misma propuesta. |
| Resultado esperado | El sistema rechaza la firma duplicada y no aumenta el contador. |
| Estado en commit 02 | Probable mediante API. |

## CP-07: Agregar comentario

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el comentario se registre y quede asociado a la propuesta. |
| Datos de entrada | Nombre del ciudadano y comentario. |
| Pasos | 1. Seleccionar una propuesta. 2. Registrar un comentario. 3. Consultar el detalle de la propuesta. |
| Resultado esperado | El comentario queda asociado a la propuesta. En el frontend final aparecerá en la sección Comentarios. |
| Estado en commit 02 | Probable mediante API. |

## CP-08: Agregar recurso de apoyo

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que un recurso se asocie a la propuesta. |
| Datos de entrada | Título, enlace y descripción del recurso. |
| Pasos | 1. Seleccionar una propuesta. 2. Registrar un recurso de apoyo. 3. Consultar el detalle de la propuesta. |
| Resultado esperado | El recurso queda asociado a la propuesta. En el frontend final aparecerá en la sección Recursos de apoyo. |
| Estado en commit 02 | Probable mediante API. |

## CP-09: Congelar propuesta al llegar a 3 firmas

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que la propuesta se congele al alcanzar el límite de demostración. |
| Datos de entrada | Tres firmas válidas con DNI distintos. |
| Pasos | 1. Registrar tres firmas válidas para la misma propuesta. 2. Consultar el estado de la propuesta. |
| Resultado esperado | La propuesta cambia a congelada o derivable, se genera hash criptográfico y queda disponible para el Panel Congreso. |
| Estado en commit 02 | Probable mediante API. |

## CP-10: Ver propuesta en Panel Congreso

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el Panel Congreso muestre propuestas congeladas. |
| Datos de entrada | Propuesta congelada. |
| Pasos | 1. Consultar las propuestas congeladas o expedientes disponibles para Congreso. |
| Resultado esperado | Se visualiza la propuesta congelada con firmas, hash y estado. |
| Estado en commit 02 | Parcial mediante endpoint base. La interfaz final se completará en avances posteriores. |

## CP-11: Asignar comisión

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el administrador pueda derivar una propuesta a una comisión. |
| Datos de entrada | Comisión seleccionada desde el desplegable. |
| Pasos | 1. Entrar al Panel Congreso. 2. Seleccionar comisión. 3. Presionar Asignar comisión. |
| Resultado esperado | La propuesta queda derivada a la comisión seleccionada. |
| Estado en commit 02 | Pendiente para avance posterior. |

## CP-12: Cambiar vista del Panel Congreso

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el Panel Congreso muestre vista tarjetas y vista lista. |
| Datos de entrada | Propuestas congeladas. |
| Pasos | 1. Entrar al Panel Congreso. 2. Cambiar entre Vista tarjetas y Vista lista. |
| Resultado esperado | Ambas vistas muestran la información de manera correcta. |
| Estado en commit 02 | Pendiente para avance posterior. |