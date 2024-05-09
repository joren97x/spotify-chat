import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        authUser: {
            name: 'Joren',
            user_id: 1
        },
        count: 0,
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++
        }
    }
})