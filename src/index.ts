import { commands } from 'vscode';
import type { ExtensionContext } from "vscode";
import { activateExtension } from './extension';
import { DocsView } from "./sidebar/index";
import * as vscode from 'vscode';

export async function activate(context: ExtensionContext) {
    commands.executeCommand('setContext');

    const provider = new DocsView(context.extensionUri);

    context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(DocsView.viewType, provider));


    await activateExtension(context);
}
