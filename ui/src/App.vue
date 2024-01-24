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

watch(() => dependencies, () => {
  for (const dep of dependencies.value) {
    if (dep.name === 'nuxt') {
      dependency.value = 'vue'
      frameworkDocs.value = getLanguageFrameworkDocs['Vue'];
      break;
    };

    if (dep.name === 'react') {
      dependency.value = 'react'
      frameworkDocs.value = getLanguageFrameworkDocs['React'];
      break;
    }
  }
}, {
  deep: true
});
</script>

<template>
  <div class="flex w-full flex-col">
    <Docs :framework-docs="frameworkDocs" :dep="dependency" />
  </div>
</template>