import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        authUser: null,
        token: null,
        count: 0,
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        },
        logout() {
            this.authUser = null
        },
    }
})