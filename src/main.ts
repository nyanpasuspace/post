import { createApp } from "vue";
import "./style.css";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router/index.js";
import { instance } from '@/api/instance'

const app = createApp(App);

router.beforeEach(async (to, _from, next) => {
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
                await instance.get('http://localhost:9000/api/session', {
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

app.use(router);
app.mount("#app");
