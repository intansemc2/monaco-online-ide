### About this project

This project is a webapp allow user to run code from browser in some languages, include python, c++, java, javascript, php.

This project uses Docker for easy deployment and high compatibility, but it can take a lot of storage. The Judge0 image can take 10GB of storage, and each language server can range from 423MB to 2.17GB. Optimization is necessary for save storage.

Project feature:

-   Run code in: python, c++, java, javascript, php

-   Code syntax highlight

-   Code linting

-   Change theme and fontsize in the editor

Some technologies used in this project:

-   Svelte (SvelteKit): this is the framework for the front-end

-   Judge0: this is the back-end to run the code

-   Libraries: monaco-editor, monaco-languageclient, ...

### Step by step to run the project:

1. Run a language server (python language server):

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

To activate error check and code linting for a different language, please run the coresponding language server.

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

The webapp will be avaiable at http://localhost:5173

### Credits

Special thanks to TypeFox and others for providing example code for the monaco-editor, monaco-languageclient, and monaco-language-server.

You can checkout the [monaco-languageclient repos](https://github.com/TypeFox/monaco-languageclient) for more information and examples

### Screenshots

Index page
![Index page](/screenshots/screenshot-01.png)

Example run python code
![Index page](/screenshots/screenshot-02.png)

Change theme
![Index page](/screenshots/screenshot-03.png)

Code linting
![Index page](/screenshots/screenshot-04.png)
![Index page](/screenshots/screenshot-05.png)
