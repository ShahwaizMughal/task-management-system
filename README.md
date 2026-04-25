# TaskFlow – Task Management System

TaskFlow is a modern, responsive, and professional Task Management System designed for small to medium-sized teams. It features a robust Node.js/MongoDB backend and a premium React frontend with role-based dashboards for Admins and Employees.

## ✨ Features

- **Authentication**: Secure JWT-based login system.
- **Admin Dashboard**: 
  - Overview of workspace performance with visual statistics.
  - Add and remove employees.
  - Assign tasks to specific team members with descriptions and initial status.
- **Employee Dashboard**:
  - Personal productivity metrics and progress visualization.
  - Task board to view and update status of assigned tasks.
- **Modern UI/UX**:
  - Premium SaaS-style interface built with Tailwind CSS.
  - Smooth animations and page transitions using Framer Motion.
  - Seamless Light/Dark mode support.
  - Fully responsive design (Mobile, Tablet, Desktop).
- **Persistent State**: Theme and authentication state persisted in LocalStorage.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Networking**: Axios (with Bearer token interceptors)
- **Notifications**: React Hot Toast
- **Routing**: React Router 6+

### Backend
- **Core**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Security**: JWT (Authentication), BcryptJS (Password Hashing)
- **Middleware**: Custom Auth & Role-based Access Control (RBAC)

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (Local or Atlas)

### Setup Instructions

1. **Clone the project**
   ```bash
   git clone [repository-url]
   cd TaskFlow
   ```

2. **Backend Configuration**
   - Navigate to the `backend` folder: `cd backend`
   - Install dependencies: `npm install`
   - Create a `.env` file in the `backend` directory:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_key
     ```
   - Seed the Admin user (predefined credentials: `admin@gmail.com` / `123456`):
     ```bash
     node utils/seeder.js
     ```
   - Start the server: `npm start` (or `node server.js`)

3. **Frontend Configuration**
   - Open a new terminal and navigate to the `frontend` folder: `cd frontend`
   - Install dependencies: `npm install`
   - Create a `.env` file in the `frontend` directory:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```
   - Start the dev server: `npm run dev`

4. **Access the Application**
   - Open your browser and go to `http://localhost:5173`

## 📁 Project Structure

```text
TaskFlow/
├── backend/            # Express.js Server
│   ├── config/         # DB Configuration
│   ├── controllers/    # API Request Handlers
│   ├── middlewares/    # Auth & Role Guards
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoint Definitions
│   └── utils/          # Seeder and Helpers
└── frontend/           # React SPA
    ├── src/
    │   ├── components/ # Reusable UI Components
    │   ├── context/    # Auth & Theme Providers
    │   ├── layout/     # App Shell (Sidebar/Topbar)
    │   ├── pages/      # Role-specific Views
    │   └── services/   # Axios API Management
    └── index.html
```

## 🔐 Credentials for Testing

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@gmail.com` | `123456` |
| Employee | (Create via Admin Dashboard) | (Set during creation) |

---

