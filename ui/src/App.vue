<script setup lang='ts'>
import { computed, ref, watch } from "vue";
import Docs from "./components/Docs.vue";
import { getCommonPackages } from "./utils/getFrameworksDocs"
type Dependency = {
  name: string,
  version: string
}
interface LanguageFrameworkDoc {
  label: string;
  docUrl: string;
  description: string
  logo: string;
}

interface FrameworkData {
  label: string;
  docUrl: string;
  description: string;
  logo: string;
}


const modules = ref<FrameworkData[]>([]);
const unjsPackages = ref<FrameworkData[]>([]);
const dependencies = ref<Dependency[]>([]);
const frameworkDocs = ref<LanguageFrameworkDoc[]>([]);
const messageEvent = ref('')
window.addEventListener('message', (event: any) => {
  const message = event.data;
  messageEvent.value = message
  if (message.command === 'dependencyData') {
    dependencies.value = message.data.dependencies;
  };

  if (message.command === 'nuxtModules') {
    modules.value = message.modules.modules;
  };

  if (message.command === 'packages') {
    unjsPackages.value = message.packages.unjsPackages;
  };
});

const allPackages = computed(() => modules.value.concat(unjsPackages.value));
const getLanguageFrameworkDocs = computed(() => {
  const pkgs = allPackages.value.reduce((acc, a) => {
    acc[a.label] = {
      label: a.label,
      docUrl: a.docUrl,
      description: a.description,
      logo: a.logo
    };
    return acc;
  }, {} as Record<string, FrameworkData>);

  const allPkgs = {
    ...pkgs,
    ...getCommonPackages
  } as Record<string, FrameworkData>;

  return allPkgs;
})

watch(() => [dependencies, modules, unjsPackages], () => {
  let updatedFrameworkDocs: LanguageFrameworkDoc[] = [];

  for (const dep of dependencies.value) {
    if (dep.name) {
      const frameworkData = getLanguageFrameworkDocs.value[dep.name];

      if (frameworkData) {
        updatedFrameworkDocs.push({
          ...frameworkData
        });
      }
    }

  }

  frameworkDocs.value = updatedFrameworkDocs;
}, {
  deep: true
});
</script>

<template>
  <div class="flex w-full flex-col">
    <Docs :framework-docs="frameworkDocs" />
  </div>
</template>