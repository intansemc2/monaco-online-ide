### Step by step to run the project:

1. Run the python language server:

-   Navigate to `language-server-python` folder

-   Build docker image:

```
./run-build.sh

OR

docker build -t custom-ide-language-server:python-pyright .
```

-   Run python language server:

```
run-start-server.sh

OR

docker run --rm -p 3001:3001 custom-ide-language-server:python-pyright
```

2. Run the judge0 server:

-   Navigate to `judge0` folder

-   Run judge0 server:

```
./run-start-server.sh

OR

docker compose up -d; docker logs -f judge0-server
```

3. Run the front-end:

-   Navigate to `front-end` folder

-   Install moodules

```
pnpm i
```

-   Run front-end:

```
pnpm dev
```

The webserver will be avaiable at http://localhost:5173
