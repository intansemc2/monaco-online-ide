import * as vscode from 'vscode';
import '@codingame/monaco-vscode-php-default-extension';
import {
	RegisteredFileSystemProvider,
	registerFileSystemOverlay,
	RegisteredMemoryFile
} from '@codingame/monaco-vscode-files-service-override';
import { MonacoEditorLanguageClientWrapper } from 'monaco-editor-wrapper';
import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';
import { createPHPUserConfig } from './config';

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

async function initPHPWrapper() {
	if (wrapper.isStarted()) {
		console.warn('Editor was already started!');
	} else {
		const fileSystemProvider = new RegisteredFileSystemProvider(false);

		registerFileSystemOverlay(1, fileSystemProvider);
		const userConfig = createPHPUserConfig('/workspace', '', '/workspace/hello.php');
		const htmlElement = document.getElementById('monaco-editor-root');

		await wrapper.init(userConfig);
		await wrapper.start(htmlElement);

		wrapper.getModelRefs()?.modelRef?.object?.setLanguageId('php');
	}
}

async function removePHPWrapper() {
	await wrapper.dispose();
}

export { configureMonacoWorkers, initPHPWrapper, removePHPWrapper, wrapper };
