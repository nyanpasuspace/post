<script setup lang="ts">
  import { instance } from '@/api/instance'
  import { GithubLogoIcon } from '@radix-icons/vue'
  import { Button } from '@/components/ui/button'
  import i18n from '@/i18n/index';
  
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card' 
  import { Input } from '@/components/ui/input'
  import { reactive } from 'vue'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs'

  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import * as z from 'zod'
  import { useToast } from '@/components/ui/toast/use-toast'
  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from '@/components/ui/form'
  import router from '@/router/index'
  const { toast } = useToast();
  const { t } = i18n.global;
  const loginForm = reactive({
    username: '',
    password: ''
  })

  const registerForm = reactive({
    username: '',
    password: ''
  })

  const formSchema = toTypedSchema(z.object({
    username: z
      .string()
      .min(2, {
        message: `${t('index.usernameMinInfo')}`
      })
      .max(15, {
        message: `${t('index.usernameMaxInfo')}`
      }),
    password: z
      .string()
      .min(6, {
        message: `${t('index.passwordMinInfo')}`
      })
      .max(20, {
        message: `${t('index.passwordMaxInfo')}`
      })
      .regex(/^[a-zA-Z0-9~!@#%^&()_+=-]*$/, {
        message: `${t('index.passwordRexInfo')}`
      }),
  }))

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
  })
  // http://localhost:9000/api
  const login = handleSubmit(async (value) => {
    // console.log(value);
    var loginStatus;
    var sessionId = '';
    var userId = '';
    await instance.post('/login', {
      username: value.username,
      password: value.password
    })
    .then(function (res: any) {
      if(res.status == 200) {
        loginStatus = 200;
        sessionId = res.data.sessionId;
        userId = res.data.userid;
      }
      else {
        loginStatus = res.status;
        // console.log('登录失败');
      }
    })
    .catch(function (error: any) {
      loginStatus = 401;
      console.log(error);
    })
    if(loginStatus == 200) {
      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem('userId', userId);
      router.replace({path:'/home'});
    }
    else if(loginStatus == 401) {
      toast({
        description: `${t('index.loginErrorInfo1')}`,
        variant: 'destructive',
        duration: 600 * 5
      });
    }
    else {
      toast({
        description: `${t('index.loginErrorInfo2')}`,
        variant: 'destructive',
        duration: 600 * 5
      });
    }
  })

  const register = handleSubmit(async (value) => {
    // console.log(value);
    var registerStatus;
    var sessionId = '';
    var userId = '';
    await instance.post('/register', {
      username: value.username,
      password: value.password
    })
    .then(async function (res: any) {
      if(res.status == 200) {
        await instance.post('/login', {
          username: value.username,
          password: value.password
        })
        .then(function (res: any) {
          if(res.status == 200) {
            registerStatus = 200;
            sessionId = res.data.sessionId;
            userId = res.data.userid;
          }
          else {
            registerStatus = res.status;
          }
        })
      }
      else {
        registerStatus = res.status;
        // console.log('注册失败');
      }
    })
    .catch(function (error: any) {
      registerStatus = 409;
      console.log(error.name);
    })
    if(registerStatus == 200) {
      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem('userId', userId);
      router.replace({path:'/home'});
    }
    else {
      if(registerStatus == 409) {
        // console.log(registerStatus);
        // console.log('用户名已存在');
        toast({
          description: `${t('index.registerErrorInfo1')}`,
          variant: 'destructive',
          duration: 600 * 5
        });
      }
      else {
        toast({
          description: `${t('index.registerErrorInfo2')}`,
          variant: 'destructive',
          duration: 600 * 5
        });
      }
    }
  })
</script>

<template>
  <Tabs default-value="login" class="w-auto sm:w-[400px]">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="login">
        {{ $t('index.login') }}
      </TabsTrigger>
      <TabsTrigger value="register">
        {{ $t('index.register') }}
      </TabsTrigger>
    </TabsList>
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>{{ $t('index.login') }}</CardTitle>
          <!-- <CardDescription>
            Enter your infomation to login.
          </CardDescription> -->
        </CardHeader>
        <CardContent class="space-y-2">
          <form class="w-full space-y-3" @submit="login">
            <FormField v-model="loginForm.username" name="username">
              <FormItem>
                <FormLabel>{{ $t('index.username') }}</FormLabel>
                <FormControl>
                  <Input id="username" type="text" placeholder="username" v-model="loginForm.username"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-model="loginForm.password" name="password">
              <FormItem>
                <FormLabel>{{ $t('index.password') }}</FormLabel>
                <FormControl>
                  <Input id="password" type="password" v-model="loginForm.password"/>
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button class="w-full" type="submit">{{ $t('index.login') }}</Button>
            </FormField>
          </form>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <GithubLogoIcon class="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
                <path fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="register">
      <Card>
        <CardHeader>
          <CardTitle>{{ $t('index.register') }}</CardTitle>
          <!-- <CardDescription>
            Enter your infomation to register.
          </CardDescription> -->
        </CardHeader>
        <CardContent class="space-y-2">
          <form class="w-full space-y-3" @submit="register">
            <FormField v-model="registerForm.username" name="username">
              <FormItem>
                <FormLabel>{{ $t('index.username') }}</FormLabel>
                <FormControl>
                  <Input id="username" type="text" placeholder="username" v-model="registerForm.username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-model="registerForm.password" name="password">
              <FormItem>
                <FormLabel>{{ $t('index.password') }}</FormLabel>
                <FormControl>
                  <Input id="password" type="password" v-model="registerForm.password" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button class="w-full" type="submit">{{ $t('index.register') }}</Button>
            </FormField>
          </form>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <GithubLogoIcon class="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
                <path fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</template>