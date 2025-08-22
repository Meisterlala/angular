# Multi-stage Dockerfile for building multiple Angular projects

# Stage 1: Build all Angular applications
FROM node:lts-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files for all projects
# We'll copy everything first and then build each project individually
COPY . .

# Build the Angular projects
WORKDIR /app/01-starting-project
RUN pnpm install
RUN pnpm run build --base-href /01-starting-project/

WORKDIR /app/02-finance-calculator
RUN pnpm install
RUN pnpm run build --base-href /02-finance-calculator/

WORKDIR /app/04-dashboard
RUN pnpm install
RUN pnpm run build --base-href /04-dashboard/

WORKDIR /app/05-directives-deep-dive
RUN pnpm install
RUN pnpm run build --base-href /05-directives-deep-dive/

# Stage 2: Serve all applications with Nginx
FROM nginx:alpine

# Remove default nginx contents
RUN rm -rf /usr/share/nginx/html/*

# Copy the main index page
COPY portfolio-index /usr/share/nginx/html

# Copy the built Angular applications to their respective directories
COPY --from=builder /app/01-starting-project/dist/essentials/browser /usr/share/nginx/html/01-starting-project
COPY --from=builder /app/02-finance-calculator/dist/02-finance-calculator/browser /usr/share/nginx/html/02-finance-calculator
COPY --from=builder /app/04-dashboard/dist/cmp-deep-dive/browser /usr/share/nginx/html/04-dashboard
COPY --from=builder /app/05-directives-deep-dive/dist/directives-deep-dive/browser /usr/share/nginx/html/05-directives-deep-dive

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

