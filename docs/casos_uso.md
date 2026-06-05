# Casos de uso del sistema VozCiudadana

## 1. Actores del sistema

| Actor | Descripción |
|---|---|
| Ciudadano o colectivo | Registra propuestas, firma, comenta y agrega recursos de apoyo. |
| Sistema | Valida datos, cuenta firmas, evita duplicados, congela expedientes y genera hash. |
| Administrador Congreso | Revisa propuestas congeladas y las deriva a una comisión. |

## 2. Diagrama textual de casos de uso

```txt
Ciudadano / Colectivo
  ├── Registrar propuesta
  ├── Consultar propuestas
  ├── Ver detalle de propuesta
  ├── Firmar propuesta
  ├── Agregar comentario
  └── Agregar recurso

Sistema
  ├── Validar firma
  ├── Evitar firma duplicada
  ├── Contar firmas
  ├── Congelar expediente
  └── Generar hash criptográfico

Administrador Congreso
  ├── Revisar propuestas congeladas
  ├── Ver detalle de expediente
  ├── Cambiar vista tarjetas/lista
  └── Asignar comisión
```

## CU-01: Registrar propuesta legislativa

| Elemento | Descripción |
|---|---|
| Actor principal | Ciudadano o colectivo |
| Objetivo | Registrar una propuesta legislativa ciudadana. |
| Precondición | La aplicación debe estar ejecutándose. |
| Flujo principal | 1. El usuario ingresa a Registrar propuesta. 2. Completa título, autor, categoría, tipo, resumen y texto normativo. 3. Presiona Registrar propuesta. 4. El sistema valida los campos. 5. El sistema registra la propuesta. 6. Se muestra aviso con check. 7. El sistema redirige a Propuestas. |
| Resultado esperado | La propuesta aparece en la lista de propuestas registradas. |
| Flujo alterno | Si faltan campos obligatorios, el sistema no registra la propuesta y solicita completar la información. |

## CU-02: Consultar propuestas registradas

| Elemento | Descripción |
|---|---|
| Actor principal | Ciudadano |
| Objetivo | Ver las propuestas disponibles. |
| Precondición | Debe existir al menos una propuesta registrada. |
| Flujo principal | 1. El usuario ingresa a Propuestas. 2. El sistema muestra un aviso informativo. 3. El sistema lista las propuestas. 4. El usuario puede presionar Ver detalle. |
| Resultado esperado | El usuario visualiza la lista de propuestas sin botón adicional de nueva propuesta. |

## CU-03: Ver detalle de propuesta

| Elemento | Descripción |
|---|---|
| Actor principal | Ciudadano |
| Objetivo | Revisar el contenido completo de una ley propuesta. |
| Precondición | Debe existir una propuesta registrada. |
| Flujo principal | 1. El usuario presiona Ver detalle. 2. El sistema muestra el recuadro principal de la propuesta. 3. Se muestran título, autor, categoría, resumen, texto normativo, estado y firmas. 4. Debajo aparecen los formularios de firma, comentario y recurso. 5. Al final se muestran comentarios y recursos registrados. |
| Resultado esperado | El detalle aparece de forma compacta y ordenada. |

## CU-04: Firmar propuesta

| Elemento | Descripción |
|---|---|
| Actor principal | Ciudadano |
| Objetivo | Apoyar una propuesta mediante una firma. |
| Precondición | La propuesta debe estar activa. |
| Flujo principal | 1. El ciudadano ingresa nombre y apellidos, DNI y correo. 2. Presiona Registrar firma. 3. El sistema valida los datos. 4. El sistema verifica que el DNI no haya firmado antes la misma propuesta. 5. El sistema registra la firma. 6. El contador de firmas aumenta. |
| Resultado esperado | La firma queda registrada y se actualiza el contador. |
| Flujo alterno | Si el DNI ya fue usado, el sistema rechaza la firma duplicada. |

## CU-05: Agregar comentario o recurso

| Elemento | Descripción |
|---|---|
| Actor principal | Ciudadano |
| Objetivo | Aportar información adicional para sustentar una propuesta. |
| Precondición | La propuesta debe estar activa. |
| Flujo principal | 1. El ciudadano ingresa al detalle. 2. Escribe un comentario o registra un recurso. 3. El sistema valida los campos. 4. El sistema guarda la información. 5. El comentario o recurso aparece al final del detalle. |
| Resultado esperado | El aporte queda asociado a la propuesta. |

## CU-06: Congelar expediente

| Elemento | Descripción |
|---|---|
| Actor principal | Sistema |
| Objetivo | Congelar una propuesta cuando alcance el límite de firmas de demostración. |
| Precondición | La propuesta debe alcanzar 3 firmas válidas. |
| Flujo principal | 1. El sistema registra una nueva firma válida. 2. Actualiza el contador. 3. Verifica si llegó a 3 firmas. 4. Cambia el estado de la propuesta a congelada. 5. Genera el hash criptográfico del expediente. 6. Crea el expediente legislativo. 7. La propuesta queda disponible en el Panel Congreso. |
| Resultado esperado | La propuesta aparece congelada con hash. |

## CU-07: Gestionar propuesta en Panel Congreso

| Elemento | Descripción |
|---|---|
| Actor principal | Administrador Congreso |
| Objetivo | Revisar una propuesta congelada y asignarla a una comisión. |
| Precondición | Debe existir una propuesta congelada. |
| Flujo principal | 1. El administrador entra al Panel Congreso. 2. Visualiza las propuestas congeladas. 3. Puede cambiar entre vista tarjetas y vista lista. 4. Abre el detalle de una propuesta. 5. Selecciona una comisión del desplegable. 6. Presiona Asignar comisión. 7. El sistema actualiza la comisión y el estado. |
| Resultado esperado | La propuesta queda derivada a la comisión seleccionada. |
