<script setup lang='ts'>
import { ref, onMounted } from "vue";
// import Docs from "./components/Docs.vue";
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

window.addEventListener('message', (event: any) => {
    const message = event.data;
    if (message === 'dependencyData') {
        dependencies.value = message.data.dependencies;
    }
});

onMounted(() => {
  for(const dep of dependencies.value) {
    if(dep.name === 'nuxt' || "vue") {
      return frameworkDocs.value = getLanguageFrameworkDocs['Vue']
    }
  }
})
</script>

<template>
    <div class="flex w-full flex-col">
    <p class="text-blue-500">Hello world</p>
      <!-- <Docs :frameworkDocs="frameworkDocs" /> -->
    </div>
</template>