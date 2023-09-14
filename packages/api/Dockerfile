FROM node:16

ADD yarn.lock /yarn.lock
ADD packages/db/ db/
ADD packages/api/ api/

RUN yarn install && \
    yarn build && \
    yarn db:up

CMD [ "/bin/sh", "cd api/dist && node ./index.js" ]

EXPOSE 8000