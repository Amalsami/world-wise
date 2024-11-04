# World-Wise React App 🌍

A React application to explore, manage, and visualize cities and countries worldwide. This project includes a map with markers for cities, latitude/longitude coordinates, CRUD functionality for city and country data, and user authentication.

## Features

- **Interactive Map**: Display cities with markers using React Leaflet, showing locations based on latitude and longitude.
- **CRUD Operations**: Create, view, update, and delete cities.
- **Country & City Lists**: Browse lists of countries and cities, and view detailed information on each city.
- **Authentication**: Login functionality to secure the app.
- **Dynamic Routing**: React Router to navigate between different sections (home, city list, country list, and city details).
- **Context API**: Manage and share app state efficiently across components.
- **Modular Styling**: CSS modules for scoped, component-specific styles.
- **ID-based URL Navigation**: Access details of specific cities or countries by reading their IDs from the URL.

## Tech Stack

- **Frontend**: React with Vite, React Router, React Leaflet, Context API
- **Styling**: CSS Modules
- **Backend**: Fake API for data handling (CRUD operations)

## Usage

- **Map Interaction** : View cities on an interactive map, with real-time positioning.
- **CRUD Actions** : Manage city data directly in the app (add, delete, and update city information).
- **Authentication** : Secure login to access and manage data.
- **Routing** : Easily navigate between lists and details using React Router.

## Prerequisites

- **Node.js** (>=14.x recommended)
- **npm** (Node Package Manager)

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Amalsami/world-wise.git
   cd world-wise-app

   ```

2. Install dependencies:

   ```
   npm install

   ```

3. Start app:

```
  npm run server: Starts the fake API server for handling CRUD operations.
  npm run dev: Starts the development server for the React app.

```
