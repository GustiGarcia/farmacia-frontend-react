# AGENTS.md — Farmacia Frontend

Contexto y estado del proyecto para agentes (y humanos) que retomen este trabajo.

## Proyecto

- **Qué es**: frontend del trabajo práctico de **Programación 3** (IES 9-023).
- **Autores**: Gustavo García y Nahuel Ghilardi Salinas.
- **Stack**: React 19 + TypeScript + Vite + Axios. Sin router (navegación por tabs con `useState`).
- **Backend**: repo hermano `farmacia-react-nestjs` (NestJS + TypeORM + PostgreSQL), en `C:\Repositorios_Locales\Proyectos_Personales\farmacia-react-nestjs`. API en `http://localhost:3000`.

## Estado actual (2026-09-16)

Rama de trabajo: **`Nahuel_Develop`** → PR abierto a `main` (PR #1). `main` local debe quedar igual que `origin/main`; los cambios nuevos van siempre a `Nahuel_Develop`.

Hecho:

- [x] Estilos base propios (se limpió el template de Vite)
- [x] Listado de medicamentos (tabla)
- [x] Alta de medicamentos (formulario con select de categorías)
- [x] Vista de categorías (tabla)
- [x] Vista de empleados (tabla)
- [x] Navegación por tabs en `App.tsx`

Pendiente / posibles mejoras (NO pedidas, evaluar antes de hacer):

- Alta de categorías y empleados (hoy solo tienen listado)
- Edición y borrado de registros
- Manejo de errores más detallado (mostrar mensajes del backend)

## Decisiones técnicas importantes

- **POST /medicamento**: el DTO del backend espera `categoria: { id: number }` (NO `categoriaId`). Validado contra `create-medicamento.dto.ts`.
- **Precio**: la API lo devuelve como string (`"1500.5"`, decimal de Postgres). En el front se tipa como `string` y se convierte con `Number()`. Al crear, se envía como número y debe ser **positivo** (`@IsPositive()` en el DTO).
- **Empleado.dni** es unique en la entidad del backend.
- **CORS**: el backend solo acepta `http://localhost:5173` (configurado en `main.ts`).
- Estilo de commits: mensajes cortos, en español, minúsculas (ej: `vista de empleados`).

## Cómo levantar el entorno de prueba

La máquina NO tiene PostgreSQL instalado; se usa Docker:

```powershell
# 1. Base de datos (la primera vez crea el contenedor; después solo docker start)
docker run --name farmacia-postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=farmacia -p 5432:5432 -d postgres:16
docker start farmacia-postgres   # si ya existe

# 2. Backend (puerto 3000) — en farmacia-react-nestjs
npm install   # si falta node_modules
npm run start:dev

# 3. Frontend (puerto 5173) — en este repo
npm install   # si falta node_modules
npm run dev
```

La conexión TypeORM del backend es fija: `postgres:5432`, user `postgres`, pass `admin`, db `farmacia` (ver `app.module.ts`). `synchronize: true` crea las tablas solo.

Para apagar todo: `Get-Process node | Stop-Process` y `docker stop farmacia-postgres` (los datos persisten en el contenedor).

## Verificación antes de commitear

```powershell
npm run build   # tsc -b && vite build
npm run lint    # eslint
```

Ambos deben pasar sin errores.

## Estructura

```
src/
├── api.ts                      # Axios con baseURL del backend
├── types.ts                    # Categoria, Medicamento, Empleado
├── App.tsx                     # tabs de navegación
├── main.tsx
└── components/
    ├── Medicamentos.tsx        # listado + alta
    ├── Categorias.tsx          # listado
    └── Empleados.tsx           # listado
```
