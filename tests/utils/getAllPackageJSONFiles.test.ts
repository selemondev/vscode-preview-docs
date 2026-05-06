import { beforeEach, describe, expect, it } from "vitest";
import { resetVscodeMock, vscode } from "../mocks/vscode";
import { getAllPackageJSONFiles } from "../../src/utils/getAllPackageJSONFiles";

describe("getAllPackageJSONFiles", () => {
    beforeEach(() => {
        resetVscodeMock();
    });

    it("recursively finds package.json files and skips ignored directories", async () => {
        vscode.workspace.fs.readDirectory.mockImplementation(async (uri: { fsPath: string }) => {
            const tree: Record<string, [string, number][]> = {
                "/workspace": [
                    ["package.json", vscode.FileType.File],
                    ["apps", vscode.FileType.Directory],
                    ["node_modules", vscode.FileType.Directory],
                    [".git", vscode.FileType.Directory],
                ],
                "/workspace/apps": [
                    ["web", vscode.FileType.Directory],
                ],
                "/workspace/apps/web": [
                    ["package.json", vscode.FileType.File],
                    ["README.md", vscode.FileType.File],
                ],
            };

            return tree[uri.fsPath] ?? [];
        });

        const files = await getAllPackageJSONFiles({ fsPath: "/workspace" } as never);

        expect(files).toEqual([
            { path: "package.json" },
            { path: "apps/web/package.json" },
        ]);
        expect(vscode.workspace.fs.readDirectory).not.toHaveBeenCalledWith(expect.objectContaining({
            fsPath: "/workspace/node_modules",
        }));
        expect(vscode.workspace.fs.readDirectory).not.toHaveBeenCalledWith(expect.objectContaining({
            fsPath: "/workspace/.git",
        }));
    });

    it("returns an empty list when no package.json files are present", async () => {
        vscode.workspace.fs.readDirectory.mockResolvedValue([
            ["README.md", vscode.FileType.File],
        ]);

        const files = await getAllPackageJSONFiles({ fsPath: "/workspace" } as never);

        expect(files).toEqual([]);
    });
});
