import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetVscodeMock, vscode } from "./mocks/vscode";

const docsViewMethods = {
    getDependencies: vi.fn(),
    getNuxtPackages: vi.fn(),
    getPackages: vi.fn(),
};

const DocsView = vi.fn().mockImplementation(() => docsViewMethods);
(DocsView as typeof DocsView & { viewType: string }).viewType = "previewDocSidebar";

vi.mock("../src/sidebar", () => ({
    DocsView,
}));

describe("activate", () => {
    beforeEach(() => {
        resetVscodeMock();
        vi.clearAllMocks();
        docsViewMethods.getDependencies.mockReset();
        docsViewMethods.getNuxtPackages.mockReset();
        docsViewMethods.getPackages.mockReset();
    });

    it("registers the sidebar provider and eagerly fetches data", async () => {
        const { activate } = await import("../src/extension");
        const extensionUri = { fsPath: "/extension" };
        const context = {
            extensionUri,
            subscriptions: [] as unknown[],
        };

        await activate(context as never);

        expect(DocsView).toHaveBeenCalledWith(extensionUri);
        expect(docsViewMethods.getDependencies).toHaveBeenCalledOnce();
        expect(docsViewMethods.getNuxtPackages).toHaveBeenCalledOnce();
        expect(docsViewMethods.getPackages).toHaveBeenCalledOnce();
        expect(vscode.window.registerWebviewViewProvider).toHaveBeenCalledWith("previewDocSidebar", docsViewMethods);
        expect(context.subscriptions).toHaveLength(1);
    });

    it("deactivates without extra cleanup work", async () => {
        const { deactivate } = await import("../src/extension");

        expect(deactivate()).toBeUndefined();
    });
});
