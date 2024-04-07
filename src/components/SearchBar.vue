<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { ref } from 'vue';
const query = ref('')
const search = () => {
	// TODO 搜索 searchQuery
	console.log(query.value);
}
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input v-model="query" @keyup.enter="search" id="search" type="text" placeholder="Search..."  class="apperance-none rounded-none focus-visible:ring-0 pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Search class="size-5 text-muted-foreground" />
    </span>
  </div>
</template>
