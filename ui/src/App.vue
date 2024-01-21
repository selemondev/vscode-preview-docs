<script setup lang='ts'>
import { ref, onMounted } from "vue";
import Docs from "./components/Docs.vue";
import { getLanguageFrameworkDocs } from "../src/utils/getFrameworksDocs"

type Dependency = {
  name: string,
  version: string
}
interface LanguageFrameworkDoc {
  label: string;
  docUrl: string;
  logo: string;
}

const dependencies = ref<Dependency[]>([]);
const frameworkDocs = ref<LanguageFrameworkDoc[]>([
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
    label: 'Radix Vue',
    docUrl: 'https://www.radix-vue.com/overview/getting-started',
    logo: "https://api.iconify.design/simple-icons:radixui.svg?color=%23ffffff"
  },

  {
    label: 'Shadcn Vue',
    docUrl: 'https://www.shadcn-vue.com/docs/introduction.html',
    logo: 'https://api.iconify.design/icon-park-outline:three-slashes.svg?color=%2305ff71'
  },

  {
    label: 'Park UI',
    docUrl: 'https://park-ui.com/docs/panda/overview/getting-started',
    logo: 'https://raw.githubusercontent.com/selemondev/vscode-park-ui/master/src/images/icon.png'
  },

  {
    label: 'Nuxt UI',
    docUrl: 'https://ui.nuxt.com/getting-started',
    logo: 'https://api.iconify.design/logos:nuxt-icon.svg'
  },

  {
    label: 'PrimeVue',
    docUrl: 'https://primevue.org/introduction/',
    logo: 'https://api.iconify.design/prime:prime.svg?color=%231fea5c'
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
  }
],);

window.addEventListener('message', (event: any) => {
  const message = event.data;
  if (message === 'dependencyData') {
    dependencies.value = message.data.dependencies;
  }
});

onMounted(() => {
  for (const dep of dependencies.value) {
    if (dep.name === 'nuxt' || "vue") {
      return frameworkDocs.value = getLanguageFrameworkDocs['Vue']
    }
  }
});
</script>

<template>
  <div class="flex w-full flex-col">
    <Docs :framework-docs="frameworkDocs" />
  </div>
</template>