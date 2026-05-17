# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json prisma.config.js ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

COPY package*.json prisma.config.js ./
COPY prisma ./prisma
# Install only production dependencies
RUN npm install --production
# Generate Prisma Client explicitly
RUN npx prisma generate --schema=./prisma/schema.prisma

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push --accept-data-loss && node dist/index.js"]
