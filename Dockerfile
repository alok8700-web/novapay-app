FROM node:22-alpine AS frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend ./
RUN npm run build


FROM node:22-alpine AS backend

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend ./
COPY --from=frontend /app/frontend/dist ./public


# Create a dedicated non-root user with a fixed numeric UID.
RUN addgroup -S nodeapp -g 10001 && \
    adduser -S nodeapp -u 10001 -G nodeapp && \
    chown -R 10001:10001 /app/backend

ENV NODE_ENV=production PORT=4000

# Remove npm from the runtime image.
RUN rm -rf /usr/local/lib/node_modules/npm

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider \
  http://localhost:4000/api/health || exit 1

USER 10001

CMD ["node","src/server.js"]
