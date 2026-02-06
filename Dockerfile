# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build the project (outputs to /app/out due to output: 'export')
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy built assets to the subdirectory matching basePath
# basePath is /DiveSeaNft, so we place files in /usr/share/nginx/html/DiveSeaNft
COPY --from=builder /app/out /usr/share/nginx/html/DiveSeaNft

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
