FROM node:16.14.0

ADD . app/
WORKDIR /app/
# ADD .yarn/ .yarn/
# ADD yarn.lock yarn.lock
# ADD packages/store/ store/
# ADD packages/api/ api/
# ADD package.json package.json
# ADD workspaces/ workspaces/


ENV POSTGRES_USER=ppoker \
    POSTGRES_HOST=54.233.77.140 \
    POSTGRES_DB=ppokerdb \
    POSTGRES_PASSWORD=123456 \
    SECRET=abc

ENV DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}

RUN yarn install

RUN cd packages/store && \
    yarn build

RUN cd packages/api && \
    yarn build && \
    yarn db:up


ENTRYPOINT [ "/bin/sh", "cd packages/api/dist && node ./index.js" ]

EXPOSE 8000