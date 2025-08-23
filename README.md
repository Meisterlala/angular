# Presonal Portfolio Website

This is my source code that i wrote while learning Angular and following a course.

## View

Im running this inside a k8s cluseter. You can view it here: [angular-portfolio.meisterlala.dev](https://angular-portfolio.meisterlala.dev)

## Running the project yourself

You can run this project with docker and then acces on `http://localhost:8080`

```bash
docker compose up --build
```

or just run parts of it with:

```bash
# Go into the folder of the part you want to run
cd 04-dashboard

# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install
# Start the project (access on http://localhost:4200)
pnpm start
```
