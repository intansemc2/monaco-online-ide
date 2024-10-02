/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import { resolve } from 'node:path';
import { runJavaServer } from './main.js';
import { getLocalDirectory } from '../../common/node/server-commons.js';

const baseDir = resolve(getLocalDirectory(import.meta.url));
const relativeDir = '../../java-ls/dist/lang_server_linux.sh';
runJavaServer(baseDir, relativeDir);
