interface LanguageFrameworkDoc {
    label: string;
    docUrl: string;
    logo: string;
}

interface LanguageFrameworkDocs {
    [key: string]: LanguageFrameworkDoc[];
}
export const getLanguageFrameworkDocs: LanguageFrameworkDocs = {
    Vue: [
        {
            label: 'Vue',
            docUrl: 'https://vuejs.org/guide/introduction',
            logo: 'https://api.iconify.design/logos:vue.svg?color=%2314b817'
        },

        {
            label: 'Nuxt',
            docUrl: 'https://nuxt.com/docs/getting-started/installation',
            logo: 'https://api.iconify.design/logos:nuxt-icon.svg'
        },

        {
            label: 'Pinia',
            docUrl: 'https://pinia.vuejs.org/introduction.html',
            logo: 'https://api.iconify.design/logos:pinia.svg'
        },

        {
            label: 'Vue Router',
            docUrl: 'https://router.vuejs.org/installation.html',
            logo: 'https://api.iconify.design/logos:vue.svg'
        },

        {
            label: 'Vueuse',
            docUrl: 'https://vueuse.org/guide/',
            logo: 'https://api.iconify.design/logos:vueuse.svg'
        },

        {
            label: 'TailwindCss',
            docUrl: 'https://tailwindcss.com/docs/installation',
            logo: 'https://api.iconify.design/devicon:tailwindcss.svg'
        },

        {
            label: 'UnoCss',
            docUrl: 'https://unocss.dev/guide/',
            logo: 'https://api.iconify.design/vscode-icons:file-type-unocss.svg'
        },

        {
            label: 'Shadcn Vue',
            docUrl: 'https://www.shadcn-vue.com/docs/introduction.html',
            logo: 'https://api.iconify.design/icon-park-outline:three-slashes.svg'
        },

        {
            label: 'Nuxt UI',
            docUrl: 'https://ui.nuxt.com/getting-started',
            logo: 'https://api.iconify.design/logos:nuxt-icon.svg'
        },

        {
            label: 'PrimeVue',
            docUrl: 'https://primevue.org/introduction/',
            logo: 'https://api.iconify.design/prime:prime.svg?color=%232f8a28'
        },


        {
            label: 'Vuetify',
            docUrl: 'https://vuetifyjs.com/en/getting-started/installation/#installation',
            logo: 'https://api.iconify.design/logos:vuetifyjs.svg'
        },

        {
            label: 'Anu',
            docUrl: 'https://anu-vue.netlify.app/guide/getting-started/',
            logo: 'https://anu-vue.netlify.app/logo.svg',
        },

        {
            label: 'Headless UI',
            docUrl: 'https://headlessui.com/vue/menu',
            logo: "https://api.iconify.design/logos:headlessui-icon.svg"
        },

        {
            label: 'VitePress',
            docUrl: 'https://vitepress.dev/guide/getting-started',
            logo: 'https://api.iconify.design/vscode-icons:folder-type-docs.svg'
        },

        {
            label: 'Tanstack Vue Query',
            docUrl: 'https://tanstack.com/query/latest/docs/vue/overview',
            logo: 'https://vue-query-next-gen.vercel.app/vue-query.png'
        },

        {
            label: 'Vue Testing Library',
            docUrl: 'https://testing-library.com/docs/vue-testing-library/intro',
            logo: 'https://api.iconify.design/openmoji:octopus.svg'
        },

        {
            label: 'Vue Test Utils',
            docUrl: 'https://test-utils.vuejs.org/guide/',
            logo: 'https://api.iconify.design/logos:vue.svg?color=%2314b817'
        },

        {
            label: 'Vitest',
            docUrl: 'https://vitest.dev/guide/',
            logo: 'https://api.iconify.design/logos:vitest.svg'
        }
    ],
    React: [
        {
            label: 'React',
            docUrl: 'https://react.dev/learn',
            logo: 'https://api.iconify.design/vscode-icons:file-type-reactjs.svg'
        },

        {
            label: 'Remix',
            docUrl: 'https://remix.run/docs/en/main/start/quickstart',
            logo: 'https://api.iconify.design/simple-icons:remix.svg?color=%23000000'
        },


        {
            label: 'React Redux',
            docUrl: 'https://react-redux.js.org/',
            logo: 'https://api.iconify.design/logos:redux.svg'
        },

        {
            label: 'Zustand',
            docUrl: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
            logo: 'https://api.iconify.design/openmoji:bear.svg'
        },

        {
            label: 'Recoil',
            docUrl: 'https://recoiljs.org/docs/introduction/getting-started/',
            logo: 'https://api.iconify.design/simple-icons:recoil.svg?color=%23000000'
        },

        {
            label: 'React Router',
            docUrl: 'https://reactrouter.com/en/main',
            logo: 'https://api.iconify.design/logos:react-router.svg'
        },

        {
            label: 'Use Hooks',
            docUrl: 'https://usehooks.com/',
            logo: 'https://api.iconify.design/tabler:fish-hook.svg'
        },

        {
            label: 'TailwindCss',
            docUrl: 'https://tailwindcss.com/docs/installation',
            logo: 'https://api.iconify.design/devicon:tailwindcss.svg'
        },

        {
            label: 'UnoCss',
            docUrl: 'https://unocss.dev/guide/',
            logo: 'https://api.iconify.design/vscode-icons:file-type-unocss.svg'
        },

        {
            label: 'Shadcn React',
            docUrl: 'https://ui.shadcn.com/docs',
            logo: 'https://api.iconify.design/icon-park-outline:three-slashes.svg'
        },

        {
            label: 'Next UI',
            docUrl: 'https://nextui.org/docs/guide/introduction',
            logo: 'https://api.iconify.design/logos:nextjs-icon.svg'
        },

        {
            label: 'PrimeReact',
            docUrl: 'https://primereact.org/installation/',
            logo: 'https://api.iconify.design/prime:prime.svg?color=%2314c7eb'
        },


        {
            label: 'Material UI',
            docUrl: 'https://mui.com/core/',
            logo: 'https://api.iconify.design/simple-icons:mui.svg'
        },

        {
            label: 'Chakra UI',
            docUrl: 'https://chakra-ui.com/getting-started',
            logo: 'https://api.iconify.design/simple-icons:chakraui.svg',
        },

        {
            label: 'Headless UI',
            docUrl: 'https://headlessui.com/react/menu',
            logo: "https://api.iconify.design/logos:headlessui-icon.svg"
        },

        {
            label: 'Docusaurus',
            docUrl: 'https://docusaurus.io/docs',
            logo: 'https://docusaurus.io/img/docusaurus.svg'
        },

        {
            label: 'Tanstack React Query',
            docUrl: 'https://tanstack.com/query/latest/docs/react/overview',
            logo: 'https://api.iconify.design/logos:react-query-icon.svg'
        },

        {
            label: 'React Testing Library',
            docUrl: 'https://testing-library.com/docs/react-testing-library/intro',
            logo: 'https://api.iconify.design/openmoji:octopus.svg'
        },

        {
            label: 'Vitest',
            docUrl: 'https://vitest.dev/guide/',
            logo: 'https://api.iconify.design/logos:vitest.svg'
        }
    ],

    Astro: [
        {
            label: 'Astro',
            docUrl: 'https://docs.astro.build/en/getting-started/',
            logo: 'https://api.iconify.design/devicon:astro.svg'
        },
        {
            label: 'TailwindCss',
            docUrl: 'https://tailwindcss.com/docs/installation',
            logo: 'https://api.iconify.design/devicon:tailwindcss.svg'
        },

        {
            label: 'UnoCss',
            docUrl: 'https://unocss.dev/guide/',
            logo: 'https://api.iconify.design/vscode-icons:file-type-unocss.svg'
        },
    ]
};



// export const getReactFrameworkDocs = [
//     {
//         label: 'React',
//         docUrl: 'https://react.dev/learn',
//         logo: 'https://api.iconify.design/vscode-icons:file-type-reactjs.svg'
//     },

//     {
//         label: 'NextJs',
//         docUrl: 'https://nextjs.org/docs',
//         logo: 'https://api.iconify.design/logos:nextjs-icon.svg'
//     },


//     {
//         label: 'React Redux',
//         docUrl: 'https://react-redux.js.org/',
//         logo: 'https://api.iconify.design/logos:redux.svg'
//     },

//     {
//         label: 'Zustand',
//         docUrl: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
//         logo: 'https://api.iconify.design/openmoji:bear.svg'
//     },

//     {
//         label: 'Recoil',
//         docUrl: 'https://recoiljs.org/docs/introduction/getting-started/',
//         logo: 'https://api.iconify.design/simple-icons:recoil.svg?color=%23000000'
//     },

//     {

//     }
// ]