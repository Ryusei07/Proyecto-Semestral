ShibuyaStore - E-commerce de Figuras de Anime
ShibuyaStore es un proyecto full-stack de E-commerce (tienda virtual) diseñado para la venta de figuras de anime. La aplicación está dividida en dos componentes principales: un Backend (API REST) robusto construido con Spring Boot y un Frontend (Cliente) interactivo construido con React.

El proyecto implementa un panel de administración completo que permite la gestión de inventario, usuarios y la visualización de estadísticas clave de la tienda.

Cómo Ejecutar el Proyecto Completo
Para que la aplicación funcione, ambos servicios (Backend y Frontend) deben estar corriendo al mismo tiempo en terminales separadas.

1. Iniciar el Backend (Servidor)
Abre el proyecto Backend (shibuyastorebackend).

Modifica el archivo src/main/resources/application.properties. por problemas de ordenador del desarrollador Diego, en "PARAMETROS DE CONEXION". cambiar el puerto al que te indique tu aplicacion XAMPP, originalmente el proyecto correra en localhost:3307 de sql, cambiar 3307 a lo que indique tu XAMPP.
Conectarse a la Base de Datos por MySQL Workbrench (el puerto tiene que ser igual que definiste en el localhost:"...." de /resources/application.properties.). Para luego crear una nueva schema llamada "shibuyabase".
Ejecuta la aplicación Spring Boot.
El backend estará sirviendo en: http://localhost:8080
