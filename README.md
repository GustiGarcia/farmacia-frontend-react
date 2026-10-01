# Farmacia - Frontend

Interfaz web para la gestión de una farmacia, desarrollada con **React**, **TypeScript** y **Vite**. Consume la API REST del backend (NestJS + MySQL) para administrar medicamentos, categorías y empleados, con autenticación de usuarios mediante login.

Trabajo práctico de **Programación 3** — IES 9-023.

## Autores

- **Gustavo García**
- **Nahuel Ghilardi Salinas**

## Tecnologías

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Axios](https://axios-http.com/) (peticiones HTTP a la API, con token JWT)

## Requisitos previos

- Node.js **22.13 o superior**
- npm
- El **backend** del proyecto funcionando en `http://localhost:3000` (ver su README), con la base de datos MySQL levantada en Docker.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd farmacia-frontend-programacion
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

## Ejecución

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

> El backend (y su base de datos MySQL en Docker) debe estar encendido antes de abrir el frontend; de lo contrario, no se cargarán los datos.

## Acceso (login)

La aplicación está protegida con autenticación. Al abrirla se muestra la pantalla de inicio de sesión:

- Si ya existe un usuario, se ingresa con su **email** y **contraseña**.
- Si no, se puede crear uno desde el enlace **"Registrarse"** de la misma pantalla.

Usuario de prueba (si se cargó durante el desarrollo):

- Email: `admin@farmacia.com`
- Contraseña: `1234`

Al iniciar sesión, el frontend guarda un token JWT en el navegador y lo envía automáticamente en cada petición a la API. El botón **"Cerrar sesión"**, arriba a la derecha, borra ese token y vuelve a la pantalla de login.

## Conexión con el backend

La URL de la API y el envío automático del token se configuran en `src/api.ts`:

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Antes de cada petición, si hay token guardado, lo agrega a la cabecera
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

Si el backend cambia de dirección, solo hay que modificar `baseURL`.

## Funcionalidades

La aplicación cuenta con navegación entre las siguientes pantallas:

- **Dashboard** — resumen con los totales de medicamentos, categorías y empleados, y un panel de medicamentos con stock bajo.
- **Medicamentos** — CRUD completo (crear, listar, editar, eliminar): nombre, descripción, laboratorio, fecha de vencimiento, precio, stock y categoría asociada.
- **Categorías** — CRUD completo: nombre y descripción.
- **Empleados** — CRUD completo: nombre, apellido, email, teléfono, cargo, DNI y fecha de ingreso.

Cada pantalla de gestión incluye un formulario de alta/edición y una tabla con los registros y sus acciones.

## Tipos de datos

Las interfaces de `src/types.ts` describen la forma de los datos que devuelve la API:

- **Categoria**: id, nombre, descripcion (opcional)
- **Medicamento**: id, nombre, descripcion (opcional), laboratorio, fechaVencimiento, precio, stock y su categoría
- **Empleado**: id, nombre, apellido, email, telefono, cargo, dni, fechaIngreso

> **Precio:** la API devuelve el precio de los medicamentos como texto (por ejemplo `"1500.00"`). Por eso en la interfaz está tipado como `string` y se convierte con `Number()` cuando hace falta operar o darle formato. Al crear o editar, el precio se envía como número.

> **Fechas:** `fechaVencimiento` y `fechaIngreso` se manejan como texto en formato ISO (`"2027-05-31"`), que es lo que devuelve el input `type="date"` de HTML.

## Estructura del proyecto

```
src/
├── api.ts                    # configuración de Axios (URL del backend + token JWT)
├── types.ts                  # interfaces de Categoria, Medicamento y Empleado
├── App.tsx                   # control de sesión y navegación entre pantallas
├── main.tsx                  # punto de entrada
├── index.css                 # estilos globales
└── components/
    ├── Login.tsx             # inicio de sesión y registro
    ├── Dashboard.tsx
    ├── Medicamentos.tsx
    ├── Categorias.tsx
    └── Empleados.tsx
```
