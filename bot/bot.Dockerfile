FROM node:lts-alpine3.19

LABEL version="0.0.1"
LABEL description="This is the DebtBot backend docker image."

USER root

WORKDIR /home/bot

COPY . ./

RUN yarn install && \
    yarn compile

CMD ["yarn", "start"]
