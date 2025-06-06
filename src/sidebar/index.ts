import * as vscode from 'vscode';

import {
    getNonce,
    getUri,
    getProjectDependencies,
    getNuxtModules,
    getUnjsPackages
} from '../utils';
import { getWebviewContent } from '../utils/getWebViewContent';
interface Modules {
    name: string,
    npm: string,
    description: string,
    icon: string
}

interface UnjsPackages {
    title: string,
    url: string,
    description: string
}

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
        this._setWebviewMessageListener(webviewView.webview);
        // in case the user reloads the window while opening the extension tab
        if (webviewView.visible) {
            this.getDependencies();
            this.getNuxtPackages();
            this.getPackages();
        }

        webviewView.onDidChangeVisibility((e) => {
            if (webviewView.visible) {
                this.getDependencies();
                this.getNuxtPackages();
                this.getPackages();
            };
        });
    }
    public async getDependencies() {
        const dependencies = await getProjectDependencies();
        this.postMessage({
            command: 'dependencyData',
            data: {
                dependencies,
            },
        });
    };

    public async getNuxtPackages() {
        const modules = await getNuxtModules();
        this.postMessage({
            command: 'nuxtModules',
            modules: {
                modules: modules,
            },
        });
    };

    public async getPackages() {
        const packages = await getUnjsPackages();
        this.postMessage({
            command: 'packages',
            packages: {
                unjsPackages: packages,
            },
        });
    };

    public postMessage(message: { command: string, data?: { dependencies: { name: string, version?: string, }[] }, modules?: { modules: Modules[] }, packages?: { unjsPackages: UnjsPackages[] }}) {
        if (this._view) {
            this._view.webview.postMessage(message);
        }
    };

    private _setWebviewMessageListener(webview: vscode.Webview) {
        webview.onDidReceiveMessage(async (message: any) => {
            const { command, text } = message;
            switch (command) {
                case 'openDocs':
                    const panel = vscode.window.createWebviewPanel(
                        'webDocs',
                        text.label,
                        vscode.ViewColumn.One,
                        {

                            // https://code.visualstudio.com/docs/extensions/webview#_scripts-and-message-passing
                            enableScripts: true,

                            // https://code.visualstudio.com/docs/extensions/webview#_persistence
                            retainContextWhenHidden: true,
                        }
                    );
                    panel.webview.html = getWebviewContent(text);
                    vscode.window.showInformationMessage(text);
                    break;
                default:
                    break;
            }
        });
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const stylesUri = getUri(webview, this._extensionUri, ['ui', 'build', 'assets', 'index.css']);
        // The JS file from the Vue build output
        const scriptUri = getUri(webview, this._extensionUri, ['ui', 'build', 'assets', 'index.js']);
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">

        <!--
            Use a content security policy to only allow loading styles from our extension directory,
            and only allow scripts that have a specific nonce.
            (See the 'webview-sample' extension sample for img-src content security policy examples)
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src https://fonts.gstatic.com/ https://fonts.googleapis.com/ https://raw.githubusercontent.com/ https://api.iconify.design  img-src https: data: style-src 'unsafe-inline' ${webview.cspSource} script-src 'nonce-${nonce}'">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesUri}" rel="stylesheet">

        <title>Preview Docs</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>`;
    }
}
