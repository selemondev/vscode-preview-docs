import { describe, expect, it, vi } from "vitest";
import { vscode } from "../mocks/vscode";

describe("basic utility modules", () => {
    it("returns the first workspace directory when one is open", async () => {
        const { getProjectDirectory } = await import("../../src/utils/getProjectDir");
        vscode.workspace.workspaceFolders = [{ uri: { fsPath: "/workspace" } }];

        expect(getProjectDirectory()).toBe("/workspace");
    });

    it("builds webview URIs from extension asset paths", async () => {
        const { getUri } = await import("../../src/utils/getUri");
        const webview = {
            asWebviewUri: vi.fn((uri: { fsPath: string }) => `webview:${uri.fsPath}`),
        };

        const uri = getUri(webview as never, { fsPath: "/extension" } as never, ["ui", "build", "assets", "index.js"]);

        expect(vscode.Uri.joinPath).toHaveBeenCalledWith({ fsPath: "/extension" }, "ui", "build", "assets", "index.js");
        expect(uri).toBe("webview:/extension/ui/build/assets/index.js");
    });

    it("generates 32-character alphanumeric nonces", async () => {
        const { getNonce } = await import("../../src/utils/getNounce");

        const nonce = getNonce();

        expect(nonce).toMatch(/^[A-Za-z0-9]{32}$/);
    });

    it("exposes the command identifiers used by the extension", async () => {
        const { commands } = await import("../../src/utils/commands");

        expect(commands).toEqual({
            initPreviewDocs: "previewDocs.initPreviewDocs",
        });
    });

    it("re-exports the shared utility functions from the utils barrel", async () => {
        const utils = await import("../../src/utils");

        expect(utils).toMatchObject({
            getProjectDependencies: expect.any(Function),
            getUri: expect.any(Function),
            getNonce: expect.any(Function),
            getNuxtModules: expect.any(Function),
            getUnjsPackages: expect.any(Function),
        });
    });
});
