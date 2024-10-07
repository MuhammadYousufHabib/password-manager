# Password Manager App Frontend

Frontend for a Password Manager App built with **Next.js 14** and the **Shadcn UI** library

## Features

- **Role-Based Access Control**: 
  - The default admin user can create other users and assign them specific roles and permissions.
  - Users can perform actions based on the permissions granted by the admin.

- **Admin Capabilities**:
  - The admin can create additional admin users.
  - Full control over user access to various features and routes.

- **Routes**:
  - `/profile`: User profile page.
  - `/dashboard`: Main dashboard for users.
  - `/login`: User login page.
  - `/dashboard/projects`: Access project-related features.
  - `/dashboard/permissions`: Manage user permissions.
  - `/dashboard/users`: View and manage users.
  - `/dashboard/roles`: Manage user roles.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

clone this repo

### install dependency

npm i

### Running Development Server

npm run dev

### Login Credentials

    Username: admin
    Password: 123

### Backend setup
 Prerequisites
Python 3.8+
PostgreSQL
### Setup Instructions
Clone the Repository
**Install Required Libraries Install dependencies from requirements.txt pip install -r requirements.txt
****Create a .env file in the root of your project with your PostgreSQL credentials: DATABASE_URL="postgres://username:password@localhost/db_name"**
**Run the Application Start the FastAPI server with Uvicorn: uvicorn app.main:app --reload**
