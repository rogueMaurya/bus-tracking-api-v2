# Bus Tracking System API

This repository contains the backend API for a Bus Tracking System. The API is built with Node.js and Express, providing endpoints for managing buses, locations, routes, trips, and authentication.

## Features

- User authentication (login, registration)
- Bus management (CRUD operations)
- Real-time location tracking for buses
- Route and trip management
- GPS simulation utility
- API documentation with Swagger

## Project Structure

```
src/
  app.js                # Main application entry point
  config/               # Configuration files (DB, Swagger)
  middlewares/          # Express middlewares (auth, error handling)
  modules/
    auth/               # Authentication module
    buses/              # Bus management module
    location/           # Location tracking module
    routes/             # Route management module
    trips/              # Trip management module
  utils/                # Utility scripts (GPS simulator)
```

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm
- Docker (optional, for containerization)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pavithra-cj/bus-tracking-api.git
   cd bus-tracking-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` and update the values as needed.

### Running the API

#### Locally

```bash
npm start
```

#### With Docker

```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000` (default).

### API Documentation

Swagger UI is available at `/api-docs` when the server is running.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Author

- Pavithra Chamod
- NIBM ID: YR4COBSCCOMP232P-038
- Coventry ID: 14946040
# bus-tracking-api-v2
