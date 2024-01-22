import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { DocsView } from './sidebar';
import { filesWatcher } from './watchers';
import { getWebviewContent } from "./utils/getWebViewContent";
export async function activateExtension(context: ExtensionContext) {

    const sidebarProvider = new DocsView(context.extensionUri);
    sidebarProvider.goToProjectView();

    let labelUri = '';
    let urlUri = '';
    let logoUri = '';

    const panel = vscode.window.createWebviewPanel(
        'webDocs',
        'previewDocs',
        vscode.ViewColumn.One,
        {
            // разрешить загруженным сайтам использовать свои скрипты (потенциально опасно)
            // https://code.visualstudio.com/docs/extensions/webview#_scripts-and-message-passing
            enableScripts: true,

            // лучше использовать сохранение состояния
            // https://code.visualstudio.com/docs/extensions/webview#_persistence
            retainContextWhenHidden: true,
        }
    );

    let uri = {
        label: labelUri,
        logo: logoUri,
        docUrl: urlUri
    };


    // if (labelUri !== '' && logoUri !== '' && urlUri !== '') {
    //     panel.webview.html = getWebviewContent(uri);
    // }
    // panel.webview.onDidReceiveMessage(message => {
    //     if (message) {
    //         // const { label, url, logo } = message;

    //         // Do something with the received data, for example:
    //         vscode.window.showInformationMessage(`Received openDocs command with label`);
    //     }
    //     // if (message.command === 'openDocs') {
    //     //     const { label, url, logo } = message;

    //     //     labelUri = label;
    //     //     logoUri = logo;
    //     //     labelUri = label;
    //     //     // Do something with the received data, for example:
    //     //     vscode.window.showInformationMessage(`Received openDocs command with label: ${label}, url: ${url}, logo: ${logo}`);
    //     // }
    // });


    panel.webview.onDidReceiveMessage(
        message => {
            switch (message.command) {
                case 'openDocs':
                    if (labelUri !== '' || logoUri !== '' || urlUri !== '') {
                        panel.webview.html = getWebviewContent({
                            label: labelUri,
                            logo: logoUri,
                            docUrl: urlUri,
                        });
                    }
                    vscode.window.showInformationMessage(`Received openDocs command with label`);
                    return;
            }
        },
        undefined,
        context.subscriptions
    );



    // Initialize file watchers
    new filesWatcher(sidebarProvider, context);
}

// This method is called when your extension is deactivated
export function deactivate() { }
