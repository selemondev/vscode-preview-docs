import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    workspaces: {
        '.': {
            entry: 'src/index.ts',
            ignoreDependencies: ['terser'],
            ignoreBinaries: ['vsce'],
            ignore: ['taze.config.ts'],
            tsup: {
                config: 'tsup.config.ts'
            },
        },
    },
    ignoreWorkspaces: ['ui']
};

export default config;