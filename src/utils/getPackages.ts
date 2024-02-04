import { ofetch } from "ofetch";
import * as vscode from "vscode";
export const getNuxtModules = async () => {
    try {
        const response = await ofetch('https://api.nuxt.com/modules');
        return response.modules.map((m: { name: string, npm: string, description: string, icon: string }) => {
            return {
                label: m.npm,
                description: m.description,
                docUrl: `https://nuxt.com/modules/${m.name}`,
                logo: m.icon || 'https://api.iconify.design/logos:nuxt-icon.svg'
            };
        });
    } catch (err) {
        if (err instanceof Error) {
            vscode.window.showErrorMessage(err?.message);
        }
    }
};

export const getUnjsPackages = async () => {
    try {
        const response = await ofetch('https://unjs.io/api/content/packages.json');
        return response.map((r: { title: string; url: string; description: string }) => {
            return {
                label: r.title,
                description: r.description,
                docUrl: r.url,
                logo: 'https://unjs.io/favicon.svg'
            };
        });
    } catch (err) {
        if (err instanceof Error) {
            vscode.window.showErrorMessage(err?.message);
        }
    }

};
