import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { DocsView } from './sidebar';
export async function activate(context: ExtensionContext) {
    const provider = new DocsView(context.extensionUri);
    provider.getDependencies();
    provider.getNuxtPackages();
    provider.getPackages();
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(DocsView.viewType, provider));
}

// This method is called when your extension is deactivated
export function deactivate() { }
