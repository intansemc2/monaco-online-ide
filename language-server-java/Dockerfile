FROM maven:3.9.7-eclipse-temurin-22-jammy

# INSTALL NODEJS
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y ca-certificates curl gnupg unzip

RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs

WORKDIR /root

# COPY CODES
COPY src ./src

# CLONE LANGUAGE SERVER
RUN git clone https://github.com/georgewfraser/java-language-server.git
RUN mv java-language-server java-ls
RUN mv java-ls ./src

# CONFIG LANGUAGE SERVER
WORKDIR /root/src/java-ls
RUN ./scripts/link_linux.sh
RUN mvn package -DskipTests
RUN mkdir /workspace

# BACK_END CODE
WORKDIR /root
COPY package.json .
COPY tsconfig.json .

RUN npm i

CMD ["npm", "run", "start:server:java"]
