<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-vue-next';
defineProps<{ 
  setMastodon: any;
  isMastodonDisabled: boolean,
  instancePlaceholder: string,
  tokenPlaceholder: string,
  mastodonForm: {
    mastodonInstance: string,
    mastodonToken: string,
  }
}>();
</script>

<template>
  <div class="flex flex-col items-center space-y-3">
    <div class="flex flex-col w-full space-y-2">
      <Label for="message">Mastodon 实例</Label>
      <Input id="mastodon-instance" type="text" :placeholder="instancePlaceholder" v-model="mastodonForm.mastodonInstance" :disabled="isMastodonDisabled" />
    </div>
    <div class="flex flex-col w-full space-y-2">
      <Label for="message">
        Mastodon Token
          <a href="#" class="text-blue-500 hover:underline" target="_blank">
            查看如何获取 Token
          </a>
      </Label>
      <Input id="mastodon-instance" type="text" :placeholder="tokenPlaceholder" v-model="mastodonForm.mastodonToken" :disabled="isMastodonDisabled" />
    </div>
    <div class="flex flex-row w-full items-start space-y-2">
      <Button @click="setMastodon" :disabled="isMastodonDisabled">
        <Loader2 v-if="isMastodonDisabled" class="w-4 h-4 mr-2 animate-spin" />
        保存设置
      </Button>
    </div>
  </div>
</template>