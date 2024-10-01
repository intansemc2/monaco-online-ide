/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import { resolve } from 'node:path';
import { IncomingMessage } from 'node:http';
import { runLanguageServer } from '../../common/node/language-server-runner.js';
import { LanguageName } from '../../common/node/server-commons.js';

export const runPythonServer = (baseDir: string) => {
    runLanguageServer({
        serverName: 'clangd',
        pathName: '/language-server/cpp',
        serverPort: 3000,
        runCommand: '/usr/bin/clangd',
        runCommandArgs: [
            '--all-scopes-completion',
            '--background-index',
            '--clang-tidy',
            '--completion-parse=auto',
            '--completion-style=detailed',
            '--header-insertion=iwyu',
            '--log=verbose',
            '--j=6',
            '--fallback-style=Google',
            '--query-driver=/usr/bin/clang++'
        ],
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
