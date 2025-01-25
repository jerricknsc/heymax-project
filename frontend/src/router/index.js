import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '../pages/PostPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import BrowsePage from '@/pages/BrowsePage.vue'
import SellingPage from '@/pages/SellingPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/post',
            name: 'post',
            component: PostPage,
        },
        {
            path: '/',
            name: 'login',
            component: LoginPage,
        },
        {
            path: '/browse',
            name: 'browse',
            component: BrowsePage,
        },
        {
            path: '/sell',
            name: 'sell',
            component: SellingPage,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage,
        },
    ],
})

export default router
