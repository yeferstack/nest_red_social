# API Red Social

API REST construida con NestJS, TypeScript y MongoDB para gestionar una red social básica con usuarios, publicaciones, comentarios, reacciones y seguidores.

---

## Tecnologías usadas

- **NestJS** — framework principal
- **TypeScript** — lenguaje de programación
- **MongoDB + Mongoose** — base de datos
- **Swagger** — documentación automática de endpoints
- **class-validator** — validación de datos en los DTOs
- **bcrypt** — cifrado de contraseñas

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>

# Entrar a la carpeta
cd api_red_social

# Instalar dependencias
npm install

# Crear el archivo de variables de entorno
cp .env.example .env
```

Dentro del `.env` configura:

```env
MONGO_URI=mongodb://localhost:27017/red_social_db
PORT=3000
```

```bash
# Correr en modo desarrollo
npm run start:dev
```

---

## Documentación Swagger

Una vez corriendo, abre en el navegador:

```
http://localhost:3000/swagger
```

Ahí puedes ver y probar todos los endpoints directamente.

---

## Estructura del proyecto

```
src/
├── common/
│   ├── filters/        → manejo global de errores
│   └── helpers/        → respuestas estándar de la API
├── config/
│   ├── database/
│   └── swagger/
└── modules/
    ├── roles/
    ├── usuarios/
    ├── publicaciones/
    ├── comentarios/
    ├── reacciones/
    └── seguidores/
```

Cada módulo tiene la misma estructura interna:

```
modulo/
├── dto/
│   ├── create-x.dto.ts
│   ├── update-x.dto.ts
│   └── search-x.dto.ts
├── schemas/
│   └── x.schema.ts
├── x.controller.ts
├── x.module.ts
└── x.service.ts
```

---

## Módulos

### Roles
Gestiona los roles que se pueden asignar a los usuarios (ej: Administrador, Usuario).

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /roles | Crear rol |
| GET | /roles | Listar roles activos |
| GET | /roles/inactivos | Listar roles eliminados |
| GET | /roles/:id | Buscar rol por ID |
| PUT | /roles/:id | Actualizar rol |
| PATCH | /roles/:id | Actualización parcial |
| DELETE | /roles/:id | Eliminar rol (soft delete) |
| PATCH | /roles/:id/restore | Restaurar rol eliminado |

---

### Usuarios
Gestiona los usuarios de la red social. Las contraseñas se guardan cifradas con bcrypt.

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /Usuarios | Crear usuario |
| GET | /Usuarios | Listar usuarios (con búsqueda y paginación) |
| GET | /Usuarios/:id | Buscar usuario por ID |
| PUT | /Usuarios/:id | Actualizar usuario |
| DELETE | /Usuarios/:id | Eliminar usuario (soft delete) |

**Parámetros de búsqueda (query):** `nombre`, `page`, `limit`

---

### Publicaciones
Gestiona las publicaciones que crean los usuarios.

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /publicaciones | Crear publicación |
| GET | /publicaciones | Listar publicaciones (con búsqueda y paginación) |
| GET | /publicaciones/inactivas | Listar publicaciones eliminadas |
| GET | /publicaciones/:id | Buscar publicación por ID |
| PUT | /publicaciones/:id | Actualizar publicación |
| PATCH | /publicaciones/:id | Actualización parcial |
| DELETE | /publicaciones/:id | Eliminar publicación (soft delete) |
| PATCH | /publicaciones/:id/restore | Restaurar publicación eliminada |

**Parámetros de búsqueda (query):** `usuario_id`, `contenido`, `page`, `limit`

---

### Comentarios
Gestiona los comentarios que los usuarios hacen sobre las publicaciones.

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /comentarios | Crear comentario |
| GET | /comentarios | Listar comentarios (con búsqueda y paginación) |
| GET | /comentarios/inactivos | Listar comentarios eliminados |
| GET | /comentarios/publicacion/:id | Comentarios de una publicación |
| GET | /comentarios/:id | Buscar comentario por ID |
| PUT | /comentarios/:id | Actualizar comentario |
| PATCH | /comentarios/:id | Actualización parcial |
| DELETE | /comentarios/:id | Eliminar comentario (soft delete) |
| PATCH | /comentarios/:id/restore | Restaurar comentario eliminado |

**Parámetros de búsqueda (query):** `usuario_id`, `publicacion_id`, `contenido`, `page`, `limit`

---

### Reacciones
Gestiona las reacciones que los usuarios pueden poner en las publicaciones.

**Tipos disponibles:** `like`, `love`, `haha`, `sad`, `angry`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /reacciones | Crear reacción |
| GET | /reacciones | Listar reacciones (con búsqueda y paginación) |
| GET | /reacciones/inactivos | Listar reacciones eliminadas |
| GET | /reacciones/:id | Buscar reacción por ID |
| PUT | /reacciones/:id | Actualizar reacción |
| PATCH | /reacciones/:id | Actualización parcial |
| DELETE | /reacciones/:id | Eliminar reacción (soft delete) |
| PATCH | /reacciones/:id/restore | Restaurar reacción eliminada |

**Parámetros de búsqueda (query):** `usuario_id`, `publicacion_id`, `tipo`, `page`, `limit`

---

### Seguidores
Gestiona las relaciones de seguimiento entre usuarios.

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /seguidores | Seguir a un usuario |
| GET | /seguidores | Listar seguidores (con búsqueda y paginación) |
| GET | /seguidores/inactivos | Listar seguidores eliminados |
| GET | /seguidores/:id | Buscar seguidor por ID |
| PUT | /seguidores/:id | Actualizar |
| PATCH | /seguidores/:id | Actualización parcial |
| DELETE | /seguidores/:id | Dejar de seguir (soft delete) |
| PATCH | /seguidores/:id/restore | Restaurar |

**Parámetros de búsqueda (query):** `seguidor_id`, `seguido_id`, `page`, `limit`

---

## Formato de respuestas

Todas las respuestas siguen el mismo formato estándar:

**Éxito:**
```json
{
  "success": true,
  "statusCode": 200,
  "data": { }
}
```

**Error:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Descripción del error"
}
```

---

## Eliminación lógica (Soft Delete)

Ningún registro se borra físicamente de la base de datos. En su lugar, se marca con `activo: false`. Todos los listados generales solo muestran registros con `activo: true`. Para ver los eliminados existe el endpoint `/inactivos` en cada módulo, y para recuperarlos el endpoint `/restore`.
