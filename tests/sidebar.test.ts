import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetVscodeMock, vscode } from "./mocks/vscode";

const getNonce = vi.fn(() => "fixednonce");
const getProjectDependencies = vi.fn();
const getNuxtModules = vi.fn();
const getUnjsPackages = vi.fn();
const getUri = vi.fn((_webview: unknown, _extensionUri: unknown, pathList: string[]) => `webview:${pathList.join("/")}`);
const getWebviewContent = vi.fn((payload: { label: string }) => `panel:${payload.label}`);

vi.mock("../src/utils", () => ({
    getNonce,
    getProjectDependencies,
    getNuxtModules,
    getUnjsPackages,
    getUri,
}));

vi.mock("../src/utils/getWebViewContent", () => ({
    getWebviewContent,
}));

const createWebviewView = (visible = false) => {
    let visibilityHandler: (() => void) | undefined;
    let messageHandler: ((message: unknown) => Promise<void> | void) | undefined;

    const webview = {
        html: "",
        options: undefined as unknown,
        cspSource: "vscode-resource:",
        asWebviewUri: vi.fn((uri: { path?: string; fsPath?: string }) => `uri:${uri.path ?? uri.fsPath}`),
        onDidReceiveMessage: vi.fn((handler: (message: unknown) => Promise<void> | void) => {
            messageHandler = handler;
            return { dispose: vi.fn() };
        }),
        postMessage: vi.fn(),
    };

    const webviewView = {
        visible,
        webview,
        onDidChangeVisibility: vi.fn((handler: () => void) => {
            visibilityHandler = handler;
            return { dispose: vi.fn() };
        }),
    };

    return {
        webview,
        webviewView,
        sendMessage: async (message: unknown) => {
            await messageHandler?.(message);
        },
        setVisible: (nextVisible: boolean) => {
            webviewView.visible = nextVisible;
            visibilityHandler?.();
        },
    };
};

describe("DocsView", () => {
    beforeEach(() => {
        resetVscodeMock();
        vi.clearAllMocks();
        getProjectDependencies.mockReset();
        getNuxtModules.mockReset();
        getUnjsPackages.mockReset();
        getUri.mockClear();
        getWebviewContent.mockClear();
    });

    it("configures the webview and eagerly refreshes data when already visible", async () => {
        const { DocsView } = await import("../src/sidebar");
        const docsView = new DocsView({ fsPath: "/extension" } as never);
        const getDependenciesSpy = vi.spyOn(docsView, "getDependencies").mockResolvedValue();
        const getNuxtPackagesSpy = vi.spyOn(docsView, "getNuxtPackages").mockResolvedValue();
        const getPackagesSpy = vi.spyOn(docsView, "getPackages").mockResolvedValue();
        const { webviewView, webview } = createWebviewView(true);

        docsView.resolveWebviewView(webviewView as never);

        expect(webview.options).toEqual({
            enableScripts: true,
            localResourceRoots: [{ fsPath: "/extension" }],
        });
        expect(webview.html).toContain("nonce-fixednonce");
        expect(webview.html).toContain("webview:ui/build/assets/index.css");
        expect(webview.html).toContain("webview:ui/build/assets/index.js");
        expect(webview.html).toContain("Content-Security-Policy");
        expect(getDependenciesSpy).toHaveBeenCalledOnce();
        expect(getNuxtPackagesSpy).toHaveBeenCalledOnce();
        expect(getPackagesSpy).toHaveBeenCalledOnce();
    });

    it("refreshes data when the view becomes visible later", async () => {
        const { DocsView } = await import("../src/sidebar");
        const docsView = new DocsView({ fsPath: "/extension" } as never);
        const getDependenciesSpy = vi.spyOn(docsView, "getDependencies").mockResolvedValue();
        const getNuxtPackagesSpy = vi.spyOn(docsView, "getNuxtPackages").mockResolvedValue();
        const getPackagesSpy = vi.spyOn(docsView, "getPackages").mockResolvedValue();
        const { webviewView, setVisible } = createWebviewView(false);

        docsView.resolveWebviewView(webviewView as never);
        setVisible(true);

        expect(getDependenciesSpy).toHaveBeenCalledOnce();
        expect(getNuxtPackagesSpy).toHaveBeenCalledOnce();
        expect(getPackagesSpy).toHaveBeenCalledOnce();
    });

    it("posts messages only after the view has been resolved", async () => {
        const { DocsView } = await import("../src/sidebar");
        const docsView = new DocsView({ fsPath: "/extension" } as never);
        const message = {
            command: "dependencyData",
            data: {
                dependencies: [{ name: "react", version: "18.0.0" }],
            },
        };

        docsView.postMessage(message);

        const { webviewView, webview } = createWebviewView(false);
        docsView.resolveWebviewView(webviewView as never);
        docsView.postMessage(message);

        expect(webview.postMessage).toHaveBeenCalledOnce();
        expect(webview.postMessage).toHaveBeenCalledWith(message);
    });

    it("publishes dependency data to the webview", async () => {
        const { DocsView } = await import("../src/sidebar");
        const docsView = new DocsView({ fsPath: "/extension" } as never);
        const { webviewView, webview } = createWebviewView(false);
        getProjectDependencies.mockResolvedValue([
            { name: "react", version: "18.3.1" },
        ]);
        docsView.resolveWebviewView(webviewView as never);

        await docsView.getDependencies();

        expect(webview.postMessage).toHaveBeenCalledWith({
            command: "dependencyData",
            data: {
                dependencies: [{ name: "react", version: "18.3.1" }],
            },
        });
    });

    it("publishes fetched Nuxt and UnJS package data to the webview", async () => {
        const { DocsView } = await import("../src/sidebar");
        const docsView = new DocsView({ fsPath: "/extension" } as never);
        const { webviewView, webview } = createWebviewView(false);
        getNuxtModules.mockResolvedValue([{ label: "@nuxt/content" }]);
        getUnjsPackages.mockResolvedValue([{ label: "Nitro" }]);
        docsView.resolveWebviewView(webviewView as never);

        await docsView.getNuxtPackages();
        await docsView.getPackages();

        expect(webview.postMessage).toHaveBeenNthCalledWith(1, {
            command: "nuxtModules",
            modules: {
                modules: [{ label: "@nuxt/content" }],
            },
        });
        expect(webview.postMessage).toHaveBeenNthCalledWith(2, {
            command: "packages",
            packages: {
                unjsPackages: [{ label: "Nitro" }],
            },
        });
    });

    it("opens a docs panel for valid openDocs messages", async () => {
        const { DocsView } = await import("../src/sidebar");
        const docsView = new DocsView({ fsPath: "/extension" } as never);
        const panel = {
            webview: {
                html: "",
            },
        };
        vscode.window.createWebviewPanel.mockReturnValue(panel);
        const { webviewView, sendMessage } = createWebviewView(false);

        docsView.resolveWebviewView(webviewView as never);
        await sendMessage({
            command: "openDocs",
            text: {
                label: "Nuxt",
                logo: "https://example.com/logo.png",
                docUrl: "https://nuxt.com/docs",
            },
        });

        expect(vscode.window.createWebviewPanel).toHaveBeenCalledWith("webDocs", "Nuxt", 1, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        expect(getWebviewContent).toHaveBeenCalledWith({
            label: "Nuxt",
            logo: "https://example.com/logo.png",
            docUrl: "https://nuxt.com/docs",
        });
        expect(panel.webview.html).toBe("panel:Nuxt");
        expect(vscode.window.showInformationMessage).toHaveBeenCalledWith("Opened docs for Nuxt");
    });

    it("rejects malformed openDocs messages instead of opening an unsafe panel", async () => {
        const { DocsView } = await import("../src/sidebar");
        const docsView = new DocsView({ fsPath: "/extension" } as never);
        const { webviewView, sendMessage } = createWebviewView(false);

        docsView.resolveWebviewView(webviewView as never);
        await sendMessage({
            command: "openDocs",
            text: {
                label: "Nuxt",
            },
        });

        expect(vscode.window.createWebviewPanel).not.toHaveBeenCalled();
        expect(vscode.window.showWarningMessage).toHaveBeenCalledWith("Unable to open docs for the selected item.");
    });
});
