# Rick & Morty App

This application allows users to explore locations from the Rick & Morty universe and view details about each location and its residents.

## Features

- Retrieve a list of locations, along with their types and residents.
- Search locations by name.
- View details about each location, including residents and their status.
- Add a note about each resident and save them locally.
- Navigate to a separate page to view residents of a location.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated applications.
- **Axios**: A promise-based HTTP client for making requests to the Rick & Morty API.
- **Docker**: A containerization platform for packaging applications and their dependencies into containers.
- **Kubernetes**: A container orchestration platform for deploying, scaling, and managing containerized applications.

## Getting Started

I chose to use `localStorage` in this app because it offers a straightforward solution for storing data directly on the user's device. This decision was made with the intention of enhancing user experience by providing seamless access to features like saving notes about characters or preserving user preferences, all without the need for constant internet connectivity.

### Prerequisites

- Node.js and npm installed on your machine.
- Docker installed (optional, for containerization).
- Kubernetes cluster configured and `kubectl` installed(optional).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fabulousDesigns/rick-and-morty-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd rick-and-morty-app
   ```

3. Install dependencies:

   ```bash
   npm i
   ```

### Running the Application

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Docker

To run the application using Docker:

1. Build the Docker image:

   ```bash
   docker build -t rickandmortyapp .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 rickandmortyapp -d
   ```

The application will be accessible at `http://localhost:3000`.

### Kubernetes

To run the application using Kubernetes:

1. Apply the Kubernetes deployment configuration:

   ```bash
   kubectl apply -f deployment.yaml
   ```

The application will be accessible through the Kubernetes service. Use `kubectl get all` | `kubectl get svc` to know if the application has started successfully

## Acknowledgements

- Rick & Morty API: https://rickandmortyapi.com/

## Contact

For any inquiries or support, please contact designsfabulous8@gmail.com.
