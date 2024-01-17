import * as vscode from 'vscode';
import { commands } from './utils/commands';
import { getLanguageFrameworks } from './utils/getFrameworks';
import { getLanguageFrameworkDocs } from './utils/getFrameworksDocs';
import { getWebviewContent } from './utils/getWebViewContent';

export function activate(context: vscode.ExtensionContext) {
	const disposables: vscode.Disposable[] = [
		vscode.commands.registerCommand(commands.initPreviewDocs, async () => {
			if (!getLanguageFrameworks) {
				vscode.window.showErrorMessage("Can not get language frameworks list");
				return;
			}

			const selectedLangFramework = await vscode.window.showQuickPick(getLanguageFrameworks, {
				matchOnDescription: true,
			});

			if (!selectedLangFramework) {
				return;
			}

			const selectedLangFrameworkDocs = getLanguageFrameworkDocs[selectedLangFramework.label];

			if (!selectedLangFrameworkDocs) {
				return;
			}

			const selectedLangFrameworkDoc = await vscode.window.showQuickPick(selectedLangFrameworkDocs, {
				matchOnDescription: true,
			});

			if (!selectedLangFrameworkDoc) {
				return;
			}

			const panel = vscode.window.createWebviewPanel(
				'webDocs',
				selectedLangFrameworkDoc.label,
				vscode.ViewColumn.One,
				{
					enableScripts: true,
					retainContextWhenHidden: true,
				}
			);
			panel.webview.html = getWebviewContent(selectedLangFrameworkDoc);
		}),
	];
	context.subscriptions.push(...disposables);
}

// This method is called when your extension is deactivated
export function deactivate() { }
