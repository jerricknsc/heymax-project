import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '../pages/PostPage.vue'
import LoginPage from '@/pages/LoginPage.vue'

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
    ],
})

export default router
