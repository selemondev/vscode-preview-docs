import { commands } from 'vscode';
import type { ExtensionContext } from "vscode";
import { activateExtension } from './extension';

export async function activate(context: ExtensionContext) {
    commands.executeCommand('setContext');

    await activateExtension(context);
}
