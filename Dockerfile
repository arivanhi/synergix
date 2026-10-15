FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN DATABASE_URL=mysql://build:build@localhost:3306/build npx prisma generate
RUN DATABASE_URL=mysql://build:build@localhost:3306/build npm run build
RUN cp -r .next/static .next/standalone/.next/static \
    && ln -s /app/public .next/standalone/public \
    && mkdir -p /app/private-uploads \
    && ln -s /app/private-uploads .next/standalone/private-uploads
ENV NODE_ENV=production
EXPOSE 4005
CMD ["node", "scripts/runtime.cjs"]
