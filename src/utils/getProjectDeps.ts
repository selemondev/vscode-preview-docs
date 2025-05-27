import { getProjectDirectory } from "./getProjectDir";
import * as vscode from "vscode";
import { readPackageJSONFiles } from "./readPackageJSONFiles";
import { getAllPackageJSONFiles } from "./getAllPackageJSONFiles";
import { existsSync } from "fs";

type Dependency = {
    name: string;
    version: string;
};

export const getProjectDependencies = async (): Promise<Dependency[]> => {
    let dependencies: Dependency[] = [];
    
    const packageJsonPath = `${getProjectDirectory()}/package.json`;
    const dir = vscode.workspace.workspaceFolders?.[0]?.uri;
    
    if (!dir) {
        vscode.window.showErrorMessage(`No workspace folder found!`);
        return [];
    }
    
    const packageJsonFiles = await getAllPackageJSONFiles(dir);
    let packageJSON = [];

    if (!existsSync(packageJsonPath) && packageJsonFiles.length === 0) {
        vscode.window.showErrorMessage(`Cannot find any package.json files!`);
        return [];
    }

    // Read all package.json files
    if (packageJsonFiles.length > 0) {
        for (const pkg of packageJsonFiles) {
            try {
                const response = await readPackageJSONFiles(pkg);
                if (response) {
                    packageJSON.push(response);
                }
            } catch (error) {
                console.error(`Error reading package.json at ${pkg.path}:`, error);
                vscode.window.showWarningMessage(`Failed to read package.json at ${pkg.path}`);
            }
        }
    }

    const addDependencies = (depObj: Record<string, string> | undefined) => {
        if (depObj) {
            const newDeps = Object.keys(depObj).map((key) => ({
                name: key,
                version: depObj[key].replace(/[\^~]/g, ''),
            }));
            
            for (const newDep of newDeps) {
                if (!dependencies.some(dep => dep.name === newDep.name)) {
                    dependencies.push(newDep);
                }
            }
        }
    };

    for (const pkg of packageJSON) {
        if (pkg) {
            addDependencies(pkg.dependencies);
            addDependencies(pkg.devDependencies);
        }
    }

    return dependencies;
};