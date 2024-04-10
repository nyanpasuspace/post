<!-- 登录后的主页 /home -->
<script lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/NavBar.vue';
import InfoCard from '@/components/InfoCard.vue';
import MastodonSetting from '@/components/MastodonSetting.vue';
import Footer from '@/components/Footer.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { instance } from '@/api/instance';

const messageIsDisabled = ref(true);
const sendTriggers: Record<string, string> = {
  Mastodon: 'mastodon',
  Twitter: 'twitter',
};
const sendTriggerValue = ref('Mastodon');
const sendTime = ''

export default {
  setup() {
    const route = useRoute();
    const currentPath = ref(route.path);

    watch(route, () => {
      currentPath.value = route.path;
    });
    return {
      currentPath,
      messageIsDisabled,
      sendTriggers,
      sendTriggerValue,
      sendTime,
    };
  },
  data() {
    return {
      userInfo: null as any,
      status: '',
    }
  },
  mounted() {
    const userId = localStorage.getItem('userId');
    instance.get(`/user/${userId}`, {
      params: {
        sessionId: localStorage.getItem('sessionId')
      }
    })
    .then((res: any) => {
      this.userInfo = res.data;
      if(this.userInfo) {
        if(this.userInfo.data[0].is_live) {
          this.status = 'online';
        }
        else {
          this.status = 'offline'
        }
        this.sendTime = this.userInfo.data[0].send_time;
      }
    })
    .catch((error: any) => {
      console.log(error.name);
      this.userInfo = null;
    });
  },
  methods: {
    editMessage: () => {
      messageIsDisabled.value = false;
    },

    saveMessage: () => {
      messageIsDisabled.value = true;
    },

    setTimmer: () => {

    },
  },
  components: {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Button,
    Separator,
    Textarea,
    Label,
    Checkbox,
    Input,
    NavBar,
    InfoCard,
    MastodonSetting,
    Footer
  }
}
</script>

<template>
  <div v-if="userInfo" class="flex box-border min-h-screen w-full flex-col">
    <NavBar />
    <main class="flex box-border flex-col mx-0 lg:mx-auto  w-full lg:w-7/12">
      <div class="mx-[16px]">
        <InfoCard :username="userInfo.data[0].username" :status="status" :avatarUrl="userInfo.data[0].avatar_url" />
      </div>
      <div class="mx-[16px]">
        <Separator class="my-2" />
      </div>
      <div class="flex flex-col mx-[16px] my-2">
        <div class="flex flex-col w-full gap-3">
          <!-- 发送消息设置 -->
          <Label for="message">预设消息</Label>
          <Textarea id="message" :placeholder="userInfo.data[0].message" :disabled="messageIsDisabled" />
          <div class="h-12 grow flex flex-row pl-2 space-x-4 justify-between items-center text-center">
            <div class="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label for="terms" class="truncate">
                发送到此站世界线
              </Label>
            </div>
            <div class="flex items-center pl-2 space-x-4">
              <Button variant="secondary" @click="editMessage">
                编辑
              </Button>
              <Button @click="saveMessage">
                保存
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Separator class="my-2" />
        </div>
        <div>
          <!-- 发送设置 -->
          <div class="flex items-center justify-between space-x-2">
            <Label for="terms" class="truncate">
              发送平台设置
            </Label>
            <Select v-model="sendTriggerValue">
              <SelectTrigger class="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Mastodon">
                    Mastodon
                  </SelectItem>
                  <!-- <SelectItem value="Twitter">
                    Twitter
                  </SelectItem> -->
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col pt-[10px]" v-if="sendTriggers[sendTriggerValue] == 'mastodon'">
            <!-- 实例 URL 和用户 Token -->
            <!-- TODO 授权使用 -->
            <MastodonSetting :mastodonInstance="userInfo.data[0].mastodon_instance" :mastodonToken="userInfo.data[0].mastodon_token" />
          </div>
          <!-- <div class="flex flex-col pt-[10px]" v-else-if="sendTriggers[sendTriggerValue] == 'twitter'">
            twitter
          </div> -->
          <div class="flex flex-col pt-[10px]" v-else>

          </div>
        </div>
        <div>
          <div class="flex flex-col pt-[20px]">
            <!-- 触发器：设置时间 -->
            <Label for="terms" class="truncate">
              发送时间设置
            </Label>
            <div class="flex pt-[10px]">
              <Input class="w-full pr-[33px]" id="sendTime" type="text" :placeholder="userInfo.data[0].send_time" v-model="sendTime" />
              <div class="relative text-muted-foreground top-[8px] -left-[30px]">天</div>
              <Button class="ml-0" @click="setTimmer">
                保存
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
  <div v-else class="flex box-border min-h-screen w-full flex-col">
    <NavBar />
    <main class="flex box-border flex-col mx-0 lg:mx-auto  w-full lg:w-7/12">
      <div class="flex h-[100px] mx-auto items-center">
        Loading...
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped></style>
