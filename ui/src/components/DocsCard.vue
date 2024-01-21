<template>
    <div class="hover: relative select-none p-3 px-0 pb-5 text-[var(--vscode-foreground)]">
        <div class="flex w-full flex-wrap items-center gap-2">
            <div class="mr-2 h-12 w-12 shrink-0">
                <Placeholder v-if="!props.docLogo" />
                <img v-else :src="props.docLogo" :alt="props.docLabel" loading="lazy" />
            </div>
            <div class="flex-1">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <h3 class="text-base font-bold" v-text="props.docLabel" />
                    </div>
                </div>
                <div class="mt-2 flex flex-wrap items-center gap-3">
                    <button type="button" @click="handleOpenDocs(props.docLabel)" class="text-xs text-[#00DC82]">Read
                        Docs</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { vscode } from "./../utils/vscode";
const props = defineProps<{
    docLogo: string;
    docUrl: string;
    docLabel: string
}>();

const handleOpenDocs = (label: string) => {
    vscode.postMessage({
        command: "openDocs",
        label: label,
    });
}
</script>
  