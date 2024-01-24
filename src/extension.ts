import type { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import { DocsView } from './sidebar';
import { filesWatcher } from './watchers';
import { getWebviewContent } from "./utils/getWebViewContent";
export async function activateExtension(context: ExtensionContext) {

    const sidebarProvider = new DocsView(context.extensionUri);
    sidebarProvider.goToProjectView();


    // Initialize file watchers
    // new filesWatcher(sidebarProvider, context);
}

// This method is called when your extension is deactivated
export function deactivate() { }
