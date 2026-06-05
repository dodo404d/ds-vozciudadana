# Postman - VozCiudadana

La carpeta `postman/` contiene una colección final para probar el backend de VozCiudadana.

Archivo incluido:

```txt
VozCiudadana_final.postman_collection.json
```

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
