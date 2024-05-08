<script setup>

	import axios from 'axios'

	axios.get('http://localhost:3000/').then((res) => {
		console.log(res)
	}).catch((err) => {
		console.error(err)
	})

</script>

<template>
	<v-container>
		home pageyy
	</v-container>
</template>