<script setup lang='ts'>
import { watch, ref } from "vue";
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
const dependency = ref('')
const frameworkDocs = ref<LanguageFrameworkDoc[]>([]);
const messageEvent = ref('')
window.addEventListener('message', (event: any) => {
  const message = event.data;
  messageEvent.value = message
  if (message.command === 'dependencyData') {
    dependencies.value = message.data.dependencies;
  }
});

const specialDeps = new Set(['vue', 'nuxt', 'react', '@remix-run/react', 'svelte', '@sveltejs/kit']);


watch(() => dependencies.value, () => {
  let updatedFrameworkDocs: LanguageFrameworkDoc[] = [];

  for (const dep of dependencies.value) {
    if (specialDeps.has(dep.name)) {
      dependency.value = dep.name;
    }
    const packageNameLower = dep.name.toLowerCase();

    // Check if the dep name starts with '@' and ends with 'nuxt' after the '/'
    const isNuxtPackage = packageNameLower.startsWith('@') && packageNameLower.endsWith('/nuxt');

    // If it's a Nuxt package, pick the dependency before '/'
    const depKey = isNuxtPackage ? packageNameLower.split('/')[0] : packageNameLower;

    const frameworkData = getLanguageFrameworkDocs[depKey];

    if (frameworkData) {
      updatedFrameworkDocs.push({
        ...frameworkData
      });
    }
  }

  frameworkDocs.value = updatedFrameworkDocs;
}, {
  deep: true
});
</script>

<template>
  <div class="flex w-full flex-col">
    <Docs :framework-docs="frameworkDocs" :dep="dependency" />
  </div>
</template>