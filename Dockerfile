# Use the official Node.js image as base
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose Vite's default port (5173)
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
