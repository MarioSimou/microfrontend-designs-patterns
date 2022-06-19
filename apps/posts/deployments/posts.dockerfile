FROM speakyourownideas/base:prod

ENV ENV_CONFIG=production

WORKDIR /repository/apps/posts

COPY . .

RUN npm i --location=global pnpm && pnpm i
RUN pnpm build

EXPOSE 3001
CMD ["pnpm", "start:prod"]
