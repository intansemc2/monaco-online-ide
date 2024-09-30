import * as vscode from 'vscode';
import getEditorServiceOverride from '@codingame/monaco-vscode-editor-service-override';
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import '@codingame/monaco-vscode-python-default-extension';
import { type UserConfig } from 'monaco-editor-wrapper';
import { useOpenEditorStub } from 'monaco-editor-wrapper/vscode/services';
import { MonacoLanguageClient } from 'monaco-languageclient';
import { MONACO_DETAULT_USER_CONFIG } from '$lib/monaco-editor/constances';

function createPythonUserConfig(workspaceRoot: string, code: string, codeUri: string): UserConfig {
	return {
		languageClientConfig: {
			languageId: 'python',
			name: 'Python Language Server',
			options: {
				$type: 'WebSocket',

				/** For SSL */
				// host: 'example.com',
				// port: 443,
				// path: 'language-server/python',
				// extraParams: {
				// 	authorization: 'UserAuth'
				// },
				// secured: true,

				/** Localhost */
				host: 'localhost',
				port: 3001,
				path: 'language-server/python',
				extraParams: {
					authorization: 'UserAuth'
				},
				secured: false,

				startOptions: {
					onCall: (languageClient?: MonacoLanguageClient) => {
						setTimeout(() => {
							['pyright.restartserver', 'pyright.organizeimports'].forEach((cmdName) => {
								vscode.commands.registerCommand(cmdName, (...args: unknown[]) => {
									languageClient?.sendRequest('workspace/executeCommand', {
										command: cmdName,
										arguments: args
									});
								});
							});
						}, 250);
					},
					reportStatus: true
				}
			},
			clientOptions: {
				documentSelector: ['python'],
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

export { createPythonUserConfig };
