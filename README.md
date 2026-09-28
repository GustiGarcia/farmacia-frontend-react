# Farmacia - Frontend

Interfaz web para la gestión de una farmacia, desarrollada con **React**, **TypeScript** y **Vite**. Consume la API REST del backend (NestJS + MySQL) para administrar medicamentos, categorías y empleados.

Trabajo práctico de **Programación 3** — IES 9-023.

## Autores

- **Gustavo García**
- **Nahuel Ghilardi Salinas**

## Tecnologías

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Axios](https://axios-http.com/) (peticiones HTTP a la API)

## Requisitos previos

- Node.js **22.13 o superior**
- npm
- El **backend** del proyecto funcionando en `http://localhost:3000` (ver su README), con la base de datos MySQL levantada en Docker.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd farmacia-frontend-react
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

## Conexión con el backend

La URL de la API se configura en un único lugar, `src/api.ts`:

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;
```

Si el backend cambia de dirección, solo hay que modificar `baseURL`.

## Funcionalidades

La aplicación cuenta con navegación entre las siguientes pantallas, cada una con **CRUD completo** (crear, listar, editar y eliminar):

- **Medicamentos** — nombre, descripción, laboratorio, fecha de vencimiento, precio, stock y categoría asociada.
- **Categorías** — nombre y descripción.
- **Empleados** — nombre, apellido, email, teléfono, cargo, DNI y fecha de ingreso.

Cada pantalla incluye un formulario de alta/edición y una tabla con los registros y sus acciones.

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
├── api.ts                    # configuración de Axios (URL del backend)
├── types.ts                  # interfaces de Categoria, Medicamento y Empleado
├── App.tsx                   # navegación entre pantallas
├── main.tsx                  # punto de entrada
└── components/
    ├── Medicamentos.tsx
    ├── Categorias.tsx
    └── Empleados.tsx
```