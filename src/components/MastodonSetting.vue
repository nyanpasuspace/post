<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { reactive } from 'vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
const mastodonForm = reactive({
  instance: '',
  token: ''
})
defineProps<{ 
  mastodonInstance: string,
  mastodonToken: string
}>()
const setMastodon = (() => {

})
</script>

<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="flex flex-col w-full space-y-2">
      <Label for="message">Mastodon 实例</Label>
      <Input id="mastodon-instance" type="text" :placeholder="mastodonInstance" v-model="mastodonForm.instance" />
    </div>
    <div class="flex flex-col w-full space-y-2">
      <Label for="message">
        Mastodon Token
          <a href="#" class="text-blue-500 hover:underline" target="_blank">
            查看如何获取 Token
          </a>
      </Label>
      <Input id="mastodon-instance" type="text" :placeholder="mastodonToken" v-model="mastodonForm.token" />
    </div>
    <div class="flex flex-row w-full items-start space-y-2">
      <Button @click="setMastodon">保存设置</Button>
    </div>
  </div>
</template>