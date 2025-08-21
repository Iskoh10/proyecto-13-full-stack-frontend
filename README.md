# Proyecto 13 - La Panadería - Proyecto final Full Stack

![React](https://img.shields.io/badge/React-19.1.0-blue)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.10.9-319795)
![Status](https://img.shields.io/badge/Status-In%20Progress-orange)

## _APP Web Negocio Panadería_

En este proyecto de Rock{theCode} desarrollé una **aplicación web** con **React** para la gestión integral de una panadería.  
La app permite:

- Presentar productos y talleres formativos.
- Realizar compras online.
- Gestionar pedidos y datos de clientes.
- Administrar ventas mediante un dashboard con gráficos y exportación de datos.

## Características principales

- Gestión online de productos de panadería y talleres.
- Home con introducción a la historia del pan.
- Optimización con hooks avanzados de React.
- Interfaz **intuitiva y responsive** (UI/UX).
- Funcionalidades diferenciadas para usuarios registrados y no registrados:
  - **Usuarios no registrados:** pueden navegar y ver productos.
  - **Usuarios registrados:** pueden comprar, dejar comentarios, valoraciones, modificar datos, ver historial de pedidos y acceder al carrito persistente.
- Pago seguro mediante Stripe y autenticación con cookies **HttpOnly** para mayor seguridad (evitar ataques XSS).

## Capturas de pantalla

![Home](./screenshots/home.png)

---

## Funcionalidades en construcción ⚠️

Actualmente, las siguientes funcionalidades aún no están implementadas del todo, estoy en ello:

- Hace falta abstraer funcionalidades (por ejemplo las del carrito utilizando useReducer).
- Optimizar para que haya menos re-renderizaciones.
- Implementar el responsive.
- Mejorar el UI.
- Funcionalidad de comentarios y valoración en los talleres y post del blog.
- Funcionalidad de dashboard:
  - Implementar varios filtros para agilizar la modificación de los productos o la carta de productos, talleres y posts en el blog.
  - Implementar un calendario de entrega (drag & drop) de los pedidos y asignarles el status de entregado o cancelado.
  - Implementar las graficas para visualizar las ventas con distintos filtros (ej: último mes, últimos 6 meses o último año), poder visualizar las ventas de un producto seleccionado, ver fluctuaciones a lo largo del tiempo, etc.
  - A futuro me gustaria implementar un sistema interno de mensajeria entre el establecimiento y los clientes, por el momento cualquier incidencia sería notificada por correo electrónico o por llamada.

---

## Consideraciones técnicas

- El formulario de registro debe completarse con datos reales, ya que el usuario recibirá un correo de confirmación.
- El dashboard administrativo solo es accesible por el administrador, permitiendo:
  - Modificar, añadir o eliminar productos.
  - Gestionar clientes.
  - Visualizar ventas con gráficos y exportar datos para la gestoría.

## Tecnologías utilizadas

- **Lenguajes:** HTML, CSS, JavaScript/React
- **Librerías y frameworks:** Chakra UI, Framer Motion, React Router DOM, React Hook Form, Stripe JS
- **Herramientas:** Vite
- **Otras:** Fetch API, generación y descarga de archivos (PDF e imágenes)

## Instalación

Al ser un proyecto full stack necesitarás tambien el repositorio del backend:
Repositorio Backend: [proyecto-13-full-stack-backend](https://github.com/Iskoh10/proyecto-13-full-stack-backend)

Sigue estos pasos para instalar y ejecutarlo en tu entorno local:

### 1. Clonar el repositorio

Clona este repositorio en tu maquina local usando el siguiente comando en la consola:

```sh
git clone https://github.com/Iskoh10/proyecto-13-full-stack-frontend.git
```

### 2. Acceder al directorio del proyecto

Navega al directorio del proyecto clonado:

```sh
cd proyecto-13-full-stack-frontend
```

### 3. Instalar las dependencias

Instala las dependencias necesarias:

```sh
npm install
```

### 4. Iniciar el servidor de desarrollo

Ejecuta el servidor con el comando:

```sh
npm run dev
```

### 5. Estructura del proyecto

```
📁 PROYECTO 13_FULL-STACK-FRONTEND
├── 📁 public
├── 📁 src
│ ├── 📁 components
│ ├── 📁 data
│ ├── 📁 hooks
│ ├── 📁 pages
│ ├── 📁 Providers
│ ├── 📁 reducers
│ ├── 📁 service
│ ├── 📁 utils
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ ├── main.jsx
│ └── theme.jsx
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## License

**Free Software, Hell Yeah!**
