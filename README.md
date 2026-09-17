# Farmacia - Frontend

Interfaz web para la gestión de una farmacia, desarrollada con **React**, **TypeScript** y **Vite**. Consume la API REST del backend (NestJS) para mostrar y administrar categorías, medicamentos y empleados.

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
- El **backend** del proyecto funcionando en `http://localhost:3000` (ver su README)

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd frontend
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

> El backend debe estar encendido antes de abrir el frontend; de lo contrario, no se cargarán los datos.

## Conexión con el backend

La URL de la API se configura en un único lugar, `src/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;
```

Si el backend cambia de dirección (por ejemplo, al publicarlo en un servidor), solo hay que modificar `baseURL`.

## Tipos de datos

Las interfaces de `src/types.ts` describen la forma de los datos que devuelve la API:

- **Categoria**: id, nombre, descripcion (opcional)
- **Medicamento**: id, nombre, laboratorio, precio, stock y su categoría
- **Empleado**: id, nombre, apellido, cargo, dni

> **Precio:** la API devuelve el precio de los medicamentos como texto (por ejemplo `"1500.00"`). Por eso en la interfaz está tipado como `string` y se convierte con `Number()` cuando hace falta operar o darle formato. Al crear o editar un medicamento, el precio debe enviarse como número.

## Estructura del proyecto

```
src/
├── api.ts                      # configuración de Axios (URL del backend)
├── types.ts                    # interfaces de Categoria, Medicamento y Empleado
├── App.tsx                     # componente principal y navegación entre vistas
├── main.tsx                    # punto de entrada
└── components/
    ├── Medicamentos.tsx        # listado y alta de medicamentos
    ├── Categorias.tsx          # listado de categorías
    └── Empleados.tsx           # listado de empleados
```

## Estado del proyecto

- [x] Conexión con la API
- [x] Tipos de datos
- [x] Vista de medicamentos (listado y alta)
- [x] Vista de categorías
- [x] Vista de empleados