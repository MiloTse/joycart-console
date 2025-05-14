# Stage 1: Build the React application
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Set environment variables for production build
ENV VITE_API_BASE_URL=http://host.docker.internal:8082
ENV VITE_APP_NAME="Joy Cart"
ENV VITE_APP_VERSION=1.0.0
ENV VITE_APP_DESCRIPTION="Modern e-commerce platform"

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 添加host.docker.internal解析到主机地址
# 某些Docker环境需要此配置以连接到宿主机
RUN echo -e "\n# Host to connect to host machine\n127.0.0.1 host.docker.internal" >> /etc/hosts || true

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]