<script setup lang="ts">
import { vscode } from "./../utils/vscode";
const props = defineProps<{
    docLogo: string;
    docUrl: string;
    docLabel: string;
    dep: string
}>();
const handleOpenDocs = (label: string, logo: string, docUrl: string) => {
    vscode.postMessage({
        command: "openDocs",
        text: {
            label: label,
            logo: logo,
            docUrl: docUrl
        }
    });
}
</script>
<template>
    <div class="hover:relative select-none p-3 px-0 pb-5 text-[var(--vscode-foreground)]">
        <div class="flex w-full flex-wrap items-center gap-2">
            <div class="mr-3 grid place-items-center">
                <img :src="props.docLogo" :alt="props.docLabel" loading="lazy" class="w-8 h-8" />
            </div>
            <div class="flex-1">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <h3 class="text-base font-bold" v-text="props.docLabel" />
                    </div>
                </div>
                <div class="mt-2 flex flex-wrap items-center gap-3">
                    <button type="button" @click.prevent="handleOpenDocs(props.docLabel, props.docLogo, props.docUrl)"
                        :class="props.dep === 'react' || props.dep === '@remix-run/react' ? 'text-cyan-500 hover:text-cyan-600' : props.dep === 'vue' || props.dep === 'nuxt' ? 'text-[#00DC82] hover:text-[#3fb483]' : props.dep === 'svelte' || props.dep === '@sveltejs/kit' ? 'text-orange-500 hover:text-orange-600' : 'text-cyan-500 hover:text-cyan-600'"
                        class="text-xs transition-all duration-200 ease-in">Read
                        Docs</button>
                </div>
            </div>
        </div>
    </div>
</template>
  