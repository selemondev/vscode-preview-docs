<script setup lang="ts">
import { vscode } from "./../utils/vscode";
const props = defineProps<{
    docLogo: string;
    docUrl: string;
    docLabel: string;
    docDescription: string;
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
    <button @click="handleOpenDocs(props.docLabel, props.docLogo, props.docUrl)" type="button"
        class="w-full hover:relative select-none p-3 px-4 pb-5 text-[var(--vscode-foreground)] transition-all duration-200 ease-in rounded-md hover:bg-[var(--vscode-dropdown-border)]">
        <div class="w-full flex items-center space-x-3">
            <div class="h-12 grid place-items-center w-12 shrink-0">
                <img v-if="!props.docLogo.startsWith('https://')"
                    :src="`https://api.nuxtjs.org/api/ipx/s_80,f_webp/gh/nuxt/modules/main/icons/${props.docLogo}`"
                    :alt="props.docLabel" loading="lazy" class="w-9 h-9" />
                <img v-else :src="props.docLogo" :alt="props.docLabel" loading="lazy" class="w-9 h-9" />
            </div>
            <div class="flex flex-col space-y-1">
                <div class="flex items-center">
                    <h3 class="text-base font-bold" v-text="props.docLabel" />
                </div>
                <div class="flex text-start line-clamp-1">
                    <p class="dark:text-gray-300">{{ props.docDescription }}</p>
                </div>
            </div>
        </div>
    </button>
</template>
  