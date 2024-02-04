<script setup lang='ts'>
import DocsCard from "./DocsCard.vue";
import { computed, ref, onMounted } from "vue";

interface LanguageFrameworkDoc {
    label: string;
    docUrl: string;
    logo: string;
    description: string
};

const props = defineProps<{
    frameworkDocs: LanguageFrameworkDoc[]
}>();

const searchResult = ref('');
const searchInput = ref<HTMLInputElement>()

const filteredFrameworkDocs = computed(() => {
    return props.frameworkDocs.filter((doc: LanguageFrameworkDoc) => doc.label.toLocaleLowerCase().includes(searchResult.value.toLocaleLowerCase()))
});

onMounted(() => {
    searchInput.value?.focus()
});
</script>

<template>
    <div class="sticky top-0 inset-y-0 bg-[var(--vscode-sideBar-background)]">
        <input v-model="searchResult" ref="searchInput" placeholder="Search documentations.."
            class="my-3 w-full rounded-md border border-[var(--vscode-dropdown-border)] focus:border-[var(--vscode-dropdown-border)] bg-[var(--vscode-dropdown-background)] p-2.5 text-[var(--vscode-foreground)]" />
    </div>
    <div v-if="filteredFrameworkDocs.length > 0" class="mt-2 w-full">
        <DocsCard v-for="(doc, index) in filteredFrameworkDocs" :key="index" :docUrl="doc.docUrl" :docLogo="doc.logo"
            :docLabel="doc.label" :docDescription="doc.description" />
    </div>

    <div v-else class="grid place-items-center w-full mt-8">
        <p class="text-base text-white">No dependencies found!</p>
    </div>
</template>