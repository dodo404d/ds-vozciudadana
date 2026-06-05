# Casos de prueba del sistema VozCiudadana

## 1. Objetivo

Definir pruebas funcionales mínimas para comprobar que la aplicación VozCiudadana cumple el flujo principal: registrar propuestas, consultarlas, firmarlas, agregar aportes, congelarlas al llegar al límite de demostración y derivarlas desde el Panel Congreso.

## 2. Consideraciones de prueba

- El límite de firmas para la demo es **3 firmas**.
- La base de datos debe llamarse **vozciudadana**.
- La validación de identidad es simulada.
- Se recomienda iniciar con la base limpia para capturar evidencias ordenadas.
- Desde el cuarto avance, el Panel Congreso y los patrones de diseño ya se encuentran incorporados.

## 3. Estado de pruebas por avance

| Caso de prueba | Estado en commit 04 |
|---|---|
| CP-01 Registrar propuesta válida | Implementado |
| CP-02 Validar campos obligatorios | Implementado |
| CP-03 Listar propuestas | Implementado |
| CP-04 Ver detalle de propuesta | Implementado |
| CP-05 Registrar firma válida | Implementado |
| CP-06 Rechazar firma duplicada | Implementado |
| CP-07 Agregar comentario | Implementado |
| CP-08 Agregar recurso de apoyo | Implementado |
| CP-09 Congelar propuesta al llegar a 3 firmas | Implementado |
| CP-10 Ver propuesta en Panel Congreso | Implementado |
| CP-11 Asignar comisión | Implementado |
| CP-12 Cambiar vista del Panel Congreso | Implementado |

## CP-01: Registrar propuesta válida

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que una propuesta se registre correctamente. |
| Datos de entrada | Título, autor, categoría, tipo, resumen y texto normativo completos. |
| Pasos | 1. Entrar a Registrar propuesta. 2. Completar los campos. 3. Presionar Registrar propuesta. |
| Resultado esperado | Aparece un aviso con check indicando que la propuesta se registró correctamente y luego se redirige a Propuestas. |

## CP-02: Validar campos obligatorios

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el sistema no permita registrar propuestas incompletas. |
| Datos de entrada | Formulario con uno o más campos vacíos. |
| Pasos | 1. Entrar a Registrar propuesta. 2. Dejar campos obligatorios vacíos. 3. Intentar registrar. |
| Resultado esperado | El sistema solicita completar los campos requeridos. |

## CP-03: Listar propuestas

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que la propuesta registrada aparezca en la lista. |
| Datos de entrada | Una propuesta previamente registrada. |
| Pasos | 1. Entrar a Propuestas. 2. Revisar la lista. |
| Resultado esperado | Se muestra la propuesta creada, el aviso informativo y el botón Ver detalle. No aparece el botón Nueva propuesta. |

## CP-04: Ver detalle de propuesta

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el detalle muestre la información completa de la propuesta. |
| Datos de entrada | Propuesta registrada. |
| Pasos | 1. Entrar a Propuestas. 2. Presionar Ver detalle. |
| Resultado esperado | Se muestra un recuadro compacto y ancho con título, resumen, texto normativo, estado y firmas. Debajo aparecen Firmar, Comentar y Agregar recurso. |

## CP-05: Registrar firma válida

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que una firma válida aumente el contador. |
| Datos de entrada | Nombre y apellidos, DNI y correo. |
| Pasos | 1. Abrir detalle. 2. Completar formulario de firma. 3. Presionar Registrar firma. |
| Resultado esperado | La firma se registra y el contador aumenta, por ejemplo de 0/3 a 1/3. |

## CP-06: Rechazar firma duplicada

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que un mismo DNI no pueda firmar dos veces la misma propuesta. |
| Datos de entrada | Mismo DNI usado en una firma anterior. |
| Pasos | 1. Abrir detalle. 2. Intentar firmar otra vez con el mismo DNI. |
| Resultado esperado | El sistema rechaza la firma duplicada y no aumenta el contador. |

## CP-07: Agregar comentario

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el comentario se registre y se muestre al final del detalle. |
| Datos de entrada | Nombre del ciudadano y comentario. |
| Pasos | 1. Abrir detalle. 2. Completar formulario Comentar. 3. Presionar Agregar comentario. |
| Resultado esperado | El comentario aparece en la sección Comentarios. |

## CP-08: Agregar recurso de apoyo

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que un recurso se asocie a la propuesta. |
| Datos de entrada | Título, enlace y descripción del recurso. |
| Pasos | 1. Abrir detalle. 2. Completar formulario Agregar recurso. 3. Presionar Agregar recurso. |
| Resultado esperado | El recurso aparece en la sección Recursos de apoyo. |

## CP-09: Congelar propuesta al llegar a 3 firmas

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que la propuesta se congele al alcanzar el límite de demostración. |
| Datos de entrada | Tres firmas válidas con DNI distintos. |
| Pasos | 1. Registrar tres firmas válidas. 2. Observar el estado de la propuesta. |
| Resultado esperado | La propuesta cambia a congelada, se genera hash criptográfico y aparece en el Panel Congreso. |

## CP-10: Ver propuesta en Panel Congreso

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el Panel Congreso muestre propuestas congeladas. |
| Datos de entrada | Propuesta congelada. |
| Pasos | 1. Entrar al Panel Congreso. 2. Revisar la vista de tarjetas. |
| Resultado esperado | Se visualiza la propuesta, firmas, hash, estado y acciones disponibles. |

## CP-11: Asignar comisión

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el administrador pueda derivar una propuesta a una comisión. |
| Datos de entrada | Comisión seleccionada desde el desplegable. |
| Pasos | 1. Entrar al Panel Congreso. 2. Seleccionar comisión. 3. Presionar Asignar comisión. |
| Resultado esperado | La propuesta queda derivada a la comisión seleccionada. |

## CP-12: Cambiar vista del Panel Congreso

| Campo | Detalle |
|---|---|
| Objetivo | Verificar que el Panel Congreso muestre vista tarjetas y vista lista. |
| Datos de entrada | Propuestas congeladas. |
| Pasos | 1. Entrar al Panel Congreso. 2. Cambiar entre Vista tarjetas y Vista lista. |
| Resultado esperado | Ambas vistas muestran la información de manera correcta. |
