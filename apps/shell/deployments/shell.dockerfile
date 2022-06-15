FROM mariossimou.dev/base:prod

WORKDIR /repository/apps/shell
COPY . .
RUN npm i --location=global && pnpm i && pnpm build

EXPOSE 3000
CMD ["pnpm", "start:prod"]