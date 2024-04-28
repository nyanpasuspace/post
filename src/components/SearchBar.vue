<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { ref } from 'vue';
import router from '@/router/index';

const query = ref('')
const search = () => {
	// TODO 搜索 searchQuery
  // console.log(query.value);
  try {
    router.push({
      path: '/search',
      query: {
        query: query.value
      }
    });
  }
  catch(e: any) {
    console.log(e.message);
  }
}
</script>

<template>
  <div class="relative w-full items-center">
    <Input v-model="query" @keyup.enter="search" id="search" type="text" :placeholder="$t('navbar.search') + '...'" class="apperance-none w-full rounded-none focus-visible:ring-0 pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Search class="size-5 text-muted-foreground" />
    </span>
  </div>
</template>
