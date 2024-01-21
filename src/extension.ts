import type { ExtensionContext } from "vscode";
import { DocsView } from './sidebar';
import { filesWatcher } from './watchers';
export async function activateExtension(context: ExtensionContext) {

    const sidebarProvider = new DocsView(context.extensionUri);


    // Initialize file watchers
    new filesWatcher(sidebarProvider, context);
}

// This method is called when your extension is deactivated
export function deactivate() { }
