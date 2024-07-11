# Stage 1: Build the application
FROM node:alpine AS development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY apps/payments apps/payments
COPY libs libs

# Ensure proper permissions
RUN chown -R node:node /usr/src/app

# Run pnpm install in the apps/payments directory
USER node
RUN cd apps/payments && pnpm install

# Build the application
RUN pnpm run build payments

# Stage 2: Setup the production environment
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install production dependencies
RUN pnpm install --prod

# Copy the built application from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Ensure proper permissions
RUN chown -R node:node /usr/src/app

# Switch to non-root user
USER node

# Start the app
CMD ["node", "dist/apps/payments/main"]
