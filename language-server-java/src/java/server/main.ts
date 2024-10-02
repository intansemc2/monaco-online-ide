/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import { resolve } from 'node:path';
import { runLanguageServer } from '../../common/node/language-server-runner.js';
import { LanguageName } from '../../common/node/server-commons.js';

export const runJavaServer = (baseDir: string, relativeDir: string) => {
    // const processRunPath = resolve(baseDir, relativeDir);
    runLanguageServer({
        serverName: 'java',
        pathName: '/language-server/java',
        serverPort: 3000,
        runCommand: '/root/src/java-ls/dist/lang_server_linux.sh',
        runCommandArgs: [],
        wsServerOptions: {
            noServer: true,
            perMessageDeflate: false,
        },
    });
};
