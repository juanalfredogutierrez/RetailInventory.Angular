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
* Product Listing
* Inventory Integration

### Purchase Management

* Purchase Registration
* Dynamic Product Selection
* Real-Time Cost Calculation
* Inventory Update Integration

### Sales Management

* Sales Registration
* Stock Validation
* Inventory Synchronization

### User Experience

* Responsive Layout
* Sidebar Navigation
* Feature-Based Routing
* Reactive Forms
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

* Main Layout
* Navigation Sidebar
* Top Navigation Bar

### Products

* Product Management
* Product Registration
* Product Listing

### Purchases

* Purchase Creation
* Dynamic Item Management
* Cost Calculation

### Sales

* Sales Registration
* Inventory Validation
* Stock Synchronization

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

* Unit Testing (Jasmine/Karma)
* End-to-End Testing
* State Management
* Dark Mode Support
* Real-Time Dashboard
* Responsive Improvements
* Shared Component Library

---

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

## Author

Juan Alfredo Gutierrez

Senior Software Engineer | Technical Leader

Specialized in .NET, Angular, Azure, Distributed Systems and Financial Platforms.
