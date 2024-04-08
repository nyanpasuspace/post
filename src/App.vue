<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
const theme = useColorMode();
if(localStorage.getItem('vueuse-color-scheme') == 'light') {
    theme.value = 'light';
}
else {
    theme.value = 'dark';
}
</script>

<template>
    <RouterView />
</template>

<style scoped>

</style>
