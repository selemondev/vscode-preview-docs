<script setup lang='ts'>
import DocsCard from "./DocsCard.vue"
interface LanguageFrameworkDoc {
    label: string;
    docUrl: string;
    logo: string;
};

const props = defineProps<{
    frameworkDocs: LanguageFrameworkDoc[]
}>()

</script>

<template>
    <div class="mt-5 w-full">
        <DocsCard v-for="(doc, index) in props.frameworkDocs" :key="index" :docUrl="doc.docUrl" :docLogo="doc.logo" :docLabel="doc.label"/>
    </div>
</template>