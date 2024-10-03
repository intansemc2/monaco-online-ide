import * as vscode from 'vscode';
import getEditorServiceOverride from '@codingame/monaco-vscode-editor-service-override';
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import '@codingame/monaco-vscode-javascript-default-extension';
import { type UserConfig } from 'monaco-editor-wrapper';
import { useOpenEditorStub } from 'monaco-editor-wrapper/vscode/services';
import { MonacoLanguageClient } from 'monaco-languageclient';
import { MONACO_DETAULT_USER_CONFIG } from '$lib/monaco-editor/constances';

function createJavascriptUserConfig(
	workspaceRoot: string,
	code: string,
	codeUri: string
): UserConfig {
	return {
		languageClientConfig: {
			languageId: 'javascript',
			name: 'Javascript Language Server',
			options: {
				$type: 'WebSocket',

				/** For SSL */
				// host: 'ide.hoctap.vn',
				// port: 443,
				// path: 'language-server/javascript',
				// extraParams: {
				// 	authorization: 'UserAuth'
				// },
				// secured: true,

				/** Localhost */
				host: 'localhost',
				port: 3004,
				path: 'language-server/javascript',
				extraParams: {
					authorization: 'UserAuth'
				},
				secured: false
			},
			clientOptions: {
				documentSelector: ['javascript'],
				workspaceFolder: {
					index: 0,
					name: 'workspace',
					uri: vscode.Uri.parse(workspaceRoot)
				}
			}
		},
		wrapperConfig: {
			serviceConfig: {
				userServices: {
					...getEditorServiceOverride(useOpenEditorStub),
					...getKeybindingsServiceOverride()
				},
				debugLogging: true
			},
			editorAppConfig: {
				$type: 'extended',
				codeResources: {
					main: {
						text: code,
						uri: codeUri
					}
				},
				userConfiguration: {
					json: JSON.stringify({
						...MONACO_DETAULT_USER_CONFIG
					})
				},
				useDiffEditor: false
			}
		},
		loggerConfig: {
			enabled: true,
			debugEnabled: true
		}
	};
}

export { createJavascriptUserConfig };
