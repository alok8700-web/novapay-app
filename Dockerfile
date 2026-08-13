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

RUN addgroup -S nodeapp && \
    adduser -S nodeapp -G nodeapp && \
    chown -R nodeapp:nodeapp /app/backend

ENV NODE_ENV=production PORT=4000
RUN rm -rf /usr/local/lib/node_modules/npm

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/api/health || exit 1

USER nodeapp

CMD ["node","src/server.js"]
