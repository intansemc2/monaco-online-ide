# FROM node:18-alpine

FROM ubuntu:22.04

# Install Node
RUN apt update && \
    apt upgrade -y && \
    apt install -y ca-certificates curl gnupg unzip

RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt update && \
    apt install -y nodejs

# Workdir
WORKDIR /root

# Server
COPY src ./src
COPY package.json .
COPY tsconfig.json .

# Server config
RUN mkdir /workspace

# Change watcher limit 
RUN echo fs.inotify.max_user_watches= 131070 | tee -a /etc/sysctl.conf
RUN sysctl fs.inotify.max_user_watches=131070
RUN sysctl -p

RUN npm i

CMD ["npm", "run", "start:server:javascript"]
