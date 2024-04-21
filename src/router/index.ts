import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import AccountView from '@/views/AccountView.vue';
import SearchView from '@/views/SearchView.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView,
            meta: {
                requireAuth: false
            }
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Home',
                requireAuth: true
            }
        },
        {
            path: '/account',
            name: 'account',
            component: AccountView,
            meta: {
                title: 'Account',
                requireAuth: true
            }
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView,
            meta: {
                title: 'Search',
                requireAuth: true
            }
        }
    ]
});

export default router;