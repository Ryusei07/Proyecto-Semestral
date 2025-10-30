  ShibuyaStore - Proyecto Full-Stack
ShibuyaStore es un proyecto full-stack de E-commerce (tienda virtual) diseñado para la venta de figuras de anime. La aplicación está construida sobre una arquitectura moderna de cliente-servidor, separando la lógica del negocio de la interfaz de usuario.

Backend (API): Un servidor robusto construido con Spring Boot que maneja los datos, la lógica de negocio y la seguridad.
Frontend (Cliente): Una interfaz de usuario interactiva (SPA) construida con React que consume la API del backend.
Este repositorio contiene (o describe) el sistema completo, incluyendo el Panel de Administración para la gestión de la tienda y la base de datos para la persistencia de datos.

  Características Principales
Arquitectura Full-Stack: Completa separación entre el backend (API) y el frontend (UI).
Panel de Administración: Funcionalidad completa de CRUD (Crear, Leer, Actualizar, Borrar) para Productos y Usuarios.
Autenticación Segura: Endpoint de Login que valida las credenciales y el rol (super-admin) usando el backend.
Seguridad de Datos: Las contraseñas de usuario se almacenan en la base de datos de forma segura, encriptadas con BCrypt.
Gestión de Archivos: El backend incluye endpoints para la subida de imágenes de productos.
Base de Datos Persistente: Uso de MySQL para almacenar toda la información.
Documentación de API: El backend se auto-documenta usando Swagger (OpenAPI).
Testing: El backend incluye pruebas unitarias con Mockito para asegurar la lógica de negocio.

Pila Tecnológica (Tech Stack)

  Backend (API)
Framework: Spring Boot 3
Lenguaje: Java 21
Base de Datos: MySQL
Acceso a Datos: Spring Data JPA (Hibernate)
Seguridad: Spring Security (BCrypt)
API: Spring Web (RESTful)
Documentación: SpringDoc OpenAPI (Swagger)
Pruebas: Mockito & JUnit 5
Gestor de Dependencias: Maven

  Frontend (Cliente)
Framework: React 18 (con Vite)
Lenguaje: JavaScript (ES6+) y JSX
Routing: react-router-dom
Llamadas a API: fetch (nativo de JavaScript)
Gestión de Estado: Hooks de React (useState, useEffect)
Dependencias: npm

1. Instrucciones de instalación
Para levantar este proyecto en un entorno local:
Paso 1: Clonar el Repositorio
Paso 2: Configurar la Base de Datos (MySQL)
Navega a src/main/resources/application.properties.
¡¡ IMPORTANTE !!
Modifica el archivo src/main/resources/application.properties. por problemas de ordenador del desarrollador Diego, en "PARAMETROS DE CONEXION". cambiar el puerto al que te indique tu aplicacion XAMPP, originalmente el proyecto correra en localhost:3307 de sql, cambiar 3307 a lo que indique tu XAMPP.
Conectarse a la Base de Datos por MySQL Workbrench (el puerto tiene que ser igual que definiste en el localhost:"...." de /resources/application.properties.). Para luego crear una nueva schema llamada "shibuyabase".
Abre MySQL Workbench y asegúrate de que tu servidor MySQL esté corriendo en el puerto 3307 o el que definiste.
Crea la base de datos que usará el proyecto. El application.properties está configurado para buscar el schema shibuyabase.
(No es necesario crear las tablas manualmente, Spring Boot lo hará por ti).

2. Instrucciones de ejecución
Iniciar el Backend (Servidor)
Una vez instalado, puedes iniciar el servidor:
Desde tu IDE (Visual Studio Code)
Busca el archivo src/main/java/com/shibuyastore/ShibuyastorebackendApplication.java.
Haz clic en el botón "Run" (o "Ejecutar") que proporciona tu editor de código.
Tras unos segundos, la consola mostrará Tomcat started on port(s): 8080.... ¡Tu API ya está viva en http://localhost:8080!
Al iniciarse, el script data.sql poblará automáticamente la base de datos con categorías, 2 administradores y 15 productos de prueba.
Iniciar el Frontend (Cliente)
Abre el proyecto Frontend (SHIBUYASTOREREACT) en una nueva terminal/ventana.
Instala las dependencias (solo la primera vez): "npm install"
Asegúrate de que el archivo .env en la raíz del proyecto contenga la dirección del backend: http://localhost:8080
Inicia el servidor de desarrollo: "npm run dev" en una terminal
El frontend estará visible en: http://localhost:5173 (o el puerto que indique Vite).

3. Credenciales de prueba
El sistema se inicia con dos usuarios super-admin listos para probar el Login en Swagger o en el frontend.
Usuario 1 (Diego)
Email: diegoadmin@shibuyastore.cl
Contraseña: diegoadmin123
Usuario 2 (Gabriel)
Email: gabrieladmin@shibuyastore.cl
Contraseña: gabrieladmin123

4. Documentación de API (Swagger)
Toda la API está documentada y puede ser probada en tiempo real usando Swagger (SpringDoc).
Una vez que la aplicación esté corriendo, abre tu navegador y visita:
Desde esta interfaz podrás:
Probar el POST /api/auth/login con tus credenciales de prueba.
Probar el GET /api/productos para ver el JSON de los 15 productos.
Probar todos los demás endpoints de la aplicación.
