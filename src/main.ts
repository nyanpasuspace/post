import { createApp } from "vue";
import "./style.css";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";

const app = createApp(App);
router.beforeEach(async (to, from, next) => {
    if(to.meta.requireAuth) {
        if(localStorage.getItem('sessionId')) {
            await axios.get('http://localhost:9000/api/session', {
                params: {
                    sessionId: localStorage.getItem('sessionId')
                }
            })
            .then((res)  => {
                if(res.status == 200) {
                    next();
                }
                else {
                    next({
                        path: '/'
                    });
                }
            })
            .catch((error: any) => {
                console.log(error.message);
                next({
                    path: '/'
                });
            })
        }
        else {
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
                await axios.get('http://localhost:9000/api/session', {
                    params: {
                        sessionId: localStorage.getItem('sessionId')
                    }
                })
                .then((res)  => {
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
                    console.log(error.message);
                    next();
                })
            }
            else {
                next();
            }
        }
    }
});

app.use(router);
app.mount("#app");
