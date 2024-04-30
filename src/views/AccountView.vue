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
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/NavBar.vue';
import InfoCard from '@/components/InfoCard.vue';
import MastodonSetting from '@/components/MastodonSetting.vue';
import Footer from '@/components/Footer.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { instance } from '@/api/instance';
import { modifyUser } from '@/api/modifyUser';
import i18n from '@/i18n';
const messageIsDisabled = ref(true);
const savingMessage = ref(false);
const worldIsDisabled = ref(true);
const timeIsDisabled = ref(false);
const isMasatodonDisabled = ref(false);
const { toast } = useToast();
const { t } = i18n.global;
const sendTriggers: Record<string, string> = {
  Mastodon: 'mastodon',
  Twitter: 'twitter',
};
const sendTriggerValue = ref('Mastodon');
const userInfoForm = {
  username: '',
  avatarUrl: '',
  message: '',
  isSendToWorld: false,
  mastodonInstance: '',
  mastodonToken: '',
  sendTime: 0,
  isLive: true,
}
const mastodonForm = {
  mastodonInstance: '',
  mastodonToken: ''
}


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
      savingMessage,
      worldIsDisabled,
      timeIsDisabled,
      sendTriggers,
      sendTriggerValue,
      isMasatodonDisabled,
      toast
    };
  },
  data() {
    return {
      userInfo: null as any,
      loading: true,
      status: '',
      userInfoForm,
      mastodonForm
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
      // console.log(this.userInfo.data[0].is_live);
      if(this.userInfo) {
        if(this.userInfo.data[0].is_live) {
          this.userInfoForm.isLive = true;
        }
        else {
          this.userInfoForm.isLive = false;
        }
        this.userInfoForm.username = this.userInfo.data[0].username;
        this.userInfoForm.avatarUrl = this.userInfo.data[0].avatar_url;
        this.userInfoForm.message = this.userInfo.data[0].message;

        if(this.userInfo.data[0].is_send_to_world) {
          // console.log(this.userInfo.data[0].is_send_to_world);
          // console.log(typeof(this.userInfo.data[0].is_send_to_world));
          this.userInfoForm.isSendToWorld = true;
        }
        else {
          this.userInfoForm.isSendToWorld = false;
        }
        this.userInfoForm.mastodonInstance = this.userInfo.data[0].mastodon_instance;
        this.mastodonForm.mastodonInstance = this.userInfo.data[0].mastodon_instance;
        this.userInfoForm.mastodonToken = this.userInfo.data[0].mastodon_token;
        this.mastodonForm.mastodonToken = this.userInfo.data[0].mastodon_token;
        this.userInfoForm.sendTime = this.userInfo.data[0].send_time;
      }
      if(this.userInfoForm.isLive) {
        this.status =  'online';
      }
      else {
        this.status = 'offline';
      }
      this.loading = false;
    })
    .catch((error: any) => {
      console.log(error.message);
      this.userInfo = null;
    });
  },
  methods: {
    isPositiveIntegerLessThan3650(str: string): boolean {
      const regex = /^\d+$/;
      const number = parseInt(str, 10);
      return regex.test(str) && number > 0 && number <= 3650;
    },
    editMessage: () => {
      messageIsDisabled.value = false;
      worldIsDisabled.value = false;
    },

    saveMessage: async () => {
      messageIsDisabled.value = true;
      worldIsDisabled.value = true;
      savingMessage.value = true;
      const data = {
        message: userInfoForm.message,
        isSendToWorld: userInfoForm.isSendToWorld,
      }
      await modifyUser(
        localStorage.getItem('userId'), 
        data
      )
      .then((res: any)=> {
        console.log(res);
        if(!res) {
          toast({
            description: `${t('account.saveMessageError')}`,
            variant: 'destructive',
            duration: 600 * 5
          });
        }
        else {
          userInfoForm.message = data.message;
          userInfoForm.isSendToWorld = data.isSendToWorld;
          if(res.status == 200) {
            toast({
              description: `${t('account.saveMessageSuccess')}`,
              duration: 600 * 5
            });
          }
          else {
            toast({
              description: `${t('account.saveMessageServerError')}`,
              duration: 600 * 5
            });
          } 
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast({
          description: `${t('account.saveMessageError')}`,
          variant: 'destructive',
          duration: 600 * 5
        });
      })
      setTimeout(() => {
        savingMessage.value = false;
      }, 1000)
    },

    setTimmer: async () => {
      const data = {
        sendTime: userInfoForm.sendTime
      };
      timeIsDisabled.value = true;
      await modifyUser(
        localStorage.getItem('userId'),
        data
      )
      .then((res: any) => {
        if(!res) {
          toast({
            description: `${t('account.saveTimeInfo')}`,
            variant: 'destructive',
            duration: 600 * 5
          });
        }
        else {
          if(res.status == 200) {
            userInfoForm.sendTime = data.sendTime;
            toast({
              description: `${t('account.saveTimeSuccess')}`,
              duration: 600 * 5
            });
          }
          else {
            toast({
              description: `${t('account.saveServerError')}`,
              variant: 'destructive',
              duration: 600 * 5
            });
          }
        }
      })
      .catch((error: any)=> {
        console.log(error.message);
        toast({
          description: `${t('account.saveTimeInfo')}`,
          variant: 'destructive',
          duration: 600 * 5
        });
      })
      setTimeout(() => {
        timeIsDisabled.value = false;
      }, 1000)
    },
    setSendToWorldStatus: () => {
      userInfoForm.isSendToWorld = !userInfoForm.isSendToWorld;
    },
    setMastodon: async () => {
      const data = {
        mastodonInstance: mastodonForm.mastodonInstance,
        mastodonToken: mastodonForm.mastodonToken
      };
      isMasatodonDisabled.value = true;
      await modifyUser(
        localStorage.getItem('userId'),
        data
      )
      .then((res: any) => {
        if(!res) {
          toast({
            description: `${t('account.mastodonError')}`,
            variant: 'destructive',
            duration: 600 * 5
          });
        }
        else {
          if(res.status == 200) {
            userInfoForm.mastodonInstance = data.mastodonInstance;
            userInfoForm.mastodonToken = data.mastodonToken;
            toast({
              description: `${t('account.mastodonSuccess')}`,
              duration: 600 * 5
            });
          }
          else {
            toast({
              description: `${t('account.mastodonServerError')}`,
              variant: 'destructive',
              duration: 600 * 5
            });
          }
        }
      })
      .catch((error: any)=> {
        console.log(error.message);
        toast({
          description: `${t('account.mastodonError')}`,
          variant: 'destructive',
          duration: 600 * 5
        });
      })
      setTimeout(() => {
        isMasatodonDisabled.value = false;
      }, 1000)
    },
    changeAvatarFile: async (event: any) => {
      var files = event?.target.files[0];
      console.log(files);
    },
    saveProfile: async () => {
      console.log("saveFile");
    }
  },
  components: {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Button,
    Loader2,
    Separator,
    Textarea,
    Label,
    Toaster,
    Checkbox,
    Input,
    NavBar,
    InfoCard,
    MastodonSetting,
    Footer,
  }
}
</script>

<template>
  <div v-if="!loading" class="flex box-border min-h-screen w-full flex-col">
    <NavBar />
    <main class="flex box-border flex-col mx-0 xl:mx-auto min-w-[360px] min-h-[500px] w-full xl:w-7/12">
      <div class="mx-[16px]">
        <InfoCard :username="userInfoForm.username" :status="status" :changeAvatarFile="changeAvatarFile" :saveProfile="saveProfile" :avatarUrl="userInfoForm.avatarUrl" />
      </div>
      <div class="mx-[16px]">
        <Separator class="my-2" />
      </div>
      <div class="flex flex-col mx-[16px] my-2">
        <div class="flex flex-col w-full gap-2">
          <!-- 发送消息设置 -->
          <Label for="message">{{ $t('account.message') }}</Label>
          <Textarea id="message" :placeholder="userInfoForm.message" :disabled="messageIsDisabled" v-model="userInfoForm.message"/>
          <div class="h-12 grow flex flex-row pl-1 space-x-4 justify-between items-center text-center">
            <div class="flex items-center space-x-2">
              <Checkbox id="terms" :defaultChecked="userInfoForm.isSendToWorld" @update:checked="setSendToWorldStatus" :disabled="worldIsDisabled" />
              <Label for="terms">
                {{ $t('account.isSendToWorld') }}
              </Label>
            </div>
            <div class="flex items-center pl-2 space-x-4">
              <Button variant="secondary" @click="editMessage">
                {{ $t('account.editMessage') }}
              </Button>
              <Button @click="saveMessage" :disabled="messageIsDisabled">
                <Loader2 v-if="savingMessage" class="w-4 h-4 mr-2 animate-spin" />
                {{ $t('account.saveMessage') }}
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
            <Label for="terms">
              {{ $t('account.heartbeatSetting') }}
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
                  <SelectItem value="Twitter">
                    Twitter
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col pt-[10px]" v-if="sendTriggers[sendTriggerValue] == 'mastodon'">
            <!-- 实例 URL 和用户 Token -->
            <!-- TODO 授权使用 -->
            <MastodonSetting
              :isMastodonDisabled="isMasatodonDisabled"
              :instancePlaceholder="mastodonForm.mastodonInstance"
              :tokenPlaceholder="mastodonForm.mastodonToken"
              :mastodonForm="mastodonForm"
              :setMastodon="setMastodon"
            />
          </div>
          <div class="flex flex-col pt-[10px]" v-else-if="sendTriggers[sendTriggerValue] == 'twitter'">
            twitter
          </div>
          <div class="flex flex-col pt-[10px]" v-else>

          </div>
        </div>
        <!-- TODO 转发设置 -->
        <div>
          <div class="flex flex-col pt-[20px]">
            <!-- 触发器：设置时间 -->
            <Label for="terms">
              {{ $t('account.sendTimeSetting') }}
            </Label>
            <div class="flex pt-[10px]">
              <Input class="w-full pr-[33px]" id="sendTime" type="text" :placeholder="userInfoForm.sendTime" v-model="userInfoForm.sendTime" :disabled="timeIsDisabled"/>
              <div class="relative text-muted-foreground top-[8px] -left-[30px]">{{ $t('account.timeSettingUnit') }}</div>
              <Button class="ml-0" @click="setTimmer" :disabled="timeIsDisabled">
                <Loader2 v-if="timeIsDisabled" class="w-4 h-4 mr-2 animate-spin" />
                {{ $t('account.saveTimeSetting') }}
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
    <main class="flex box-border flex-col mx-0 xl:mx-auto min-h-[500px] w-full xl:w-7/12">
      <div class="flex h-[100px] mx-auto items-center">
        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
      </div>
    </main>
    <Footer />
  </div>
  <Toaster />
</template>

<style scoped></style>
