# Step 1: Use an official Node.js runtime as the base image
FROM node:20

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (if available)
# This allows Docker to cache the dependencies layer
COPY package*.json ./

# Step 4: Install dependencies inside the container
RUN npm install

# Step 5: Copy the rest of the application files to the container
COPY . .

# Step 6: Expose the port your app will run on (e.g., 3000)
EXPOSE 3000

# Step 7: Define the command to run your app
CMD ["node", "server.js"]
