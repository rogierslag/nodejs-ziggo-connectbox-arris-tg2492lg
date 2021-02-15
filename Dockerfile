FROM node:12.13.0 as build-env

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64.deb
RUN wget http://ftp.us.debian.org/debian/pool/main/d/dumb-init/dumb-init_1.2.0-1_armhf.deb
RUN dpkg -i dumb-init_*_amd64.deb || dpkg -i dumb-init_*_armhf.deb

RUN mkdir /app
WORKDIR /app

ADD yarn.lock /app
ADD package.json /app
RUN yarn install --pure-lockfile
ADD src /app/src

FROM gcr.io/distroless/nodejs:12
COPY --from=build-env /app /app
WORKDIR /app


CMD ["--require","esm","src/index.js"]
