import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { DocsView } from './sidebar';
import { filesWatcher } from './watchers';
export async function activateExtension(context: ExtensionContext) {

    const sidebarProvider = new DocsView(context.extensionUri);
    vscode.window.showInformationMessage('Active');


    // Initialize file watchers
    new filesWatcher(sidebarProvider, context);
}

// This method is called when your extension is deactivated
export function deactivate() { }
