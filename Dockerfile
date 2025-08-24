# Multi-stage optimized Dockerfile for building many Angular projects
# - Uses pnpm and BuildKit cache for pnpm store to speed repeated builds
# - Installs dependencies for each project individually (each has its own package.json)
# - Dynamically discovers Angular projects (looks for angular.json) and builds each into /app/build-artifacts/<project-folder>
# - Final stage serves all artifacts with nginx

FROM --platform=$BUILDPLATFORM node:lts AS builder

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# Copy the entire repository first to find all projects
COPY . .

# Configure pnpm store for caching
RUN --mount=type=cache,target=/root/.pnpm-store pnpm config set store-dir /root/.pnpm-store

# Install dependencies for each Angular project individually
RUN set -eux; \
    for proj in $(find . -maxdepth 2 -type f -name angular.json -printf '%h\n' | sort -u); do \
      proj=${proj#./}; \
      echo "\n--- Installing dependencies for project: $proj"; \
      if [ -f "$proj/package.json" ]; then \
        (cd "$proj" && pnpm install --frozen-lockfile --reporter=silent); \
      fi; \
    done

# Build all Angular projects that contain an angular.json file. Each project's files will be emitted into
# /app/build-artifacts/<folder-name> and will have a base-href of /<folder-name>/ so they can be served from subpaths.
RUN set -eux; \
    mkdir -p /app/build-artifacts; \
    # find project dirs (assumes angular.json lives at project root or one level below workspace root)
    for proj in $(find . -maxdepth 2 -type f -name angular.json -printf '%h\n' | sort -u); do \
      proj=${proj#./}; \
      echo "\n--- Building project: $proj"; \
      # Build each project in its own directory since dependencies are installed there
      (cd "$proj" && pnpm run build --output-path=/app/build-artifacts/$proj --base-href=/$proj/ && \
       if [ -d "/app/build-artifacts/$proj/browser" ]; then \
         mv /app/build-artifacts/$proj/browser/* /app/build-artifacts/$proj/ && \
         rmdir /app/build-artifacts/$proj/browser; \
       fi); \
    done

# Final minimal stage that serves the built artifacts
FROM nginx:alpine AS nginx

# Clear default content
RUN rm -rf /usr/share/nginx/html/*

# Copy a root index / portfolio index if present
COPY portfolio-index /usr/share/nginx/html

# Copy built artifacts (each project folder becomes a subfolder under the webroot)
COPY --from=builder /app/build-artifacts /usr/share/nginx/html

# Custom nginx config (if provided)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

