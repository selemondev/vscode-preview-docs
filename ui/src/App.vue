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
      frameworkDocs.value = getLanguageFrameworkDocs['Vue'];
      break; // Exit the loop after setting frameworkDocs
    }
  }
}, {
  deep: true
})
</script>

<template>
  <div class="flex w-full flex-col">
    <Docs :framework-docs="frameworkDocs" />
  </div>
</template>