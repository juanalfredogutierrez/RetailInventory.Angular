# JMCloudLab Retail Inventory Platform - Web

Frontend desarrollado con Angular 21 para la gestión de productos, compras y ventas dentro de una arquitectura basada en microservicios.

La aplicación consume los servicios expuestos a través de un API Gateway (Ocelot) y utiliza autenticación JWT para proteger el acceso a las funcionalidades de negocio.

---

# Tecnologías Utilizadas

* Angular 21
* TypeScript
* Angular Signals
* Reactive Forms
* Standalone Components
* Lazy Loading
* Route Guards
* HTTP Interceptors
* JWT Authentication

---

# Arquitectura Frontend

La aplicación fue organizada utilizando una arquitectura modular basada en Features.

Cada módulo funcional contiene sus propios modelos, servicios, páginas y rutas.

```text
src
│
├── core
│   ├── constants
│   ├── guards
│   ├── interceptors
│   ├── models
│   └── services
│
├── features
│   │
│   ├── auth
│   │   ├── models
│   │   ├── services
│   │   ├── pages
│   │   └── auth.routes.ts
│   │
│   ├── dashboard
│   │
│   ├── productos
│   │   ├── models
│   │   ├── services
│   │   ├── pages
│   │   └── productos.routes.ts
│   │
│   ├── compras
│   │   ├── models
│   │   ├── services
│   │   ├── pages
│   │   └── compras.routes.ts
│   │
│   └── ventas
│       ├── models
│       ├── services
│       ├── pages
│       └── ventas.routes.ts
│
├── layout
└── shared
```

### Beneficios de esta estructura

* Separación de responsabilidades
* Bajo acoplamiento
* Alta cohesión
* Escalabilidad por dominio funcional
* Facilidad de mantenimiento

---

# Arquitectura General

```text
┌─────────────────────────────┐
│      Angular Frontend       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│    API Gateway (Ocelot)     │
└──────────────┬──────────────┘
               │
     ┌─────────┼─────────┐
     │         │         │
     ▼         ▼         ▼

┌─────────┐ ┌─────────┐ ┌─────────┐
│  Auth   │ │Producto │ │ Compra  │
│ Service │ │ Service │ │ Service │
└─────────┘ └─────────┘ └────┬────┘
                             │
                             ▼

                    ┌────────────────┐
                    │ InventarioSvc  │
                    └───────┬────────┘
                            │
                            ▼

                     ┌────────────┐
                     │ RabbitMQ   │
                     └─────┬──────┘
                           │
                           ▼

                     ┌────────────┐
                     │ SQL Server │
                     └────────────┘
```

---

# Seguridad

La aplicación implementa autenticación basada en JWT.

Características implementadas:

* Login seguro
* Route Guards
* HTTP Interceptor
* Protección de rutas privadas
* Manejo de expiración de token
* Redirección automática al Login cuando la sesión expira

---

# Flujo de Autenticación

```text
Usuario
   │
   ▼

Login
   │
   ▼

AuthService
   │
   ▼

JWT
   │
   ▼

LocalStorage
   │
   ▼

AuthInterceptor
   │
   ▼

API Gateway
```

---

# Funcionalidades Implementadas

## Dashboard

* Sidebar de navegación
* Topbar
* Layout principal

## Productos

* Listado de productos
* Registro de productos

## Compras

* Registro de compras
* Selección de productos

## Ventas

* Registro de ventas
* Integración con inventario

---

# Configuración

La aplicación centraliza las rutas de acceso mediante constantes.

Ejemplo:

```typescript
export const API = {
  gateway: 'http://localhost:5000'
};
```

---

# Instalación

Instalar dependencias:

```bash
npm install
```

Ejecutar aplicación:

```bash
ng serve
```

Acceso:

```text
http://localhost:4200
```

---

# Credenciales de Prueba

```text
Usuario: admin
Contraseña: Admin123*
```

---

# Consideraciones

Debido al tiempo limitado de la evaluación técnica, se priorizó:

* Arquitectura por Features
* Integración con microservicios
* Seguridad mediante JWT
* Flujos funcionales principales
* Escalabilidad y mantenibilidad de la solución

No se implementaron pruebas unitarias en esta iteración debido a la restricción de tiempo de la evaluación.

---

# Mejoras Futuras

* Pruebas Unitarias
* Pruebas E2E
* Dashboard con métricas en tiempo real
* Gestión avanzada de inventario
* Optimización responsive
* Componentes reutilizables adicionales

---

# Autor

**Juan Gutierrez**

Desarrollador .NET & Angular

Proyecto desarrollado como parte de una evaluación técnica utilizando:

* Angular 21
* JWT Authentication
* API Gateway (Ocelot)
* RabbitMQ
* Microservicios
* Clean Architecture
* CQRS + MediatR
