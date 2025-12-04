# Policy Management System - Frontend

## 🎯 Project Status

**Frontend Lead & Integrator Setup - COMPLETE ✅**

This React application has been fully architected with:
- ✅ Redux Toolkit for state management
- ✅ Axios with JWT interceptors for API calls
- ✅ React Router with role-based route protection
- ✅ Complete folder structure for team collaboration
- ✅ Integration ready for backend API at `http://localhost:5000/api`

## 🚀 Quick Start

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Home/           # Existing home component
│   │   ├── Layout/         # Main layout wrapper
│   │   └── ExampleUsage.jsx # Usage examples
│   ├── services/           # API service layer
│   │   ├── api.js          # Axios instance with interceptors
│   │   ├── authService.js  # Auth API calls
│   │   └── policyService.js # Policy API calls
│   ├── store/              # Redux store
│   │   ├── store.js        # Store configuration
│   │   └── slices/         # Redux slices
│   │       ├── authSlice.js    # Authentication state
│   │       └── policySlice.js  # Policy state
│   ├── routes/             # Routing
│   │   ├── AppRoutes.jsx       # Route definitions
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── hooks/              # Custom hooks
│   │   └── redux.js        # Typed Redux hooks
│   ├── utils/              # Utilities
│   │   └── roles.js        # Role checking
│   ├── constants/          # Constants
│   │   └── api.js          # API endpoints
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── ARCHITECTURE.md         # Detailed architecture docs
├── SETUP_GUIDE.md          # Setup and usage guide
└── package.json
```

## 🔑 Key Features

### 1. State Management (Redux)
- **Auth Slice**: User authentication, login, logout, token management
- **Policy Slice**: Policy CRUD operations, filtering, pagination

### 2. API Integration
- Axios instance configured with base URL: `http://localhost:5000/api`
- Automatic JWT token injection via request interceptor
- Automatic token refresh on 401 errors
- Error handling and redirects

### 3. Routing & Protection
- Public routes: `/`, `/login`, `/register`
- Protected routes: `/dashboard`, `/policies/*`
- Role-based routes: Admin/Manager only routes
- Automatic redirects for unauthorized access

### 4. Role-Based Access Control
- Roles: `ADMIN`, `MANAGER`, `USER`, `VIEWER`
- Utility functions: `hasRole()`, `isAdmin()`, `isManagerOrAdmin()`
- Route-level and component-level protection

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete architecture documentation
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Setup instructions and common tasks
- **[ExampleUsage.jsx](./src/components/ExampleUsage.jsx)** - Code examples

## 🛠️ Dependencies

- `react` ^19.2.0
- `react-dom` ^19.2.0
- `@reduxjs/toolkit` - State management
- `react-redux` - React bindings
- `react-router-dom` - Routing
- `axios` - HTTP client

## 👥 Team Collaboration

### For Member 4 (UI Component Builder)
- Build reusable UI components
- Create Login/Register pages
- Design navigation and layout components
- Reference: `src/components/ExampleUsage.jsx` for patterns

### For Member 5 (Page Builder)
- Build Dashboard page
- Create Policy pages (list, detail, create, edit)
- Build Admin panel
- Reference: `src/routes/AppRoutes.jsx` for route structure

## 🔌 Backend Integration

The frontend is configured to connect to:
- **Base URL**: `http://localhost:5000/api`

Expected endpoints:
- `/api/auth/*` - Authentication endpoints
- `/api/policies/*` - Policy endpoints

See `ARCHITECTURE.md` for detailed API specifications.

## ✅ What's Ready

- ✅ Redux store with Auth and Policy slices
- ✅ API service layer with interceptors
- ✅ Route protection system
- ✅ Role-based access control
- ✅ Folder structure for team members
- ✅ Example usage components
- ✅ Complete documentation

## 🚧 What's Next

- [ ] Member 4: Build UI components and auth pages
- [ ] Member 5: Build page components
- [ ] Integration testing with backend
- [ ] Styling and UI polish

## 📝 Notes

- All API calls automatically include JWT tokens
- Tokens are stored in localStorage
- Failed auth automatically redirects to login
- All routes are defined but most pages are placeholders

---

**Setup by Member 3 (Frontend Lead & Integrator)**  
Ready for Members 4 & 5 to build UI components and pages!
