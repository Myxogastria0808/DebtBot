FROM node:20

LABEL version="0.0.1"
LABEL description="This is the DebtBot backend docker image."

USER root

WORKDIR /home/backend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY prisma ./prisma

RUN npx prisma generate

COPY . ./

EXPOSE 8787

CMD ["yarn", "dev"]
