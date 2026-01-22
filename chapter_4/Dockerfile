# Use official Node.js runtime
FROM node:22

# Set working directory
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# 🔑 Generate Prisma Client INSIDE the container
RUN npx prisma generate 
# Expose app port
EXPOSE 5003

# Start the server
CMD ["node", "./src/server.js"]
