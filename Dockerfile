FROM node:22-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/.dist dist
COPY --from=build /usr/src/app/package*.json ./

RUN npm ci --omit=dev

EXPOSE $APP_PORT

RUN addgroup -g 1001 -S appuser && \
  adduser -u 1001 -S appuser -G appuser

RUN chown -R appuser:appuser /usr/src/app
USER appuser

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["npm", "start"]
