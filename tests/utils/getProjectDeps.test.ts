import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetVscodeMock, vscode } from "../mocks/vscode";

const existsSync = vi.fn();
const getProjectDirectory = vi.fn();
const getAllPackageJSONFiles = vi.fn();
const readPackageJSONFiles = vi.fn();

vi.mock("fs", () => ({
    existsSync,
}));

vi.mock("../../src/utils/getProjectDir", () => ({
    getProjectDirectory,
}));

vi.mock("../../src/utils/getAllPackageJSONFiles", () => ({
    getAllPackageJSONFiles,
}));

vi.mock("../../src/utils/readPackageJSONFiles", () => ({
    readPackageJSONFiles,
}));

describe("getProjectDependencies", () => {
    beforeEach(() => {
        resetVscodeMock();
        existsSync.mockReset();
        getProjectDirectory.mockReset();
        getAllPackageJSONFiles.mockReset();
        readPackageJSONFiles.mockReset();
        getProjectDirectory.mockReturnValue("/workspace");
    });

    it("shows an error when no workspace folder is open", async () => {
        const { getProjectDependencies } = await import("../../src/utils/getProjectDeps");

        const dependencies = await getProjectDependencies();

        expect(dependencies).toEqual([]);
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith("No workspace folder found!");
    });

    it("shows an error when no package.json files can be found", async () => {
        const { getProjectDependencies } = await import("../../src/utils/getProjectDeps");
        vscode.workspace.workspaceFolders = [{ uri: { fsPath: "/workspace" } }];
        existsSync.mockReturnValue(false);
        getAllPackageJSONFiles.mockResolvedValue([]);

        const dependencies = await getProjectDependencies();

        expect(dependencies).toEqual([]);
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith("Cannot find any package.json files!");
    });

    it("merges dependencies from multiple package.json files without duplicates", async () => {
        const { getProjectDependencies } = await import("../../src/utils/getProjectDeps");
        vscode.workspace.workspaceFolders = [{ uri: { fsPath: "/workspace" } }];
        existsSync.mockReturnValue(true);
        getAllPackageJSONFiles.mockResolvedValue([
            { path: "package.json" },
            { path: "packages/app/package.json" },
        ]);
        readPackageJSONFiles
            .mockResolvedValueOnce({
                dependencies: {
                    react: "^18.3.1",
                    vite: "~5.4.0",
                },
                devDependencies: {
                    vitest: "^3.2.4",
                },
            })
            .mockResolvedValueOnce({
                dependencies: {
                    react: "^19.0.0",
                    vue: "~3.5.0",
                },
            });

        const dependencies = await getProjectDependencies();

        expect(dependencies).toEqual([
            { name: "react", version: "18.3.1" },
            { name: "vite", version: "5.4.0" },
            { name: "vitest", version: "3.2.4" },
            { name: "vue", version: "3.5.0" },
        ]);
    });

    it("warns and continues when one package.json file cannot be read", async () => {
        const { getProjectDependencies } = await import("../../src/utils/getProjectDeps");
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
        vscode.workspace.workspaceFolders = [{ uri: { fsPath: "/workspace" } }];
        existsSync.mockReturnValue(true);
        getAllPackageJSONFiles.mockResolvedValue([
            { path: "package.json" },
            { path: "packages/app/package.json" },
        ]);
        readPackageJSONFiles
            .mockRejectedValueOnce(new Error("broken package"))
            .mockResolvedValueOnce({
                dependencies: {
                    vue: "^3.5.0",
                },
            });

        const dependencies = await getProjectDependencies();

        expect(dependencies).toEqual([
            { name: "vue", version: "3.5.0" },
        ]);
        expect(vscode.window.showWarningMessage).toHaveBeenCalledWith("Failed to read package.json at package.json");
        expect(consoleError).toHaveBeenCalledWith("Error reading package.json at package.json:", expect.any(Error));
    });
});
