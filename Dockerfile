# Use Node.js as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to cache dependencies)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files to the container
COPY . .

# Expose the Vite development server port (default is 5173)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
