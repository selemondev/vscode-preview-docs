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