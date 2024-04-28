import { createApp } from "vue";
import "./style.css";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router/index.js";
import { instance } from '@/api/instance';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
import i18n from '@/i18n/index.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(App);

router.beforeEach(async (to, _from, next) => {
    if(to.meta.title && typeof to.meta.title == 'string') {
        document.title = to.meta.title + ' | ' + 'Post';
    }
    if(to.meta.requireAuth) {
        if(localStorage.getItem('sessionId')) {
            await instance.get('/session', {
                params: {
                    sessionId: localStorage.getItem('sessionId'),
                    userId: localStorage.getItem('userId')
                }
            })
            .then((res: any)  => {
                if(res.status == 200) {
                    next();
                }
                else {
                    localStorage.removeItem('sessionId');
                    localStorage.removeItem('userId');
                    next({
                        path: '/'
                    });
                }
            })
            .catch((error: any) => {
                console.log(error.message);
                localStorage.removeItem('sessionId');
                localStorage.removeItem('userId');
                next({
                    path: '/'
                });
            })
        }
        else {
            localStorage.removeItem('sessionId');
            localStorage.removeItem('userId');
            next({
                path: '/'
            });
        }
    }
    else {
        if(to.path !== '/') {
            next();
        }
        else {
            if(localStorage.getItem('sessionId')) {
                await instance.get('/session', {
                    params: {
                        sessionId: localStorage.getItem('sessionId'),
                        userId: localStorage.getItem('userId')
                    }
                })
                .then((res: any)  => {
                    if(res.status == 200) {
                        next({
                            path: '/home'
                        });
                    }
                    else {
                        next();
                    }
                })
                .catch((error: any) => {
                    localStorage.removeItem('sessionId');
                    localStorage.removeItem('userId');
                    console.log(error.message);
                    next();
                })
            }
            else {
                localStorage.removeItem('sessionId');
                localStorage.removeItem('userId');
                next();
            }
        }
    }
});
app.use(VMdPreview);
app.use(i18n);
app.use(router);
app.mount("#app");
