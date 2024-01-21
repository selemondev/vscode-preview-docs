import { Uri } from "vscode";
import type { Webview } from "vscode";

export const getUri = (webview: Webview, extensionUri: Uri, pathList: string[]) => {
    return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
};
