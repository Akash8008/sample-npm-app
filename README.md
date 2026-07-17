# DevOps CI/CD Demo

A simple Node.js application using Express.js for DevOps CI/CD practice.

## Files

- `package.json`: project metadata, dependencies, and npm scripts.
- `index.js`: Express application with `/`, `/health`, and `/version` endpoints.
- `app.test.js`: Jest test file validating the home page and API endpoints.
- `Dockerfile`: production-ready container build definition.
- `.dockerignore`: files excluded from Docker build context.

## Scripts

- `npm start`: runs the Express server on port 3000.
- `npm test`: runs Jest unit tests.
- `npm run build`: placeholder build script for CI/CD pipelines.

## Usage

1. Install dependencies: `npm install`
2. Start the app: `npm start`
3. Visit: `http://localhost:3000`
4. Run tests: `npm test`
