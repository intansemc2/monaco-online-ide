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

# INSTALL PHP
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get install -y php libapache2-mod-php  php-cli php-cgi php-mysql php-pgsql

WORKDIR /root

# INSTALL COMPOSER
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# COPY CODES
COPY src ./src
RUN mkdir /workspace

# LANGUAGE SERVER 
RUN chmod a+x ./src/phpactor/phpactor.phar

# BACK_END CODE
COPY package.json .
COPY tsconfig.json .

RUN npm i

CMD ["npm", "run", "start:server:php"]
