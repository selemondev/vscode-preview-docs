import { ExtensionContext, Uri, workspace } from 'vscode';
import { getProjectDirectory } from '../utils/getProjectDir';
class FileWatchers {

    public sidebarProvider: any;

    constructor(sidebarProvider: any, context: ExtensionContext) {
        this.sidebarProvider = sidebarProvider;
    }

    public packageJsonFileWatcher = workspace
        .createFileSystemWatcher(`${getProjectDirectory()}/package.json`)
        .onDidCreate(async (uri: Uri) => {
            await this.sidebarProvider.getProjectDependencies();
        });

    public packageJsonFileChangedWatcher = workspace
        .createFileSystemWatcher(`${getProjectDirectory()}/package.json`)
        .onDidChange(async (uri: Uri) => {
            await this.sidebarProvider.getProjectDependencies();
        });

}

export default FileWatchers;