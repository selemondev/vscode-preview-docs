<script setup lang="ts">
// import { vscode } from "./../utils/vscode";
const props = defineProps<{
    docLogo: string;
    docUrl: string;
    docLabel: string
}>();

// const handleOpenDocs = (label: string) => {
//     vscode.postMessage({
//         command: "openDocs",
//         label: label,
//     });
// }
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
                    <button type="button" class="text-xs text-[#00DC82]">Read
                        Docs</button>
                </div>
            </div>
        </div>
    </div>
</template>
  