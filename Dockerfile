# base image
FROM node:18.18.0 as build-stage

# set working directory
WORKDIR /app

RUN npm rebuild node-sass

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

## generate build
RUN npm run build

FROM nginx as production-stage
EXPOSE 5173
RUN mkdir /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /app

## base image
#FROM nginx:alpine

## copy artifact build from the 'build environment'
#COPY --from=build /app/dist /usr/share/nginx/html

## expose port 80
#EXPOSE 80

## run nginx
#CMD ["nginx", "-g", "daemon off;"]

# docker build -t vue-prod -f Dockerfile .
# docker run -it -p 5173:80 vue-prod
 