FROM node:16

MAINTAINER 天非666

ADD . /usr/src/media_manager_web_app

WORKDIR /usr/src/media_manager_web_app

RUN npm install -g pnpm

RUN pnpm install

EXPOSE 8001

ENTRYPOINT ["pnpm","serve"]
