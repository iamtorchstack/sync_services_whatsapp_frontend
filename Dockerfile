# FROM node:20-alpine3.19

# WORKDIR /app

# # Copy frontend source code
# COPY package*.json .

# # Increase memory limit for Node.js
# # ENV NODE_OPTIONS=--max-old-space-size=2048

# #install the app dependecies
# RUN npm install

# COPY . .

# #expose the port so our computer can access it
# EXPOSE 3000

# #run the app
# CMD ["npm", "start"]


# Use Node.js 20 (matches your logs)
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN NODE_OPTIONS=--max-old-space-size=4096 npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]

