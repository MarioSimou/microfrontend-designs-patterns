FROM speakyourownideas/base:prod

ENV ENV_CONFIG=production

WORKDIR /repository/apps/auth

COPY . .

RUN npm i --location=global pnpm && pnpm i
RUN pnpm build

EXPOSE 3002
CMD ["pnpm", "start:prod"]
