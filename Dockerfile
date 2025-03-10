# Use official Node.js runtime as the base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to cache dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the API port
EXPOSE 5002

# Start the API
CMD ["npm", "run", "dev"]

