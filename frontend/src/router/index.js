import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(null),
    routes: [
        {
            path: '/',
            component: () => import('../components/Home.vue'),
            name: 'Test',
        },
        {
            path: '/login',
            component: () => import('../components/Login.vue'),
            name: 'Login',
        },
        {
            path: '/register',
            component: () => import('../components/Register.vue'),
            name: 'Register',
        }
    ]
})

export default router