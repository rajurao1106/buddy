# Use Node.js 18 for structuredClone support
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install -g concurrently nodemon
RUN npm install

# Copy the rest of the app
COPY . .

# Expose ports for Vite and the backend
EXPOSE 5173 3000

# Run the development command
CMD ["npm", "run", "dev"]
