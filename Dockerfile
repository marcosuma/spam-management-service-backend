FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
# RUN sed -i "s/mongodb:\/\/localhost/mongodb:\/\/mongo/g" config/services/mongoose.service.js
RUN npm install
COPY . /usr/src/app
EXPOSE 3600
CMD ["node", "index.js"]