FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Use install (not ci) to avoid lock mismatches
RUN npm install --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "server.js"]
