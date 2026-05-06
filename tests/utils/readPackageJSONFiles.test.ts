import { beforeEach, describe, expect, it, vi } from "vitest";

const readPackageJSON = vi.fn();
const getProjectDirectory = vi.fn();

vi.mock("pkg-types", () => ({
    readPackageJSON,
}));

vi.mock("../../src/utils/getProjectDir", () => ({
    getProjectDirectory,
}));

describe("readPackageJSONFiles", () => {
    beforeEach(() => {
        readPackageJSON.mockReset();
        getProjectDirectory.mockReset();
        getProjectDirectory.mockReturnValue("/workspace");
    });

    it("reads package.json files from inside the workspace", async () => {
        const { readPackageJSONFiles } = await import("../../src/utils/readPackageJSONFiles");
        readPackageJSON.mockResolvedValue({ name: "app" });

        const pkg = await readPackageJSONFiles({ path: "packages/app/package.json" });

        expect(readPackageJSON).toHaveBeenCalledWith("/workspace/packages/app/package.json");
        expect(pkg).toEqual({ name: "app" });
    });

    it("throws when no workspace folder is available", async () => {
        const { readPackageJSONFiles } = await import("../../src/utils/readPackageJSONFiles");
        getProjectDirectory.mockReturnValue(undefined);

        await expect(readPackageJSONFiles({ path: "package.json" })).rejects.toThrow("No workspace folder found");
    });

    it("rejects path traversal attempts", async () => {
        const { readPackageJSONFiles } = await import("../../src/utils/readPackageJSONFiles");

        await expect(readPackageJSONFiles({ path: "../secrets/package.json" })).rejects.toThrow("Unsafe package.json path");
    });

    it("rejects non-package.json targets", async () => {
        const { readPackageJSONFiles } = await import("../../src/utils/readPackageJSONFiles");

        await expect(readPackageJSONFiles({ path: "packages/app/package-lock.json" })).rejects.toThrow("Unsafe package.json path");
    });
});
