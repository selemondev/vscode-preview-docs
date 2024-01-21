import * as vscode from 'vscode';

import {
    getNonce,
    getUri,
    getProjectDependencies,
} from '../utils';

// random number generated for security measure to enable Content Security Policy (CSP)
const nonce = getNonce();

export class DocsView implements vscode.WebviewViewProvider {
    _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) { }

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        //@ts-ignore
        this._setWebviewMessageListener(webviewView.webview);

        // in case the user reload the window while opening the extension tab
        if (webviewView.visible) {
            vscode.window.showInformationMessage('Active')
            this.goToProjectView();
        }

        webviewView.onDidChangeVisibility((e) => {
            if (webviewView.visible) {
                this.goToProjectView();
            }
        });
    }

    public goToProjectView() {
        this.postMessage({ command: 'projectView' });
        this.getDependencies();
    }

    public async getDependencies() {
        const dependencies = await getProjectDependencies();
        this.postMessage({
            command: 'dependencyData',
            data: {
                dependencies: dependencies,
            },
        });
    }
    public postMessage(message: { command: string, data?: { dependencies: { name: string, version: string}[]}}) {
        if (this._view) {
            this._view.webview.postMessage(message);
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const stylesUri = getUri(webview, this._extensionUri, ['ui', 'build', 'assets', 'index.css']);
        // The JS file from the Vue build output
        const scriptUri = getUri(webview, this._extensionUri, ['ui', 'build', 'assets', 'index.js']);

        return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src https://fonts.gstatic.com/ https://fonts.googleapis.com/ https://raw.githubusercontent.com/ https://ozgtbqizepstargxfqcm.supabase.co/  img-src https: data: style-src 'unsafe-inline' ${webview.cspSource} script-src 'nonce-${nonce}'">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Preview Docs</title>
        </head>
        <body>
          <div id="app"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
    }
}
