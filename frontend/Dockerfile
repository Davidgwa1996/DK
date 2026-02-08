FROM node:18-alpine

WORKDIR /app

# Set default environment variables
ENV NODE_ENV=production
ENV PORT=80
# Default API URL (will be overridden by Render env vars)
ENV REACT_APP_API_URL=https://your-backend.onrender.com

COPY package*.json ./
RUN npm install

# Copy .env.production for build time
COPY .env.production ./

COPY . .

# Build with production environment
RUN npm run build

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]