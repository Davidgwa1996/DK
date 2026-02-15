# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install ALL dependencies (including dev) for building
RUN npm ci
COPY . .
RUN npm run build

# Production stage with nginx
FROM nginx:alpine
# Copy your custom nginx configuration (make sure nginx.conf is in the same directory)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built React app from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]