FROM node:14

WORKDIR /server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD [ "yarn", "start" ]