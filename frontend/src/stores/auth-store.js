import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        authUser: null,
        token: null
    }),
    getters: {

    },
    actions: {
        logout() {
            this.authUser = null
	        this.token = null
        }
    }
})