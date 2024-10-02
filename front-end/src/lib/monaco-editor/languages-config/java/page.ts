/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as vscode from 'vscode';
// this is required syntax highlighting
import '@codingame/monaco-vscode-java-default-extension';
// import '@codingame/monaco-vscode-typescript-basics-default-extension';
// import '@codingame/monaco-vscode-typescript-language-features-default-extension';
// import '@codingame/monaco-vscode-standalone-typescript-language-features';
import {
	RegisteredFileSystemProvider,
	registerFileSystemOverlay,
	RegisteredMemoryFile
} from '@codingame/monaco-vscode-files-service-override';
import { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';
import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';
import { createJavaUserConfig } from './config';
// import helloPyCode from './hello.js?raw';
// import hello2PyCode from './hello2.js?raw';

function configureMonacoWorkers() {
	useWorkerFactory({
		ignoreMapping: true,
		workerLoaders: {
			editorWorkerService: () =>
				new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), {
					type: 'module'
				})
		}
	});
}

const wrapper = new MonacoEditorLanguageClientWrapper();

async function initJavaWrapper() {
	if (wrapper.isStarted()) {
		console.warn('Editor was already started!');
	} else {
		// const helloPyUri = vscode.Uri.file('/workspace/hello.js');
		// const hello2PyUri = vscode.Uri.file('/workspace/hello2.js');

		const fileSystemProvider = new RegisteredFileSystemProvider(false);
		// fileSystemProvider.registerFile(new RegisteredMemoryFile(helloPyUri, helloPyCode));
		// fileSystemProvider.registerFile(new RegisteredMemoryFile(hello2PyUri, hello2PyCode));

		registerFileSystemOverlay(1, fileSystemProvider);
		const userConfig = createJavaUserConfig('/workspace', '', '/workspace/hello.java');
		const htmlElement = document.getElementById('monaco-editor-root');

		await wrapper.init(userConfig);

		// open files, so the LS can pick it up
		// await vscode.workspace.openTextDocument(hello2PyUri);
		// await vscode.workspace.openTextDocument(helloPyUri);

		await wrapper.start(htmlElement);

		// Change language
		wrapper.getModelRefs()?.modelRef?.object?.setLanguageId('java');
	}
}

async function removeJavaWrapper() {
	await wrapper.dispose();
}

export { configureMonacoWorkers, initJavaWrapper, removeJavaWrapper, wrapper };
