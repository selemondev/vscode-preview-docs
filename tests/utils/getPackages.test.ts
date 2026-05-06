import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetVscodeMock, vscode } from "../mocks/vscode";

const ofetch = vi.fn();

vi.mock("ofetch", () => ({
    ofetch,
}));

describe("getPackages", () => {
    beforeEach(() => {
        resetVscodeMock();
        ofetch.mockReset();
    });

    it("maps Nuxt module metadata into sidebar items", async () => {
        const { getNuxtModules } = await import("../../src/utils/getPackages");
        ofetch.mockResolvedValue({
            modules: [
                {
                    name: "content",
                    npm: "@nuxt/content",
                    description: "Content for Nuxt",
                    icon: "",
                },
            ],
        });

        const modules = await getNuxtModules();

        expect(ofetch).toHaveBeenCalledWith("https://api.nuxt.com/modules");
        expect(modules).toEqual([
            {
                label: "@nuxt/content",
                description: "Content for Nuxt",
                docUrl: "https://nuxt.com/modules/content",
                logo: "https://api.iconify.design/logos:nuxt-icon.svg",
            },
        ]);
    });

    it("maps UnJS package metadata into sidebar items", async () => {
        const { getUnjsPackages } = await import("../../src/utils/getPackages");
        ofetch.mockResolvedValue([
            {
                title: "Nitro",
                description: "Server toolkit",
                url: "https://nitro.unjs.io/",
                logoUrl: "https://example.com/nitro.svg",
            },
        ]);

        const packages = await getUnjsPackages();

        expect(ofetch).toHaveBeenCalledWith("https://unjs.io/api/content/packages.json");
        expect(packages).toEqual([
            {
                label: "Nitro",
                description: "Server toolkit",
                docUrl: "https://nitro.unjs.io/",
                logo: "https://example.com/nitro.svg",
            },
        ]);
    });

    it("shows a user-facing error when fetching package metadata fails", async () => {
        const { getNuxtModules } = await import("../../src/utils/getPackages");
        ofetch.mockRejectedValue(new Error("network unavailable"));

        await expect(getNuxtModules()).resolves.toBeUndefined();

        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith("network unavailable");
    });
});
