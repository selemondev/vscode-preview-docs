import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    workspaces: {
        '.': {
            entry: 'src/index.ts',
            ignoreDependencies: ['terser'],
            ignoreBinaries: ['vsce'],
            tsup: {
                config: 'tsup.config.ts'
            },
        },
    },
    ignoreWorkspaces: ['ui']
};

export default config;