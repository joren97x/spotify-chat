<script setup>

import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'vue-router'
import { io } from "socket.io-client"


const router = useRouter()
const authStore = useAuthStore()
const search = ref('')
const messages = ref([])
const message = ref('')

const socket = io("http://localhost:3001");

socket.on("connect", () => {
	console.log("ohayo"); // x8WIv7-mJelg7on_ALbx
	console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

onMounted(() => {
	getAllMessages()

})

const getAllMessages = () => {
	axios.get('http://localhost:3000/')
	.then((res) => {
		messages.value = res.data
	}).catch((err) => {
		console.error(err)
	})
}

const logout = () => {
	authStore.authUser = null
	router.push('/login')
	// authStore.logout()
}

const sendMessage = () => {
	axios.post('http://localhost:3000/send-message', {
		user_id: authStore.authUser.id,
		message: message.value
	}).then((res) => {
		if(res.status == 201) {
			getAllMessages
		}
	}).catch((err) => {
		console.error(err)
	})
}

</script>

<template>
	<v-container fluid>
		<v-row>
			<v-col cols="8">
				<v-text-field label="Type a song name..." v-model="search">
					<template v-slot:append-inner>
						<v-btn flat icon="mdi-magnify"></v-btn>
					</template>
				</v-text-field>
				<v-table title="Songs">
					<thead>
						<tr>
							<th colspan="3" class="font-weight-bold text-h6">Songs</th>
						</tr>
						<tr>
							<th class="text-center">
								#
							</th>
							<th class="text-left">
								Title
							</th>
							<th class="text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="n in 5" :key="n" class="text-center">
							<td>{{ n }}</td>
							<td class="text-left">
								<v-list-item title="Shouldnt be" subtitle="hello">
									<template v-slot:prepend>
										<v-avatar rounded="0">
											<v-img cover src="https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg"></v-img>
										</v-avatar>
									</template>
								</v-list-item>
							</td>
							<td>
								13:00
								<v-btn flat icon="mdi-play"></v-btn>
								<v-btn flat icon="mdi-share"></v-btn>
							</td>
						</tr>
					</tbody>
				</v-table>
                <iframe class="mt-4" style="border-radius:12px" src="https://open.spotify.com/embed/track/2kIUILBPlz4exX9xIFS275?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
			</v-col>
			<v-col cols="4">
				<!-- <div>
					<span class="font-weight-bold text-h6"> Chats </span> 
					<v-badge color="error" content="2">
						<v-icon>mdi-play</v-icon>
					</v-badge>
				</div> -->
				<v-list-item>
					<div class="pa-3">
					<span class="font-weight-bold text-h6"> Chats </span> 
					<v-badge color="error" content="2">
						<v-icon>mdi-play</v-icon>
					</v-badge>
				</div>
					<template v-slot:append>
						<v-menu>
							<template v-slot:activator="{ props }">
								<v-btn v-bind="props" flat class="text-none">
									<template v-slot:prepend>
										<v-avatar class="me-3">
											<v-img cover src="https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg"></v-img>
										</v-avatar>	
									</template>
									Joren
									<v-icon class="ms-2">mdi-chevron-down</v-icon>
								</v-btn>
							</template>
							<v-list>
								<v-list-item @click="logout" class="text-red" prepend-icon="mdi-logout">
									<v-list-item-title>Logout</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</template>
				</v-list-item>
				<v-virtual-scroll :height="450" :items="messages">
					<template v-slot:default="{ item }">
						<div v-if="item.user_id !== authStore.authUser?.id">
							<span class="ms-7">{{ item.name }}</span>
							<v-row class="mx-2 my-1">
								<v-col cols="auto" class="bg-secondary" style="border-radius: 30px;">
									<p class="mx-3 text-light py-1">
										{{ item.message }}
										<br>
										<span class="font-weight-light" style="font-size: 15px;">
											{{ item.created_at }}
										</span>
									</p>
								</v-col>
							</v-row>
						</div>
						<v-row class="mx-2 my-1" justify="end" v-else>
							<v-col cols="auto" class="bg-secondary" style="border-radius: 30px;">
								<p class="mx-3 text-light py-1">
									{{ item.message }}
									<br>
									<span class="font-weight-light" style="font-size: 15px;">
										{{ item.created_at }}
									</span>
								</p>
							</v-col>
						</v-row>
					</template>
				</v-virtual-scroll>
				<v-form @submit.prevent="sendMessage">
					<v-text-field label="Abc" class="mt-4" v-model="message">
						<template v-slot:append-inner>
							<v-btn icon="mdi-send" type="submit" flat></v-btn>
						</template>
					</v-text-field>
					<v-btn icon="mdi-send" type="submit" flat></v-btn>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>