FROM ubuntu:22.04

# Install Node
RUN apt update && apt upgrade -y && apt install -y ca-certificates curl gnupg unzip

RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt update && \
    apt install -y nodejs

# Install Clang
RUN apt install -y clang
RUN apt install -y cmake
RUN apt install -y libc++-dev
RUN apt install -y libstdc++-11-dev

# Change to home ~
WORKDIR /root

COPY src ./src
COPY package.json .
COPY tsconfig.json .

# Download Clangd
RUN apt install -y wget 
RUN wget https://github.com/clangd/clangd/releases/download/18.1.3/clangd-linux-18.1.3.zip
RUN unzip clangd-linux-18.1.3.zip
RUN cp ./clangd_18.1.3/bin/clangd /usr/bin
RUN chmod +x /usr/bin/clangd

RUN mkdir -p ~/.config/clangd
RUN cp ./src/clangd/config.yaml ~/.config/clangd

RUN npm i

CMD ["npm", "run", "start:server:cpp"]
