# Use the official Node.js image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]