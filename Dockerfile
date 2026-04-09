COPY ..

RUN npm run build

FROM node:20-alphine AS runner

WORKDIR /src

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 2300

CMD ["node","module/index.js"]
