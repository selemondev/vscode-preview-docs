import path from "node:path";
import { readPackageJSON } from "pkg-types";
import { getProjectDirectory } from "./getProjectDir";

export async function readPackageJSONFiles(pkg: { path: string }) {
    const projectDirectory = getProjectDirectory();
    if (!projectDirectory) {
        throw new Error("No workspace folder found");
    }

    const resolvedPath = path.resolve(projectDirectory, pkg.path);
    const relativePath = path.relative(projectDirectory, resolvedPath);

    if (path.basename(resolvedPath) !== "package.json" || relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
        throw new Error(`Unsafe package.json path: ${pkg.path}`);
    }

    const response = await readPackageJSON(resolvedPath);
    return response;
}
