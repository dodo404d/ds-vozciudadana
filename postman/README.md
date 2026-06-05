# Postman - VozCiudadana

Este avance incluye una colección de pruebas mínimas para validar el backend de propuestas, firmas, comentarios, recursos, congelamiento y operaciones básicas del Panel Congreso.

## Uso recomendado

1. Ejecutar MongoDB local.
2. Ejecutar el backend en `http://localhost:4000`.
3. Importar la colección en Postman.
4. Ejecutar `Crear propuesta`.
5. Copiar el `_id` de la propuesta creada.
6. Guardarlo en la variable `proposalId`.
7. Probar firmas, comentario, recurso y congelamiento con 3 firmas.
8. Para las rutas del Congreso, usar la variable `congressAccessToken` con el valor `demo-congreso`.

El límite de demostración es:

```env
SIGNATURE_LIMIT=3
```
