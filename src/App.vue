<script setup lang="ts">

</script>

<template>
    <!-- key 解决路径更新页面不跳转 -->
    <RouterView :key="$route.fullPath" />
</template>

<style scoped>

</style>
