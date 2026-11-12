PLATAFORMA EC0963 PARA NETLIFY

1. Subir esta carpeta a un repositorio privado de GitHub (sin publicar claves).
2. En Netlify: Add new project > Import an existing project > GitHub.
3. Build command: dejar vacio. Publish directory: . ; Functions directory: netlify/functions.
4. En Site configuration > Environment variables, crear ADMIN_KEY con una clave larga y aleatoria. Marcarla como secreto si Netlify ofrece la opcion. Volver a desplegar.
5. Probar con una evaluacion de muestra y comprobar el dashboard usando la clave.
6. Compartir la URL principal para responder. El dashboard se abre con el boton Dashboard de resultados y requiere ADMIN_KEY.

IMPORTANTE: La carga manual de ZIP en Netlify puede no compilar las funciones ni instalar dependencias. Usar despliegue desde Git con build.
No se ha desplegado ni creado una URL publica. Los datos de las participantes se guardan en Netlify Blobs. Restringir el acceso a la clave de administrador y revisar los requisitos de privacidad de datos antes de distribuir.
