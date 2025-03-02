![Alt text](https://i.postimg.cc/wjz9213m/Logo.png)

## Overview
**eVSE** is an online classifieds platform. The project replicates core functionalities of the OLX platform, enabling users to create, view, edit, and delete advertisements, along with advanced features like subscriptions, promotion, VIP listings, advanced search, and real-time chats.

## Features
- REST API for managing advertisements with full CRUD operations (create, read, update, delete).
- Advanced advertisement features including subscriptions, promotion, and VIP listings.
- Advanced search functionality using LINQ queries for filtering and sorting advertisements.
- Real-time chat system between users, implemented with SignalR.
- User authentication and authorization using ASP.NET Core Identity with JWT-based token management.
- Event logging throughout the system using Serilog for debugging and monitoring.
- Background task processing (e.g., periodic cleanup of outdated listings) with Hangfire.
- Interactive API testing and documentation via Swagger UI for easy endpoint exploration.
- Input validation with appropriate HTTP status codes (200, 400, 404, etc.).

## Technologies Used
- **Programming Language**: C#
- **Framework**: ASP.NET Core
- **Database & ORM**: MS SQL Server, Entity Framework Core (CRUD, LINQ, migrations, Fluent API)
- **Authentication**: ASP.NET Core Identity (JWT-based)
- **Real-Time Communication**: SignalR
- **Background Tasks**: Hangfire
- **Logging**: Serilog
- **Data Mapping**: AutoMapper

## Project Structure
The project follows a layered architecture with a focus on separation of concerns:
- **Controllers**: Handle HTTP requests and route them to appropriate services.
- **Services**: Contain business logic and interact with the data layer.
- **Data Layer**: Manages database operations using Entity Framework Core.
- **Models**: Define the data structures (e.g., Post, User).
- **Configurations**: Manage settings like JWT tokens, database connections, and more.

## Installation and Setup

### Prerequisites
- .NET SDK 6.0 or later (check the project file for the exact version).
- MS SQL Server (local or cloud-based).
- (Optional) Postman for additional API testing (Swagger UI is built-in).

### Database Setup
1. Set up MS SQL Server and create a database for the project (e.g., `eVSE_Database`).
2. Update the connection string (`ConnectionString`) in the `appsettings.json` file:
   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Server=your_server;Database=eVSE_Database;TrustServerCertificate=True;Trusted_Connection=True;"
   }
