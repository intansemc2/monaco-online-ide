import * as vscode from 'vscode';
// this is required syntax highlighting
import '@codingame/monaco-vscode-cpp-default-extension';
import {
	RegisteredFileSystemProvider,
	registerFileSystemOverlay,
	RegisteredMemoryFile
} from '@codingame/monaco-vscode-files-service-override';
import { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';
import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';
import { createCppUserConfig } from './config';

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

async function initCppWrapper() {
	if (wrapper.isStarted()) {
		console.warn('Editor was already started!');
	} else {
		const fileSystemProvider = new RegisteredFileSystemProvider(false);

		registerFileSystemOverlay(1, fileSystemProvider);
		const userConfig = createCppUserConfig('/workspace', '', '/workspace/hello.cpp');
		const htmlElement = document.getElementById('monaco-editor-root');

		await wrapper.init(userConfig);
		await wrapper.start(htmlElement);

		// Change language
		wrapper.getModelRefs()?.modelRef?.object?.setLanguageId('cpp');
	}
}

async function removeCppWrapper() {
	await wrapper.dispose();
}

export { configureMonacoWorkers, initCppWrapper, removeCppWrapper, wrapper };
