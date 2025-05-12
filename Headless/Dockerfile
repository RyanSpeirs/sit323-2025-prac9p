# Dockerfile  Ryan Speirs 600152989
# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
# This is done to take advantage of Docker cache when installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Set the environment variable for MongoDB URI (this can also be handled at runtime)
ENV MONGO_URI=mongodb://admin1:password123@mongodb-service:27017/myappdb?authSource=myappdb

# Ensure node binary is correctly referenced
RUN ln -sf /usr/local/bin/node /usr/src/app/node_modules/.bin/node

# Run the app
CMD ["npm", "start"]
