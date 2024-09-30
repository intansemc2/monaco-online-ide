import * as vscode from 'vscode';
// this is required syntax highlighting
import '@codingame/monaco-vscode-python-default-extension';
import {
	RegisteredFileSystemProvider,
	registerFileSystemOverlay,
	RegisteredMemoryFile
} from '@codingame/monaco-vscode-files-service-override';
import { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';
import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';
import { createPythonUserConfig } from './config';
// import helloPyCode from './hello.py?raw';
// import hello2PyCode from './hello2.py?raw';

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

async function initPythonWrapper() {
	if (wrapper.isStarted()) {
		console.warn('Editor was already started!');
	} else {
		const fileSystemProvider = new RegisteredFileSystemProvider(false);
		registerFileSystemOverlay(1, fileSystemProvider);
		const userConfig = createPythonUserConfig('/workspace', '', '/workspace/hello.py');
		const htmlElement = document.getElementById('monaco-editor-root');

		await wrapper.init(userConfig);
		await wrapper.start(htmlElement);
	}
}

async function removePythonWrapper() {
	await wrapper.dispose();
}

export { configureMonacoWorkers, initPythonWrapper, removePythonWrapper, wrapper };
