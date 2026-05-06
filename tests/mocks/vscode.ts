import path from "node:path";
import { vi } from "vitest";

const createUri = (value: string) => ({
    fsPath: value,
    path: value,
    toString: () => value,
});

const getUriPath = (value: unknown) => {
    if (typeof value === "string") {
        return value;
    }

    if (value && typeof value === "object") {
        const uri = value as { fsPath?: string; path?: string };
        return uri.fsPath ?? uri.path ?? "";
    }

    return "";
};

const createDisposable = () => ({
    dispose: vi.fn(),
});

export const vscode = {
    FileType: {
        File: 1,
        Directory: 2,
    },
    ViewColumn: {
        One: 1,
    },
    Uri: {
        joinPath: vi.fn((base: unknown, ...paths: string[]) => {
            return createUri(path.posix.join(getUriPath(base), ...paths));
        }),
    },
    workspace: {
        workspaceFolders: undefined as Array<{ uri: { fsPath: string; path?: string } }> | undefined,
        fs: {
            readDirectory: vi.fn(async () => []),
        },
    },
    window: {
        createWebviewPanel: vi.fn(() => ({
            webview: {
                html: "",
            },
        })),
        registerWebviewViewProvider: vi.fn(() => createDisposable()),
        showErrorMessage: vi.fn(),
        showInformationMessage: vi.fn(),
        showWarningMessage: vi.fn(),
    },
};

export const resetVscodeMock = () => {
    vscode.Uri.joinPath.mockClear();
    vscode.workspace.workspaceFolders = undefined;
    vscode.workspace.fs.readDirectory.mockReset();
    vscode.workspace.fs.readDirectory.mockResolvedValue([]);
    vscode.window.createWebviewPanel.mockReset();
    vscode.window.createWebviewPanel.mockImplementation(() => ({
        webview: {
            html: "",
        },
    }));
    vscode.window.registerWebviewViewProvider.mockReset();
    vscode.window.registerWebviewViewProvider.mockImplementation(() => createDisposable());
    vscode.window.showErrorMessage.mockReset();
    vscode.window.showInformationMessage.mockReset();
    vscode.window.showWarningMessage.mockReset();
};
