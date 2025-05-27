import * as vscode from "vscode";
export async function getAllPackageJSONFiles(uri: vscode.Uri, basePath = ""): Promise<{ path: string }[]> {
    const entries = await vscode.workspace.fs.readDirectory(uri);
    let results: { path: string }[] = [];

    for (const [name, type] of entries) {
        if (name === "node_modules" || name === ".git") {
            continue;
        }

        const entryUri = vscode.Uri.joinPath(uri, name);
        const relativePath = basePath ? `${basePath}/${name}` : name;

        if (type === vscode.FileType.File && name === "package.json") {
            results.push({ path: relativePath });
        } else if (type === vscode.FileType.Directory) {
            const subResults = await getAllPackageJSONFiles(entryUri, relativePath);
            results.push(...subResults);
        }
    }

    return results;
}