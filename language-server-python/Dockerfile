FROM node:18-alpine

COPY src ./src
COPY package.json .
COPY tsconfig.json .

RUN npm i

CMD ["npm", "run", "start:server:python"]
