import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("package.json manifest", () => {
    it("activates when the sidebar view is opened", () => {
        const packageJsonPath = path.join(process.cwd(), "package.json");
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

        expect(packageJson.activationEvents).toContain("onView:previewDocSidebar");
        expect(packageJson.contributes.views["sidebar-preview-docs-view"][0].id).toBe("previewDocSidebar");
    });

    it("keeps the compiled extension entrypoint in sync with the published bundle", () => {
        const packageJsonPath = path.join(process.cwd(), "package.json");
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

        expect(packageJson.main).toBe("./dist/extension.js");
    });
});
