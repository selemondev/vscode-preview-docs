import { describe, expect, it } from "vitest";
import { getWebviewContent } from "../../src/utils/getWebViewContent";

describe("getWebviewContent", () => {
    it("renders a sandboxed iframe for trusted https documentation URLs", () => {
        const html = getWebviewContent({
            label: "Nuxt Docs",
            logo: "https://example.com/logo.png",
            docUrl: "https://nuxt.com/docs",
        });

        expect(html).toContain("<title>Nuxt Docs</title>");
        expect(html).toContain('href="https://example.com/logo.png"');
        expect(html).toContain('src="https://nuxt.com/docs"');
        expect(html).toContain("sandbox=\"allow-forms allow-popups allow-same-origin allow-scripts\"");
        expect(html).toContain("Content-Security-Policy");
    });

    it("escapes labels and blocks dangerous URLs from user-provided payloads", () => {
        const html = getWebviewContent({
            label: "<img src=x onerror=alert(1)>",
            logo: "javascript:alert('logo')",
            docUrl: "javascript:alert('doc')",
        });

        expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
        expect(html).not.toContain("<img src=x onerror=alert(1)>");
        expect(html).not.toContain("javascript:alert");
        expect(html).toContain('href="about:blank"');
        expect(html).toContain('src="about:blank"');
    });

    it("falls back to about:blank for malformed URLs", () => {
        const html = getWebviewContent({
            label: "Broken docs",
            logo: "not-a-url",
            docUrl: "://still-broken",
        });

        expect(html.match(/about:blank/g)).toHaveLength(2);
    });
});
