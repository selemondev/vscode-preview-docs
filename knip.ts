import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    workspaces: {
        '.': {
            entry: 'src/index.ts',
            ignoreDependencies: ['terser'],
            ignoreBinaries: ['vsce']
        },
    },
    ignoreWorkspaces: ['ui']
};

export default config;