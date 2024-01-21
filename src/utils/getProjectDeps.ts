import { getProjectDirectory } from "./getProjectDir";
import * as vscode from "vscode";
import { readPackageJSON } from "pkg-types";
import { existsSync } from 'fs';

type Dependency = {
    name: string;
    version: string;
};

export const getProjectDependencies = async (): Promise<Dependency[]> => {
    const dependencies: Dependency[] = [];
    const packageJsonPath = `${getProjectDirectory()}/package.json`;

    if (!existsSync(packageJsonPath)) {
        vscode.window.showErrorMessage('Cannot find package.json!');
        return [];
    } else {
        const packageJSON = await readPackageJSON(packageJsonPath);

        const addDependencies = (depObj: Record<string, string> | undefined) => {
            if (depObj) {
                dependencies.push(
                    ...Object.keys(depObj).map((key) => ({
                        name: key,
                        version: depObj[key].replace(/[\^~]/g, ''), // Use 'g' flag to replace all occurrences
                    }))
                );
            }
        };

        addDependencies(packageJSON?.dependencies);
        addDependencies(packageJSON?.devDependencies);

        return dependencies;
    }
};