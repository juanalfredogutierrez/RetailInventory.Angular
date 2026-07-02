# JMCloudLab Retail Inventory Platform - Web

## Overview

Retail Inventory Platform Web is an enterprise frontend application built with Angular 21 following a Feature-Based Architecture approach and integrated with a distributed microservices ecosystem developed in .NET 8.

The application provides a modern user experience for inventory management operations, including product administration, purchase registration, sales processing and stock monitoring through a centralized API Gateway.

This project was developed as part of the JMCloudLab portfolio to demonstrate enterprise-grade frontend development practices, integration with distributed systems and secure communication with backend microservices.

---

## Key Features

### Authentication & Security

* JWT Authentication
* Route Protection using Guards
* Automatic Token Injection via HTTP Interceptors
* Session Expiration Handling
* Secure Login Workflow

### Product Management

* Product Registration
* Product Catalog
* Product Listing
* Inventory Integration

### Purchase Management

* Purchase Registration
* Dynamic Product Selection
* Automatic Price Loading
* Real-Time Cost Calculation
* Inventory Update Integration

### Sales Management

* Sales Registration
* Real-Time Stock Validation
* Automatic Total Calculation
* Inventory Synchronization

### User Experience

* Responsive Layout
* Sidebar Navigation
* Feature-Based Routing
* Reactive Forms
* Angular Signals
* Reusable Confirmation Dialogs
* Snackbar Notifications
* User Menu & Logout
* Centralized API Configuration

---

## Technology Stack

### Frontend

* Angular 21 (Standalone Components)
* TypeScript
* Angular Signals
* Reactive Forms
* Standalone Components
* Lazy Loading
* Route Guards
* HTTP Interceptors
* Angular Material
* Lucide Angular

### Security

* JWT Authentication
* Authorization Guards

### Integration

* Ocelot API Gateway
* REST APIs
* Distributed Microservices Architecture

---

## Frontend Architecture

The application follows a Feature-Based Architecture that promotes scalability, maintainability and separation of concerns.

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
│   ├── auth
│   ├── dashboard
│   ├── productos
│   ├── compras
│   ├── ventas
│   └── kardex
│
├── layout
└── shared
```

### Benefits

* Low Coupling
* High Cohesion
* Feature Isolation
* Better Scalability
* Easier Maintenance
* Reusable Shared Components
* Consistent User Experience
* Enterprise-Ready Structure

---

## System Architecture

```text
Angular Frontend
        │
        ▼
API Gateway (Ocelot)
        │
 ┌──────┼──────┐
 ▼      ▼      ▼

Auth  Product  Transaction
Svc   Service   Service
                │
                ▼

         Inventory Service
                │
                ▼

            RabbitMQ
                │
                ▼

          SQL Server
```

---

## Authentication Flow

```text
User
 │
 ▼

Login Page
 │
 ▼

Auth Service
 │
 ▼

JWT Token
 │
 ▼

Local Storage
 │
 ▼

Auth Interceptor
 │
 ▼

API Gateway
 │
 ▼

Microservices
```

---

## Application Modules

### Dashboard

* Main Dashboard
* Navigation Sidebar
* Top Navigation Bar
* Breadcrumb Navigation

### Products

* Product Registration
* Product Catalog
* Product Listing

### Purchases

* Purchase Registration
* Dynamic Item Management
* Automatic Cost Calculation

### Sales

* Sales Registration
* Real-Time Stock Validation
* Automatic Total Calculation

### Inventory

* Stock Monitoring
* Kardex Visualization
---

## Backend Integration

The frontend communicates exclusively through the API Gateway, which centralizes routing, security and service discovery.

```typescript
export const API = {
  gateway: 'http://localhost:5000'
};
```

This approach allows the frontend to remain decoupled from individual microservices.

---

## Installation

Install dependencies:

```bash
npm install
```

Run locally:

```bash
ng serve
```

Application URL:

```text
http://localhost:4200
```

---

## Test Credentials

```text
Username: admin
Password: Admin123*
```

---

## Future Improvements

### Functional

* Product Update
* Product Deletion
* Purchase History
* Sales History
* Inventory Adjustments

### User Experience

* Search and Filtering
* Server-Side Pagination
* Sorting
* Export to Excel
* Responsive Improvements
* Dark Mode

### Quality

* Unit Testing
* End-to-End Testing
* Shared Component Library
* Internationalization (i18n)

### Technical

* State Management (NgRx or Signal Store)
* Performance Optimization
* Environment-based Configuration

---
## Roadmap

### Completed

- [x] JWT Authentication
- [x] Dashboard
- [x] Product Catalog
- [x] Purchase Registration
- [x] Sales Registration
- [x] Inventory Overview
- [x] Kardex
- [x] Notification System
- [x] Confirmation Dialogs
- [x] User Menu & Logout

### Planned

- [ ] Product CRUD
- [ ] Purchase History
- [ ] Sales History
- [ ] Search & Filtering
- [ ] Server-Side Pagination
- [ ] Export to Excel
- [ ] Dashboard Analytics
- [ ] 
## Related Backend Technologies

This frontend integrates with a distributed backend platform built using:

* .NET 8
* Clean Architecture
* CQRS
* MediatR
* RabbitMQ
* Outbox Pattern
* Inbox Pattern
* Ocelot API Gateway
* Docker Compose
* Serilog
* Seq
* Distributed Tracing

---
## Screenshots

### Login

<img ...>

### Dashboard

<img ...>

### Purchase Registration

<img ...>

### Product Catalog

<img ...>


## Author

Juan Alfredo Gutierrez

Senior Software Engineer | Technical Leader

Specialized in .NET, Angular, Azure, Distributed Systems and Financial Platforms.



<img width="464" height="669" alt="image" src="https://github.com/user-attachments/assets/d11e77fc-e372-4c0e-b74b-c23641d4ee3e" /> <img width="1193" height="845" alt="image" src="https://github.com/user-attachments/assets/df3df82e-621a-4a3d-b4c0-5410f8eb42b9" /> <img width="1177" height="1023" alt="image" src="https://github.com/user-attachments/assets/8db1a7ac-9b7b-4da2-a8a8-6f705f40f6ea" />
