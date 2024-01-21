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

    public static readonly viewType = 'previewDocSidebar';

    constructor(private readonly _extensionUri: vscode.Uri) { }

    public resolveWebviewView(webviewView: vscode.WebviewView) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        console.log('Webview resolved. Trying to initialize dependencies.');

        // in case the user reload the window while opening the extension tab
        if (webviewView.visible) {
            console.log('Webview is visible. Initializing dependencies.');
            this._initializeDependencies();
            this.goToProjectView();
        }

        webviewView.onDidChangeVisibility((e) => {
            if (webviewView.visible) {
                console.log('Webview became visible. Going to project view.');
                this.goToProjectView();
            }
        });
    };


    private async _initializeDependencies() {
        // Load dependencies when the webview is resolved
        const dependencies = await getProjectDependencies();

        // Post the dependencies to the webview
        this.postMessage({
            command: 'dependencyData',
            data: {
                dependencies: dependencies,
            },
        });
    }

    public goToProjectView() {
        vscode.window.showInformationMessage('Active')
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
    public postMessage(message: { command: string, data?: { dependencies: { name: string, version: string }[] } }) {
        if (this._view) {
            this._view.webview.postMessage(message);
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const stylesUri = getUri(webview, this._extensionUri, ['ui', 'build', 'assets', 'index.css']);
        // The JS file from the Vue build output
        const scriptUri = getUri(webview, this._extensionUri, ['ui', 'build', 'assets', 'index.js']);

        //     return /*html*/ `
        //   <!DOCTYPE html>
        //   <html lang="en">
        //     <head>
        //       <meta charset="UTF-8" />
        //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        //       <meta http-equiv="Content-Security-Policy" content="default-src https://fonts.gstatic.com/ https://fonts.googleapis.com/  img-src https: data: style-src 'unsafe-inline' ${webview.cspSource} script-src 'nonce-${nonce}'">
        //       <link rel="stylesheet" type="text/css" href="${stylesUri}">
        //       <title>Preview Docs</title>
        //     </head>
        //     <body>
        //       <div id="app"></div>
        //       <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        //     </body>
        //   </html>
        // `;

        return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">

        <!--
            Use a content security policy to only allow loading styles from our extension directory,
            and only allow scripts that have a specific nonce.
            (See the 'webview-sample' extension sample for img-src content security policy examples)
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src https://fonts.gstatic.com/ https://fonts.googleapis.com/ https://api.iconify.design https://ozgtbqizepstargxfqcm.supabase.co/  img-src https: data: style-src 'unsafe-inline' ${webview.cspSource} script-src 'nonce-${nonce}'">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesUri}" rel="stylesheet">

        <title>Cat Colors</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`;
    }
}
