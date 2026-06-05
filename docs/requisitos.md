# Requisitos del sistema VozCiudadana

## 1. Objetivo del sistema

Desarrollar una aplicación web mini llamada **VozCiudadana** que permita registrar propuestas legislativas ciudadanas, recolectar firmas de apoyo, recibir comentarios y recursos, congelar el expediente cuando se alcance el límite de firmas de demostración y derivarlo a una comisión desde el Panel Congreso.

## 2. Alcance

El sistema cubre un flujo reducido pero completo:

```txt
Registro de propuesta → Apoyo ciudadano → Congelamiento → Revisión Congreso
```

No se implementan servicios externos reales, redes neuronales, mapas, validación oficial de identidad ni firma digital real. La aplicación se mantiene simple para fines académicos.

## 3. Requisitos funcionales

| Código | Requisito funcional |
|---|---|
| RF-01 | El sistema debe permitir registrar una propuesta legislativa ciudadana. |
| RF-02 | El formulario de registro debe mostrar campos vacíos con placeholders orientativos. |
| RF-03 | El sistema debe permitir listar las propuestas registradas. |
| RF-04 | La lista de propuestas no debe mostrar un botón adicional de nueva propuesta. |
| RF-05 | La lista de propuestas debe incluir un aviso indicando que el usuario puede apoyar una iniciativa desde el detalle. |
| RF-06 | El sistema debe permitir ver el detalle completo de una propuesta. |
| RF-07 | El detalle debe mostrar título, autor, categoría, resumen, texto normativo, estado y número de firmas. |
| RF-08 | El ciudadano debe poder registrar una firma de apoyo en una propuesta activa. |
| RF-09 | El sistema debe evitar que un mismo DNI firme dos veces la misma propuesta. |
| RF-10 | El ciudadano debe poder agregar comentarios a una propuesta activa. |
| RF-11 | El ciudadano debe poder agregar recursos de apoyo mediante título, enlace y descripción. |
| RF-12 | El sistema debe congelar una propuesta cuando alcance el límite de firmas configurado. |
| RF-13 | El sistema debe generar un hash criptográfico del expediente congelado. |
| RF-14 | La propuesta congelada debe mostrarse en el Panel Congreso. |
| RF-15 | El Panel Congreso debe permitir ver el detalle de la propuesta. |
| RF-16 | El Panel Congreso debe permitir seleccionar una comisión desde un desplegable. |
| RF-17 | El Panel Congreso debe permitir asignar una comisión a una propuesta congelada. |
| RF-18 | El Panel Congreso debe mostrar vista en tarjetas y vista en lista resumida. |
| RF-19 | Luego de registrar una propuesta, el sistema debe mostrar un aviso de éxito con check. |
| RF-20 | Luego del aviso de éxito, el sistema debe redirigir a la pestaña Propuestas. |

## 4. Requisitos no funcionales

| Código | Requisito no funcional |
|---|---|
| RNF-01 | La aplicación debe ser sencilla y ejecutarse localmente. |
| RNF-02 | El backend debe estar desarrollado con Express y TypeScript. |
| RNF-03 | El frontend debe estar desarrollado con React y Vite. |
| RNF-04 | La base de datos debe usar MongoDB. |
| RNF-05 | El nombre de la base de datos debe ser `vozciudadana`. |
| RNF-06 | La aplicación debe usar una paleta sobria y presentable. |
| RNF-07 | El código debe organizarse por capas: controladores, servicios, repositorios y modelos. |
| RNF-08 | El proyecto debe incluir patrones creacionales y estructurales documentados. |
| RNF-09 | El proyecto debe incluir documentación en Markdown. |
| RNF-10 | El proyecto debe incluir archivos `.env` de demostración para facilitar la ejecución. |

## 5. Reglas de negocio

| Código | Regla |
|---|---|
| RN-01 | Una propuesta recién registrada inicia en estado activa. |
| RN-02 | Una propuesta activa puede recibir firmas, comentarios y recursos. |
| RN-03 | Un ciudadano no puede firmar dos veces la misma propuesta con el mismo DNI. |
| RN-04 | En el caso real, el límite constitucional es de 25 000 firmas válidas. |
| RN-05 | Para la demostración académica, el límite se reduce a 3 firmas. |
| RN-06 | Al alcanzar 3 firmas válidas, la propuesta se congela automáticamente. |
| RN-07 | Una propuesta congelada debe generar un hash criptográfico. |
| RN-08 | Una propuesta congelada pasa al Panel Congreso. |
| RN-09 | Una propuesta congelada puede ser derivada a una comisión. |
| RN-10 | La comisión debe seleccionarse desde una lista desplegable, no escribirse manualmente. |

## 6. Datos principales del sistema

### Propuesta

```txt
título
autor
categoría
tipo de propuesta
resumen
texto normativo
estado
cantidad de firmas
límite de firmas
hash del expediente
comisión asignada
fecha de creación
fecha de congelamiento
```

### Firma

```txt
nombre y apellidos
DNI
correo
propuesta asociada
fecha de firma
estado de validez
```

### Comentario

```txt
nombre del ciudadano
contenido del comentario
propuesta asociada
fecha de registro
```

### Recurso

```txt
título del recurso
enlace o URL
descripción
propuesta asociada
fecha de registro
```
