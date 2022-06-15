FROM node:16-alpine3.15 AS build

WORKDIR /repository

ENV APP_AUTH_PATH="./apps/auth"
ENV APP_POSTS_PATH="./apps/posts"
ENV APP_SHELL_PATH="./apps/shell"
ENV LIB_PATH="./packages/lib"

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY ${APP_AUTH_PATH}/package.json ${APP_AUTH_PATH}/package.json
COPY ${APP_POSTS_PATH}/package.json ${APP_POSTS_PATH}/package.json
COPY ${APP_SHELL_PATH}/package.json ${APP_SHELL_PATH}/package.json
COPY ${LIB_PATH} ${LIB_PATH}

RUN npm i --location=global pnpm && pnpm i

CMD ["true"]