# Currency Calculator Frontend

This project is a Vue.js application that serves as the frontend for a currency calculator. It is built with Vite, Vuetify, and Pinia, providing a modern and reactive user experience.

## Live Demo

🚀 **The application is deployed and available at:** [https://currency-calculator-frontend-six.vercel.app/](https://currency-calculator-frontend-six.vercel.app/)

For testing administrative features, you can use the following credentials:

- **Email:** `admin@admin.com`
- **Password:** `admin`

## Project Structure

The project is organized into the following directories:

- **`src/assets`**: Contains static assets like images and fonts.
- **`src/components`**: Contains reusable Vue components used across the application.
- **`src/plugins`**: For configuring and initializing Vue plugins (e.g., Vuetify).
- **`src/router`**: Defines the application's routing configuration.
- **`src/services`**: Contains the API service for communicating with the backend.
- **`src/stores`**: Holds Pinia store modules for state management (e.g., `auth`, `currency`).
- **`src/styles`**: Contains global styles and SASS variables.
- **`src/views`**: Contains the main page components for each route.
- **`src/main.ts`**: The main entry point of the application.

## Project Setup

First, ensure that the backend server is running.

Next, create a `.env` file in the root of the project with the following variable:

```
VITE_API_URL=<backend api url>
```

For example:

```
VITE_API_URL=http://localhost:3000/api
```

Next, install the dependencies:

```bash
npm install
```

### Development

To run the application in a development environment with hot-reloading, use:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Production

To build the application for production, use the following command:

```bash
npm run build
```

This command will create a `dist` directory with the production-ready files.
