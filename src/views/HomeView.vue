<!-- 登录后的主页 /home -->
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '@/components/Footer.vue';

const route = useRoute();
const currentPath = ref(route.path);

watch(route, () => {
  currentPath.value = route.path;
});
</script>

<template>
  <div class="flex box-border min-h-screen w-full flex-col bg-background">
    <NavBar />
    <main class="min-h-[500px]">
    </main>
    <Footer />
  </div>
</template>

<style scoped>

</style>
