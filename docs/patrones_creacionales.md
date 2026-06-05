# Patrones creacionales aplicados en VozCiudadana

## 1. Objetivo

Este documento describe los tres patrones creacionales aplicados en el proyecto **VozCiudadana**. Los patrones se implementan en el backend dentro de la carpeta `src/patterns/creational`.

## 2. Factory Method

| Elemento | Descripción |
|---|---|
| Archivo principal | `patterns/creational/factory/ProposalFactory.ts` |
| Uso | Crear propuestas legislativas normalizando el tipo seleccionado por el usuario. |
| Tipos manejados | Nueva ley, modificación de ley y derogatoria. |

El patrón **Factory Method** permite encapsular la creación de propuestas. En lugar de construir la propuesta directamente en el servicio, se delega esta tarea a una fábrica que prepara los datos, normaliza el tipo de propuesta y asigna el límite de firmas configurado.

Esto ayuda a que el sistema pueda crecer si luego se agregan nuevos tipos de iniciativas legislativas.

## 3. Builder

| Elemento | Descripción |
|---|---|
| Archivo principal | `patterns/creational/builder/LegislativeFileBuilder.ts` |
| Uso | Construir el expediente legislativo congelado. |
| Resultado | Datos del expediente y hash criptográfico. |

El patrón **Builder** se usa cuando una propuesta alcanza el límite de firmas de demostración. El expediente congelado se construye paso a paso con los datos de la propuesta, cantidad de firmas, comentarios, recursos y fecha de congelamiento.

Este patrón resulta útil porque el expediente no depende de un único dato, sino de varios elementos que deben agruparse de forma ordenada antes de generar el hash criptográfico.

## 4. Singleton

| Elemento | Descripción |
|---|---|
| Archivo principal | `patterns/creational/singleton/SystemConfigSingleton.ts` |
| Uso | Centralizar configuración del sistema. |
| Datos gestionados | Límite de firmas, token del Congreso y comisiones disponibles. |

El patrón **Singleton** permite tener una única instancia de configuración del sistema. Desde esta clase se obtiene el límite de firmas de demostración, el token simple de acceso al Panel Congreso y la lista de comisiones disponibles para el desplegable.

## 5. Relación con el flujo del sistema

```txt
Registrar propuesta
  ↓ Factory Method crea la propuesta
Firmar propuesta
  ↓ Singleton proporciona límite de firmas
Alcanzar 3 firmas
  ↓ Builder construye expediente congelado
Generar hash criptográfico
```
