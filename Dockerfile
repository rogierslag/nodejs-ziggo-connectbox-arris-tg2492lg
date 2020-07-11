FROM node:12.13.0

# Install dumb-init to rape any Chrome zombies
RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64.deb
RUN dpkg -i dumb-init_*.deb

RUN mkdir /app
WORKDIR /app

ADD yarn.lock /app
ADD package.json /app
RUN yarn install --pure-lockfile
ADD src /app/src

CMD ["dumb-init", "yarn", "start"]
