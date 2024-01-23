import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { DocsView } from './sidebar';
import { filesWatcher } from './watchers';
import { getWebviewContent } from "./utils/getWebViewContent";
export async function activateExtension(context: ExtensionContext) {

    const sidebarProvider = new DocsView(context.extensionUri);
    sidebarProvider.goToProjectView();
    const panel = vscode.window.createWebviewPanel(
        'webDocs',
        'previewDocSidebar',
        vscode.ViewColumn.One,
        // {

        //     // https://code.visualstudio.com/docs/extensions/webview#_scripts-and-message-passing
        //     enableScripts: true,

        //     // https://code.visualstudio.com/docs/extensions/webview#_persistence
        //     retainContextWhenHidden: true,
        // }
    );



    panel.webview.onDidReceiveMessage(
        message => {
            switch (message.command) {
                case 'openDocs':
                    console.log('Open Docs', message.command);
                    vscode.window.showInformationMessage(`Received ${message.text}`);
                    return;
            }
        },
        undefined,
        context.subscriptions
    );




    // Initialize file watchers
    // new filesWatcher(sidebarProvider, context);
}

// This method is called when your extension is deactivated
export function deactivate() { }
