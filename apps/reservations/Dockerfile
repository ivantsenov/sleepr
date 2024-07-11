FROM node:alpine As development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

RUN pnpm install

# Copy the rest of the application code to the working directory
COPY apps/reservations apps/reservations
COPY libs libs

RUN cd apps/reservations && pnpm install

# Build the application
RUN pnpm run build reservations

FROM node:alpine As production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

# Copy the rest of the application code to the working directory
COPY --from=development /usr/src/app/dist ./dist

# Start the app
CMD ["node", "dist/apps/reservations/main"]