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

# Build the first Angular project
WORKDIR /app/01-starting-project
RUN pnpm install
RUN pnpm run build --base-href /01-starting-project/

# If you add more projects in the future, you can add build steps here like:
# WORKDIR /app/02-another-project
# RUN pnpm install
# RUN pnpm run build

# Stage 2: Serve all applications with Nginx
FROM nginx:alpine

# Remove default nginx contents
RUN rm -rf /usr/share/nginx/html/*

# Copy the main index page
COPY portfolio-index /usr/share/nginx/html

# Copy the built Angular applications to their respective directories
COPY --from=builder /app/01-starting-project/dist/essentials/browser /usr/share/nginx/html/01-starting-project

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

