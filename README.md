# CN Doors - UPVC Business Web App

A professional React application for CN Doors, a UPVC doors and windows business. This application features a dual login system for clients and business owners, providing a seamless experience for browsing products, requesting quotations, and managing customer inquiries.

## Features

- **Dual Authentication**: Secure login systems for both clients and business owners powered by Firebase Google OAuth.
- **Client Portal**: 
  - Browse available UPVC products (e.g., sliding windows, doors) with images.
  - View material specifics.
  - Submit query and quotation requests.
- **Owner Dashboard**:
  - Secure business owner portal.
  - Manage and review client queries.
  - See detailed queries and respond to clients.
- **Responsive Design**: Custom UI built completely with Tailwind CSS for a premium, responsive, and smooth user experience.

## Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Lucide React
- **Backend / Authentication**: Firebase
- **Build Tool**: Vite

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your local machine.

### Installation

1. Navigate into the project directory:
   ```bash
   cd upvc-app
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

### Firebase Setup

To handle authentication and any database queries, you need a Firebase project. Make sure your Firebase configuration variables are properly added or initialized within the project context.

### Running the Development Server

To start the Vite development server, run:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

### Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Structure Overview

- `src/context/`: State management handling global data patterns like `AuthContext.jsx` and `AppDataContext.jsx`.
- `src/layouts/`: Base layouts handling navigation and standardizing page frames (e.g. `OwnerLayout.jsx`).
- `src/pages/`/`src/components/`: Core UI implementations, dashboard components, and specific owner/client pages.
