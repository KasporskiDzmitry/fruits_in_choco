FROM node:16-alpine
WORKDIR /fruits_in_choco_front
COPY ./package.json /fruits_in_choco_front
RUN npm install
COPY . .
CMD npm start