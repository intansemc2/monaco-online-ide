/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import { resolve } from 'node:path';
import { runLanguageServer } from '../../common/node/language-server-runner.js';
import { LanguageName } from '../../common/node/server-commons.js';

export const runJavaServer = (baseDir: string) => {
    // const processRunPath = resolve(baseDir, relativeDir);
    runLanguageServer({
        serverName: 'php',
        pathName: '/language-server/php',
        serverPort: 3000,
        runCommand: '/root/src/phpactor/phpactor.phar',
        runCommandArgs: ['language-server'],
        wsServerOptions: {
            noServer: true,
            perMessageDeflate: false,
        },
    });
};
