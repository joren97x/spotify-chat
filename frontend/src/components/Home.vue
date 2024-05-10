<script setup>

import axios from 'axios'
import { ref, onMounted, nextTick } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'vue-router'
import { io } from "socket.io-client"


const router = useRouter()
const authStore = useAuthStore()
const search = ref('')
const messages = ref([])
const message = ref('')
const virtualScoller = ref(null)
const activeUsers = ref(0)
const tracks = ref([])

const socket = io("http://localhost:3001");

socket.on("connect", () => {
	console.log("ohayo");
	console.log(socket.id); 
});

socket.on("active users", (users) => {
	console.log("active users yy"); 
	console.log(users); 
	activeUsers.value = users
});

socket.on('chat message', () => {
	getAllMessages()
})

onMounted(async () => {
	getAllMessages()


	// const token = 'BQBG3H5_eQUnEDPjK6jf8rKeWCO5fQZyVsZXnQVAWjnmWrXOpn7vBtlNiDmbIiq3SLsL685i3oRIHJg77Nze5Q9FkODBb-b0egV9iS-i1Xie4V0IMoSb72hgoqdcVSsHyp8Xy-iDjO87oXyuCTstRter-a6IGwzjaIT-OLSvUuhMYeTfeEAqFoHdZkLNqd5TxPM19FpTtuoGIXCM-oshqD7pkAuVwxFxaVkV8IUYgHBaftX7Hlr6XSyIk4uEbxXZrR5DSYAdpu07nueXhSWUetb3';
	// async function fetchWebApi(endpoint, method, body) {
	// const res = await fetch(`https://api.spotify.com/${endpoint}`, {
	// 	headers: {
	// 	Authorization: `Bearer ${token}`,
	// 	},
	// 	method,
	// 	body:JSON.stringify(body)
	// });
	// return await res.json();
	// }

	// async function getTopTracks(){
	// // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
	// return (await fetchWebApi(
	// 	'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
	// )).items;
	// }

	// const topTracks = await getTopTracks();
	// console.log(
	// topTracks?.map(
	// 	({name, artists}) =>
	// 	`${name} by ${artists.map(artist => artist.name).join(', ')}`
	// )
	// );

	

	var client_id = '3986226f0e2d41b590779b28ce14a56a';
	var client_secret = '146395d6cb6d4e0093984a67141b5bed';

	axios.post('https://accounts.spotify.com/api/token', 
		`grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}&scope=user-top-read`, 
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
	)
	.then(response => {
		console.log(response.data)
		authStore.access_token = response.data.access_token
		getTracks()
	})
	.catch(error => {
		console.error('Error:', error.response.data);
	});



})

const getAllMessages = () => {
	axios.get('http://localhost:3000/')
	.then((res) => {
		messages.value = res.data
		virtualScoller.value.scrollToIndex(messages.value.length)
	}).catch((err) => {
		console.error(err)
	})
}

const logout = () => {
	
	router.push('/login')
	authStore.logout()
}

const sendMessage = () => {
	console.log('fordago')
	axios.post('http://localhost:3000/send-message', {
		user_id: authStore.authUser.id,
		type: 0,
		message: message.value
	}).then((res) => {
		console.log(res)
		if(res.status == 201) {
			socket.emit('chat message')
			message.value = ''
		}
	}).catch((err) => {
		console.error(err)
	})
}

const shareSong = () => {
	const trackId = '5GUYJTQap5F3RDQiCOJhrS'
	axios.post('http://localhost:3000/send-message', {
		user_id: authStore.authUser.id,
		type: 1,
		message: trackId
	}).then((res) => {
		console.log(res)
		if(res.status == 201) {
			socket.emit('chat message')
			message.value = ''
		}
	}).catch((err) => {
		console.error(err)
	})
}

const getTracks = () => {
	console.log(authStore.access_token)
	axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
		headers: {
			Authorization: `Bearer ${authStore.access_token}`
		}
	})
	.then((res) => {
		tracks.value = res.data
		console.log(res)
	})
	.catch((err) => {
		console.log(err)
	})

}

</script>

<template>
	<v-container fluid>
		<v-row>
		{{ tracks }}
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
								<v-btn flat icon="mdi-share" @click="shareSong"></v-btn>
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
					<v-badge color="error" :content="activeUsers">
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
				<v-virtual-scroll :height="450" :items="messages" ref="virtualScoller">
					<template v-slot:default="{ item }">
						<div v-if="item.type" class="text-center">
							{{ item.name }}
							<iframe class="" style="border-radius:12px" :src="`https://open.spotify.com/embed/track/${item.message}?utm_source=generator`" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
						</div>
						<div v-else>
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
						</div>
					</template>
				</v-virtual-scroll>
				<v-form @submit.prevent="sendMessage">
					<v-text-field label="Abc" class="mt-4" v-model="message">
						<template v-slot:append-inner>
							<v-btn icon="mdi-send" type="submit" @click="sendMessage" flat></v-btn>
						</template>
					</v-text-field>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>