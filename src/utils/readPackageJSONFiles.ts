import { readPackageJSON } from "pkg-types";
import { getProjectDirectory } from "./getProjectDir";

export async function readPackageJSONFiles(pkg: { path: string }) {
    const response = await readPackageJSON(`${getProjectDirectory()}/${pkg.path}`);
    return response;
}