/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import { resolve } from 'node:path';
import { IncomingMessage } from 'node:http';
import { runLanguageServer } from '../../common/node/language-server-runner.js';
import { LanguageName } from '../../common/node/server-commons.js';

export const runJavascriptServer = (baseDir: string) => {
    // const configPath = resolve(baseDir, '../../quick-lint-js');
    runLanguageServer({
        serverName: 'typefox-lsp',
        pathName: '/language-server/javascript',
        serverPort: 3000,
        runCommand: 'npx',
        runCommandArgs: ['typescript-language-server', '--stdio', '--log-level', '4'],
        wsServerOptions: {
            noServer: true,
            perMessageDeflate: false,
            clientTracking: true,
            verifyClient: (clientInfo: { origin: string; secure: boolean; req: IncomingMessage }, callback) => {
                const parsedURL = new URL(`${clientInfo.origin}${clientInfo.req.url ?? ''}`);
                const authToken = parsedURL.searchParams.get('authorization');
                if (authToken === 'UserAuth') {
                    callback(true);
                } else {
                    callback(false);
                }
            },
        },
    });
};
