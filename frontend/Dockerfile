# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.27-alpine
# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html
# Add nginx config (you must create frontend/nginx.conf below)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
