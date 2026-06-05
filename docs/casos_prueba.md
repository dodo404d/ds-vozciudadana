# Casos de prueba del sistema VozCiudadana

## 1. Objetivo

Definir pruebas funcionales mínimas para comprobar que la aplicación VozCiudadana cumple el flujo principal: registrar propuestas, consultarlas, firmarlas, agregar aportes, congelarlas al llegar al límite de demostración y derivarlas desde el Panel Congreso.

## 2. Consideraciones de prueba

- El límite de firmas para la demo es **3 firmas**.
- La base de datos debe llamarse **vozciudadana**.
- La validación de identidad es simulada.
- Se recomienda iniciar con la base limpia para capturar evidencias ordenadas.
- En el tercer avance ya se pueden probar las funciones ciudadanas desde el frontend.

## 3. Pruebas correspondientes al tercer avance

En el tercer avance se validan el backend y el frontend ciudadano. Las pruebas del Panel Congreso completo se realizarán en el cuarto avance.

| Caso de prueba | Estado en commit 03 |
|---|---|
| CP-01 Registrar propuesta válida | Probable desde frontend |
| CP-02 Validar campos obligatorios | Probable desde frontend |
| CP-03 Listar propuestas | Probable desde frontend |
| CP-04 Ver detalle de propuesta | Probable desde frontend |
| CP-05 Registrar firma válida | Probable desde frontend |
| CP-06 Rechazar firma duplicada | Probable desde frontend |
| CP-07 Agregar comentario | Probable desde frontend |
| CP-08 Agregar recurso de apoyo | Probable desde frontend |
| CP-09 Congelar propuesta al llegar a 3 firmas | Probable desde frontend/API |
| CP-10 Ver propuesta en Panel Congreso | Pendiente para avance posterior |
| CP-11 Asignar comisión | Pendiente para avance posterior |
| CP-12 Cambiar vista del Panel Congreso | Pendiente para avance posterior |

## CP-01: Registrar propuesta válida

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que una propuesta se registre correctamente. |
| Datos de entrada | Título, autor, categoría, tipo, resumen y texto normativo completos. |
| Pasos | 1. Entrar a Registrar propuesta. 2. Completar los campos. 3. Presionar Registrar propuesta. |
| Resultado esperado | Aparece un aviso con check indicando que la propuesta se registró correctamente y luego se redirige a Propuestas. |
| Estado en commit 03 | Probable desde frontend. |

## CP-02: Validar campos obligatorios

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el sistema no permita registrar propuestas incompletas. |
| Datos de entrada | Formulario con uno o más campos vacíos. |
| Pasos | 1. Entrar a Registrar propuesta. 2. Dejar campos obligatorios vacíos. 3. Intentar registrar. |
| Resultado esperado | El sistema solicita completar los campos requeridos. |
| Estado en commit 03 | Probable desde frontend. |

## CP-03: Listar propuestas

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que la propuesta registrada aparezca en la lista. |
| Datos de entrada | Una propuesta previamente registrada. |
| Pasos | 1. Entrar a Propuestas. 2. Revisar la lista. |
| Resultado esperado | Se muestra la propuesta creada, el aviso informativo y el botón Ver detalle. No aparece el botón Nueva propuesta. |
| Estado en commit 03 | Probable desde frontend. |

## CP-04: Ver detalle de propuesta

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el detalle muestre la información completa de la propuesta. |
| Datos de entrada | Propuesta registrada. |
| Pasos | 1. Entrar a Propuestas. 2. Presionar Ver detalle. |
| Resultado esperado | Se muestra un recuadro compacto y ancho con título, resumen, texto normativo, estado y firmas. Debajo aparecen Firmar, Comentar y Agregar recurso. |
| Estado en commit 03 | Probable desde frontend. |

## CP-05: Registrar firma válida

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que una firma válida aumente el contador. |
| Datos de entrada | Nombre y apellidos, DNI y correo. |
| Pasos | 1. Abrir detalle. 2. Completar formulario de firma. 3. Presionar Registrar firma. |
| Resultado esperado | La firma se registra y el contador aumenta, por ejemplo de 0/3 a 1/3. |
| Estado en commit 03 | Probable desde frontend. |

## CP-06: Rechazar firma duplicada

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que un mismo DNI no pueda firmar dos veces la misma propuesta. |
| Datos de entrada | Mismo DNI usado en una firma anterior. |
| Pasos | 1. Abrir detalle. 2. Intentar firmar otra vez con el mismo DNI. |
| Resultado esperado | El sistema rechaza la firma duplicada y no aumenta el contador. |
| Estado en commit 03 | Probable desde frontend. |

## CP-07: Agregar comentario

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el comentario se registre y se muestre al final del detalle. |
| Datos de entrada | Nombre del ciudadano y comentario. |
| Pasos | 1. Abrir detalle. 2. Completar formulario Comentar. 3. Presionar Agregar comentario. |
| Resultado esperado | El comentario aparece en la sección Comentarios. |
| Estado en commit 03 | Probable desde frontend. |

## CP-08: Agregar recurso de apoyo

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que un recurso se asocie a la propuesta. |
| Datos de entrada | Título, enlace y descripción del recurso. |
| Pasos | 1. Abrir detalle. 2. Completar formulario Agregar recurso. 3. Presionar Agregar recurso. |
| Resultado esperado | El recurso aparece en la sección Recursos de apoyo. |
| Estado en commit 03 | Probable desde frontend. |

## CP-09: Congelar propuesta al llegar a 3 firmas

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que la propuesta se congele al alcanzar el límite de demostración. |
| Datos de entrada | Tres firmas válidas con DNI distintos. |
| Pasos | 1. Registrar tres firmas válidas. 2. Observar el estado de la propuesta. |
| Resultado esperado | La propuesta cambia a congelada o derivable, se genera hash criptográfico y aparece como expediente congelado. |
| Estado en commit 03 | Probable desde frontend/API. |

## CP-10: Ver propuesta en Panel Congreso

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el Panel Congreso muestre propuestas congeladas. |
| Datos de entrada | Propuesta congelada. |
| Pasos | 1. Entrar al Panel Congreso. 2. Revisar la propuesta. |
| Resultado esperado | Se visualiza la propuesta, firmas, hash, estado y acciones disponibles. |
| Estado en commit 03 | Pendiente para avance posterior. |

## CP-11: Asignar comisión

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el administrador pueda derivar una propuesta a una comisión. |
| Datos de entrada | Comisión seleccionada desde el desplegable. |
| Pasos | 1. Entrar al Panel Congreso. 2. Seleccionar comisión. 3. Presionar Asignar comisión. |
| Resultado esperado | La propuesta queda derivada a la comisión seleccionada. |
| Estado en commit 03 | Pendiente para avance posterior. |

## CP-12: Cambiar vista del Panel Congreso

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el Panel Congreso muestre vista tarjetas y vista lista. |
| Datos de entrada | Propuestas congeladas. |
| Pasos | 1. Entrar al Panel Congreso. 2. Cambiar entre Vista tarjetas y Vista lista. |
| Resultado esperado | Ambas vistas muestran la información de manera correcta. |
| Estado en commit 03 | Pendiente para avance posterior. |
